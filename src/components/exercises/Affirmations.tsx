import { useState } from 'react';
import { Heart, RefreshCw, Sparkles } from 'lucide-react';

const affirmations = [
  "I am brave and strong!",
  "I can do amazing things!",
  "I am loved and valued!",
  "Every day I'm getting better!",
  "I believe in myself!",
  "I am kind and caring!",
  "My feelings matter!",
  "I am proud of who I am!",
  "I can handle challenges!",
  "I am a good friend!",
  "I deserve to be happy!",
  "I am creative and smart!",
  "I make good choices!",
  "I am unique and special!",
  "I can learn new things!",
  "I am enough just as I am!",
  "I have wonderful ideas!",
  "I am grateful for today!",
  "I choose to be positive!",
  "I am growing every day!"
];

export function Affirmations() {
  const [currentAffirmation, setCurrentAffirmation] = useState(
    affirmations[Math.floor(Math.random() * affirmations.length)]
  );
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteAffirmations');
    return saved ? JSON.parse(saved) : [];
  });

  const getNewAffirmation = () => {
    let newAffirmation;
    do {
      newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    } while (newAffirmation === currentAffirmation && affirmations.length > 1);
    setCurrentAffirmation(newAffirmation);
  };

  const toggleFavorite = (affirmation: string) => {
    const newFavorites = favorites.includes(affirmation)
      ? favorites.filter(a => a !== affirmation)
      : [...favorites, affirmation];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteAffirmations', JSON.stringify(newFavorites));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Positive Affirmations</h2>
        <p className="text-gray-600">Boost your confidence with powerful words</p>
      </div>

      <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-3xl p-12 text-center shadow-xl">
        <Sparkles className="w-16 h-16 text-pink-500 mx-auto mb-6" />
        <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">
          {currentAffirmation}
        </h3>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => toggleFavorite(currentAffirmation)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all shadow-md flex items-center gap-2 ${
              favorites.includes(currentAffirmation)
                ? 'bg-pink-500 text-white'
                : 'bg-white text-pink-500'
            }`}
          >
            <Heart
              className="w-5 h-5"
              fill={favorites.includes(currentAffirmation) ? 'currentColor' : 'none'}
            />
            {favorites.includes(currentAffirmation) ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={getNewAffirmation}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            New Affirmation
          </button>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-6">
        <h4 className="font-bold text-gray-800 mb-3 text-lg">How to Use Affirmations:</h4>
        <ol className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span className="font-bold text-blue-600">1.</span>
            <span>Read the affirmation out loud or in your mind</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-purple-600">2.</span>
            <span>Take a deep breath and really believe it</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-pink-600">3.</span>
            <span>Repeat it 3 times with confidence</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-green-600">4.</span>
            <span>Use them every morning to start your day right!</span>
          </li>
        </ol>
      </div>

      {favorites.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Favorite Affirmations</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {favorites.map((affirmation, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border-2 border-pink-100 relative"
              >
                <button
                  onClick={() => toggleFavorite(affirmation)}
                  className="absolute top-4 right-4 text-pink-500 hover:text-pink-600"
                >
                  <Heart className="w-5 h-5" fill="currentColor" />
                </button>
                <p className="text-lg font-bold text-gray-800 pr-8">{affirmation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
