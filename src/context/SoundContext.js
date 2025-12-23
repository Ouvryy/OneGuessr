import React, { createContext, useContext, useState } from 'react';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  // Par défaut, les bruitages sont activés
  const [isSoundOn, setIsSoundOn] = useState(true);

  const toggleSound = () => {
    setIsSoundOn(prev => !prev);
  };

  // Fonction universelle pour jouer un son
  const playSound = (soundPath, volume = 1.0) => {
    if (isSoundOn) {
      const audio = new Audio(soundPath);
      audio.volume = volume;
      // .catch évite les erreurs si le navigateur bloque l'audio trop rapide
      audio.play().catch(e => console.warn("Audio bloqué ou fichier manquant:", e));
    }
  };

  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};