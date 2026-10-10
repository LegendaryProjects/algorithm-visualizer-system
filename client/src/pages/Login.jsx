import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/Layout/AuthLayout';

export default function Login() {
  const [role, setRole] = useState('learner');
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, sessionNotice, clearSessionNotice } = useAuth();
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
        <h2 className="display text-2xl font-bold text-white tracking-tight">Sign In</h2>
        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>Enter your credentials to access the workspace</p>
      </div>

      {/* Role Switch Tab */}
      <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 mb-6 backdrop-blur-md">
        <button
          type="button"
          onClick={() => {
            setRole('learner');
            setError('');
          }}
          className={`flex-1 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
            role === 'learner'
              ? 'bg-purple-600/80 text-white shadow-sm'
              : 'text-white/50 hover:text-white/80 hover:bg-white/5'
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
          className={`flex-1 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
            role === 'admin'
              ? 'bg-purple-600/80 text-white shadow-sm'
              : 'text-white/50 hover:text-white/80 hover:bg-white/5'
          }`}
        >
          Admin
        </button>
      </div>

      {sessionNotice && (
        <div className="mb-4 text-xs font-medium text-amber-300 bg-amber-950/40 border border-amber-800/50 px-3 py-2.5 rounded flex items-center justify-between">
          <span>{sessionNotice}</span>
          <button
            type="button"
            onClick={clearSessionNotice}
            className="text-amber-400 hover:text-amber-200 ml-2 text-base leading-none cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {error && (
        <div className="mb-4 text-xs font-medium text-red-400 bg-red-950/40 border border-red-900/50 px-3 py-2.5 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Username or Email
          </label>
          <input
            type="text"
            required
            placeholder="Enter username or email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
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
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-purple-400 transition-colors placeholder:text-white/30"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium text-sm py-2.5 rounded-lg transition-all disabled:opacity-50 mt-4 cursor-pointer shadow-lg shadow-purple-900/20"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 text-center text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Don't have an account?{' '}
        <Link to="/register" className="text-white hover:text-purple-300 transition-colors hover:underline underline-offset-4">
          Sign Up
        </Link>
      </div>
    </AuthLayout>
  );
}
