import React, { useState, useEffect } from 'react';
import { algorithmList } from '../../algorithms';
import Canvas from '../Canvas';
import CodePanel from '../CodePanel';
import ExplanationPanel from '../Explanation';
import StatePanel from '../StatePanel';
import Controls from '../Controls';
import { useSimulationEngine } from '../../hooks/useSimulationEngine';
import { Bookmark, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import api from '../../services/api';

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const { isLight } = useTheme();
  const [bookmarkedAlgoIds, setBookmarkedAlgoIds] = useState([]);
  const [maxStepReached, setMaxStepReached] = useState(0);

  const {
    apiAlgorithms,
    loading,
    selectedAlgoId,
    algorithmData,
    customInput,
    setCustomInput,
    steps,
    currentStepIndex,
    currentStep,
    isPlaying,
    playbackSpeed,
    setPlaybackSpeed,
    play,
    pause,
    stepForward,
    stepBackward,
    restart,
    selectAlgorithm,
    isMuted,
    toggleMute
  } = useSimulationEngine();

  // Fallback to local list if API is loading or fails
  const displayAlgorithms = apiAlgorithms.length > 0 ? apiAlgorithms : algorithmList;
  const currentApiAlgo = apiAlgorithms.find(a => a.id === selectedAlgoId);

  // Check bookmark status when algorithm changes
  useEffect(() => {
    if (!user) return;
    api.get(`/progress/bookmarks/${user.id}`)
      .then(res => {
        const pinnedIds = res.data.map(b => b.algo_id);
        setBookmarkedAlgoIds(pinnedIds);
      })
      .catch(console.error);
    
    // Reset max step for new algorithm
    setMaxStepReached(0);
  }, [selectedAlgoId, user]);

  // Track progress as steps change
  useEffect(() => {
    if (currentStepIndex > maxStepReached) {
      setMaxStepReached(currentStepIndex);
    }
  }, [currentStepIndex, maxStepReached]);

  // Sync progress when leaving algorithm or finishing
  useEffect(() => {
    if (!user || steps.length === 0 || maxStepReached === 0) return;
    
    // If we reached the end, completion is 100%, else calculate percentage
    const completionPct = maxStepReached >= steps.length - 1 ? 100 : Math.round((maxStepReached / steps.length) * 100);
    
    // Debounce or sync when finished
    if (maxStepReached === steps.length - 1) {
       api.post('/progress/update', {
         user_id: user.id,
         algo_id: selectedAlgoId,
         completion_pct: completionPct,
         steps_viewed: maxStepReached
       }).catch(console.error);
    }
  }, [maxStepReached, steps.length, selectedAlgoId, user]);

  const toggleBookmark = async () => {
    if (!user) return;
    try {
      const res = await api.post('/progress/bookmarks/toggle', { user_id: user.id, algo_id: selectedAlgoId });
      if (res.data.status === 'added') {
        setBookmarkedAlgoIds(prev => [...prev, selectedAlgoId]);
      } else {
        setBookmarkedAlgoIds(prev => prev.filter(id => id !== selectedAlgoId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isBookmarked = bookmarkedAlgoIds.includes(selectedAlgoId);

  const handleInputChange = (inputName, val, type) => {
    let parsedVal = val;
    if (type === 'array') {
      parsedVal = val.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
      if (parsedVal.length === 0) parsedVal = [1];
    } else if (type === 'number') {
      parsedVal = parseInt(val, 10);
      if (isNaN(parsedVal)) parsedVal = 0;
    } else if (type === 'string') {
      parsedVal = val;
    }
    setCustomInput(prev => ({ ...prev, [inputName]: parsedVal }));
  };

  return (
    <div className={`flex flex-col h-full w-full font-sans p-4 overflow-hidden relative transition-colors duration-300 ${isLight ? 'bg-[#f8fafc] text-slate-800' : 'bg-[#0f172a] text-gray-200'}`}>
      {/* Background gradients for glassmorphism effect */}
      <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[100px] rounded-full pointer-events-none transition-opacity duration-300 ${isLight ? 'bg-blue-300/30' : 'bg-blue-600/60'}`}></div>
      <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[100px] rounded-full pointer-events-none transition-opacity duration-300 ${isLight ? 'bg-purple-300/30' : 'bg-purple-600/60'}`}></div>

      {/* Navbar & Algorithm Selector */}
      <nav className={`flex justify-between items-center mb-6 z-10 backdrop-blur-md p-2 rounded-xl shadow-md animate-fade-in transition-all duration-300 ${
        isLight ? 'bg-white/90 border border-slate-200' : 'bg-white/10 border border-white/20 shadow-xl'
      }`}>
        <div className="flex-1 flex justify-start pl-2">
          <select 
            className={`p-2 rounded-md shadow-sm min-w-[250px] outline-none cursor-pointer font-medium transition-colors ${
              isLight 
                ? 'bg-slate-50 border border-slate-300 text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                : 'bg-[#1e293b] border border-white/30 text-white focus:ring-blue-500 focus:border-blue-500'
            }`}
            value={selectedAlgoId}
            onChange={(e) => selectAlgorithm(e.target.value)}
          >
            {displayAlgorithms.map(algo => (
              <option key={algo.id} value={algo.id}>
                {bookmarkedAlgoIds.includes(algo.id) ? '📌 ' : ''}{algo.name} ({algo.category})
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-center flex-1">
          {/* Empty center */}
        </div>
        
        <div className="flex justify-end flex-1 pr-2">
          <button 
            onClick={toggleBookmark}
            className={`transition-colors p-2 rounded-full cursor-pointer ${
              isBookmarked 
                ? 'bg-pink-500/20 text-pink-500' 
                : isLight 
                  ? 'text-slate-400 hover:text-slate-800 hover:bg-slate-100' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Algorithm'}
          >
            <Bookmark size={24} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </nav>

      {/* Main Content Workspace */}
      <div className="flex flex-1 gap-4 overflow-hidden z-10 w-full">
        
        {/* Left Column: Controls (Media) */}
        <div className="flex flex-col flex-[1.2] gap-4 h-full min-h-0 min-w-0">
          <div className="flex-[1] min-h-0">
            <Controls 
              isPlaying={isPlaying}
              play={play}
              pause={pause}
              stepForward={stepForward}
              stepBackward={stepBackward}
              restart={restart}
              playbackSpeed={playbackSpeed}
              setPlaybackSpeed={setPlaybackSpeed}
              currentStepIndex={currentStepIndex}
              totalSteps={steps.length}
              isMuted={isMuted}
              toggleMute={toggleMute}
            />
          </div>
          
          {/* Custom Input */}
          <div className={`flex-[1.5] min-h-0 backdrop-blur-md rounded-xl p-4 flex flex-col justify-start items-center overflow-y-auto overflow-x-hidden transition-all duration-300 ${
            isLight ? 'bg-white/90 border border-slate-200 text-slate-700 shadow-sm' : 'bg-white/10 border border-white/20 text-gray-400 shadow-xl'
          }`}>
            <p className={`font-semibold mb-4 sticky top-0 w-full text-center py-1.5 rounded transition-colors ${
              isLight ? 'bg-slate-100 text-slate-800' : 'bg-[#1e293b]/80 text-gray-300'
            }`}>Custom Input</p>
            
            {currentApiAlgo?.inputSchema ? (
              <div className="w-full space-y-4">
                {currentApiAlgo.inputSchema.map(input => (
                  <div key={`${selectedAlgoId}-${input.name}`} className="w-full">
                    <label className={`block text-xs font-medium mb-1 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>{input.label}</label>
                    <input 
                      type="text"
                      className={`p-2 rounded-lg w-full text-center text-sm border focus:outline-none transition-colors ${
                        isLight 
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500 focus:bg-white' 
                          : 'bg-black/20 border-white/10 text-white focus:border-blue-500'
                      }`}
                      defaultValue={
                        input.type === 'array' && Array.isArray(customInput?.[input.name])
                          ? customInput[input.name].join(', ')
                          : customInput?.[input.name] || ''
                      }
                      onBlur={(e) => handleInputChange(input.name, e.target.value, input.type)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                           handleInputChange(input.name, e.target.value, input.type);
                           e.target.blur();
                        }
                      }}
                      placeholder={`Enter ${input.label}`}
                      title={input.description}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full">
                <label className={`block text-xs font-medium mb-1 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>Array</label>
                <input 
                  type="text"
                  className={`p-2 rounded-lg w-full text-center text-sm border focus:outline-none transition-colors ${
                    isLight 
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500 focus:bg-white' 
                      : 'bg-black/20 border-white/10 text-white focus:border-blue-500'
                  }`}
                  defaultValue={customInput?.array?.join(', ')}
                  onBlur={(e) => handleInputChange('array', e.target.value, 'array')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleInputChange('array', e.target.value, 'array');
                  }}
                  placeholder="e.g. 5, 2, 9, 1"
                />
              </div>
            )}
            
            <p className={`text-xs mt-4 text-center ${isLight ? 'text-slate-400' : 'text-gray-500'}`}>Press Enter to regenerate from step 0.</p>
          </div>

          {/* Progress & bookmarks */}
          <div className="flex-[1.5] min-h-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex flex-col justify-center items-center">
             <p className="font-medium text-gray-300 mb-4 text-center">Progress & bookmarks</p>
             <p className="text-white font-semibold mb-2">Completed: <span className="text-blue-400">{currentStepIndex + 1} / {steps.length}</span></p>
             <p className="text-gray-400 text-sm mb-4">Bookmarked: <span className="text-gray-500 italic">none yet</span></p>
             <div className="w-full bg-black/30 rounded-full h-2">
               <div 
                 className="bg-green-500 h-2 rounded-full transition-all duration-300"
                 style={{ width: `${steps.length > 1 ? (currentStepIndex / (steps.length - 1)) * 100 : 0}%` }}
               ></div>
             </div>
          </div>
        </div>

        {/* Middle Column: Canvas & Explanation */}
        <div className="flex flex-col flex-[4] gap-4 h-full min-h-0 min-w-0 animate-slide-up stagger-2">
          <div className="flex-[2.5] min-h-0">
            <Canvas state={currentStep?.state} algoId={selectedAlgoId} />
          </div>
          
          <div className="flex-[2.5] min-h-0">
            <ExplanationPanel 
              steps={steps}
              currentStepIndex={currentStepIndex}
            />
          </div>
        </div>

        {/* Right Column: Code & State */}
        <div className="flex flex-col flex-[2.8] gap-4 h-full min-h-0 min-w-0 overflow-x-hidden animate-slide-up stagger-3">
          <div className="flex-[3] min-h-0">
            <CodePanel 
              codeSamples={algorithmData?.code}
              activeLines={currentStep?.activeLines}
            />
          </div>
          
          <div className="flex-[1.5] min-h-0">
            <StatePanel state={currentStep?.state} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Layout;
