import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Users, Code, Trash2, Edit, Eye, Activity } from 'lucide-react';
import TopNav from '../components/TopNav';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [algorithms, setAlgorithms] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const { user } = useAuth();
  const { isLight } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchAlgorithms();
    fetchLoginHistory();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAlgorithms = async () => {
    try {
      const res = await api.get('/admin/algorithms');
      setAlgorithms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLoginHistory = async () => {
    try {
      const res = await api.get('/admin/login-history');
      setLoginHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch login history:', err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      alert('Error deleting user');
    }
  };

  const deleteAlgorithm = async (id) => {
    if (!window.confirm('Are you sure you want to delete this algorithm?')) return;
    try {
      await api.delete(`/admin/algorithms/${id}`);
      setAlgorithms(algorithms.filter(a => a.id !== id));
    } catch (err) {
      alert('Error deleting algorithm');
    }
  };

  if (user?.role !== 'admin') {
    return <div className="p-8 text-white">Access Denied. Admins only.</div>;
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isLight ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#0b0f19] text-white'}`}>
      <TopNav />
      
      <div className="p-8 flex-1 max-w-7xl mx-auto w-full">
        <h1 className={`text-3xl font-bold mb-8 ${isLight ? 'text-slate-900' : 'text-white'}`}>Admin Dashboard</h1>
        
        <div className={`flex gap-4 mb-8 border-b pb-2 overflow-x-auto transition-colors ${
          isLight ? 'border-slate-200' : 'border-gray-800'
        }`}>
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2 shrink-0 cursor-pointer font-medium transition-colors ${
              activeTab === 'users' 
                ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' 
                : isLight ? 'text-slate-500 hover:text-slate-900' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users size={20} /> Users
          </button>
          <button 
            onClick={() => setActiveTab('algorithms')}
            className={`flex items-center gap-2 px-4 py-2 shrink-0 cursor-pointer font-medium transition-colors ${
              activeTab === 'algorithms' 
                ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' 
                : isLight ? 'text-slate-500 hover:text-slate-900' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Code size={20} /> Algorithms
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 shrink-0 cursor-pointer font-medium transition-colors ${
              activeTab === 'history' 
                ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' 
                : isLight ? 'text-slate-500 hover:text-slate-900' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Activity size={20} /> Login History
          </button>
        </div>

        {activeTab === 'users' && (
          <div className={`rounded-xl border overflow-hidden overflow-x-auto animate-slide-up stagger-1 shadow-sm transition-all ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#15171c] border-gray-800'
          }`}>
            <table className="w-full text-left">
              <thead className={isLight ? 'bg-slate-50 border-b border-slate-200' : 'bg-gray-900/50'}>
                <tr>
                  <th className={`p-4 text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>ID</th>
                  <th className={`p-4 text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Username</th>
                  <th className={`p-4 text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Email</th>
                  <th className={`p-4 text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Role</th>
                  <th className={`p-4 text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-800/30">
                    <td className="p-4 text-sm">{u.id}</td>
                    <td className="p-4 text-sm">{u.username}</td>
                    <td className="p-4 text-sm">{u.email}</td>
                    <td className="p-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${u.role === 'admin' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 flex gap-3">
                      {u.id !== user.id && (
                        <>
                          <button 
                            onClick={() => navigate(`/progress/${u.id}`)} 
                            className="text-blue-400 hover:text-blue-300 p-1 flex items-center gap-1 text-xs"
                            title="View Progress"
                          >
                            <Eye size={16} /> Progress
                          </button>
                          <button onClick={() => deleteUser(u.id)} className="text-red-400 hover:text-red-300 p-1" title="Delete User">
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                      {u.id === user.id && (
                        <span className="text-xs text-gray-500 italic flex items-center h-full pt-1">Current User</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'algorithms' && (
          <div className={`rounded-xl border overflow-hidden overflow-x-auto animate-slide-up stagger-1 shadow-sm transition-all ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#15171c] border-gray-800'
          }`}>
            <table className="w-full text-left">
              <thead className={isLight ? 'bg-slate-50 border-b border-slate-200' : 'bg-gray-900/50'}>
                <tr>
                  <th className={`p-4 text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>ID</th>
                  <th className={`p-4 text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Name</th>
                  <th className={`p-4 text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Category</th>
                  <th className={`p-4 text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Complexity</th>
                  <th className={`p-4 text-sm font-semibold text-right ${isLight ? 'text-slate-600' : 'text-gray-400'}`}><button onClick={() => navigate('/admin/add-algorithm')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer shadow-md">+ Add Algorithm</button></th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200 text-slate-800' : 'divide-gray-800 text-white'}`}>
                {algorithms.map(a => (
                  <tr key={a.id} className={`transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-gray-800/30'}`}>
                    <td className={`p-4 text-sm font-mono ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>{a.id}</td>
                    <td className="p-4 text-sm font-medium">{a.name}</td>
                    <td className="p-4 text-sm">{a.category}</td>
                    <td className={`p-4 text-sm font-mono ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>{a.complexity}</td>
                    <td className="p-4 flex gap-3">
                      <button onClick={() => navigate(`/admin/edit-algorithm/${a.id}`)} className="text-blue-500 hover:text-blue-600 p-1 cursor-pointer" title="Edit Algorithm">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => deleteAlgorithm(a.id)} className="text-red-500 hover:text-red-600 p-1 cursor-pointer" title="Delete Algorithm">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'history' && (
          <div className={`rounded-xl border overflow-hidden overflow-x-auto animate-slide-up stagger-1 shadow-sm transition-all ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#15171c] border-gray-800'
          }`}>
            <table className="w-full text-left">
              <thead className={isLight ? 'bg-slate-50 border-b border-slate-200' : 'bg-gray-900/50'}>
                <tr>
                  <th className={`p-4 text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Date & Time</th>
                  <th className={`p-4 text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>User</th>
                  <th className={`p-4 text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>IP Address</th>
                  <th className={`p-4 text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Device / Browser</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-gray-800'}`}>
                {loginHistory.map(record => (
                  <tr key={record.id} className={`transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-gray-800/30'}`}>
                    <td className={`p-4 text-sm ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
                      {new Date(record.created_at).toLocaleString()}
                    </td>
                    <td className={`p-4 text-sm font-medium ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {record.username}
                      <span className={`block text-xs font-normal ${isLight ? 'text-slate-400' : 'text-gray-500'}`}>{record.email}</span>
                    </td>
                    <td className={`p-4 text-sm font-mono ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>{record.ip_address}</td>
                    <td className={`p-4 text-sm ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>{record.device_info}</td>
                  </tr>
                ))}
                {loginHistory.length === 0 && (
                  <tr>
                    <td colSpan="4" className={`p-8 text-center text-sm ${isLight ? 'text-slate-400' : 'text-gray-500'}`}>
                      No login history available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
