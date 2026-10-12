import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, isLight } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`p-2 rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer border ${
        isLight
          ? 'bg-slate-100 hover:bg-slate-200 text-amber-500 border-slate-300 shadow-sm'
          : 'bg-[#222226] hover:bg-[#2b2b30] text-amber-400 border-[#303036] shadow-sm'
      } ${className}`}
      title={isLight ? 'Switch to Dark theme' : 'Switch to Light theme'}
      aria-label="Toggle theme"
    >
      {isLight ? (
        <Moon size={18} className="text-slate-700 transition-transform hover:rotate-12" />
      ) : (
        <Sun size={18} className="text-amber-400 transition-transform hover:rotate-45" />
      )}
    </button>
  );
}
