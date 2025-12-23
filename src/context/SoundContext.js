import React, { createContext, useContext, useState } from 'react';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [isSoundOn, setIsSoundOn] = useState(true);

  const toggleSound = () => {
    setIsSoundOn(prev => !prev);
  };

 
  const playSound = (soundPath, volume = 1.0) => {
    if (isSoundOn) {
      const audio = new Audio(soundPath);
      audio.volume = volume;
      audio.play().catch(e => console.warn("Audio bloqué ou fichier manquant:", e));
    }
  };

  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};