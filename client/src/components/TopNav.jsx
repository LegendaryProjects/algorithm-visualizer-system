import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

import ThemeToggle from './ThemeToggle';

export default function TopNav() {
  const { user, logout } = useAuth();
  const { isLight } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className={`h-16 border-b px-8 flex items-center justify-between shrink-0 transition-colors duration-300 ${
      isLight ? 'bg-white border-slate-200 text-slate-900 shadow-xs' : 'bg-[#141416] border-[#27272a] text-white'
    }`}>
      <div className="flex items-center space-x-3">
        <span className={`text-sm font-semibold tracking-wide ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Algorithm Visualizer System
        </span>
      </div>
      
      <div className="flex items-center space-x-6">
        <Link to="/" className={`text-sm font-medium transition ${
          isLight ? 'text-slate-600 hover:text-blue-600' : 'text-white hover:text-blue-400'
        }`}>
          Visualizer
        </Link>
        {user?.role !== 'admin' && (
          <Link to="/progress" className={`text-sm font-medium transition ${
            isLight ? 'text-slate-600 hover:text-blue-600' : 'text-white hover:text-blue-400'
          }`}>
            Progress
          </Link>
        )}
        {user?.role === 'admin' && (
          <Link to="/admin" className={`text-sm font-medium transition ${
            isLight ? 'text-slate-600 hover:text-red-600' : 'text-white hover:text-red-400'
          }`}>
            Admin Panel
          </Link>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <div className="text-right">
          <p className={`text-xs font-medium ${isLight ? 'text-slate-800' : 'text-neutral-200'}`}>{user?.username}</p>
          <p className={`text-[11px] capitalize ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>{user?.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className={`text-xs px-3.5 py-2 rounded transition cursor-pointer font-semibold border ${
            isLight 
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300' 
              : 'bg-[#f3f3f9] hover:bg-[#e2e8f0] text-black border-[#303036]'
          }`}
          style={{ color: '#000000' }}
        >
          <span style={{ color: '#000000' }}>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
