import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/Layout/AuthLayout';

export default function Register() {
  const [role, setRole] = useState('learner');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await register(username, email, password, role);
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
        <h2 className="text-2xl font-bold text-white tracking-tight">Create Account</h2>
        <p className="text-xs text-neutral-400 mt-1">Register a new profile to track your progress</p>
      </div>

      {/* Role Switch Tab */}
      <div className="flex bg-[#15171c] p-1 rounded border border-[#262930] mb-6">
        <button
          type="button"
          onClick={() => {
            setRole('learner');
            setError('');
          }}
          className={`flex-1 py-2 text-xs font-medium rounded transition-all cursor-pointer ${
            role === 'learner'
              ? 'bg-[#e50914] text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
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
          className={`flex-1 py-2 text-xs font-medium rounded transition-all cursor-pointer ${
            role === 'admin'
              ? 'bg-[#e50914] text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Admin
        </button>
      </div>

      {error && (
        <div className="mb-4 text-xs font-medium text-red-400 bg-red-950/40 border border-red-900/50 px-3 py-2.5 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Username
          </label>
          <input
            type="text"
            required
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#15171c] border border-[#262930] text-white text-sm px-3.5 py-2.5 rounded focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Email
          </label>
          <input
            type="email"
            required
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Minimum 8 characters"
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
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-8 text-center text-xs text-neutral-400">
        Already have an account?{' '}
        <Link to="/login" className="text-white hover:underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}