import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const { playSound } = useSound();

  const translations = {
    fr: {
      title: "OneGuessr",
      play: "JOUER",
      hardMode: "MODE DIFFICILE",
      stats: "Statistiques",
      settings: "Paramètres"
    },
    en: {
      title: "OneGuessr",
      play: "PLAY",
      hardMode: "HARD MODE PLAY",
      stats: "Statistics",
      settings: "Settings"
    }
  };

  const t = translations[language];


  const handleHover = () => {
    playSound('/sounds/sound_effect/zipclick.mp3', 0.4);
  };

 
  const handleNavigation = (path) => {
    playSound('/sounds/sound_effect/button-click-289742.mp3');
    navigate(path);
  };

  const buttonClass = `
    py-3 px-6 rounded-lg shadow-lg font-bold 
    border-2 transition-all duration-300
    uppercase tracking-wider
    hover:scale-105
    bg-btnLight border-btnLight text-white
    hover:bg-transparent hover:text-btnLight
    dark:bg-btnDark dark:border-btnDark dark:text-black
    dark:hover:bg-transparent dark:hover:text-btnDark
  `;

  return (
    <div className="min-h-screen bg-white dark:bg-bgDark text-black dark:text-white flex flex-col items-center justify-center text-center pb-24 px-4 transition-colors duration-300">

      {/* Les boutons Toggle sont gérés dans App.js */}

      <img
        src="/images/Luffy.jpg"
        alt="Luffy"
        className="w-40 h-40 object-cover rounded-full mb-6 border-4
                   border-btnLight dark:border-btnDark"
      />

      <h1 className="text-5xl font-bold mb-12 text-btnLight dark:text-btnDark">
        {t.title}
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">

        <button
          onMouseEnter={handleHover}           
          onClick={() => handleNavigation('/game')} 
          className={buttonClass}
        >
          {t.play}
        </button>

        <button
          onMouseEnter={handleHover}
          onClick={() => handleNavigation('/hard-game')}
          className={buttonClass}
        >
          {t.hardMode}
        </button>

        <button
          onMouseEnter={handleHover}
          onClick={() => handleNavigation('/stats')}
          className={buttonClass}
        >
          {t.stats}
        </button>

        <button
          onMouseEnter={handleHover}
          onClick={() => handleNavigation('/settings')}
          className={buttonClass}
        >
          {t.settings}
        </button>

      </div>
    </div>
  );
}