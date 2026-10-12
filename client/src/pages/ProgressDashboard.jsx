import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Bookmark, CheckCircle2, Layers, Zap, Pin, X } from 'lucide-react';
import TopNav from '../components/TopNav';

// Formats the PostgreSQL timestamp beautifully
function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function ProgressDashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  const [history, setHistory] = useState([]);
  const [targetUserInfo, setTargetUserInfo] = useState(null);
  const { user } = useAuth();
  const { isLight } = useTheme();
  const { userId: routeUserId } = useParams();
  
  // If a routeUserId is provided (e.g. admin viewing someone else), use it. Otherwise use current user.
  const targetUserId = routeUserId || user?.id;

  useEffect(() => {
    if (targetUserId) {
      fetchBookmarks();
      fetchHistory();
      fetchTargetUser();
    }
  }, [targetUserId]);

  const fetchTargetUser = async () => {
    try {
      const res = await api.get(`/progress/user/${targetUserId}`);
      setTargetUserInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const res = await api.get(`/progress/bookmarks/${targetUserId}`);
      setBookmarks(res.data);
    } catch (err) {
      console.error("Failed to fetch bookmarks", err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await api.get(`/progress/${targetUserId}`);
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to fetch history", err);
    }
  };

  const removeBookmark = async (algo_id) => {
    if (!window.confirm('Remove this bookmark?')) return;
    try {
      await api.post('/progress/bookmarks/toggle', { user_id: targetUserId, algo_id });
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
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isLight ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#0b0f19] text-white'}`}>
      <TopNav />
      <div className="glass relative flex-1 w-full overflow-y-auto overflow-x-hidden flex justify-center px-5 py-14 sm:py-20"
        style={{
          background: isLight 
            ? 'linear-gradient(160deg, #f8fafc 0%, #f1f5f9 45%, #e2e8f0 100%)' 
            : 'linear-gradient(160deg, #1a1030 0%, #12142b 45%, #0b1224 100%)',
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
          background: ${isLight ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.055)'};
          border: 1px solid ${isLight ? 'rgba(203,213,225,0.8)' : 'rgba(255,255,255,0.12)'};
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          box-shadow: ${isLight ? '0 10px 25px -5px rgba(15,23,42,0.06)' : '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)'};
        }
        .pane-row {
          border-top: 1px solid ${isLight ? '#f1f5f9' : 'rgba(255,255,255,0.08)'};
          transition: background 0.2s ease;
        }
        .pane-row:hover { background: ${isLight ? '#f8fafc' : 'rgba(255,255,255,0.04)'}; }
        .remove-btn { opacity: 0; transition: opacity 0.2s ease; }
        .pane-row:hover .remove-btn { opacity: 1; }
        .stat-card {
          background: ${isLight ? '#ffffff' : 'rgba(255,255,255,0.055)'};
          border: 1px solid ${isLight ? '#e2e8f0' : 'rgba(255,255,255,0.12)'};
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          box-shadow: ${isLight ? '0 4px 12px -2px rgba(15,23,42,0.06)' : '0 8px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08)'};
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .stat-card:hover { transform: translateY(-2px); border-color: ${isLight ? '#cbd5e1' : 'rgba(255,255,255,0.22)'}; }
        .bar-track { background: ${isLight ? '#e2e8f0' : 'rgba(255,255,255,0.1)'}; }
        .bar-fill { transition: width 0.6s ease; }
        .gradient-text {
          background: linear-gradient(90deg, #7C3AED, #0284C7 55%, #0D9488);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      {/* ambient gradient orbs */}
      <div className="orb" style={{ width: 420, height: 420, top: -140, left: -120, background: isLight ? '#A78BFA' : '#7C3AED', opacity: isLight ? 0.2 : 0.35, animation: 'drift1 16s ease-in-out infinite' }} />
      <div className="orb" style={{ width: 380, height: 380, top: 120, right: -140, background: isLight ? '#38BDF8' : '#0EA5E9', opacity: isLight ? 0.18 : 0.3, animation: 'drift2 19s ease-in-out infinite' }} />
      <div className="orb" style={{ width: 320, height: 320, bottom: -120, left: '30%', background: isLight ? '#F472B6' : '#EC4899', opacity: isLight ? 0.15 : 0.22, animation: 'drift3 21s ease-in-out infinite' }} />

      <div className="relative w-full max-w-4xl">
        {/* Header */}
        <div className="pane rounded-3xl animate-slide-up stagger-1 px-7 py-8 sm:px-9 sm:py-9 mb-6 flex flex-col items-center text-center">
          <p className="text-xs tracking-wide mb-3" style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.55)' }}>
            Learning dashboard · {targetUserInfo?.username || 'Loading...'}
          </p>
          <h1 className="display gradient-text text-4xl sm:text-5xl font-semibold mb-2 leading-tight">
            {targetUserInfo?.id === user?.id ? 'Your progress, in focus' : `${targetUserInfo?.username}'s progress`}
          </h1>
          <p className="text-[15px] max-w-xl text-center mx-auto" style={{ color: isLight ? '#475569' : 'rgba(255,255,255,0.6)' }}>
            {targetUserInfo?.id === user?.id ? "Every algorithm you've opened, finished, or set aside — gathered in one clear view." : "Every algorithm they've opened, finished, or set aside — gathered in one clear view."}
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="stat-card rounded-2xl animate-pop-in stagger-2 p-5 flex flex-col gap-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${s.glow}22`, border: `1px solid ${s.glow}55` }}
                >
                  <Icon size={16} style={{ color: s.glow }} />
                </div>
                <div>
                  <div className={`display text-3xl font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{s.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.55)' }}>{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Session history */}
          <div className="pane rounded-3xl animate-slide-up stagger-1 p-6 sm:p-7 lg:col-span-3">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className={`display text-lg font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Session history</h2>
              <span className="text-xs" style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.5)' }}>{history.length} entries</span>
            </div>

            {history.length === 0 ? (
              <p className="text-sm py-8 text-center" style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.5)' }}>
                Nothing studied yet — run a simulation in the Sandbox first!
              </p>
            ) : (
              <div>
                {history.map((item) => (
                  <div key={item.record_id} className="pane-row flex items-center gap-4 py-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[15px] truncate font-medium ${isLight ? 'text-slate-800' : 'text-white'}`}>{item.algo_name}</span>
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
                        <span className="text-xs tabular-nums shrink-0" style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.55)' }}>
                          {item.completion_pct}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 hidden sm:block">
                      <div className="text-xs" style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.6)' }}>{item.steps_viewed} steps</div>
                      <div className="text-[11px]" style={{ color: isLight ? '#94a3b8' : 'rgba(255,255,255,0.4)' }}>{formatDate(item.last_visited)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pinned algorithms */}
          <div className="pane rounded-3xl animate-slide-up stagger-1 p-6 sm:p-7 lg:col-span-2">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className={`display text-lg font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Pinned</h2>
              <span className="text-xs" style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.5)' }}>{bookmarks.length}</span>
            </div>

            {bookmarks.length === 0 ? (
              <p className="text-sm py-8 text-center" style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.5)' }}>
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
                      <div className={`text-[14px] mb-0.5 truncate font-medium ${isLight ? 'text-slate-800' : 'text-white'}`}>{bm.algo_name}</div>
                      <div
                        className="text-xs truncate"
                        style={{ color: bm.bookmark_notes ? (isLight ? '#64748b' : 'rgba(255,255,255,0.5)') : (isLight ? '#94a3b8' : 'rgba(255,255,255,0.3)') }}
                      >
                        {bm.bookmark_notes || 'No notes attached'}
                      </div>
                    </div>
                    <button
                      onClick={() => removeBookmark(bm.algo_id)}
                      className="remove-btn shrink-0 p-1 cursor-pointer"
                      aria-label={`Remove ${bm.algo_name} bookmark`}
                    >
                      <X size={14} style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.55)' }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
