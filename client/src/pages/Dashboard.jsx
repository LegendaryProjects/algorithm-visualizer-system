import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import TopNav from '../components/TopNav';

export default function Dashboard() {
  const { user, session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white flex flex-col">
      <TopNav />
      <main className="flex-1 w-full h-full overflow-hidden relative p-0">
        <Layout />
      </main>
    </div>
  );
}