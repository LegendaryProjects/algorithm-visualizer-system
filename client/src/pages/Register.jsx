import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/Layout/AuthLayout';

import { useTheme } from '../context/ThemeContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const { isLight } = useTheme();
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
    if (score === 0) return isLight ? 'bg-slate-200' : 'bg-white/10';
    if (score <= 2) return 'bg-red-500';
    if (score === 3) return 'bg-amber-500';
    if (score === 4) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  const getStrengthLabel = (score) => {
    if (!password) return '';
    if (score <= 2) return 'Weak';
    if (score === 3) return 'Fair';
    if (score === 4) return 'Good';
    return 'Strong';
  };

  const getStrengthTextColor = (score) => {
    if (score <= 2) return '#ef4444'; // red-500
    if (score === 3) return '#f59e0b'; // amber-500
    if (score === 4) return '#3b82f6'; // blue-500
    return '#10b981'; // emerald-500
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
        <h2 className={`display text-2xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Create Account</h2>
        <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Register a new profile to track your progress</p>
      </div>

      {error && (
        <div className={`mb-4 text-xs font-medium px-3 py-2.5 rounded border ${
          isLight ? 'text-red-700 bg-red-50 border-red-200' : 'text-red-400 bg-red-950/40 border-red-900/50'
        }`}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${isLight ? 'text-slate-700' : 'text-white/70'}`}>
            Username
          </label>
          <input
            type="text"
            required
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-purple-500 transition-colors border ${
              isLight 
                ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-sm' 
                : 'bg-white/5 border-white/10 text-white placeholder:text-white/30'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-medium mb-1.5 ${isLight ? 'text-slate-700' : 'text-white/70'}`}>
            Email
          </label>
          <input
            type="email"
            required
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-purple-500 transition-colors border ${
              isLight 
                ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-sm' 
                : 'bg-white/5 border-white/10 text-white placeholder:text-white/30'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-medium mb-1.5 ${isLight ? 'text-slate-700' : 'text-white/70'}`}>
            Password
          </label>
          <input
            type="password"
            required
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-purple-500 transition-colors border ${
              isLight 
                ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-sm' 
                : 'bg-white/5 border-white/10 text-white placeholder:text-white/30'
            }`}
          />
          
          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <div className="mt-2.5">
              <div className="flex gap-1.5 mb-1.5">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div 
                    key={level} 
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                      strength >= level ? getStrengthColor(strength) : isLight ? 'bg-slate-200' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center text-[11px] font-medium">
                <span className={isLight ? 'text-slate-500' : 'text-white/40'}>
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
          className="w-full font-semibold text-sm py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 mt-4 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
            color: '#ffffff',
            boxShadow: isLight ? '0 4px 14px 0 rgba(124, 58, 237, 0.35)' : '0 4px 14px 0 rgba(124, 58, 237, 0.45)'
          }}
        >
          <span style={{ color: '#ffffff' }}>
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </span>
        </button>
      </form>

      <div className={`mt-8 text-center text-xs ${isLight ? 'text-slate-500' : 'text-white/50'}`}>
        Already have an account?{' '}
        <Link to="/login" className={`font-semibold hover:underline underline-offset-4 transition-colors ${
          isLight ? 'text-purple-600 hover:text-purple-700' : 'text-white hover:text-purple-300'
        }`}>
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
