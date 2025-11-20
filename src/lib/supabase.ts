import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  full_name: string;
  age: number | null;
  avatar_color: string;
  created_at: string;
  updated_at: string;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  mood: string;
  intensity: number;
  note: string | null;
  created_at: string;
}

export interface Testimony {
  id: string;
  user_id: string;
  content: string;
  is_anonymous: boolean;
  likes_count: number;
  created_at: string;
  profiles?: Profile;
}

export interface PersonalVictory {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  created_at: string;
}

export interface GratitudeEntry {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface DoctorBooking {
  id: string;
  user_id: string;
  doctor_name: string;
  specialty: string;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  status: string;
  created_at: string;
}
