import { useState, useEffect } from 'react';
import { Heart, Plus, Trash2 } from 'lucide-react';
import { supabase, GratitudeEntry } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export function GratitudeJournal() {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    loadEntries();
  }, [user]);

  const loadEntries = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('gratitude_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setEntries(data);
    }
  };

  const saveEntry = async () => {
    if (!user || !entry.trim()) return;

    const { error } = await supabase.from('gratitude_entries').insert({
      user_id: user.id,
      content: entry,
    });

    if (!error) {
      setEntry('');
      loadEntries();
    }
  };

  const deleteEntry = async (id: string) => {
    await supabase.from('gratitude_entries').delete().eq('id', id);
    loadEntries();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Gratitude Journal</h2>
        <p className="text-gray-600">Write about things that make you happy</p>
      </div>

      <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-8">
        <div className="text-center mb-6">
          <Heart className="w-12 h-12 text-orange-500 mx-auto mb-3" fill="#f97316" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            What are you grateful for today?
          </h3>
          <p className="text-gray-700">
            Writing about good things helps you feel happier!
          </p>
        </div>

        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="w-full px-4 py-4 rounded-xl border-2 border-orange-200 focus:border-orange-400 focus:outline-none transition-colors resize-none text-lg"
          rows={5}
          placeholder="I'm grateful for..."
        />

        <button
          onClick={saveEntry}
          disabled={!entry.trim()}
          className="w-full mt-4 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Plus className="w-6 h-6" />
          Add to Journal
        </button>
      </div>

      <div className="bg-green-50 rounded-2xl p-6">
        <h4 className="font-bold text-gray-800 mb-3 text-lg">Ideas for your journal:</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span className="text-green-600">✓</span>
            <span>A person who made you smile today</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">✓</span>
            <span>Something fun you did or learned</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">✓</span>
            <span>A place that makes you feel good</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">✓</span>
            <span>Something about yourself you're proud of</span>
          </li>
        </ul>
      </div>

      {entries.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Your Gratitude Moments ({entries.length})
          </h3>
          <div className="space-y-4">
            {entries.map((gratitudeEntry) => (
              <div
                key={gratitudeEntry.id}
                className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-100 relative"
              >
                <button
                  onClick={() => deleteEntry(gratitudeEntry.id)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <p className="text-gray-800 text-lg mb-2 pr-8">{gratitudeEntry.content}</p>
                <p className="text-sm text-gray-600">
                  {new Date(gratitudeEntry.created_at).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600">
            Start your gratitude journey by adding your first entry!
          </p>
        </div>
      )}
    </div>
  );
}
