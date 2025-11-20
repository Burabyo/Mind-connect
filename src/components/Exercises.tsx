import { useState } from 'react';
import { Wind, Gamepad2, Heart, BookHeart, Music } from 'lucide-react';
import { BreathingExercise } from './exercises/BreathingExercise';
import { StressGames } from './exercises/StressGames';
import { Affirmations } from './exercises/Affirmations';
import { GratitudeJournal } from './exercises/GratitudeJournal';
import { MusicTherapy } from './exercises/MusicTherapy';

type ExerciseType = 'breathing' | 'games' | 'affirmations' | 'gratitude' | 'music';

export function Exercises() {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType | null>(null);

  const exercises = [
    {
      id: 'breathing' as ExerciseType,
      title: 'Breathing Exercise',
      description: 'Calm your mind with simple breathing',
      icon: Wind,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'games' as ExerciseType,
      title: 'Stress-Relief Games',
      description: 'Fun activities to relax and unwind',
      icon: Gamepad2,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'affirmations' as ExerciseType,
      title: 'Positive Affirmations',
      description: 'Build confidence with uplifting words',
      icon: Heart,
      color: 'from-pink-400 to-red-500'
    },
    {
      id: 'gratitude' as ExerciseType,
      title: 'Gratitude Journal',
      description: 'Write about things you\'re thankful for',
      icon: BookHeart,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'music' as ExerciseType,
      title: 'Music Therapy',
      description: 'Relax with calming music',
      icon: Music,
      color: 'from-orange-400 to-yellow-500'
    }
  ];

  if (selectedExercise) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedExercise(null)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
        >
          ← Back to Activities
        </button>

        {selectedExercise === 'breathing' && <BreathingExercise />}
        {selectedExercise === 'games' && <StressGames />}
        {selectedExercise === 'affirmations' && <Affirmations />}
        {selectedExercise === 'gratitude' && <GratitudeJournal />}
        {selectedExercise === 'music' && <MusicTherapy />}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Fun Activities</h2>
        <p className="text-gray-600">Choose an activity to help you feel great</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => {
          const Icon = exercise.icon;
          return (
            <button
              key={exercise.id}
              onClick={() => setSelectedExercise(exercise.id)}
              className="text-left p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all transform hover:scale-105"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${exercise.color} flex items-center justify-center mb-4 shadow-md`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {exercise.title}
              </h3>
              <p className="text-gray-600">
                {exercise.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
