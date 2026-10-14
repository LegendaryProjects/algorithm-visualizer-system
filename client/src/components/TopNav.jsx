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
    <header className={`h-16 border-b px-6 sm:px-8 flex items-center justify-between shrink-0 transition-all duration-300 ${
      isLight 
        ? 'bg-white/95 backdrop-blur-md border-slate-200/90 text-slate-900 shadow-xs' 
        : 'bg-[#141416] border-[#27272a] text-white'
    }`}>
      <div className="flex items-center space-x-3">
        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 inline-block shadow-sm"></span>
        <span className={`text-sm sm:text-base font-bold tracking-tight ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          Algorithm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">Visualizer</span> System
        </span>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Link 
          to="/" 
          className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg transition-all ${
            isLight 
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-100/80 shadow-2xs' 
              : 'bg-white/10 text-white hover:text-blue-400'
          }`}
        >
          Visualizer
        </Link>
        {user?.role !== 'admin' && (
          <Link 
            to="/progress" 
            className={`text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
              isLight 
                ? 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100/80' 
                : 'text-neutral-300 hover:text-blue-400'
            }`}
          >
            Progress
          </Link>
        )}
        {user?.role === 'admin' && (
          <Link 
            to="/admin" 
            className={`text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
              isLight 
                ? 'text-slate-600 hover:text-red-600 hover:bg-red-50/80' 
                : 'text-neutral-300 hover:text-red-400'
            }`}
          >
            Admin Panel
          </Link>
        )}
      </div>
      
      <div className="flex items-center space-x-3 sm:space-x-4">
        <ThemeToggle />
        <div className="text-right hidden sm:block">
          <p className={`text-xs font-semibold ${isLight ? 'text-slate-800' : 'text-neutral-200'}`}>{user?.username}</p>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
            isLight 
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
              : 'bg-white/10 text-neutral-300'
          }`}>
            {user?.role}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className={`text-xs px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-semibold border shadow-2xs ${
            isLight 
              ? 'bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border-slate-200/90 hover:border-rose-200' 
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
