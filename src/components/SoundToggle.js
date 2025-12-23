import React from "react";
import { useSound } from "../context/SoundContext";
import { useTheme } from "../context/ThemeContext";

export default function SoundToggle() {
  const { isSoundOn, toggleSound, playSound } = useSound(); 
  const { isDark } = useTheme();

  return (
    <button
      onClick={() => {
        playSound('/sounds/sound_effect/button-click-289742.mp3');
        toggleSound();
      }}
      onMouseEnter={() => playSound('/sounds/sound_effect/zipclick.mp3', 0.4)}

      aria-label={isSoundOn ? "Désactiver les bruitages" : "Activer les bruitages"}
      className={`
        fixed top-4 right-64 z-50 
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
          ${isSoundOn ? "translate-x-4" : "-translate-x-4"}
          bg-white
          ${isDark ? "text-[#CC213B]" : "text-[#E6B96F]"}
        `}
      >
        {isSoundOn ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.5 12a5.96 5.96 0 01-1.22 3.682l1.06 1.06a7.46 7.46 0 001.22-4.742 7.46 7.46 0 00-1.22-4.742l-1.06 1.06A5.96 5.96 0 0118.5 12z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-50">
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 10-1.06-1.06l-1.72 1.72-1.72-1.72z" />
          </svg>
        )}
      </div>
    </button>
  );
}