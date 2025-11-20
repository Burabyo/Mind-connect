import { useState, useEffect } from 'react';
import { Smile, Frown, Meh, Heart, Zap, Cloud, Sun, Star } from 'lucide-react';
import { supabase, MoodEntry } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const moods = [
  { id: 'happy', label: 'Happy', icon: Smile, color: 'bg-yellow-400' },
  { id: 'excited', label: 'Excited', icon: Zap, color: 'bg-orange-400' },
  { id: 'calm', label: 'Calm', icon: Cloud, color: 'bg-blue-400' },
  { id: 'grateful', label: 'Grateful', icon: Heart, color: 'bg-pink-400' },
  { id: 'sad', label: 'Sad', icon: Frown, color: 'bg-gray-400' },
  { id: 'anxious', label: 'Worried', icon: Meh, color: 'bg-purple-400' },
  { id: 'tired', label: 'Tired', icon: Sun, color: 'bg-indigo-400' },
  { id: 'proud', label: 'Proud', icon: Star, color: 'bg-green-400' },
];

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState('');
  const [intensity, setIntensity] = useState(3);
  const [note, setNote] = useState('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [streak, setStreak] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    loadMoodHistory();
  }, [user]);

  const loadMoodHistory = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(30);

    if (data) {
      setMoodHistory(data);
      calculateStreak(data);
    }
  };

  const calculateStreak = (entries: MoodEntry[]) => {
    if (!entries.length) {
      setStreak(0);
      return;
    }

    let currentStreak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastEntry = new Date(entries[0].created_at);
    lastEntry.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((today.getTime() - lastEntry.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      setStreak(0);
      return;
    }

    for (let i = 1; i < entries.length; i++) {
      const prevDate = new Date(entries[i - 1].created_at);
      const currDate = new Date(entries[i].created_at);
      prevDate.setHours(0, 0, 0, 0);
      currDate.setHours(0, 0, 0, 0);

      const diff = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }

    setStreak(currentStreak);
  };

  const saveMood = async () => {
    if (!user || !selectedMood) return;

    const { error } = await supabase.from('mood_entries').insert({
      user_id: user.id,
      mood: selectedMood,
      intensity,
      note: note || null,
    });

    if (!error) {
      setSelectedMood('');
      setIntensity(3);
      setNote('');
      loadMoodHistory();
    }
  };

  const getMoodIcon = (moodId: string) => {
    const mood = moods.find(m => m.id === moodId);
    return mood ? mood.icon : Smile;
  };

  const getMoodColor = (moodId: string) => {
    const mood = moods.find(m => m.id === moodId);
    return mood ? mood.color : 'bg-gray-400';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">How Are You Feeling Today?</h2>
        <p className="text-gray-600">Let's check in with your emotions</p>
      </div>

      {streak > 0 && (
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 text-center">
          <div className="text-4xl font-bold text-orange-600 mb-2">{streak} Day{streak > 1 ? 's' : ''}</div>
          <p className="text-lg text-orange-800 font-semibold">Amazing streak! Keep it up!</p>
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Pick Your Mood</h3>
        <div className="grid grid-cols-4 gap-4">
          {moods.map((mood) => {
            const Icon = mood.icon;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`p-6 rounded-2xl transition-all transform hover:scale-105 ${
                  selectedMood === mood.id
                    ? `${mood.color} text-white shadow-lg scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold text-sm">{mood.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {selectedMood && (
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-bold text-gray-800 mb-3">
              How strong is this feeling?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="5"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="flex-1 h-3 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10B981 0%, #10B981 ${(intensity - 1) * 25}%, #E5E7EB ${(intensity - 1) * 25}%, #E5E7EB 100%)`
                }}
              />
              <span className="text-2xl font-bold text-gray-800 w-12 text-center">{intensity}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>A little</span>
              <span>Very much</span>
            </div>
          </div>

          <div>
            <label className="block text-lg font-bold text-gray-800 mb-3">
              Want to add a note? (Optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors resize-none"
              rows={3}
              placeholder="What made you feel this way?"
            />
          </div>

          <button
            onClick={saveMood}
            className="w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Save My Mood
          </button>
        </div>
      )}

      {moodHistory.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Mood Journey</h3>
          <div className="space-y-3">
            {moodHistory.slice(0, 7).map((entry) => {
              const MoodIcon = getMoodIcon(entry.mood);
              return (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className={`w-12 h-12 rounded-full ${getMoodColor(entry.mood)} flex items-center justify-center`}>
                    <MoodIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 capitalize">{entry.mood}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(entry.created_at).toLocaleDateString()} - Intensity: {entry.intensity}/5
                    </p>
                    {entry.note && (
                      <p className="text-sm text-gray-700 mt-1">{entry.note}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
