// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, Profile, Role, NewProfile } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, age: number, role: Role) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load session and profile on mount
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log('Session:', session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await loadProfile(session.user.id);
      }

      setLoading(false);
    };
    init();

    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state change:', _event, session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await loadProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from<Profile>('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    console.log('loadProfile data:', data, 'error:', error);

    if (error) {
      setProfile(null);
      return;
    }

    // If no profile exists, create a default one
    if (!data) {
      console.log('No profile found, creating default profile for user:', userId);
      const defaultProfile: NewProfile = {
        id: userId,
        full_name: 'New User',
        age: null,
        role: 'student',
        avatar_color: '#F59E0B',
      };

      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert(defaultProfile)
        .select()
        .maybeSingle();

      if (insertError) {
        console.error('Failed to create default profile:', insertError);
        setProfile(null);
        return;
      }

      setProfile(newProfile ?? null);
      return;
    }

    setProfile(data);
  };

  const signUp = async (email: string, password: string, fullName: string, age: number, role: Role) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    if (data.user) {
      const newProfile: NewProfile = {
        id: data.user.id,
        full_name: fullName,
        age,
        role,
        avatar_color: '#F59E0B',
      };

      const { error: insertError } = await supabase.from('profiles').insert(newProfile);
      if (insertError) throw insertError;
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
