import React, { useState, useEffect, useRef } from "react";
// Import des contextes
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { useMusic } from "../context/MusicContext";
import { useSound } from "../context/SoundContext";

// --- ICÔNES ---
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 5.389c-.42.18-.813.395-1.18.636l-1.374-.803c-.868-.507-1.956-.157-2.378.765l-1.286 2.825c-.422.923-.072 2.01.795 2.518l1.375.804c-.024.46-.024.922 0 1.382l-1.375.804c-.867.507-1.217 1.595-.795 2.518l1.286 2.825c.422.922 1.51 1.272 2.378.765l1.374-.803c.367.241.76.456 1.18.636l.178 1.572c.15.904.933 1.567 1.85 1.567h2.828c.917 0 1.699-.663 1.85-1.567l.178-1.572c.42-.18.813-.395 1.18-.636l1.374.803c.868.507 1.956.157 2.378-.765l1.286-2.825c.422-.923.072-2.01-.795-2.518l-1.375-.804c.024-.46.024-.922 0-1.382l1.375-.804c.867-.507 1.217-1.595.795-2.518l-1.286-2.825c-.422-.922-1.51-1.272-2.378-.765l-1.374.803a8.624 8.624 0 00-1.18-.636l-.178-1.572C15.22 2.913 14.437 2.25 13.52 2.25H11.08zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" clipRule="evenodd" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

// --- SOUS-COMPOSANT : Ligne du menu ---
const SettingsItem = ({ label, value, onClick, isDark, playSound }) => (
  <div 
    onClick={() => {
      playSound('/sounds/sound_effect/button-click-289742.mp3');
      onClick();
    }}
    onMouseEnter={() => playSound('/sounds/sound_effect/zipclick.mp3', 0.4)}
    className={`
      flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200
      /* Survol : Fond coloré léger selon le thème inversé */
      ${isDark 
        ? "text-white hover:bg-[#E6B96F]/20"  // Mode Sombre : Hover Or
        : "text-black hover:bg-[#CC213B]/20"  // Mode Clair : Hover Rouge
      }
    `}
  >
    <span className="font-bold text-sm md:text-base uppercase tracking-wider">{label}</span>
    
    {/* Badge de valeur (ON/OFF/FR/EN...) */}
    <div className={`
      px-3 py-1 rounded-full text-xs font-bold shadow-sm transition-colors border
      ${isDark 
        ? "bg-[#E6B96F] border-[#E6B96F] text-black" // Mode Sombre : Badge Or (Texte Noir)
        : "bg-[#CC213B] border-[#CC213B] text-white" // Mode Clair : Badge Rouge (Texte Blanc)
      }
    `}>
      {value}
    </div>
  </div>
);

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Contextes
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { isPlaying, toggleMusic } = useMusic();
  const { isSoundOn, toggleSound, playSound } = useSound();

  // Traductions
  const t = {
    fr: {
      settings: "Paramètres",
      language: "Langue",
      theme: "Thème",
      music: "Musique",
      sound: "Sons",
      on: "ON",
      off: "OFF",
      dark: "Sombre",
      light: "Clair"
    },
    en: {
      settings: "Settings",
      language: "Language",
      theme: "Theme",
      music: "Music",
      sound: "Sound",
      on: "ON",
      off: "OFF",
      dark: "Dark",
      light: "Light"
    }
  }[language];

  // Fermer le menu au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    playSound('/sounds/sound_effect/button-click-289742.mp3');
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-4 right-4 z-50" ref={menuRef}>
      
      {/* 1. BOUTON PRINCIPAL (ENGRENAGE) 
          Style Ghost : Fond coloré -> Transparent au survol
      */}
      <button
        onClick={toggleMenu}
        onMouseEnter={() => playSound('/sounds/sound_effect/zipclick.mp3', 0.4)}
        className={`
          w-12 h-12 rounded-full shadow-lg flex items-center justify-center
          border-2 transition-all duration-300 hover:scale-110
          ${isDark 
            /* MODE SOMBRE : Or -> Transparent (Texte Or) */
            ? "bg-[#E6B96F] border-[#E6B96F] text-black hover:bg-transparent hover:text-[#E6B96F]" 
            /* MODE CLAIR : Rouge -> Transparent (Texte Rouge) */
            : "bg-[#CC213B] border-[#CC213B] text-white hover:bg-transparent hover:text-[#CC213B]"
          }
        `}
      >
        {isOpen ? <CloseIcon /> : <SettingsIcon />}
      </button>

      {/* 2. MENU DÉROULANT */}
      <div className={`
        absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl overflow-hidden
        transition-all duration-300 origin-top-right transform
        ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
        
        /* Couleurs du Menu : Bordure colorée + Fond adapté */
        ${isDark 
          ? "bg-[#1e1e1e] border-2 border-[#E6B96F]" // Bordure Or en Dark
          : "bg-white border-2 border-[#CC213B]"     // Bordure Rouge en Light
        }
      `}>
        
        {/* En-tête */}
        <div className={`
          p-4 border-b text-center font-black text-lg tracking-widest uppercase
          ${isDark 
            ? "border-gray-700 text-[#E6B96F]" // Texte Or en Dark
            : "border-gray-200 text-[#CC213B]" // Texte Rouge en Light
          }
        `}>
          {t.settings}
        </div>

        {/* Liste des options */}
        <div className="p-2 flex flex-col gap-1">
          
          <SettingsItem 
            label={t.language}
            value={language.toUpperCase()}
            onClick={toggleLanguage}
            isDark={isDark}
            playSound={playSound}
          />

          <SettingsItem 
            label={t.theme}
            value={isDark ? t.dark : t.light}
            onClick={toggleTheme}
            isDark={isDark}
            playSound={playSound}
          />

          <SettingsItem 
            label={t.music}
            value={isPlaying ? t.on : t.off}
            onClick={toggleMusic}
            isDark={isDark}
            playSound={playSound}
          />

          <SettingsItem 
            label={t.sound}
            value={isSoundOn ? t.on : t.off}
            onClick={toggleSound}
            isDark={isDark}
            playSound={playSound}
          />

        </div>
      </div>
    </div>
  );
}