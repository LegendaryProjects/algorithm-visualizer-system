import { useState, useEffect, useRef, useCallback } from 'react';
import { algorithms as localAlgorithms } from '../algorithms';

import { useTTS } from './useTTS';

export const useSimulationEngine = () => {
  const [apiAlgorithms, setApiAlgorithms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlgoId, setSelectedAlgoId] = useState('binarySearch');
  const [customInput, setCustomInput] = useState(localAlgorithms['binarySearch'].defaultInput);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000); // ms per step

  const timerRef = useRef(null);
  
  const currentStep = steps[currentStepIndex] || null;

  const { isMuted, toggleMute, isSpeaking } = useTTS(
    currentStep?.narration,
    isPlaying
  );

  // Fetch algorithms metadata and input schemas from API
  useEffect(() => {
    fetch('http://localhost:5555/api/algorithms')
      .then(res => res.json())
      .then(data => {
         setApiAlgorithms(data);
         setLoading(false);
         const initialAlgo = data.find(a => a.id === 'binarySearch');
         if (initialAlgo && !customInput) {
            setCustomInput(initialAlgo.defaultInput);
         }
      })
      .catch(err => {
         console.error("Error fetching algorithms from API:", err);
         setLoading(false);
      });
  }, []);

  // Generate steps whenever algorithm or input changes
  useEffect(() => {
    const localAlgo = localAlgorithms[selectedAlgoId];
    const apiAlgo = apiAlgorithms.find(a => a.id === selectedAlgoId);
    
    if (localAlgo && customInput) {
      try {
        const generatedSteps = localAlgo.generateSteps(customInput, apiAlgo?.templates);
        setSteps(generatedSteps);
        setCurrentStepIndex(0);
        setIsPlaying(false);
      } catch (error) {
        console.error("Failed to generate steps:", error);
      }
    }
  }, [selectedAlgoId, customInput, apiAlgorithms]);

  const play = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setIsPlaying(true);
    }
  }, [currentStepIndex, steps.length]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const stepForward = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [currentStepIndex, steps.length]);

  const stepBackward = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);

  const restart = useCallback(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, []);

  const selectAlgorithm = useCallback((algoId) => {
    setSelectedAlgoId(algoId);
    const apiAlgo = apiAlgorithms.find(a => a.id === algoId);
    if (apiAlgo) {
       setCustomInput(apiAlgo.defaultInput);
    } else {
       setCustomInput(localAlgorithms[algoId].defaultInput);
    }
  }, [apiAlgorithms]);

  useEffect(() => {
    if (isPlaying && !isSpeaking) {
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, playbackSpeed);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, isSpeaking, currentStepIndex, steps.length, playbackSpeed]);

  const apiAlgorithmData = apiAlgorithms.find(a => a.id === selectedAlgoId);

  return {
    apiAlgorithms,
    loading,
    selectedAlgoId,
    algorithmData: apiAlgorithmData || localAlgorithms[selectedAlgoId],
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
    setCurrentStepIndex,
    isMuted,
    toggleMute
  };
};
