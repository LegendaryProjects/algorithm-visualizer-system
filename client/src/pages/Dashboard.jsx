import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

export default function Dashboard() {
  const { user, session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white flex flex-col">
      <header className="h-16 border-b border-[#27272a] px-8 flex items-center justify-between bg-[#141416]">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold tracking-wide">Algorithm Visualizer System</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-xs font-medium text-neutral-200">{user?.username}</p>
            <p className="text-[11px] text-neutral-400 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs bg-[#222226] hover:bg-[#2b2b30] text-neutral-200 px-3.5 py-2 rounded transition cursor-pointer border border-[#303036]"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="flex-1 w-full h-full overflow-hidden relative p-0">
        <Layout />
      </main>
    </div>
  );
}