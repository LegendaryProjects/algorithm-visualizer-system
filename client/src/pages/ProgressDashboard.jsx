import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Bookmark, CheckCircle2, Layers, Zap, Pin, X } from 'lucide-react';

// Formats the PostgreSQL timestamp beautifully
function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function ProgressDashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  const [history, setHistory] = useState([]);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      fetchBookmarks();
      fetchHistory();
    }
  }, [userId]);

  const fetchBookmarks = async () => {
    try {
      const res = await api.get(`/progress/bookmarks/${userId}`);
      setBookmarks(res.data);
    } catch (err) {
      console.error("Failed to fetch bookmarks", err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await api.get(`/progress/${userId}`);
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to fetch history", err);
    }
  };

  const removeBookmark = async (algo_id) => {
    if (!window.confirm('Remove this bookmark?')) return;
    try {
      await api.post('/progress/bookmarks/toggle', { user_id: userId, algo_id });
      setBookmarks((prev) => prev.filter((b) => b.algo_id !== algo_id));
    } catch (err) {
      alert("Database error while removing bookmark.");
    }
  };

  const algorithmsMastered = history.filter((h) => h.completion_pct === 100).length;
  const totalStepsExecuted = history.reduce((sum, item) => sum + item.steps_viewed, 0);

  const stats = [
    { label: 'Started', value: history.length, icon: Layers, glow: '#7DD3FC' },
    { label: 'Mastered', value: algorithmsMastered, icon: CheckCircle2, glow: '#5EEAD4' },
    { label: 'Steps run', value: totalStepsExecuted, icon: Zap, glow: '#C4B5FD' },
    { label: 'Pinned', value: bookmarks.length, icon: Pin, glow: '#F9A8D4' },
  ];

  return (
    <div className="glass relative min-h-screen w-full overflow-hidden flex justify-center px-5 py-14 sm:py-20"
      style={{
        background: 'linear-gradient(160deg, #1a1030 0%, #12142b 45%, #0b1224 100%)',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        .glass * { font-family: 'Inter', sans-serif; }
        .display { font-family: 'Space Grotesk', sans-serif; }

        .orb { position: absolute; border-radius: 9999px; filter: blur(70px); pointer-events: none; }
        @keyframes drift1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px,-30px); } }
        @keyframes drift2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-50px,25px); } }
        @keyframes drift3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,40px); } }

        .pane {
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .pane-row {
          border-top: 1px solid rgba(255,255,255,0.08);
          transition: background 0.2s ease;
        }
        .pane-row:hover { background: rgba(255,255,255,0.04); }
        .remove-btn { opacity: 0; transition: opacity 0.2s ease; }
        .pane-row:hover .remove-btn { opacity: 1; }
        .stat-card {
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08);
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .stat-card:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.22); }
        .bar-track { background: rgba(255,255,255,0.1); }
        .bar-fill { transition: width 0.6s ease; }
        .gradient-text {
          background: linear-gradient(90deg, #A78BFA, #7DD3FC 55%, #5EEAD4);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      {/* ambient gradient orbs */}
      <div className="orb" style={{ width: 420, height: 420, top: -140, left: -120, background: '#7C3AED', opacity: 0.35, animation: 'drift1 16s ease-in-out infinite' }} />
      <div className="orb" style={{ width: 380, height: 380, top: 120, right: -140, background: '#0EA5E9', opacity: 0.3, animation: 'drift2 19s ease-in-out infinite' }} />
      <div className="orb" style={{ width: 320, height: 320, bottom: -120, left: '30%', background: '#EC4899', opacity: 0.22, animation: 'drift3 21s ease-in-out infinite' }} />

      <div className="relative w-full max-w-4xl">
        {/* Header */}
        <div className="pane rounded-3xl px-7 py-8 sm:px-9 sm:py-9 mb-6">
          <p className="text-xs tracking-wide mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Learning dashboard · user 001
          </p>
          <h1 className="display gradient-text text-4xl sm:text-5xl font-semibold mb-2 leading-tight">
            Your progress, in focus
          </h1>
          <p className="text-[15px] max-w-md" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Every algorithm you've opened, finished, or set aside — gathered
            in one clear view.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="stat-card rounded-2xl p-5 flex flex-col gap-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${s.glow}22`, border: `1px solid ${s.glow}55` }}
                >
                  <Icon size={16} style={{ color: s.glow }} />
                </div>
                <div>
                  <div className="display text-3xl font-semibold text-white">{s.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Session history */}
          <div className="pane rounded-3xl p-6 sm:p-7 lg:col-span-3">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="display text-lg font-semibold text-white">Session history</h2>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{history.length} entries</span>
            </div>

            {history.length === 0 ? (
              <p className="text-sm py-8 text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Nothing studied yet — run a simulation in the Sandbox first!
              </p>
            ) : (
              <div>
                {history.map((item) => (
                  <div key={item.record_id} className="pane-row flex items-center gap-4 py-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[15px] text-white truncate">{item.algo_name}</span>
                        {item.completion_pct === 100 && (
                          <CheckCircle2 size={14} style={{ color: '#5EEAD4' }} />
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bar-track h-1.5 flex-1 rounded-full overflow-hidden">
                          <div
                            className="bar-fill h-full rounded-full"
                            style={{
                              width: `${item.completion_pct}%`,
                              background: item.completion_pct === 100
                                ? 'linear-gradient(90deg,#5EEAD4,#7DD3FC)'
                                : 'linear-gradient(90deg,#A78BFA,#7DD3FC)',
                            }}
                          />
                        </div>
                        <span className="text-xs tabular-nums shrink-0" style={{ color: 'rgba(255,255,255,0.55)' }}>
                          {item.completion_pct}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 hidden sm:block">
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.steps_viewed} steps</div>
                      <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{formatDate(item.last_visited)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pinned algorithms */}
          <div className="pane rounded-3xl p-6 sm:p-7 lg:col-span-2">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="display text-lg font-semibold text-white">Pinned</h2>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{bookmarks.length}</span>
            </div>

            {bookmarks.length === 0 ? (
              <p className="text-sm py-8 text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
                You haven't pinned any algorithms yet.
              </p>
            ) : (
              <div>
                {bookmarks.map((bm) => (
                  <div key={bm.bookmark_id} className="pane-row flex items-start gap-3 py-4">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(249,168,212,0.15)', border: '1px solid rgba(249,168,212,0.35)' }}
                    >
                      <Bookmark size={12} style={{ color: '#F9A8D4' }} fill="#F9A8D4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] text-white mb-0.5 truncate">{bm.algo_name}</div>
                      <div
                        className="text-xs truncate"
                        style={{ color: bm.bookmark_notes ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.3)' }}
                      >
                        {bm.bookmark_notes || 'No notes attached'}
                      </div>
                    </div>
                    <button
                      onClick={() => removeBookmark(bm.algo_id)}
                      className="remove-btn shrink-0 p-1"
                      aria-label={`Remove ${bm.algo_name} bookmark`}
                    >
                      <X size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
