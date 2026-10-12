import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import TopNav from '../components/TopNav';

export default function Dashboard() {
  const { user, session, logout } = useAuth();
  const { isLight } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isLight ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#0e0e10] text-white'}`}>
      <TopNav />
      <main className="flex-1 w-full h-full overflow-hidden relative p-0">
        <Layout />
      </main>
    </div>
  );
}