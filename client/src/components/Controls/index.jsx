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
      isLight ? 'bg-white/90 border border-slate-200 shadow-sm text-slate-800' : 'bg-white/10 border border-white/20 shadow-xl text-white'
    }`}>
      
      {/* Title */}
      <h3 className={`text-center font-semibold mb-2 ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>Simulation Controls</h3>

      {/* Main Controls (Play/Pause/Step) */}
      <div className="flex justify-center items-center space-x-3 mb-4">
        <button 
          onClick={restart}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          title="Restart"
        >
          <RotateCcw size={20} />
        </button>
        
        <button 
          onClick={stepBackward}
          disabled={currentStepIndex === 0}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Step Backward"
        >
          <SkipBack size={20} />
        </button>
        
        {isPlaying ? (
          <button 
            onClick={pause}
            className="p-3 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-full transition-colors shadow-sm"
            title="Pause"
          >
            <Pause size={24} />
          </button>
        ) : (
          <button 
            onClick={play}
            disabled={currentStepIndex >= totalSteps - 1}
            className="p-3 bg-blue-500 text-white hover:bg-blue-600 rounded-full transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            title="Play"
          >
            <Play size={24} />
          </button>
        )}
        
        <button 
          onClick={stepForward}
          disabled={currentStepIndex >= totalSteps - 1}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Step Forward"
        >
          <SkipForward size={20} />
        </button>
      </div>

      {/* Settings (Speed & Mute) */}
      <div className={`flex justify-between items-center rounded-lg p-2 border transition-colors ${
        isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/20 border-white/10'
      }`}>
        <div className="flex items-center space-x-2">
          <span className={`text-xs ${isLight ? 'text-slate-600 font-medium' : 'text-gray-400'}`}>Speed:</span>
          <select 
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className={`text-xs border-none focus:ring-0 cursor-pointer outline-none font-medium ${
              isLight ? 'bg-transparent text-slate-800' : 'bg-transparent text-gray-200'
            }`}
          >
            <option value={2000} className={isLight ? 'bg-white text-slate-800' : 'bg-gray-800'}>0.5x</option>
            <option value={1000} className={isLight ? 'bg-white text-slate-800' : 'bg-gray-800'}>1x</option>
            <option value={500} className={isLight ? 'bg-white text-slate-800' : 'bg-gray-800'}>2x</option>
            <option value={200} className={isLight ? 'bg-white text-slate-800' : 'bg-gray-800'}>5x</option>
          </select>
        </div>
        
        <button 
          onClick={toggleMute}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            isMuted 
              ? 'text-red-500 hover:bg-red-500/20' 
              : isLight 
                ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-200' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title={isMuted ? "Unmute Narration" : "Mute Narration"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
};

export default Controls;
