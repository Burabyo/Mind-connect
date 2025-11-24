import { useState, useEffect } from 'react';
import { Airplay, Feather } from 'lucide-react';

export function BreathingExercise() {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [count, setCount] = useState(4);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const phaseDurations = {
      Inhale: 4,
      Hold: 4,
      Exhale: 4,
    };

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          // Move to next phase
          if (phase === 'Inhale') setPhase('Hold');
          else if (phase === 'Hold') setPhase('Exhale');
          else setPhase('Inhale');
          return phaseDurations[phase === 'Inhale' ? 'Hold' : phase === 'Hold' ? 'Exhale' : 'Inhale'];
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, phase]);

  const startExercise = () => {
    setRunning(true);
    setPhase('Inhale');
    setCount(4);
  };

  const stopExercise = () => {
    setRunning(false);
    setPhase('Inhale');
    setCount(4);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-purple-600 mb-2">🌬️ Breathing Exercise 🌬️</h2>
        <p className="text-purple-400 text-lg">Relax your mind with fun breathing techniques!</p>
      </div>

      <div className="bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 rounded-3xl p-10 text-center shadow-xl border-4 border-purple-200 relative">
        <Feather className="w-16 h-16 text-blue-400 mx-auto mb-6 animate-pulse" />
        <div className="mb-6">
          <h3 className="text-4xl font-bold text-purple-800 mb-2">{phase}</h3>
          <p className="text-2xl text-purple-600 font-semibold">{count}</p>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          {!running ? (
            <button
              onClick={startExercise}
              className="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-2xl font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              <Airplay className="w-5 h-5" />
              Start
            </button>
          ) : (
            <button
              onClick={stopExercise}
              className="px-8 py-3 bg-gradient-to-r from-pink-400 to-red-400 text-white rounded-2xl font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              Stop
            </button>
          )}
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 opacity-30 animate-pulse"></div>
      </div>

      <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
        <h4 className="font-bold text-green-800 mb-3 text-lg">How to do it:</h4>
        <ol className="space-y-2 text-green-700">
          <li className="flex gap-2">
            <span className="font-bold text-green-600">1.</span>
            <span>Inhale slowly through your nose for 4 seconds</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-purple-600">2.</span>
            <span>Hold your breath for 4 seconds</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-pink-600">3.</span>
            <span>Exhale slowly through your mouth for 4 seconds</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-blue-600">4.</span>
            <span>Repeat for a few rounds to feel relaxed</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
