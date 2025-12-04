import { useState } from 'react';
import { UserCircle2, Lock, Smile } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState<'student' | 'counselor' | 'admin'>('student'); // new
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!fullName || !age) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }
        // Sign up with role
        await signUp(email, password, fullName, parseInt(age), role);
      } else {
        await signIn(email, password);
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-4 shadow-lg">
            <Smile className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Mind-Connect</h1>
          <p className="text-gray-700">Your companion for a happier, calmer mind</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                isSignUp ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                !isSignUp ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Sign In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="relative">
                  <UserCircle2 className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-lg"
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div className="relative">
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-lg"
                    placeholder="Age"
                    min="5"
                    max="100"
                    required
                  />
                </div>

                {/* Role selector */}
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-lg"
                  >
                    <option value="student">Student</option>
                    <option value="counselor">Counselor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}

            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-lg"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-lg"
                placeholder="Password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg shadow hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500 text-sm">
            Mind-Connect is for everyone — start your mental wellness journey today!
          </p>
        </div>
      </div>
    </div>
  );
}
