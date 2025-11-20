import { useState, useEffect } from 'react';
import { RefreshCw, Heart, Sparkles } from 'lucide-react';

interface Quote {
  text: string;
  author: string;
}

const localQuotes: Quote[] = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Every day may not be good, but there is something good in every day.", author: "Alice Morse Earle" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Happiness is not by chance, but by choice.", author: "Jim Rohn" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "You don't have to be perfect to be amazing.", author: "Unknown" },
  { text: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "You are enough just as you are.", author: "Meghan Markle" },
  { text: "Difficult roads often lead to beautiful destinations.", author: "Unknown" },
];

export function Quotes() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<Quote[]>([]);

  useEffect(() => {
    getNewQuote();
    const saved = localStorage.getItem('favoriteQuotes');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const getNewQuote = () => {
    setLoading(true);
    const randomQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    setTimeout(() => {
      setQuote(randomQuote);
      setLoading(false);
    }, 500);
  };

  const addToFavorites = () => {
    if (!quote) return;
    const newFavorites = [...favorites, quote];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (index: number) => {
    const newFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Daily Inspiration</h2>
        <p className="text-gray-600">Let these words brighten your day</p>
      </div>

      <div className="bg-gradient-to-br from-pink-100 to-yellow-100 rounded-3xl p-8 md:p-12 shadow-lg">
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-pink-500 animate-spin mx-auto" />
          </div>
        ) : quote ? (
          <div className="space-y-6">
            <Sparkles className="w-12 h-12 text-yellow-500 mx-auto" />
            <blockquote className="text-2xl md:text-3xl font-bold text-gray-800 text-center leading-relaxed">
              "{quote.text}"
            </blockquote>
            <p className="text-xl text-gray-700 text-center font-semibold">
              - {quote.author}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={addToFavorites}
                className="px-6 py-3 bg-white rounded-xl font-semibold text-pink-600 hover:bg-pink-50 transition-colors shadow-md flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Save Favorite
              </button>
              <button
                onClick={getNewQuote}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                New Quote
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {favorites.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Favorite Quotes</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {favorites.map((fav, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-purple-100 relative"
              >
                <button
                  onClick={() => removeFromFavorites(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                >
                  <Heart className="w-5 h-5" fill="currentColor" />
                </button>
                <p className="text-lg font-semibold text-gray-800 mb-2">"{fav.text}"</p>
                <p className="text-sm text-gray-600 font-medium">- {fav.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
