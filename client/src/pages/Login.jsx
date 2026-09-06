import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/Layout/AuthLayout';

export default function Login() {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(credential, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">Sign In</h2>
        <p className="text-xs text-neutral-400 mt-1">Enter your credentials to access the workspace</p>
      </div>

      {error && (
        <div className="mb-4 text-xs font-medium text-red-400 bg-red-950/40 border border-red-900/50 px-3 py-2.5 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Username or Email
          </label>
          <input
            type="text"
            required
            placeholder="Enter username or email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            className="w-full bg-[#15171c] border border-[#262930] text-white text-sm px-3.5 py-2.5 rounded focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Password
          </label>
          <input
            type="password"
            required
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#15171c] border border-[#262930] text-white text-sm px-3.5 py-2.5 rounded focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-600"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#e50914] hover:bg-[#c10712] text-white font-medium text-sm py-2.5 rounded transition-colors disabled:opacity-50 mt-2 cursor-pointer"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 text-center text-xs text-neutral-400">
        Don't have an account?{' '}
        <Link to="/register" className="text-white hover:underline underline-offset-4">
          Sign Up
        </Link>
      </div>
    </AuthLayout>
  );
}