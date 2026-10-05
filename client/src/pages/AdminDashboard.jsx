import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Users, Code, Trash2, Edit, Eye } from 'lucide-react';
import TopNav from '../components/TopNav';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [algorithms, setAlgorithms] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchAlgorithms();
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
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col">
      <TopNav />
      
      <div className="p-8 flex-1">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="flex gap-4 mb-8 border-b border-gray-800 pb-2">
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'users' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            <Users size={20} /> Users
          </button>
          <button 
            onClick={() => setActiveTab('algorithms')}
            className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'algorithms' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            <Code size={20} /> Algorithms
          </button>
        </div>

        {activeTab === 'users' && (
          <div className="bg-[#15171c] rounded-xl border border-gray-800 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="p-4 text-sm font-medium text-gray-400">ID</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Username</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Email</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Role</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Actions</th>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'algorithms' && (
          <div className="bg-[#15171c] rounded-xl border border-gray-800 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="p-4 text-sm font-medium text-gray-400">ID</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Name</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Category</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Complexity</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {algorithms.map(a => (
                  <tr key={a.id} className="hover:bg-gray-800/30">
                    <td className="p-4 text-sm font-mono text-gray-400">{a.id}</td>
                    <td className="p-4 text-sm">{a.name}</td>
                    <td className="p-4 text-sm">{a.category}</td>
                    <td className="p-4 text-sm font-mono text-gray-400">{a.complexity}</td>
                    <td className="p-4 flex gap-3">
                      <button onClick={() => navigate(`/admin/edit-algorithm/${a.id}`)} className="text-blue-400 hover:text-blue-300 p-1" title="Edit Algorithm">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => deleteAlgorithm(a.id)} className="text-red-400 hover:text-red-300 p-1" title="Delete Algorithm">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
