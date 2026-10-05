import { useState, useEffect, useRef } from 'react';

export const useTTS = (textToSpeak, isPlaying) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (!synth) {
      console.warn('Text-to-speech not supported in this browser.');
      return;
    }

    // Cancel any ongoing speech when text changes or playback stops
    synth.cancel();
    setIsSpeaking(false);

    if (textToSpeak && isPlaying && !isMuted) {
      setIsSpeaking(true);
      utteranceRef.current = new SpeechSynthesisUtterance(textToSpeak);
      // Can adjust properties like rate, pitch, voice here
      utteranceRef.current.rate = 1.0; 
      
      utteranceRef.current.onend = () => setIsSpeaking(false);
      utteranceRef.current.onerror = () => setIsSpeaking(false);
      
      synth.speak(utteranceRef.current);
    }

    return () => {
      synth.cancel();
      setIsSpeaking(false);
    };
  }, [textToSpeak, isPlaying, isMuted, synth]);

  const toggleMute = () => setIsMuted(!isMuted);

  return { isMuted, toggleMute, isSpeaking };
};
