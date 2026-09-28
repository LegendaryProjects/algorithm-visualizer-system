import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Volume2, VolumeX } from 'lucide-react';

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
  return (
    <div className="w-full h-full bg-white/10 backdrop-blur-md shadow-xl rounded-xl border border-white/20 p-4 flex flex-col justify-around">
      
      {/* Title */}
      <h3 className="text-center font-medium text-gray-300 mb-2">Simulation Controls</h3>

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
      <div className="flex justify-between items-center bg-black/20 rounded-lg p-2 border border-white/10">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Speed:</span>
          <select 
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="text-xs bg-transparent text-gray-200 border-none focus:ring-0 cursor-pointer outline-none"
          >
            <option value={2000} className="bg-gray-800">0.5x</option>
            <option value={1000} className="bg-gray-800">1x</option>
            <option value={500} className="bg-gray-800">2x</option>
            <option value={200} className="bg-gray-800">5x</option>
          </select>
        </div>
        
        <button 
          onClick={toggleMute}
          className={`p-1.5 rounded-full transition-colors ${isMuted ? 'text-red-400 hover:bg-red-400/20' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          title={isMuted ? "Unmute Narration" : "Mute Narration"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
};

export default Controls;
