import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Home, Smile, BookOpen, Calendar, Heart, Gamepad2, MessageSquare, Trophy, LogOut } from 'lucide-react';

// Import student views
import { MoodTracker, Quotes, Books, DoctorBooking, Exercises, Testimonies, Victories, HomeView } from './StudentViews';

// Counselor/Admin pages
import CounselorDashboard from '../pages/counselor/CounselorDashboard';
import SessionView from '../pages/counselor/SessionView';
import AnonymousChatConsole from '../pages/counselor/AnonymousChatConsole';
import AnalyticsView from '../pages/AnalyticsView';
import AdminPortal from '../pages/AdminPortal';

type View =
  | 'home'
  | 'mood'
  | 'quotes'
  | 'books'
  | 'doctors'
  | 'exercises'
  | 'testimonies'
  | 'victories'
  | 'counselor'
  | 'session'
  | 'chat'
  | 'analytics'
  | 'admin';

export function Dashboard() {
  const { profile, loading, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<View>('home');
  const mainColor = 'orange';

  if (loading) return <div className="text-center mt-20 text-xl font-bold">Loading dashboard...</div>;
  if (!profile) return <div className="text-center mt-20 text-xl font-bold text-red-500">Profile not found. Please sign in again.</div>;

  useEffect(() => {
    if (profile.role === 'admin') setCurrentView('admin');
  }, [profile]);

  const navItems: { id: View; label: string; icon: any }[] = [];
  if (profile.role === 'student') {
    navItems.push(
      { id: 'home', label: 'Home', icon: Home },
      { id: 'mood', label: 'My Feelings', icon: Smile },
      { id: 'quotes', label: 'Inspiration', icon: Heart },
      { id: 'books', label: 'Books', icon: BookOpen },
      { id: 'doctors', label: 'Talk to Doctor', icon: Calendar },
      { id: 'exercises', label: 'Activities', icon: Gamepad2 },
      { id: 'testimonies', label: 'Stories', icon: MessageSquare },
      { id: 'victories', label: 'My Wins', icon: Trophy },
    );
  } else if (profile.role === 'counselor') {
    navItems.push(
      { id: 'home', label: 'Home', icon: Home },
      { id: 'counselor', label: 'Counselor Dashboard', icon: Smile },
      { id: 'session', label: 'Sessions', icon: BookOpen },
      { id: 'chat', label: 'Anonymous Chat', icon: MessageSquare },
      { id: 'analytics', label: 'Analytics', icon: Trophy },
    );
  } else if (profile.role === 'admin') {
    navItems.push(
      { id: 'home', label: 'Home', icon: Home },
      { id: 'admin', label: 'Admin Portal', icon: Calendar },
      { id: 'analytics', label: 'Analytics', icon: Trophy },
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md bg-${mainColor}-500`}>
              {profile.full_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-800">Welcome, {profile.full_name}!</h2>
              <p className="text-sm text-gray-600">Role: {profile.role}</p>
            </div>
          </div>
          <button onClick={() => signOut()} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-semibold">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button key={item.id} onClick={() => setCurrentView(item.id)}
                className={`p-4 rounded-2xl transition-all transform hover:scale-105 ${active ? `bg-${mainColor}-500 text-white shadow-lg` : 'bg-white text-gray-700 hover:bg-gray-50 shadow'}`}>
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs font-semibold text-center">{item.label}</p>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 min-h-[600px]">
          {profile.role === 'student' && <>
            {currentView === 'home' && <HomeView onNavigate={(v) => setCurrentView(v as View)} />}
            {currentView === 'mood' && <MoodTracker />}
            {currentView === 'quotes' && <Quotes />}
            {currentView === 'books' && <Books />}
            {currentView === 'doctors' && <DoctorBooking />}
            {currentView === 'exercises' && <Exercises />}
            {currentView === 'testimonies' && <Testimonies />}
            {currentView === 'victories' && <Victories />}
          </>}

          {profile.role === 'counselor' && <>
            {currentView === 'home' && <HomeView onNavigate={(v) => setCurrentView(v as View)} />}
            {currentView === 'counselor' && <CounselorDashboard />}
            {currentView === 'session' && <SessionView />}
            {currentView === 'chat' && <AnonymousChatConsole />}
            {currentView === 'analytics' && <AnalyticsView />}
          </>}

          {profile.role === 'admin' && <>
            {currentView === 'home' && <HomeView onNavigate={(v) => setCurrentView(v as View)} />}
            {currentView === 'admin' && <AdminPortal />}
            {currentView === 'analytics' && <AnalyticsView />}
          </>}
        </div>
      </div>
    </div>
  );
}
