import { useState, useEffect } from 'react';
import { Trophy, Plus, Trash2, BookOpen, Users, Smile, Heart } from 'lucide-react';
import { supabase, PersonalVictory } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const categories = [
  { id: 'academic', label: 'School & Learning', icon: BookOpen, color: 'from-blue-400 to-cyan-500' },
  { id: 'social', label: 'Friends & Family', icon: Users, color: 'from-green-400 to-emerald-500' },
  { id: 'personal', label: 'Personal Growth', icon: Smile, color: 'from-purple-400 to-pink-500' },
  { id: 'health', label: 'Health & Wellness', icon: Heart, color: 'from-red-400 to-orange-500' },
];

export function Victories() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [victories, setVictories] = useState<PersonalVictory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadVictories();
  }, [user]);

  const loadVictories = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('personal_victories')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setVictories(data);
    }
  };

  const addVictory = async () => {
    if (!user || !title.trim() || !selectedCategory) return;

    const { error } = await supabase.from('personal_victories').insert({
      user_id: user.id,
      title,
      description: description || null,
      category: selectedCategory,
    });

    if (!error) {
      setTitle('');
      setDescription('');
      setSelectedCategory('');
      setShowForm(false);
      loadVictories();
    }
  };

  const deleteVictory = async (id: string) => {
    await supabase.from('personal_victories').delete().eq('id', id);
    loadVictories();
  };

  const getCategoryData = (categoryId: string) => {
    return categories.find(c => c.id === categoryId) || categories[0];
  };

  const victoriesByCategory = categories.map(category => ({
    ...category,
    count: victories.filter(v => v.category === category.id).length
  }));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Victories</h2>
        <p className="text-gray-600">Celebrate your achievements, big and small!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {victoriesByCategory.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className={`p-6 rounded-2xl bg-gradient-to-br ${category.color} text-white text-center shadow-lg`}
            >
              <Icon className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">{category.count}</div>
              <p className="text-sm font-semibold">{category.label}</p>
            </div>
          );
        })}
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-6 h-6" />
          Add New Victory
        </button>
      ) : (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 border-2 border-yellow-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Add Your Victory</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-3">
                Choose Category
              </label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-4 rounded-xl transition-all ${
                        selectedCategory === category.id
                          ? `bg-gradient-to-br ${category.color} text-white shadow-lg scale-105`
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-sm font-semibold">{category.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-800 mb-3">
                Victory Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-yellow-200 focus:border-yellow-400 focus:outline-none transition-colors text-lg"
                placeholder="What did you accomplish?"
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-800 mb-3">
                Tell Us More (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-yellow-200 focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                rows={4}
                placeholder="Share the details of your victory..."
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={addVictory}
                disabled={!title.trim() || !selectedCategory}
                className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                Save Victory
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setTitle('');
                  setDescription('');
                  setSelectedCategory('');
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {victories.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">
            Your Victory Collection ({victories.length})
          </h3>

          {victories.map((victory) => {
            const categoryData = getCategoryData(victory.category);
            const Icon = categoryData.icon;

            return (
              <div
                key={victory.id}
                className="p-6 bg-white rounded-2xl border-2 border-gray-100 hover:shadow-lg transition-all relative"
              >
                <button
                  onClick={() => deleteVictory(victory.id)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="flex items-start gap-4 pr-12">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryData.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <span className={`inline-block px-3 py-1 bg-gradient-to-r ${categoryData.color} text-white rounded-full text-xs font-semibold mb-2`}>
                      {categoryData.label}
                    </span>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {victory.title}
                    </h4>
                    {victory.description && (
                      <p className="text-gray-700 mb-3">{victory.description}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      {new Date(victory.created_at).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {victories.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-2">
            No victories yet!
          </p>
          <p className="text-gray-500">
            Start celebrating your achievements today!
          </p>
        </div>
      )}
    </div>
  );
}
