import { Smile, Heart, BookOpen, Calendar, Gamepad2, MessageSquare, Trophy } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const mainColor = 'orange'; // unified friendly color

  const features = [
    {
      id: 'mood',
      title: 'Track Your Feelings',
      description: 'Log how you feel every day and see your mood patterns',
      icon: Smile,
    },
    {
      id: 'quotes',
      title: 'Daily Inspiration',
      description: 'Get motivated with uplifting quotes and positive messages',
      icon: Heart,
    },
    {
      id: 'books',
      title: 'Read & Learn',
      description: 'Discover amazing books about psychology and wellness',
      icon: BookOpen,
    },
    {
      id: 'doctors',
      title: 'Talk to Experts',
      description: 'Book sessions with qualified doctors who care',
      icon: Calendar,
    },
    {
      id: 'exercises',
      title: 'Fun Activities',
      description: 'Try breathing exercises, games, and relaxation techniques',
      icon: Gamepad2,
    },
    {
      id: 'testimonies',
      title: 'Share Stories',
      description: 'Read and share inspiring stories from other students',
      icon: MessageSquare,
    },
    {
      id: 'victories',
      title: 'Celebrate Wins',
      description: 'Track your achievements and celebrate your progress',
      icon: Trophy,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className={`inline-flex items-center gap-2 px-6 py-3 bg-${mainColor}-100 rounded-full mb-4`}>
          
          <span className={`font-bold text-${mainColor}-600`}>Welcome to Mind-Connect!</span>
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
              className={`text-left p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all transform hover:scale-105`}
            >
              <div className={`w-14 h-14 rounded-xl bg-${mainColor}-500 flex items-center justify-center mb-4 shadow-md`}>
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

      <div className={`bg-${mainColor}-100 rounded-2xl p-8 text-center`}>
        <h3 className={`text-2xl font-bold text-${mainColor}-600 mb-2`}>
          Remember: You're Amazing!
        </h3>
        <p className="text-lg text-gray-700">
          Every day is a new chance to feel good and do great things.
        </p>
      </div>
    </div>
  );
}
