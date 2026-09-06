import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

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
            onClick={logout}
            className="text-xs bg-[#222226] hover:bg-[#2b2b30] text-neutral-200 px-3.5 py-2 rounded transition cursor-pointer border border-[#303036]"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
        <div className="border border-[#27272a] bg-[#141416] rounded-lg p-6 mb-6">
          <h2 className="text-base font-semibold text-white mb-4">
            Account Details
          </h2>
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-[#1a1a1e] p-3.5 rounded border border-[#2a2a30]">
              <span className="text-neutral-400 block mb-1">User ID:</span>
              <span className="text-neutral-200 break-all">{user?.id}</span>
            </div>
            <div className="bg-[#1a1a1e] p-3.5 rounded border border-[#2a2a30]">
              <span className="text-neutral-400 block mb-1">Email:</span>
              <span className="text-neutral-200">{user?.email}</span>
            </div>
          </div>
        </div>

        <div className="border border-dashed border-[#27272a] rounded-lg p-12 text-center">
          <p className="text-sm text-neutral-400">
            You are logged in. The algorithm catalog will be displayed here.
          </p>
        </div>
      </main>
    </div>
  );
}