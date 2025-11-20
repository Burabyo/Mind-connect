import { useState, useEffect } from 'react';
import { MessageSquare, Heart, Plus, Send } from 'lucide-react';
import { supabase, Testimony } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function Testimonies() {
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadTestimonies();
  }, []);

  const loadTestimonies = async () => {
    const { data } = await supabase
      .from('testimonies')
      .select('*, profiles(full_name, avatar_color)')
      .order('created_at', { ascending: false });

    if (data) {
      setTestimonies(data);
    }
  };

  const postTestimony = async () => {
    if (!user || !content.trim()) return;

    const { error } = await supabase.from('testimonies').insert({
      user_id: user.id,
      content,
      is_anonymous: isAnonymous,
    });

    if (!error) {
      setContent('');
      setIsAnonymous(false);
      setShowForm(false);
      loadTestimonies();
    }
  };

  const toggleLike = async (testimonyId: string) => {
    if (!user) return;

    const { data: existingLike } = await supabase
      .from('testimony_likes')
      .select('id')
      .eq('testimony_id', testimonyId)
      .eq('user_id', user.id)
      .maybeSingle();

    const testimony = testimonies.find(t => t.id === testimonyId);
    if (!testimony) return;

    if (existingLike) {
      await supabase.from('testimony_likes').delete().eq('id', existingLike.id);
      await supabase
        .from('testimonies')
        .update({ likes_count: Math.max(0, testimony.likes_count - 1) })
        .eq('id', testimonyId);
    } else {
      await supabase.from('testimony_likes').insert({
        testimony_id: testimonyId,
        user_id: user.id,
      });
      await supabase
        .from('testimonies')
        .update({ likes_count: testimony.likes_count + 1 })
        .eq('id', testimonyId);
    }

    loadTestimonies();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Student Stories</h2>
        <p className="text-gray-600">Share and read inspiring experiences</p>
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-6 h-6" />
          Share Your Story
        </button>
      ) : (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Share Your Story</h3>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-4 rounded-xl border-2 border-blue-200 focus:border-blue-400 focus:outline-none transition-colors resize-none text-lg"
            rows={6}
            placeholder="Tell us about something positive that happened, how you overcame a challenge, or words of encouragement for others..."
          />

          <div className="flex items-center gap-3 mt-4 mb-6">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-400"
            />
            <label htmlFor="anonymous" className="text-gray-700 font-medium cursor-pointer">
              Post anonymously
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={postTestimony}
              disabled={!content.trim()}
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Post Story
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setContent('');
                setIsAnonymous(false);
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {testimonies.map((testimony) => {
          const authorName = testimony.is_anonymous
            ? 'Anonymous Student'
            : testimony.profiles?.full_name || 'Student';
          const avatarColor = testimony.profiles?.avatar_color || '#6B7280';

          return (
            <div
              key={testimony.id}
              className="p-6 bg-white rounded-2xl border-2 border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md"
                  style={{ backgroundColor: testimony.is_anonymous ? '#6B7280' : avatarColor }}
                >
                  {testimony.is_anonymous ? '?' : authorName.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-bold text-gray-800">{authorName}</p>
                    <span className="text-sm text-gray-500">
                      {new Date(testimony.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                    {testimony.content}
                  </p>

                  <button
                    onClick={() => toggleLike(testimony.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-colors font-semibold"
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={testimony.likes_count > 0 ? 'currentColor' : 'none'}
                    />
                    <span>{testimony.likes_count} {testimony.likes_count === 1 ? 'Like' : 'Likes'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {testimonies.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">
              No stories yet. Be the first to share!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
