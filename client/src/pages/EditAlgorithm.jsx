import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import TopNav from '../components/TopNav';

export default function EditAlgorithm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    complexity: '',
    code: { cpp: '', java: '', python: '' }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    fetchAlgorithm();
  }, [id, user]);

  const fetchAlgorithm = async () => {
    try {
      // The GET /api/algorithms endpoint returns all algorithms. We'll find ours.
      const res = await api.get('/algorithms');
      const algo = res.data.find(a => a.id === id);
      if (algo) {
        setFormData({
          name: algo.name || '',
          category: algo.category || '',
          description: algo.description || '',
          complexity: typeof algo.complexity === 'string' ? algo.complexity : JSON.stringify(algo.complexity),
          code: {
            cpp: algo.code?.cpp || '',
            java: algo.code?.java || '',
            python: algo.code?.python || ''
          }
        });
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching algorithm data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/algorithms/${id}`, formData);
      alert('Algorithm updated successfully!');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert('Failed to save algorithm');
    }
  };

  if (user?.role !== 'admin') {
    return <div className="p-8 text-white">Access Denied. Admins only.</div>;
  }

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col">
      <TopNav />
      <div className="p-8 flex-1 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Edit Algorithm: {id}</h1>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-[#15171c] p-6 rounded-xl border border-gray-800 space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#0b0f19] border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                required
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Complexity (JSON string or text)</label>
              <input 
                type="text" 
                value={formData.complexity} 
                onChange={(e) => setFormData({...formData, complexity: e.target.value})}
                className="w-full bg-[#0b0f19] border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
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
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition">
              Save Changes
            </button>
            <button type="button" onClick={() => navigate('/admin')} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded font-medium transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
