import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/Layout/AuthLayout';

import { useTheme } from '../context/ThemeContext';

export default function Login() {
  const [role, setRole] = useState('learner');
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, sessionNotice, clearSessionNotice } = useAuth();
  const { isLight } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    clearSessionNotice();
    setIsSubmitting(true);
    try {
      await login(credential, password, role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6">
        <h2 className={`display text-2xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Sign In</h2>
        <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Enter your credentials to access the workspace</p>
      </div>

      {/* Role Switch Tab */}
      <div className={`flex p-1 rounded-lg border mb-6 backdrop-blur-md transition-colors ${
        isLight ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'
      }`}>
        <button
          type="button"
          onClick={() => {
            setRole('learner');
            setError('');
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            role === 'learner'
              ? 'bg-purple-600 text-white shadow-sm'
              : isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-white' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
          }`}
        >
          Learner
        </button>
        <button
          type="button"
          onClick={() => {
            setRole('admin');
            setError('');
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            role === 'admin'
              ? 'bg-purple-600 text-white shadow-sm'
              : isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-white' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
          }`}
        >
          Admin
        </button>
      </div>

      {sessionNotice && (
        <div className={`mb-4 text-xs font-medium px-3 py-2.5 rounded flex items-center justify-between border ${
          isLight ? 'text-amber-800 bg-amber-50 border-amber-200' : 'text-amber-300 bg-amber-950/40 border-amber-800/50'
        }`}>
          <span>{sessionNotice}</span>
          <button
            type="button"
            onClick={clearSessionNotice}
            className="text-amber-500 hover:text-amber-700 ml-2 text-base leading-none cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

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
            Username or Email
          </label>
          <input
            type="text"
            required
            placeholder="Enter username or email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
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
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-purple-500 transition-colors border ${
              isLight 
                ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-sm' 
                : 'bg-white/5 border-white/10 text-white placeholder:text-white/30'
            }`}
          />
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
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </span>
        </button>
      </form>

      <div className={`mt-8 text-center text-xs ${isLight ? 'text-slate-500' : 'text-white/50'}`}>
        Don't have an account?{' '}
        <Link to="/register" className={`font-semibold hover:underline underline-offset-4 transition-colors ${
          isLight ? 'text-purple-600 hover:text-purple-700' : 'text-white hover:text-purple-300'
        }`}>
          Sign Up
        </Link>
      </div>
    </AuthLayout>
  );
}
