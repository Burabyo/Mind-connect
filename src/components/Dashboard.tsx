import { useState } from 'react';
import { Home, Smile, BookOpen, Calendar, Heart, Gamepad2, MessageSquare, Trophy, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { MoodTracker } from './MoodTracker';
import { Quotes } from './Quotes';
import { Books } from './Books';
import { DoctorBooking } from './DoctorBooking';
import { Exercises } from './Exercises';
import { Testimonies } from './Testimonies';
import { Victories } from './Victories';
import { HomeView } from './HomeView';

type View = 'home' | 'mood' | 'quotes' | 'books' | 'doctors' | 'exercises' | 'testimonies' | 'victories';

export function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('home');
  const { profile, signOut } = useAuth();

  const navItems = [
    { id: 'home' as View, label: 'Home', icon: Home },
    { id: 'mood' as View, label: 'My Feelings', icon: Smile },
    { id: 'quotes' as View, label: 'Inspiration', icon: Heart },
    { id: 'books' as View, label: 'Books', icon: BookOpen },
    { id: 'doctors' as View, label: 'Talk to Doctor', icon: Calendar },
    { id: 'exercises' as View, label: 'Activities', icon: Gamepad2 },
    { id: 'testimonies' as View, label: 'Stories', icon: MessageSquare },
    { id: 'victories' as View, label: 'My Wins', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md"
                style={{ backgroundColor: profile?.avatar_color || '#10B981' }}
              >
                {profile?.full_name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-800">
                  Welcome, {profile?.full_name}!
                </h2>
                <p className="text-sm text-gray-600">Let's have a great day</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`p-4 rounded-2xl transition-all transform hover:scale-105 ${
                  currentView === item.id
                    ? 'bg-gradient-to-br from-green-400 to-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs font-semibold text-center">{item.label}</p>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 min-h-[600px]">
          {currentView === 'home' && <HomeView onNavigate={(view) => setCurrentView(view as View)} />}
          {currentView === 'mood' && <MoodTracker />}
          {currentView === 'quotes' && <Quotes />}
          {currentView === 'books' && <Books />}
          {currentView === 'doctors' && <DoctorBooking />}
          {currentView === 'exercises' && <Exercises />}
          {currentView === 'testimonies' && <Testimonies />}
          {currentView === 'victories' && <Victories />}
        </div>
      </div>
    </div>
  );
}
