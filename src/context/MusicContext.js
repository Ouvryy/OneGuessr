import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); 
  const audioRef = useRef(null);

  useEffect(() => {
    
    audioRef.current = new Audio("/sounds/theme/One Piece- Frankys Theme Extended.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        
        audioRef.current.play().catch(e => console.log("Lecture bloquée par le navigateur :", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  
  const handleVolumeChange = (newVolume) => {
    const vol = parseFloat(newVolume);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    
  };

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic, volume, handleVolumeChange }}>
      {children}
    </MusicContext.Provider>
  );
};