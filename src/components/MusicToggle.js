import React from "react";
import { useMusic } from "../context/MusicContext";
import { useTheme } from "../context/ThemeContext";
import { useSound } from "../context/SoundContext"; 

export default function MusicToggle() {
  const { isPlaying, toggleMusic } = useMusic();
  const { isDark } = useTheme();
  const { playSound } = useSound();

  return (
    <button
      onClick={() => {
        playSound('/sounds/sound_effect/button-click-289742.mp3');
        toggleMusic();
      }}
      onMouseEnter={() => playSound('/sounds/sound_effect/zipclick.mp3', 0.4)}

      aria-label={isPlaying ? "Couper la musique" : "Lancer la musique"}
      className={`
        fixed top-4 right-44 z-50 
        w-16 h-8 rounded-full shadow-md 
        flex items-center justify-center
        border-2 transition-all duration-300 hover:scale-105
        ${isDark 
          ? "bg-[#CC213B] border-[#CC213B]" 
          : "bg-[#E6B96F] border-[#E6B96F]"
        }
      `}
    >
      <div
        className={`
          w-7 h-7 rounded-full shadow-sm
          flex items-center justify-center
          transition-all duration-300 transform
          ${isPlaying ? "translate-x-4" : "-translate-x-4"}
          bg-white
          ${isDark ? "text-[#CC213B]" : "text-[#E6B96F]"}
        `}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V9.017c0-.56.406-1.046.953-1.189l10-2.857a.75.75 0 01.751.682z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-50">
            <path d="M12.001 21a9.002 9.002 0 0 1-9.002-9.002 8.956 8.956 0 0 1 1.72-5.412l12.695 12.695A8.955 8.955 0 0 1 12.001 21Zm7.282-3.718L6.41 4.41A8.954 8.954 0 0 1 12.001 3a9.002 9.002 0 0 1 9.002 9.002 8.954 8.954 0 0 1-1.72 5.28Z" />
          </svg>
        )}
      </div>
    </button>
  );
}