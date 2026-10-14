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

  const currentAlgo = displayAlgorithms.find(a => a.id === selectedAlgoId);

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Sorting':
        return isLight ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'Dynamic Programming':
        return isLight ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'Graphs':
        return isLight ? 'bg-cyan-50 text-cyan-700 border-cyan-200' : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30';
      case 'Trees':
        return isLight ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'Searching':
        return isLight ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-amber-500/20 text-amber-300 border-amber-400/30';
      case 'Backtracking':
        return isLight ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-rose-500/20 text-rose-300 border-rose-400/30';
      default:
        return isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-white/10 text-gray-200 border-white/20';
    }
  };

  return (
    <div className={`flex flex-col h-full w-full font-sans p-4 overflow-hidden relative transition-colors duration-300 ${
      isLight 
        ? 'bg-gradient-to-br from-slate-50 via-indigo-50/25 to-sky-50/20 text-slate-800' 
        : 'bg-[#0f172a] text-gray-200'
    }`}>
      {/* Background gradients for glassmorphism effect */}
      <div className={`absolute top-[-10%] left-[-10%] w-[45%] h-[45%] blur-[120px] rounded-full pointer-events-none transition-opacity duration-300 ${
        isLight ? 'bg-blue-300/35' : 'bg-blue-600/60'
      }`}></div>
      <div className={`absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] blur-[120px] rounded-full pointer-events-none transition-opacity duration-300 ${
        isLight ? 'bg-purple-300/30' : 'bg-purple-600/60'
      }`}></div>
      <div className={`absolute top-[35%] right-[25%] w-[35%] h-[35%] blur-[130px] rounded-full pointer-events-none transition-opacity duration-300 ${
        isLight ? 'bg-emerald-200/25' : 'bg-indigo-900/20'
      }`}></div>

      {/* Navbar & Algorithm Selector */}
      <nav className={`flex justify-between items-center mb-5 z-10 backdrop-blur-md p-2.5 rounded-xl transition-all duration-300 ${
        isLight ? 'bg-white/95 border border-slate-200/90 shadow-xs' : 'bg-white/10 border border-white/20 shadow-xl'
      }`}>
        <div className="flex-1 flex items-center justify-start gap-3 pl-1">
          <select 
            className={`px-3 py-2 rounded-lg shadow-2xs min-w-[240px] outline-none cursor-pointer text-sm font-semibold transition-all ${
              isLight 
                ? 'bg-white border border-slate-200 text-slate-800 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100' 
                : 'bg-[#1e293b] border border-white/30 text-white focus:ring-blue-500 focus:border-blue-500'
            }`}
            value={selectedAlgoId}
            onChange={(e) => selectAlgorithm(e.target.value)}
          >
            {displayAlgorithms.map(algo => (
              <option key={algo.id} value={algo.id}>
                {bookmarkedAlgoIds.includes(algo.id) ? '📌 ' : ''}{algo.name}
              </option>
            ))}
          </select>

          {currentAlgo?.category && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shadow-2xs hidden sm:inline-block ${getCategoryBadgeClass(currentAlgo.category)}`}>
              {currentAlgo.category}
            </span>
          )}
        </div>
        
        <div className="flex justify-center items-center flex-1">
          <span className={`text-xs font-medium px-3 py-1 rounded-full hidden md:inline-block ${
            isLight ? 'bg-slate-100 text-slate-600 border border-slate-200/60' : 'bg-white/5 text-gray-300 border border-white/10'
          }`}>
            Interactive Algorithm Canvas
          </span>
        </div>
        
        <div className="flex justify-end flex-1 pr-1">
          <button 
            onClick={toggleBookmark}
            className={`transition-all duration-200 p-2 rounded-xl flex items-center gap-1.5 text-xs font-semibold cursor-pointer border ${
              isBookmarked 
                ? isLight
                  ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-2xs'
                  : 'bg-rose-500/20 text-rose-400 border-rose-400/30'
                : isLight 
                  ? 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200/70 shadow-2xs' 
                  : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border-white/10'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Algorithm'}
          >
            <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
            <span className="hidden sm:inline">{isBookmarked ? 'Pinned' : 'Pin'}</span>
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
            isLight ? 'bg-white/95 border border-slate-200/90 text-slate-700 shadow-xs' : 'bg-white/10 border border-white/20 text-gray-400 shadow-xl'
          }`}>
            <p className={`font-semibold mb-3 sticky top-0 w-full text-center py-1.5 rounded-lg text-xs tracking-wider uppercase transition-colors ${
              isLight ? 'bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 border border-slate-200/80 text-slate-800 shadow-2xs' : 'bg-[#1e293b]/80 text-gray-300 border border-white/10'
            }`}>Custom Input</p>
            
            {currentApiAlgo?.inputSchema ? (
              <div className="w-full space-y-3.5">
                {currentApiAlgo.inputSchema.map(input => (
                  <div key={`${selectedAlgoId}-${input.name}`} className="w-full">
                    <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>{input.label}</label>
                    <input 
                      type="text"
                      className={`p-2 rounded-lg w-full text-center text-sm border font-mono transition-all ${
                        isLight 
                          ? 'bg-slate-50/70 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-2xs' 
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
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Array Elements</label>
                <input 
                  type="text"
                  className={`p-2 rounded-lg w-full text-center text-sm border font-mono transition-all ${
                    isLight 
                      ? 'bg-slate-50/70 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-2xs' 
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
            
            <p className={`text-[11px] mt-auto pt-3 text-center ${isLight ? 'text-slate-400 font-medium' : 'text-gray-500'}`}>
              Press Enter to regenerate from step 0
            </p>
          </div>

          {/* Progress & bookmarks */}
          <div className={`flex-[1.5] min-h-0 backdrop-blur-md rounded-xl p-4 flex flex-col justify-between transition-all duration-300 ${
            isLight 
              ? 'bg-white/95 border border-slate-200/90 shadow-xs text-slate-800' 
              : 'bg-white/10 border border-white/20 shadow-xl text-white'
          }`}>
            <div className={`w-full flex items-center justify-between pb-2 border-b ${
              isLight ? 'border-slate-100' : 'border-white/10'
            }`}>
              <span className={`text-xs font-semibold uppercase tracking-wider ${
                isLight ? 'text-slate-500' : 'text-gray-400'
              }`}>
                Progress & Pinned
              </span>
              {isBookmarked ? (
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                  isLight ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-rose-500/20 text-rose-300 border-rose-400/30'
                }`}>
                  Pinned
                </span>
              ) : (
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                  isLight ? 'bg-slate-100 text-slate-500 border-slate-200/60' : 'bg-white/5 text-gray-400 border-white/10'
                }`}>
                  Unpinned
                </span>
              )}
            </div>

            <div className="w-full my-auto space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className={isLight ? 'text-slate-600 font-medium' : 'text-gray-300'}>Simulation Progress</span>
                <span className={`font-mono font-bold ${isLight ? 'text-indigo-600' : 'text-blue-400'}`}>
                  {steps.length > 0 ? Math.round((currentStepIndex / Math.max(steps.length - 1, 1)) * 100) : 0}%
                </span>
              </div>
              
              <div className={`w-full rounded-full h-2 overflow-hidden ${
                isLight ? 'bg-slate-100 border border-slate-200/70' : 'bg-black/30'
              }`}>
                <div 
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${steps.length > 1 ? (currentStepIndex / (steps.length - 1)) * 100 : 0}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center text-[11px] pt-1">
                <span className={isLight ? 'text-slate-400 font-medium' : 'text-gray-500'}>
                  Step {Math.min(currentStepIndex + 1, steps.length)} of {steps.length}
                </span>
                <span className={isLight ? 'text-slate-500 font-medium' : 'text-gray-400'}>
                  {bookmarkedAlgoIds.length} pinned total
                </span>
              </div>
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
