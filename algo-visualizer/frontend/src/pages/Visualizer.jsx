import { useState, useEffect } from 'react';
import axios from 'axios';
import { Play, Bookmark, Terminal } from 'lucide-react';

export default function Visualizer() {
  const [algorithms, setAlgorithms] = useState([]);
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [simulating, setSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const userId = 1;

  useEffect(() => {
    axios.get('http://localhost:3001/api/admin/algorithms').then(res => setAlgorithms(res.data));
  }, []);

  const startSimulation = () => {
    setSimulating(true);
    setProgress(0);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setSimulating(false);
        axios.post('http://localhost:3001/api/progress/update', {
          user_id: userId, algo_id: selectedAlgo.algo_id, completion_pct: 100, steps_viewed: 24
        });
        alert('Simulation execution complete!');
      }
    }, 400);
  };

  const handleBookmark = () => {
    axios.post('http://localhost:3001/api/progress/bookmarks/toggle', {
      user_id: userId, algo_id: selectedAlgo.algo_id, bookmark_notes: 'Pinned from Sandbox'
    }).then(() => alert('Algorithm pinned to dashboard!'));
  };

  return (
    <div className="glass relative min-h-screen w-full overflow-hidden flex justify-center px-5 py-14 sm:py-20"
      style={{ background: 'linear-gradient(160deg, #1a1030 0%, #12142b 45%, #0b1224 100%)' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        .glass * { font-family: 'Inter', sans-serif; }
        .display { font-family: 'Space Grotesk', sans-serif; }
        .orb { position: absolute; border-radius: 9999px; filter: blur(70px); pointer-events: none; }
        .pane { background: rgba(255,255,255,0.055); border: 1px solid rgba(255,255,255,0.12); backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px); box-shadow: 0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08); }
        .gradient-text { background: linear-gradient(90deg, #5EEAD4, #7DD3FC 55%, #A78BFA); -webkit-background-clip: text; background-clip: text; color: transparent; }
      `}</style>

      <div className="orb" style={{ width: 450, height: 450, top: -50, right: -150, background: '#0EA5E9', opacity: 0.2 }} />

      <div className="relative w-full max-w-4xl">
        <div className="pane rounded-3xl px-7 py-8 mb-6 text-center">
          <Terminal size={32} className="mx-auto mb-4 text-[#5EEAD4]" />
          <h1 className="display gradient-text text-4xl font-semibold mb-2">Algorithm Sandbox</h1>
          <p className="text-[15px]" style={{ color: 'rgba(255,255,255,0.6)' }}>Select a module from the database to execute.</p>
        </div>

        <div className="pane rounded-3xl p-7">
          <select 
            className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.12)] text-white rounded-xl p-4 mb-6 focus:outline-none focus:border-[#5EEAD4]"
            onChange={(e) => setSelectedAlgo(algorithms.find(a => a.algo_id == e.target.value))}
          >
            <option value="" className="text-black">-- Select Algorithm to Load --</option>
            {algorithms.map(algo => <option key={algo.algo_id} value={algo.algo_id} className="text-black">{algo.name}</option>)}
          </select>

          {selectedAlgo && (
            <div className="bg-[rgba(255,255,255,0.03)] p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] mt-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="display text-2xl font-bold text-white">{selectedAlgo.name}</h3>
                  <div className="flex gap-3 mt-2 text-xs font-mono text-[rgba(255,255,255,0.5)]">
                    <span className="bg-[rgba(255,255,255,0.1)] px-2 py-1 rounded">Best: {selectedAlgo.best_case}</span>
                    <span className="bg-[rgba(255,255,255,0.1)] px-2 py-1 rounded">Worst: {selectedAlgo.worst_case}</span>
                  </div>
                </div>
                <button onClick={handleBookmark} className="text-[#F9A8D4] hover:bg-[rgba(249,168,212,0.1)] p-2 rounded-xl border border-[rgba(249,168,212,0.3)] transition-colors">
                  <Bookmark size={20} fill="currentColor" />
                </button>
              </div>
              
              <p className="text-[rgba(255,255,255,0.7)] text-sm mb-8 leading-relaxed">{selectedAlgo.description}</p>
              
              {simulating ? (
                <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-3 overflow-hidden">
                  <div className="h-3 rounded-full transition-all duration-300" style={{width: `${progress}%`, background: 'linear-gradient(90deg, #5EEAD4, #7DD3FC)'}}></div>
                </div>
              ) : (
                <button onClick={startSimulation} className="w-full bg-gradient-to-r from-[#5EEAD4] to-[#7DD3FC] text-black font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:opacity-90 transition-opacity">
                  <Play size={18} fill="currentColor" /> Execute Simulation
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}