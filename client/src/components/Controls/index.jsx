import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Controls = ({ 
  isPlaying, 
  play, 
  pause, 
  stepForward, 
  stepBackward, 
  restart, 
  playbackSpeed, 
  setPlaybackSpeed,
  currentStepIndex,
  totalSteps,
  isMuted,
  toggleMute
}) => {
  const { isLight } = useTheme();

  return (
    <div className={`w-full h-full backdrop-blur-md rounded-xl p-4 flex flex-col justify-around transition-all duration-300 ${
      isLight ? 'bg-white border border-slate-200/90 shadow-sm text-slate-800' : 'bg-white/10 border border-white/20 shadow-xl text-white'
    }`}>
      
      {/* Title */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-500'}`}></span>
        <h3 className={`text-center font-bold text-xs uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
          Simulation Controls
        </h3>
      </div>

      {/* Main Controls (Play/Pause/Step) */}
      <div className="flex justify-center items-center space-x-3 mb-4">
        <button 
          onClick={restart}
          className={`p-2 rounded-full transition-all cursor-pointer ${
            isLight ? 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50' : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title="Restart"
        >
          <RotateCcw size={18} />
        </button>
        
        <button 
          onClick={stepBackward}
          disabled={currentStepIndex === 0}
          className={`p-2 rounded-full transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
            isLight ? 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50' : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title="Step Backward"
        >
          <SkipBack size={20} />
        </button>
        
        {isPlaying ? (
          <button 
            onClick={pause}
            className="p-3 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-full transition-all shadow-sm cursor-pointer active:scale-95"
            title="Pause"
          >
            <Pause size={22} />
          </button>
        ) : (
          <button 
            onClick={play}
            disabled={currentStepIndex >= totalSteps - 1}
            className="p-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full transition-all shadow-md shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
            title="Play"
          >
            <Play size={22} className="ml-0.5" />
          </button>
        )}
        
        <button 
          onClick={stepForward}
          disabled={currentStepIndex >= totalSteps - 1}
          className={`p-2 rounded-full transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
            isLight ? 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50' : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title="Step Forward"
        >
          <SkipForward size={20} />
        </button>
      </div>

      {/* Settings (Speed & Mute) */}
      <div className={`flex justify-between items-center rounded-lg p-2.5 border transition-all ${
        isLight ? 'bg-gradient-to-r from-slate-50 to-indigo-50/30 border-slate-200/90 shadow-2xs' : 'bg-black/20 border-white/10'
      }`}>
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Speed:</span>
          <select 
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className={`text-xs rounded-md px-2 py-0.5 border cursor-pointer outline-none font-semibold transition-all ${
              isLight 
                ? 'bg-white border-slate-200 text-slate-800 shadow-2xs focus:border-indigo-500' 
                : 'bg-transparent border-white/20 text-gray-200'
            }`}
          >
            <option value={2000} className={isLight ? 'bg-white text-slate-800' : 'bg-gray-800'}>0.5x</option>
            <option value={1000} className={isLight ? 'bg-white text-slate-800' : 'bg-gray-800'}>1.0x</option>
            <option value={500} className={isLight ? 'bg-white text-slate-800' : 'bg-gray-800'}>2.0x</option>
            <option value={200} className={isLight ? 'bg-white text-slate-800' : 'bg-gray-800'}>5.0x</option>
          </select>
        </div>
        
        <button 
          onClick={toggleMute}
          className={`p-1.5 rounded-full transition-all cursor-pointer border ${
            isMuted 
              ? 'text-rose-500 bg-rose-50 border-rose-200 hover:bg-rose-100' 
              : isLight 
                ? 'text-slate-600 bg-white border-slate-200/80 hover:text-indigo-600 hover:bg-indigo-50 shadow-2xs' 
                : 'text-gray-400 border-transparent hover:text-white hover:bg-white/10'
          }`}
          title={isMuted ? "Unmute Voice Narration" : "Mute Voice Narration"}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>
    </div>
  );
};

export default Controls;
