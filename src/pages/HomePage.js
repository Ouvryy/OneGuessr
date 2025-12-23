import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext'; 
import { useSound } from '../context/SoundContext'; 

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

export default function HomePage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const { playSound } = useSound();

  const [showInfo, setShowInfo] = useState(false);

  const translations = {
    fr: {
      title: "OneGuessr",
      play: "JOUER",
      hardMode: "MODE DIFFICILE",
      stats: "Statistiques",
      settings: "Paramètres",
      infoTitle: "À propos du jeu",
      betaText: "Le jeu est une beta, tout retour est le bienvenu à cette adresse :",
      goalTitle: "But du jeu :",
      goalText: "Deviner l'arc narratif de One Piece dans lequel le scan se situe en 10 secondes (ou le numéro exact du chapitre en mode difficile).",
      scopeText: "Il n'y a que les arcs de Punk Hazard à Erbaf (c'est normal pour le moment).",
      close: "Fermer",
      creditsTitle: "CRÉDITS",
      logoLabel: "Logo :",
      animLabel: "Animations :",
      musicLabel: "Musique :",
      sfxLabel: "Effets Sonores :",
      goat: "AND MY GOAT PYTHON"
    },
    en: {
      title: "OneGuessr",
      play: "PLAY",
      hardMode: "HARD MODE PLAY",
      stats: "Statistics",
      settings: "Settings",
      infoTitle: "About the game",
      betaText: "The game is in beta, any feedback is welcome at:",
      goalTitle: "Goal:",
      goalText: "Guess the One Piece narrative arc of the panel within 10 seconds (or the exact chapter number in hard mode).",
      scopeText: "Currently only contains arcs from Punk Hazard to Elbaf.",
      close: "Close",
      creditsTitle: "CREDITS",
      logoLabel: "Logo:",
      animLabel: "Animation:",
      musicLabel: "Music:",
      sfxLabel: "Sound Effects:",
      goat: "AND MY GOAT PYTHON"
    }
  };

  const t = translations[language];

  const handleHover = () => playSound('/sounds/sound_effect/zipclick.mp3', 0.4);
  const handleClick = (action) => {
    playSound('/sounds/sound_effect/button-click-289742.mp3');
    if (action) action();
  };

  const buttonClass = `
    py-3 px-6 rounded-lg shadow-lg font-bold 
    border-2 transition-all duration-300
    uppercase tracking-wider
    hover:scale-105
    
    bg-[#CC213B] border-[#CC213B] text-white
    hover:bg-transparent hover:text-[#CC213B]
    
    dark:bg-[#E6B96F] dark:border-[#E6B96F] dark:text-black
    dark:hover:bg-transparent dark:hover:text-[#E6B96F]
  `;

  const infoButtonClass = `
    fixed top-4 left-4 z-50
    w-12 h-12 rounded-full shadow-lg flex items-center justify-center
    border-2 transition-all duration-300 hover:scale-110
    
    ${isDark 
      ? "bg-[#E6B96F] border-[#E6B96F] text-black hover:bg-transparent hover:text-[#E6B96F]" 
      : "bg-[#CC213B] border-[#CC213B] text-white hover:bg-transparent hover:text-[#CC213B]"
    }
  `;

  return (
    <div className="min-h-screen bg-white dark:bg-bgDark text-black dark:text-white flex flex-col items-center justify-center text-center pb-8 pt-20 px-4 transition-colors duration-300">

      <button
        onClick={() => handleClick(() => setShowInfo(true))}
        onMouseEnter={handleHover}
        className={infoButtonClass}
        aria-label="Information"
      >
        <InfoIcon />
      </button>

      {showInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className={`
            relative max-w-lg w-full p-6 rounded-2xl shadow-2xl border-2 text-left
            flex flex-col gap-4 max-h-[90vh] overflow-y-auto
            ${isDark 
              ? "bg-[#1e1e1e] border-[#E6B96F] text-white" 
              : "bg-white border-[#CC213B] text-black"
            }
          `}>
            <button 
              onClick={() => handleClick(() => setShowInfo(false))}
              className={`absolute top-4 right-4 p-1 rounded-full transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-black/10"}`}
            >
              <CloseIcon />
            </button>

            <h2 className={`text-2xl font-bold uppercase tracking-widest ${isDark ? "text-[#E6B96F]" : "text-[#CC213B]"}`}>
              {t.infoTitle}
            </h2>

            <div className="space-y-4 text-sm md:text-base font-medium opacity-90">
              <p>
                {t.betaText} <a href="mailto:couvry@ensc.fr" className="underline font-bold hover:opacity-80">couvry@ensc.fr</a>
              </p>

              <div>
                <p className={`font-bold mb-1 ${isDark ? "text-[#E6B96F]" : "text-[#CC213B]"}`}>{t.goalTitle}</p>
                <p>{t.goalText}</p>
              </div>

              <p className="italic font-bold mb-2">
                {t.scopeText}
              </p>
            </div>

            <hr className={`my-2 border-2 ${isDark ? "border-[#E6B96F]/30" : "border-[#CC213B]/30"}`} />

            <div className="text-sm md:text-base space-y-2 opacity-90 font-medium">
              <h3 className={`font-bold uppercase tracking-widest mb-2 ${isDark ? "text-[#E6B96F]" : "text-[#CC213B]"}`}>
                {t.creditsTitle}
              </h3>
              
              <p><span className="font-bold">{t.logoLabel}</span> Onepiece animation frame</p>
              
              <div className="space-y-1">
                <p className="font-bold">{t.animLabel}</p>
                <ul className="list-disc list-inside pl-2">
                  <li>Buggy the clown : semijuggalo@yahoo.com</li>
                  <li>Zoro : CROIX</li>
                  <li>Luffy : Paddy</li>
                </ul>
              </div>

              <p><span className="font-bold">{t.musicLabel}</span> Franky theme made by Shirō Hamaguchi</p>
              
              <p>
                <span className="font-bold">{t.sfxLabel}</span>{' '}
                <a 
                  href="https://pixabay.com/sound-effects/search/game%20over%20sound%20effect/?pagi=5" 
                  target="_blank" 
                  rel="noreferrer"
                  className="underline hover:text-[#CC213B] dark:hover:text-[#E6B96F] transition-colors"
                >
                  pixabay
                </a> & Youtube
              </p>

              <p className="font-black mt-2 text-sm tracking-wide">
                {t.goat}
              </p>
            </div>

            <button
              onClick={() => handleClick(() => setShowInfo(false))}
              onMouseEnter={handleHover}
              className={`
                mt-2 py-2 px-6 rounded-lg font-bold uppercase tracking-wider transition-all hover:scale-105 border-2 self-center
                ${isDark 
                  ? "bg-[#E6B96F] text-black border-[#E6B96F] hover:bg-transparent hover:text-[#E6B96F]" 
                  : "bg-[#CC213B] text-white border-[#CC213B] hover:bg-transparent hover:text-[#CC213B]"
                }
              `}
            >
              {t.close}
            </button>
          </div>
        </div>
      )}

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
          onClick={() => handleClick(() => navigate('/game'))}
          onMouseEnter={handleHover}
          className={buttonClass}
        >
          {t.play}
        </button>

        <button
          onClick={() => handleClick(() => navigate('/hard-game'))}
          onMouseEnter={handleHover}
          className={buttonClass}
        >
          {t.hardMode}
        </button>

        <button
          onClick={() => handleClick(() => navigate('/stats'))}
          onMouseEnter={handleHover}
          className={buttonClass}
        >
          {t.stats}
        </button>

        <button
          onClick={() => handleClick(() => navigate('/settings'))}
          onMouseEnter={handleHover}
          className={buttonClass}
        >
          {t.settings}
        </button>
      </div>

      <button 
        onClick={() => handleClick(() => setShowInfo(true))}
        className="mt-16 text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 hover:underline transition-all"
      >
        {t.creditsTitle}
      </button>

    </div>
  );
}