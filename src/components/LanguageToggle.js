import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useSound } from "../context/SoundContext"; 

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const { isDark } = useTheme();
  const { playSound } = useSound(); 

  const isFrench = language === 'fr';

  return (
    <button
      onClick={() => {
        playSound('/sounds/sound_effect/button-click-289742.mp3');
        toggleLanguage();
      }}
      onMouseEnter={() => playSound('/sounds/sound_effect/zipclick.mp3', 0.4)}

      aria-label="Changer la langue"
      className={`
        fixed top-4 right-24 z-50 
        w-16 h-8 rounded-full shadow-md 
        flex items-center 
        border-2 transition-all duration-300 hover:scale-105
        ${isDark 
          ? "bg-[#CC213B] border-[#CC213B] " 
          : "bg-[#E6B96F] border-[#E6B96F] "
        }
      `}
    >
      <div
        className={`
          w-7 h-7 rounded-full shadow-sm
          flex items-center justify-center
          text-[10px] font-black tracking-tighter
          transition-all duration-300 transform
          ${isFrench ? "translate-x-1" : "translate-x-8"}
          bg-white
          ${isDark ? "text-[#E6B96F]" : "text-[#CC213B]"}
        `}
      >
        {isFrench ? "FR" : "EN"}
      </div>
    </button>
  );
}