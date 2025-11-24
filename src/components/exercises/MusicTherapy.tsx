import { Music, Play, Heart } from 'lucide-react';

interface Playlist {
  title: string;
  description: string;
  mood: string;
  color: string;
  tracks: string[];
}

const playlists: Playlist[] = [
  {
    title: "Calm & Peaceful",
    description: "Gentle music to help you relax",
    mood: "Relaxation",
    color: "from-blue-400 to-cyan-500",
    tracks: ["Ocean Waves", "Morning Sunshine", "Quiet Forest", "Peaceful Rain", "Gentle Breeze"]
  },
  {
    title: "Happy Vibes",
    description: "Upbeat tunes to lift your spirits",
    mood: "Happiness",
    color: "from-yellow-400 to-orange-500",
    tracks: ["Joyful Day", "Smile Time", "Rainbow Dance", "Sunny Adventure", "Happy Hearts"]
  },
  {
    title: "Focus & Study",
    description: "Background music for concentration",
    mood: "Focus",
    color: "from-purple-400 to-pink-500",
    tracks: ["Study Flow", "Brain Power", "Concentration Zone", "Learning Time", "Smart Minds"]
  },
  {
    title: "Bedtime Stories",
    description: "Soothing sounds for better sleep",
    mood: "Sleep",
    color: "from-indigo-400 to-blue-500",
    tracks: ["Starry Night", "Dream Journey", "Moonlight Lullaby", "Sleeping Clouds", "Peaceful Dreams"]
  },
  {
    title: "Energy Boost",
    description: "Music to get you moving and motivated",
    mood: "Energy",
    color: "from-green-400 to-emerald-500",
    tracks: ["Power Up", "Action Time", "Go Go Go", "Super Energy", "Champion Spirit"]
  },
  {
    title: "Nature Sounds",
    description: "Beautiful sounds from nature",
    mood: "Nature",
    color: "from-teal-400 to-green-500",
    tracks: ["Birds Singing", "Waterfall Melody", "Forest Whispers", "Mountain Breeze", "Garden Peace"]
  }
];

export function MusicTherapy() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-2 animate-pulse">🎵 Music Therapy 🎵</h2>
        <p className="text-purple-500 text-lg">Let music help you feel better</p>
      </div>

      <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 rounded-3xl p-8 text-center shadow-lg border-4 border-purple-200">
        <Music className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-2xl font-bold text-purple-800 mb-2">Choose Your Mood</h3>
        <p className="text-purple-600">Pick a playlist that matches how you want to feel</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-3xl border-2 border-gray-100 hover:shadow-2xl transition-all relative overflow-hidden"
          >
            <div className={`w-24 h-24 rounded-xl bg-gradient-to-br ${playlist.color} flex items-center justify-center mb-4 shadow-md transform hover:scale-105 transition-transform`}>
              <Music className="w-12 h-12 text-white" />
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{playlist.title}</h3>
              <p className="text-gray-600 mb-2">{playlist.description}</p>
              <span className={`inline-block px-3 py-1 bg-gradient-to-r ${playlist.color} text-white rounded-full text-sm font-semibold`}>
                {playlist.mood}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {playlist.tracks.map((track, trackIndex) => (
                <div
                  key={trackIndex}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${playlist.color} flex items-center justify-center shadow-md`}>
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium">{track}</span>
                </div>
              ))}
            </div>

            <button
              className={`w-full py-3 bg-gradient-to-r ${playlist.color} text-white rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 transform hover:scale-105`}
            >
              <Play className="w-5 h-5" />
              Play Playlist
            </button>

            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-white via-transparent to-white opacity-20 animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
        <h4 className="font-bold text-blue-800 mb-3 text-lg flex items-center gap-2">
          <Heart className="w-6 h-6 text-blue-600 animate-bounce" />
          Benefits of Music Therapy
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex gap-2">
            <span className="text-blue-600 text-xl">♪</span>
            <span className="text-gray-700">Reduces stress and anxiety</span>
          </div>
          <div className="flex gap-2">
            <span className="text-green-600 text-xl">♪</span>
            <span className="text-gray-700">Improves mood and happiness</span>
          </div>
          <div className="flex gap-2">
            <span className="text-purple-600 text-xl">♪</span>
            <span className="text-gray-700">Helps with focus and concentration</span>
          </div>
          <div className="flex gap-2">
            <span className="text-pink-600 text-xl">♪</span>
            <span className="text-gray-700">Promotes better sleep</span>
          </div>
        </div>
      </div>
    </div>
  );
}
