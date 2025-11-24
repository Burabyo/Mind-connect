import { useState } from 'react';
import { Circle, Square, Triangle, Star, Heart } from 'lucide-react';

export function StressGames() {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [currentShape, setCurrentShape] = useState<string>('');
  const [userClicks, setUserClicks] = useState(0);

  const shapes = [
    { id: 'circle', icon: Circle, color: 'bg-pink-300' },
    { id: 'square', icon: Square, color: 'bg-purple-300' },
    { id: 'triangle', icon: Triangle, color: 'bg-yellow-300' },
    { id: 'star', icon: Star, color: 'bg-green-300' },
    { id: 'heart', icon: Heart, color: 'bg-orange-300' }
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
        <h2 className="text-3xl font-extrabold text-purple-700 mb-2">Shape Matching Game</h2>
        <p className="text-purple-500">Click on the matching shapes to relieve stress!</p>
      </div>

      <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-purple-800 mb-2 animate-bounce">Score: {score}</div>
          {gameActive && currentShapeData && (
            <div className="mt-6">
              <p className="text-xl font-semibold text-purple-700 mb-4">Find this shape:</p>
              <div className={`w-28 h-28 ${currentShapeData.color} rounded-full flex items-center justify-center mx-auto shadow-2xl transform hover:scale-110 transition-transform`}>
                <CurrentIcon className="w-16 h-16 text-white" />
              </div>
            </div>
          )}
        </div>

        {!gameActive ? (
          <div className="text-center">
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Start Game
            </button>
            {score > 0 && (
              <p className="mt-4 text-lg text-purple-700">
                Great job! You scored {score} points!
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {shapes.map((shape) => {
              const ShapeIcon = shape.icon;
              return (
                <button
                  key={shape.id}
                  onClick={() => handleShapeClick(shape.id)}
                  className={`${shape.color} p-8 rounded-full hover:shadow-2xl transform hover:scale-110 transition-all`}
                >
                  <ShapeIcon className="w-14 h-14 text-white mx-auto" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-pink-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
          <h4 className="font-bold text-purple-800 mb-2">Color Breathing</h4>
          <p className="text-purple-700">
            Imagine breathing in your favorite color. Watch it fill your body with each breath!
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
          <h4 className="font-bold text-purple-800 mb-2">Progressive Relaxation</h4>
          <p className="text-purple-700">
            Tense and relax each muscle group, starting from your toes up to your head.
          </p>
        </div>

        <div className="bg-yellow-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
          <h4 className="font-bold text-purple-800 mb-2">5-4-3-2-1 Technique</h4>
          <p className="text-purple-700">
            Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.
          </p>
        </div>

        <div className="bg-purple-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
          <h4 className="font-bold text-purple-800 mb-2">Happy Place Visualization</h4>
          <p className="text-purple-700">
            Close your eyes and imagine your favorite peaceful place in detail.
          </p>
        </div>
      </div>
    </div>
  );
}
