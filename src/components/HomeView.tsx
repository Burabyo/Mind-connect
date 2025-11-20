import { Smile, Heart, BookOpen, Calendar, Gamepad2, MessageSquare, Trophy, Sparkles } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const features = [
    {
      id: 'mood',
      title: 'Track Your Feelings',
      description: 'Log how you feel every day and see your mood patterns',
      icon: Smile,
      color: 'from-yellow-400 to-orange-500',
    },
    {
      id: 'quotes',
      title: 'Daily Inspiration',
      description: 'Get motivated with uplifting quotes and positive messages',
      icon: Heart,
      color: 'from-pink-400 to-red-500',
    },
    {
      id: 'books',
      title: 'Read & Learn',
      description: 'Discover amazing books about psychology and wellness',
      icon: BookOpen,
      color: 'from-blue-400 to-cyan-500',
    },
    {
      id: 'doctors',
      title: 'Talk to Experts',
      description: 'Book sessions with qualified doctors who care',
      icon: Calendar,
      color: 'from-green-400 to-emerald-500',
    },
    {
      id: 'exercises',
      title: 'Fun Activities',
      description: 'Try breathing exercises, games, and relaxation techniques',
      icon: Gamepad2,
      color: 'from-purple-400 to-pink-500',
    },
    {
      id: 'testimonies',
      title: 'Share Stories',
      description: 'Read and share inspiring stories from other students',
      icon: MessageSquare,
      color: 'from-indigo-400 to-blue-500',
    },
    {
      id: 'victories',
      title: 'Celebrate Wins',
      description: 'Track your achievements and celebrate your progress',
      icon: Trophy,
      color: 'from-amber-400 to-yellow-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-blue-800">Welcome to Mind-Connect!</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Your Happy Place
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We're here to help you feel better, learn more, and grow stronger every day!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <button
              key={feature.id}
              onClick={() => onNavigate(feature.id)}
              className="text-left p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all transform hover:scale-105"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-md`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Remember: You're Amazing!
        </h3>
        <p className="text-lg text-gray-700">
          Every day is a new chance to feel good and do great things.
        </p>
      </div>
    </div>
  );
}
