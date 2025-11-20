import { useState, useEffect } from 'react';
import { Wind, Play, Pause } from 'lucide-react';

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (phase === 'inhale' && prev >= 4) {
          setPhase('hold');
          return 0;
        }
        if (phase === 'hold' && prev >= 4) {
          setPhase('exhale');
          return 0;
        }
        if (phase === 'exhale' && prev >= 4) {
          setPhase('inhale');
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return 'from-blue-400 to-cyan-500';
      case 'hold':
        return 'from-green-400 to-emerald-500';
      case 'exhale':
        return 'from-purple-400 to-pink-500';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Breathing Exercise</h2>
        <p className="text-gray-600">Follow along to calm your mind</p>
      </div>

      <div className={`bg-gradient-to-br ${getPhaseColor()} rounded-3xl p-12 text-center transition-all duration-1000`}>
        <Wind className="w-20 h-20 text-white mx-auto mb-6" />
        <h3 className="text-5xl font-bold text-white mb-4">{getPhaseText()}</h3>
        <div className="text-8xl font-bold text-white mb-8">{count}</div>

        <button
          onClick={() => {
            setIsActive(!isActive);
            if (!isActive) {
              setPhase('inhale');
              setCount(0);
            }
          }}
          className="px-8 py-4 bg-white text-gray-800 rounded-2xl font-bold text-xl hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
        >
          {isActive ? (
            <>
              <Pause className="w-6 h-6" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-6 h-6" />
              Start
            </>
          )}
        </button>
      </div>

      <div className="bg-blue-50 rounded-2xl p-6">
        <h4 className="font-bold text-gray-800 mb-3 text-lg">How it works:</h4>
        <ol className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span className="font-bold text-blue-600">1.</span>
            <span>Breathe in slowly through your nose for 4 seconds</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-green-600">2.</span>
            <span>Hold your breath for 4 seconds</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-purple-600">3.</span>
            <span>Breathe out slowly through your mouth for 4 seconds</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-orange-600">4.</span>
            <span>Repeat as many times as you need!</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
