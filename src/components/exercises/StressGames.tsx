import { useState } from 'react';
import { Circle, Square, Triangle, Star, Heart } from 'lucide-react';

export function StressGames() {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [currentShape, setCurrentShape] = useState<string>('');
  const [userClicks, setUserClicks] = useState(0);

  const shapes = [
    { id: 'circle', icon: Circle, color: 'bg-blue-400' },
    { id: 'square', icon: Square, color: 'bg-green-400' },
    { id: 'triangle', icon: Triangle, color: 'bg-purple-400' },
    { id: 'star', icon: Star, color: 'bg-yellow-400' },
    { id: 'heart', icon: Heart, color: 'bg-pink-400' }
  ];

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setUserClicks(0);
    nextShape();
  };

  const nextShape = () => {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    setCurrentShape(randomShape.id);
  };

  const handleShapeClick = (shapeId: string) => {
    if (!gameActive) return;

    if (shapeId === currentShape) {
      setScore(score + 1);
      setUserClicks(0);
      nextShape();
    } else {
      setUserClicks(userClicks + 1);
      if (userClicks >= 2) {
        setGameActive(false);
      }
    }
  };

  const currentShapeData = shapes.find(s => s.id === currentShape);
  const CurrentIcon = currentShapeData?.icon || Circle;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Shape Matching Game</h2>
        <p className="text-gray-600">Click on the matching shapes to relieve stress!</p>
      </div>

      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8">
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-purple-800 mb-2">Score: {score}</div>
          {gameActive && currentShapeData && (
            <div className="mt-6">
              <p className="text-xl font-semibold text-gray-700 mb-4">Find this shape:</p>
              <div className={`w-24 h-24 ${currentShapeData.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}>
                <CurrentIcon className="w-16 h-16 text-white" />
              </div>
            </div>
          )}
        </div>

        {!gameActive ? (
          <div className="text-center">
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all"
            >
              Start Game
            </button>
            {score > 0 && (
              <p className="mt-4 text-lg text-gray-700">
                Great job! You scored {score} points!
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {shapes.map((shape) => {
              const ShapeIcon = shape.icon;
              return (
                <button
                  key={shape.id}
                  onClick={() => handleShapeClick(shape.id)}
                  className={`${shape.color} p-8 rounded-2xl hover:shadow-xl transition-all transform hover:scale-105`}
                >
                  <ShapeIcon className="w-12 h-12 text-white mx-auto" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-2xl p-6">
          <h4 className="font-bold text-gray-800 mb-2">Color Breathing</h4>
          <p className="text-gray-700">
            Imagine breathing in your favorite color. Watch it fill your body with each breath!
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl p-6">
          <h4 className="font-bold text-gray-800 mb-2">Progressive Relaxation</h4>
          <p className="text-gray-700">
            Tense and relax each muscle group, starting from your toes up to your head.
          </p>
        </div>

        <div className="bg-yellow-50 rounded-2xl p-6">
          <h4 className="font-bold text-gray-800 mb-2">5-4-3-2-1 Technique</h4>
          <p className="text-gray-700">
            Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.
          </p>
        </div>

        <div className="bg-pink-50 rounded-2xl p-6">
          <h4 className="font-bold text-gray-800 mb-2">Happy Place Visualization</h4>
          <p className="text-gray-700">
            Close your eyes and imagine your favorite peaceful place in detail.
          </p>
        </div>
      </div>
    </div>
  );
}
