import React, { useEffect, useState } from 'react';
import ReturnHomeButton from "../components/ReturnHomeButton";
import { useLanguage } from "../context/LanguageContext";
import { useSound } from "../context/SoundContext";

const ARC_LOCATIONS = [
  { from: 654, to: 699, location: 'Punk Hazard' },
  { from: 700, to: 801, location: 'Dressrosa' },
  { from: 802, to: 822, location: 'Zou' },
  { from: 822, to: 902, location: 'Whole Cake Island' },
  { from: 903, to: 908, location: 'Reverie' },
  { from: 909, to: 1057, location: 'Wano' },
  { from: 1058, to: 1125, location: 'Egg Head' },
  { from: 1126, to: 1144, location: 'Erbaf' }
];

export default function StatsPage() {
  const { language } = useLanguage();
  const { playSound } = useSound();

  const translations = {
    fr: {
      title: "Statistiques",
      resetConfirm: "Voulez-vous vraiment effacer toutes vos statistiques ?",
      classicMode: "Mode Classique",
      hardMode: "Mode Difficile",
      bestScore: "Votre meilleur score :",
      ratio: "Votre ratio :",
      bestArcs: "Vos meilleurs arcs :",
      worstArcs: "Vos pires arcs :",
      maxPerfects: "Score parfait (max) :",
      avgDistance: "Distance moyenne :",
      notEnoughData: "Pas assez de données",
      scan: "scan",
      unknown: "Inconnu"
    },
    en: {
      title: "Statistics",
      resetConfirm: "Are you sure you want to reset all your stats?",
      classicMode: "Classic Mode",
      hardMode: "Hard Mode",
      bestScore: "Your best score:",
      ratio: "Your ratio:",
      bestArcs: "Your best arcs:",
      worstArcs: "Your worst arcs:",
      maxPerfects: "Max Perfect Score:",
      avgDistance: "Average distance:",
      notEnoughData: "Not enough data",
      scan: "chapter(s)",
      unknown: "Unknown"
    }
  };

  const t = translations[language];

  // --- STYLES (Identique aux pages de jeu) ---
  const iconButtonStyle = `
    w-10 h-10 flex items-center justify-center
    rounded-lg shadow-md border-2 
    transition-all duration-300 transform 
    hover:scale-105

    bg-[#CC213B] border-[#CC213B] text-white 
    hover:bg-transparent hover:text-[#CC213B]
    
    dark:bg-[#E6B96F] dark:border-[#E6B96F] dark:text-black 
    dark:hover:bg-transparent dark:hover:text-[#E6B96F]
  `;

  const [classicStats, setClassicStats] = useState({
    ratio: 0,
    bestScore: 0,
    bestArcs: [],
    worstArcs: []
  });

  const [hardStats, setHardStats] = useState({
    bestScore: 0,
    avgDistance: 0,
    maxPerfectsInGame: 0, 
    bestArcs: [],
    worstArcs: []
  });

  const getArcByChapter = (chapter) => {
    const arc = ARC_LOCATIONS.find(a => chapter >= a.from && chapter <= a.to);
    return arc ? arc.location : 'Inconnu';
  };

  useEffect(() => {
    // --- CALCULS CLASSIC ---
    const classicHistory = JSON.parse(localStorage.getItem('answerHistory') || '[]');
    const bestScoreClassic = parseInt(localStorage.getItem("bestScore")) || 0;
    
    // --- CALCULS HARD ---
    const hardHistory = JSON.parse(localStorage.getItem('answerHistoryHard') || '[]');
    const bestScoreHard = parseInt(localStorage.getItem("bestScoreHard")) || 0;

    let cStats = { ratio: 0, bestScore: bestScoreClassic, bestArcs: [], worstArcs: [] };

    if (classicHistory.length > 0) {
        const correctCount = classicHistory.filter(e => e.isCorrect).length;
        cStats.ratio = ((correctCount / classicHistory.length) * 100).toFixed(1);

        const arcPerf = {};
        classicHistory.forEach(({ correctArc, isCorrect }) => {
            if (!arcPerf[correctArc]) arcPerf[correctArc] = { total: 0, correct: 0 };
            arcPerf[correctArc].total++;
            if (isCorrect) arcPerf[correctArc].correct++;
        });

        const sortedArcs = Object.entries(arcPerf)
            .map(([arc, data]) => ({ arc, accuracy: data.correct / data.total }))
            .sort((a, b) => b.accuracy - a.accuracy);

        cStats.bestArcs = sortedArcs.slice(0, 3).map(a => a.arc);
        cStats.worstArcs = sortedArcs.slice(-3).reverse().map(a => a.arc);
    }
    setClassicStats(cStats);

    let hStats = { bestScore: bestScoreHard, avgDistance: 0, maxPerfectsInGame: 0, bestArcs: [], worstArcs: [] };

    if (hardHistory.length > 0) {
        const totalDistance = hardHistory.reduce((sum, e) => sum + Math.abs(e.userAnswer - e.correctChapter), 0);
        hStats.avgDistance = (totalDistance / hardHistory.length).toFixed(1);

        const arcDistances = {};
        hardHistory.forEach(({ correctChapter, userAnswer }) => {
            const arc = getArcByChapter(correctChapter);
            const distance = Math.abs(userAnswer - correctChapter);
            if (!arcDistances[arc]) arcDistances[arc] = { totalDist: 0, count: 0 };
            arcDistances[arc].totalDist += distance;
            arcDistances[arc].count++;
        });

        const sortedHardArcs = Object.entries(arcDistances)
            .map(([arc, data]) => ({ arc, avgDist: data.totalDist / data.count }))
            .sort((a, b) => a.avgDist - b.avgDist);

        hStats.bestArcs = sortedHardArcs.slice(0, 3).map(a => a.arc);
        hStats.worstArcs = sortedHardArcs.slice(-3).reverse().map(a => a.arc);

        const sortedHistory = [...hardHistory].sort((a, b) => a.timestamp - b.timestamp);
        
        let currentPerfects = 0;
        let currentErrors = 0;
        let maxPerfects = 0;

        sortedHistory.forEach(entry => {
            const difference = Math.abs(entry.userAnswer - entry.correctChapter);
            if (difference === 0) currentPerfects++;
            if (entry.points === -1) currentErrors++;
            
            if (currentErrors >= 3) {
                if (currentPerfects > maxPerfects) maxPerfects = currentPerfects;
                currentPerfects = 0;
                currentErrors = 0;
            }
        });
        
        if (currentPerfects > maxPerfects) maxPerfects = currentPerfects;
        hStats.maxPerfectsInGame = maxPerfects;
    }
    setHardStats(hStats);
  }, []);

  // --- FONCTION RESET ---
  const handleReset = () => {
    if (window.confirm(t.resetConfirm)) {
        playSound('/sounds/sound_effect/button-click-289742.mp3');
        
        localStorage.removeItem('answerHistory');
        localStorage.removeItem('bestScore');
        localStorage.removeItem('answerHistoryHard');
        localStorage.removeItem('bestScoreHard');
        localStorage.removeItem('currentScoreHard');
        localStorage.removeItem('errorCountHard');

        setClassicStats({ ratio: 0, bestScore: 0, bestArcs: [], worstArcs: [] });
        setHardStats({ bestScore: 0, avgDistance: 0, maxPerfectsInGame: 0, bestArcs: [], worstArcs: [] });
    }
  };

  const handleHover = () => playSound('/sounds/sound_effect/zipclick.mp3', 0.4);

  const ArcList = ({ arcs }) => (
    arcs.length > 0 ? arcs.join(", ") : t.notEnoughData
  );

  return (
    <div className="
      min-h-screen w-full 
      bg-white dark:bg-[#1e1e1e] 
      transition-colors duration-300 
      flex flex-col items-center 
      p-4 pt-20 md:p-10
    ">
      
      <ReturnHomeButton />
      {/* Toggles globaux dans App.js */}

      <h1 className="text-3xl md:text-5xl font-bold mb-2 text-[#CC213B] dark:text-[#E6B96F] transition-colors underline">
        OneGuessr
      </h1>

      {/* TITRE + BOUTON RESET (LOGO FLÈCHE) */}
      <div className="flex items-center gap-4 mb-8 md:mb-12">
        <h2 className="text-lg md:text-xl text-[#CC213B] dark:text-[#E6B96F] transition-colors tracking-widest uppercase font-bold">
            {t.title}
        </h2>
        
        <button
            onClick={handleReset}
            onMouseEnter={handleHover}
            className={iconButtonStyle}
            title="Reset Statistics"
        >
            {/* ICI : LE LOGO FLÈCHE QUI TOURNE (REPLAY) */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-6xl justify-center items-stretch">

        {/* === BLOC MODE CLASSIQUE === */}
        <div className="flex-1 flex flex-col w-full">
          <h3 className="text-xl md:text-2xl mb-4 font-bold text-center text-black dark:text-white">
            {t.classicMode}
          </h3>
          
          <div className="
            flex-1 w-full 
            p-6 md:p-8 rounded-[30px] shadow-lg 
            flex flex-col gap-4 text-left text-base md:text-lg
            transition-colors duration-300
            bg-[#CC213B] text-white 
            dark:bg-[#E6B96F] dark:text-black
          ">
            <p>
              <span className="font-bold">{t.bestScore}</span> {classicStats.bestScore}
            </p>
            <p>
              <span className="font-bold">{t.ratio}</span> {classicStats.ratio}%
            </p>
            
            <div className="flex flex-col xl:flex-row xl:items-baseline gap-1">
                <span className="font-bold whitespace-nowrap">{t.bestArcs}</span>
                <span className="font-medium opacity-90"><ArcList arcs={classicStats.bestArcs} /></span>
            </div>
            
            <div className="flex flex-col xl:flex-row xl:items-baseline gap-1">
                <span className="font-bold whitespace-nowrap">{t.worstArcs}</span>
                <span className="font-medium opacity-90"><ArcList arcs={classicStats.worstArcs} /></span>
            </div>
          </div>
        </div>

        {/* === BLOC MODE DIFFICILE === */}
        <div className="flex-1 flex flex-col w-full">
          <h3 className="text-xl md:text-2xl mb-4 font-bold text-center text-black dark:text-white">
            {t.hardMode}
          </h3>

          <div className="
            flex-1 w-full 
            p-6 md:p-8 rounded-[30px] shadow-lg 
            flex flex-col gap-4 text-left text-base md:text-lg
            transition-colors duration-300
            bg-[#CC213B] text-white 
            dark:bg-[#E6B96F] dark:text-black
          ">
            <p>
              <span className="font-bold">{t.bestScore}</span> {hardStats.bestScore}
            </p>
            <p>
              <span className="font-bold">{t.maxPerfects}</span> {hardStats.maxPerfectsInGame}
            </p>
            <p>
              <span className="font-bold">{t.avgDistance}</span> {hardStats.avgDistance} {t.scan}
            </p>

            <div className="flex flex-col xl:flex-row xl:items-baseline gap-1">
                <span className="font-bold whitespace-nowrap">{t.bestArcs}</span>
                <span className="font-medium opacity-90"><ArcList arcs={hardStats.bestArcs} /></span>
            </div>
            
            <div className="flex flex-col xl:flex-row xl:items-baseline gap-1">
                <span className="font-bold whitespace-nowrap">{t.worstArcs}</span>
                <span className="font-medium opacity-90"><ArcList arcs={hardStats.worstArcs} /></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}