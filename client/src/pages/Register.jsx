import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/Layout/AuthLayout';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const calculateStrength = (pwd) => {
    let score = 0;
    if (!pwd) return 0;
    if (pwd.length > 7) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/\d/.test(pwd)) score += 1;
    if (/[^a-zA-Z\d]/.test(pwd)) score += 1;
    return score;
  };

  const strength = calculateStrength(password);

  const getStrengthColor = (score) => {
    if (score === 0) return 'bg-white/10';
    if (score <= 2) return 'bg-red-400';
    if (score === 3) return 'bg-amber-400';
    if (score === 4) return 'bg-blue-400';
    return 'bg-emerald-400';
  };

  const getStrengthLabel = (score) => {
    if (!password) return '';
    if (score <= 2) return 'Weak';
    if (score === 3) return 'Fair';
    if (score === 4) return 'Good';
    return 'Strong';
  };

  const getStrengthTextColor = (score) => {
    if (score <= 2) return '#f87171'; // red-400
    if (score === 3) return '#fbbf24'; // amber-400
    if (score === 4) return '#60a5fa'; // blue-400
    return '#34d399'; // emerald-400
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      await register(username, email, password, 'learner');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6">
        <h2 className="display text-2xl font-bold text-white tracking-tight">Create Account</h2>
        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>Register a new profile to track your progress</p>
      </div>

      {error && (
        <div className="mb-4 text-xs font-medium text-red-400 bg-red-950/40 border border-red-900/50 px-3 py-2.5 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Username
          </label>
          <input
            type="text"
            required
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-purple-400 transition-colors placeholder:text-white/30"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Email
          </label>
          <input
            type="email"
            required
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-purple-400 transition-colors placeholder:text-white/30"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Password
          </label>
          <input
            type="password"
            required
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-purple-400 transition-colors placeholder:text-white/30"
          />
          
          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <div className="mt-2.5">
              <div className="flex gap-1.5 mb-1.5">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div 
                    key={level} 
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${strength >= level ? getStrengthColor(strength) : 'bg-white/10'}`}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center text-[11px] font-medium">
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {strength < 5 ? 'Use 8+ chars, mix cases, numbers & symbols' : 'Perfect!'}
                </span>
                <span style={{ color: getStrengthTextColor(strength) }}>
                  {getStrengthLabel(strength)}
                </span>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium text-sm py-2.5 rounded-lg transition-all disabled:opacity-50 mt-4 cursor-pointer shadow-lg shadow-purple-900/20"
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-8 text-center text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Already have an account?{' '}
        <Link to="/login" className="text-white hover:text-purple-300 transition-colors hover:underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
