import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useSound } from "../context/SoundContext"; 

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const { playSound } = useSound(); 

  return (
    <button
      onClick={() => {
        playSound('/sounds/sound_effect/button-click-289742.mp3');
        toggleTheme();
      }}
      onMouseEnter={() => playSound('/sounds/sound_effect/zipclick.mp3', 0.4)}
      
      aria-label="Toggle theme"
      className={`
        fixed top-4 right-4 z-50 
        w-16 h-8 rounded-full shadow-md 
        flex items-center 
        border-2 transition-all duration-300 hover:scale-105
        ${isDark 
          ? "bg-[#CC213B] border-[#CC213B]" 
          : "bg-[#E6B96F] border-[#E6B96F]"
        }
      `}
    >
      <div
        className={`
          w-7 h-7 rounded-full 
          flex items-center justify-center
          transition-all duration-300 transform
          ${isDark ? "translate-x-8" : "translate-x-1"}
          bg-white
        `}
      >
        {isDark ? (
          <svg 
            className="w-4 h-4 transition-colors duration-300" 
            fill="#E6B96F" 
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg 
            className="w-4 h-4 transition-colors duration-300" 
            fill="#CC213B" 
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            />
          </svg>
        )}
      </div>
    </button>
  );
}