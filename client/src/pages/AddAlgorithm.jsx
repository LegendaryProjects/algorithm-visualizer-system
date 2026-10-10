import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import TopNav from '../components/TopNav';

export default function AddAlgorithm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    description: '',
    complexity: '{"time":"O(n)","space":"O(1)"}',
    code: { cpp: '', java: '', python: '' }
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.id.trim()) {
      alert("Algorithm ID is required");
      return;
    }
    
    try {
      await api.post(`/admin/algorithms`, formData);
      alert('Algorithm added successfully!');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to add algorithm');
    }
  };

  if (user?.role !== 'admin') {
    return <div className="p-8 text-white">Access Denied. Admins only.</div>;
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col">
      <TopNav />
      <div className="p-8 flex-1 max-w-4xl mx-auto w-full animate-slide-up stagger-1">
        <h1 className="text-3xl font-bold mb-6">Add New Algorithm</h1>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-[#15171c] p-6 rounded-xl border border-gray-800 space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">ID (e.g. "bubble-sort")</label>
              <input 
                type="text" 
                value={formData.id} 
                onChange={(e) => setFormData({...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                className="w-full bg-[#0b0f19] border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                required
                placeholder="merge-sort"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#0b0f19] border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                required
                placeholder="Merge Sort"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
              <input 
                type="text" 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-[#0b0f19] border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                required
                placeholder="Sorting"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Complexity (JSON format)</label>
              <input 
                type="text" 
                value={formData.complexity} 
                onChange={(e) => setFormData({...formData, complexity: e.target.value})}
                className="w-full bg-[#0b0f19] border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-[#0b0f19] border border-gray-700 rounded p-2 text-white h-24 focus:border-blue-500 outline-none"
              />
            </div>

          </div>

          <div className="bg-[#15171c] p-6 rounded-xl border border-gray-800 space-y-4">
            <h2 className="text-lg font-semibold text-gray-300">Code Snippets</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">C++</label>
              <textarea 
                value={formData.code.cpp} 
                onChange={(e) => setFormData({...formData, code: {...formData.code, cpp: e.target.value}})}
                className="w-full font-mono text-sm bg-[#0b0f19] border border-gray-700 rounded p-2 text-green-400 h-40 focus:border-blue-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Java</label>
              <textarea 
                value={formData.code.java} 
                onChange={(e) => setFormData({...formData, code: {...formData.code, java: e.target.value}})}
                className="w-full font-mono text-sm bg-[#0b0f19] border border-gray-700 rounded p-2 text-yellow-400 h-40 focus:border-blue-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Python</label>
              <textarea 
                value={formData.code.python} 
                onChange={(e) => setFormData({...formData, code: {...formData.code, python: e.target.value}})}
                className="w-full font-mono text-sm bg-[#0b0f19] border border-gray-700 rounded p-2 text-blue-400 h-40 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded font-medium transition cursor-pointer">
              Add Algorithm
            </button>
            <button type="button" onClick={() => navigate('/admin')} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded font-medium transition cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
