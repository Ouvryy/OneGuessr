import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import ReturnHomeButton from "../components/ReturnHomeButton"; 
import confetti from 'canvas-confetti';
import { useTheme } from "../context/ThemeContext";
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


const BuggyWinAnimation = ({ streakCount, onClose, t }) => {
  const [frame, setFrame] = useState(0);
  const sprites = [
    "/images/animation/buggy/buggy_animation1.png",
    "/images/animation/buggy/buggy_animation2.png",
    "/images/animation/buggy/buggy_animation3.png",
    "/images/animation/buggy/buggy_animation4.png",
    "/images/animation/buggy/buggy_animation5.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % sprites.length);
    }, 120); 
    return () => clearInterval(interval);
  }, [sprites.length]);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn cursor-pointer"
      title={t.clickToSkip}
    >
      <div className="relative flex flex-col items-center pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-black text-[#EF4444] drop-shadow-[4px_4px_0_#3B82F6] mb-4 animate-bounce">
          {t.yonkoStreak} {streakCount} !
        </h2>
        <img 
          src={sprites[frame]} 
          alt="Buggy Victory" 
          className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
          style={{ imageRendering: 'pixelated' }}
        />
        <p className="text-white mt-4 font-bold text-lg animate-pulse">
          {t.flashy}
        </p>
      </div>
    </div>
  );
};

const ZoroWinAnimation = ({ streakCount, onClose, t }) => {
  const [frame, setFrame] = useState(0);
  const sprites = [
    "/images/animation/Zoro/roronoaZoro_animation1.png",
    "/images/animation/Zoro/roronoaZoro_animation2.png",
    "/images/animation/Zoro/roronoaZoro_animation3.png",
    "/images/animation/Zoro/roronoaZoro_animation4.png",
    "/images/animation/Zoro/roronoaZoro_animation5.png",
    "/images/animation/Zoro/roronoaZoro_animation6.png",
    "/images/animation/Zoro/roronoaZoro_animation7.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % sprites.length);
    }, 100);
    return () => clearInterval(interval);
  }, [sprites.length]);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn cursor-pointer"
      title={t.clickToSkip}
    >
      <div className="relative flex flex-col items-center pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-black text-[#4ADE80] drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] mb-4 animate-bounce">
          {t.zoroStreak} {streakCount} !
        </h2>
        <img 
          src={sprites[frame]} 
          alt="Zoro Victory" 
          className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
          style={{ imageRendering: 'pixelated' }}
        />
        <p className="text-white mt-4 font-bold text-lg animate-pulse">
          {t.legendary}
        </p>
      </div>
    </div>
  );
};

const LuffyWinAnimation = ({ streakCount, onClose, t }) => {
  const [frame, setFrame] = useState(0);
  const sprites = [
    "/images/animation/Luffy_victoire_bras_en_lair/1_luffy_bras.png",
    "/images/animation/Luffy_victoire_bras_en_lair/2_luffy_bras.png",
    "/images/animation/Luffy_victoire_bras_en_lair/3_luffy_bras.png",
    "/images/animation/Luffy_victoire_bras_en_lair/4_luffy_bras.png",
    "/images/animation/Luffy_victoire_bras_en_lair/5_luffy_bras.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % sprites.length);
    }, 150);
    return () => clearInterval(interval);
  }, [sprites.length]);

  return (
    <div 
      onClick={onClose} 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn cursor-pointer"
      title={t.clickToSkip}
    >
      <div className="relative flex flex-col items-center pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-black text-[#E6B96F] drop-shadow-lg mb-4 animate-bounce">
          {t.winstreak} {streakCount} !
        </h2>
        <img 
          src={sprites[frame]} 
          alt="Luffy Victory" 
          className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
          style={{ imageRendering: 'pixelated' }}
        />
        <p className="text-white mt-4 font-bold text-lg animate-pulse">
          {t.keepGoing}
        </p>
      </div>
    </div>
  );
};


const LuffyLoader = () => {
  const { isDark } = useTheme();
  const redSprites = [
    "/images/animation/luffy_chargement_pngg_red/Sprite-0001.png",
    "/images/animation/luffy_chargement_pngg_red/Sprite-0002.png",
    "/images/animation/luffy_chargement_pngg_red/Sprite-0003.png",
    "/images/animation/luffy_chargement_pngg_red/Sprite-0004.png",
    "/images/animation/luffy_chargement_pngg_red/Sprite-0005.png",
    "/images/animation/luffy_chargement_pngg_red/Sprite-0006.png",
    "/images/animation/luffy_chargement_pngg_red/Sprite-0007.png",
  ];
  const yellowSprites = [
    "/images/animation/luffy_chargement_yellow_png/Sprite-0001 Copy1.png",
    "/images/animation/luffy_chargement_yellow_png/Sprite-0001 Copy2.png",
    "/images/animation/luffy_chargement_yellow_png/Sprite-0001 Copy3.png",
    "/images/animation/luffy_chargement_yellow_png/Sprite-0001 Copy4.png",
    "/images/animation/luffy_chargement_yellow_png/Sprite-0001 Copy5.png",
    "/images/animation/luffy_chargement_yellow_png/Sprite-0001 Copy6.png",
    "/images/animation/luffy_chargement_yellow_png/Sprite-0001 Copy7.png",
  ];
  const sprites = isDark ? yellowSprites : redSprites;
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % sprites.length);
    }, 120);
    return () => clearInterval(interval);
  }, [sprites]);

  return (
    <img 
      src={sprites[frame]} 
      alt="Loading..." 
      className="w-16 h-16 object-contain"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

function HardGamePage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { playSound } = useSound();

  const [image, setImage] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userInput, setUserInput] = useState('');
  
  
  const [resultState, setResultState] = useState(null); 

  const [dataset, setDataset] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [answered, setAnswered] = useState(false);
  
  const [errorCount, setErrorCount] = useState(() => {
    return parseInt(localStorage.getItem("errorCountHard")) || 0;
  });
  const [score, setScore] = useState(() => {
    return parseInt(localStorage.getItem("currentScoreHard")) || 0;
  });
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem("bestScoreHard")) || 0;
  });
  
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageQueue, setImageQueue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  const [streak, setStreak] = useState(0); 
  const [showStreakAnim, setShowStreakAnim] = useState(false);

  const handleHover = () => playSound('/sounds/sound_effect/zipclick.mp3', 0.4);
  const handleClick = () => playSound('/sounds/sound_effect/button-click-289742.mp3');

  const translations = {
    fr: {
      title: "Mode Difficile",
      score: "Score :",
      best: "Meilleur :",
      instruction: "Devinez le numéro exact du chapitre",
      placeholder: "Numéro du chapitre…",
      validate: "Valider",
      next: "Suivant",
      replay: "Rejouer",
      restart: "Recommencer",
      fullscreen: "Plein écran",
      close: "Fermer",
      preparing: "Préparation...",
      gameOverTitle: "Game Over",
      gameOverText: "Vous avez atteint 3 mauvaises réponses",
      finalScore: "Score final :",
      unknownLocation: "Lieu inconnu",
      tooFar: "Trop éloigné",
      diff: "Différence :",
      chapter: "chapitres",
      was: "C'était le chapitre",
      loseLife: "Vous perdez une vie",
      perfect: "PARFAIT ! C'était exactement le chapitre",
      points: "points",
      closeGuess: "Proche",
     
      winstreak: "SÉRIE",
      zoroStreak: "SÉRIE ZORO",
      yonkoStreak: "SÉRIE YONKO",
      keepGoing: "Incroyable ! Continue comme ça !",
      legendary: "Série légendaire ! (Cliquez pour passer)",
      flashy: "C'est la fête flashy ! (Cliquez pour passer)",
      clickToSkip: "Cliquer pour passer",
      streakLabel: "Série :"
    },
    en: {
      title: "Hard Mode",
      score: "Score:",
      best: "Best:",
      instruction: "Guess the exact chapter number",
      placeholder: "Chapter number...",
      validate: "Submit",
      next: "Next",
      replay: "Replay",
      restart: "Restart",
      fullscreen: "Fullscreen",
      close: "Close",
      preparing: "Preparing...",
      gameOverTitle: "Game Over",
      gameOverText: "You reached 3 wrong answers",
      finalScore: "Final Score:",
      unknownLocation: "Unknown location",
      tooFar: "Too far",
      diff: "Difference:",
      chapter: "chapters",
      was: "It was chapter",
      loseLife: "You lose a life",
      perfect: "PERFECT! It was exactly chapter",
      points: "points",
      closeGuess: "Close",
     
      winstreak: "WINSTREAK",
      zoroStreak: "ZORO STREAK",
      yonkoStreak: "YONKO STREAK",
      keepGoing: "Amazing! Keep it up!",
      legendary: "Legendary streak! (Click to skip)",
      flashy: "Flashy party! (Click to skip)",
      clickToSkip: "Click to skip",
      streakLabel: "Streak:"
    }
  };

  const t = translations[language];


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

  const gameButtonStyle = `
    font-bold rounded-lg shadow-lg border-2 transition-all duration-300
    text-sm md:text-base
    hover:scale-105
    bg-[#CC213B] border-[#CC213B] text-black 
    hover:bg-transparent hover:text-[#CC213B]
    dark:bg-[#E6B96F] dark:border-[#E6B96F] dark:text-white 
    dark:hover:bg-transparent dark:hover:text-[#E6B96F]
  `;

  const closeButtonStyle = `
    absolute top-4 right-4 font-bold py-2 px-4 rounded-lg shadow border-2 transition-all duration-300
    bg-[#CC213B] border-[#CC213B] text-white hover:bg-transparent hover:text-[#CC213B]
    dark:bg-[#E6B96F] dark:border-[#E6B96F] dark:text-black dark:hover:bg-transparent dark:hover:text-[#E6B96F]
  `;

  useEffect(() => {
    localStorage.setItem("currentScoreHard", score);
  }, [score]);

  useEffect(() => {
    localStorage.setItem("errorCountHard", errorCount);
  }, [errorCount]);

  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = reject;
      img.src = url;
    });
  };

  const prepareImageQueue = async (data, count = 10) => {
    const queue = [];
    const shuffledData = [...data].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < Math.min(count, shuffledData.length); i++) {
      const entry = shuffledData[i];
      const imageUrl = entry.images[Math.floor(Math.random() * entry.images.length)];
      const correctedImage = imageUrl.replace(/^https:\/\/lelscans\.nethttps:\/\/lelscans\.net/, "https://lelscans.net");
      
      try {
        await preloadImage(correctedImage);
        queue.push({ url: correctedImage, chapter: entry.chapter });
      } catch (error) {
        console.error('Erreur de préchargement:', error);
      }
    }
    
    return queue;
  };

  const getLocationByChapter = (chapter) => {
    const arc = ARC_LOCATIONS.find(a => chapter >= a.from && chapter <= a.to);
    return arc ? arc.location : t.unknownLocation;
  };

  const calculatePoints = (userAnswer, correctAnswer) => {
    const difference = Math.abs(userAnswer - correctAnswer);
    if (difference === 0) return 10;
    if (difference <= 5) return 10;
    if (difference <= 10) return 5;
    if (difference <= 20) return 1;
    return -1;
  };

  useEffect(() => {
    const initializeGame = async () => {
      setIsLoading(true);
      const res = await fetch("/onepiece_dataset.json");
      const data = await res.json();
      const validData = data.filter(entry => getLocationByChapter(entry.chapter) !== "Lieu inconnu" && getLocationByChapter(entry.chapter) !== t.unknownLocation);
      setDataset(validData);
      
      const queue = await prepareImageQueue(validData, 10);
      setImageQueue(queue);
      
      if (queue.length > 0) {
        const firstImage = queue[0];
        setImage(firstImage.url);
        setCorrectAnswer(firstImage.chapter);
        setImageQueue(queue.slice(1));
      }
      
      playSound('/sounds/sound_effect/Point.mp3');
      setIsLoading(false);
    };

    initializeGame();
  }, []);

  const pickRandomImage = async (data) => {
    if (imageQueue.length < 3) {
      const newQueue = await prepareImageQueue(data, 10);
      setImageQueue(prev => [...prev, ...newQueue]);
    }
  };

  const loadNextImage = () => {
    handleClick();
    setShowStreakAnim(false);

    if (imageQueue.length > 0) {
      const nextImage = imageQueue[0];
      setImage(nextImage.url);
      setCorrectAnswer(nextImage.chapter);
      setImageQueue(prev => prev.slice(1));
      setResultState(null);
      setUserInput('');
      setAnswered(false);
      setShowAnswer(false);
      
      if (imageQueue.length < 3 && dataset.length > 0) {
        pickRandomImage(dataset);
      }
    }
  };

  const triggerWinConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      startVelocity: 60,
      origin: { x: 0.5, y: 1 }, 
      colors: ['#CC213B', '#E6B96F', '#ffffff'],
      zIndex: 9999
    });
  };

  const handleSubmit = () => {
    if (userInput.trim() === '') return;
    
    const userAnswer = parseInt(userInput);
    const points = calculatePoints(userAnswer, correctAnswer);
    const difference = Math.abs(userAnswer - correctAnswer);
    
    const history = JSON.parse(localStorage.getItem("answerHistoryHard") || "[]");
    history.push({
      correctChapter: correctAnswer,
      userAnswer: userAnswer,
      points: points,
      timestamp: Date.now(),
    });
    localStorage.setItem("answerHistoryHard", JSON.stringify(history));

    if (points === -1) {
      
      setStreak(0);
      const newErrorCount = errorCount + 1;
      setErrorCount(newErrorCount);
      
      setResultState({ 
        type: 'TOO_FAR', 
        diff: difference, 
        correct: correctAnswer, 
        loc: getLocationByChapter(correctAnswer) 
      });
      
      if (newErrorCount >= 3) {
        if (score > bestScore) {
          setBestScore(score);
          localStorage.setItem("bestScoreHard", score);
        }
        playSound('/sounds/sound_effect/GameOversound.mp3');
        setGameOver(true);
        setImage(null);
        return;
      }
    } else {
      
      setScore(prev => {
        const newScore = prev + points;
        if (newScore > bestScore) {
          setBestScore(newScore);
          localStorage.setItem("bestScoreHard", newScore);
        }
        return newScore;
      });

      
      setStreak(prevStreak => {
        const newStreak = prevStreak + 1;
        
        if (newStreak > 0 && newStreak % 5 === 0) {
          playSound('/sounds/sound_effect/Brook,s laugh !!! Yo ho ho ho ho ho !!!.mp3'); 
          setShowStreakAnim(true);
          setTimeout(() => setShowStreakAnim(false), 4000);
        } else {
          
          if (difference === 0) {
            playSound('/sounds/sound_effect/cowabunga-voiced-165997.mp3');
            triggerWinConfetti();
          } else {
            playSound('/sounds/sound_effect/Point.mp3');
          }
        }
        return newStreak;
      });

      if (difference === 0) {
        setResultState({ type: 'PERFECT', correct: correctAnswer, pts: points });
      } else {
        setResultState({ 
          type: 'CLOSE', 
          correct: correctAnswer, 
          loc: getLocationByChapter(correctAnswer), 
          diff: difference, 
          pts: points 
        });
      }
    }

    setAnswered(true);
    setShowAnswer(true);
  };

  const handleNext = () => loadNextImage();

  const handleReplay = async () => {
    handleClick();
    setScore(0);
    setErrorCount(0);
    setStreak(0);
    setGameOver(false);
    setResultState(null);
    setShowAnswer(false);
    setShowStreakAnim(false);
    
    localStorage.setItem("currentScoreHard", 0);
    localStorage.setItem("errorCountHard", 0);
    
    setIsLoading(true);
    if (dataset.length > 0) {
      const newQueue = await prepareImageQueue(dataset, 10);
      setImageQueue(newQueue);
      if (newQueue.length > 0) {
        const firstImage = newQueue[0];
        setImage(firstImage.url);
        setCorrectAnswer(firstImage.chapter);
        setImageQueue(newQueue.slice(1));
      }
    }
    playSound('/sounds/sound_effect/Point.mp3');
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !answered) handleSubmit();
  };

  const toggleFullscreen = () => {
    handleClick();
    setIsFullscreen(!isFullscreen);
  };

  const getResultMessage = () => {
    if (!resultState) return '';
    switch (resultState.type) {
      case 'PERFECT':
        return `${t.perfect} ${resultState.correct} !\n+${resultState.pts} ${t.points} 🔥`;
      case 'CLOSE':
        return `${t.closeGuess} ${t.was} ${resultState.correct} (${resultState.loc})\n${t.diff} ${resultState.diff} ${t.chapter}\n+${resultState.pts} ${t.points}`;
      case 'TOO_FAR':
        return `${t.tooFar} (${t.diff} ${resultState.diff} ${t.chapter})\n${t.was} ${resultState.correct} (${resultState.loc})\n${t.loseLife}`;
      case 'GAMEOVER':
        return '';
      default:
        return '';
    }
  };

  const chapeaux = [
    errorCount < 1 && "/images/Mugiwara.png",
    errorCount < 2 && "/images/Mugiwara.png",
    errorCount < 3 && "/images/Mugiwara.png"
  ];

  return (
    <div className="
      min-h-screen 
      bg-white dark:bg-[#1e1e1e] 
      text-black dark:text-white 
      p-4 pt-20 md:p-6 text-center 
      flex flex-col items-center 
      transition-colors duration-300
    ">
      
      <ReturnHomeButton />
      
      {showStreakAnim && (
          streak >= 15
          ? <BuggyWinAnimation streakCount={streak} onClose={() => setShowStreakAnim(false)} t={t} />
          : streak % 10 === 0 
            ? <ZoroWinAnimation streakCount={streak} onClose={() => setShowStreakAnim(false)} t={t} />
            : <LuffyWinAnimation streakCount={streak} onClose={() => setShowStreakAnim(false)} t={t} />
      )}

      {/* FULLSCREEN */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
          onClick={toggleFullscreen}
        >
          <img
            src={image}
            alt="One Piece scene fullscreen"
            className="max-w-full max-h-full object-contain"
          />
          <button
            className={closeButtonStyle}
            onMouseEnter={handleHover}
            onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
          >
            {t.close}
          </button>
        </div>
      )}

      {/* TITRE RESPONSIVE */}
      <h1
        className="text-3xl md:text-5xl font-bold mb-4 text-[#CC213B] dark:text-[#E6B96F] underline"
      >
        {t.title}
      </h1>
      
      {/* SCORE + BOUTON REJOUER */}
      <div className="flex items-center justify-center gap-4 md:gap-6 mb-2 font-bold text-sm md:text-lg">
        <div className="text-[#CC213B] dark:text-[#E6B96F]">
          {t.score} {score}
        </div>
        
        <button 
            onClick={handleReplay}
            onMouseEnter={handleHover}
            className={iconButtonStyle} 
            aria-label={t.replay}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
        </button>

        <div className="text-[#CC213B] dark:text-[#E6B96F]">
          {t.best} {bestScore}
        </div>
      </div>

      <p className="text-xs md:text-sm mb-4 text-[#CC213B] dark:text-[#E6B96F]">
        {t.instruction}
      </p>

      {/* STREAK DISPLAY */}
      {streak > 1 && (
          <div className={`mb-2 text-sm font-bold animate-pulse ${
              streak >= 15 ? "text-red-500" :
              streak % 10 === 0 ? "text-green-500" : 
              "text-orange-500"
          }`}>
              {t.streakLabel} {streak}
          </div>
      )}

      {/* CHAPEAUX */}
      <div className="flex justify-center mb-6">
        {chapeaux.map((c, i) => c && (
          <img key={i} src={c} className="w-8 h-8 md:w-12 md:h-12 mx-1 md:mx-2" alt="" />
        ))}
      </div>

      {gameOver ? (
        <div className="mt-6 text-lg text-[#CC213B] dark:text-[#E6B96F] flex flex-col items-center gap-4">
          <p className="text-2xl">{t.gameOverTitle}</p>
          <p>{t.gameOverText}</p>
          <p>{t.finalScore} {score}</p>
          
          <button
            onClick={handleReplay}
            onMouseEnter={handleHover}
            className={`${gameButtonStyle} py-3 px-6`}
          >
            {t.replay}
          </button>
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="mt-12 text-xl md:text-2xl font-bold text-[#CC213B] dark:text-[#E6B96F] flex items-end justify-center gap-2">
              <span className="mb-2">{t.preparing}</span>
              <LuffyLoader />
            </div>
          ) : (
            image && (
              <div className="w-full max-w-4xl">
                
                <img
                  src={image}
                  alt="Scene OP"
                  className="
                    h-auto object-contain mx-auto
                    max-h-[300px] md:max-h-[600px]
                    mb-4 rounded-lg shadow-lg border-2
                    border-[#CC213B] dark:border-[#E6B96F]
                  "
                />

                <button
                  onClick={toggleFullscreen}
                  onMouseEnter={handleHover}
                  className={`${gameButtonStyle} mb-6 py-2 px-4 text-xs md:text-sm`}
                >
                  {t.fullscreen}
                </button>

                {!answered ? (
                  <div className="w-full max-w-lg mx-auto">
                    <input
                      type="number"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={t.placeholder}
                      className="
                        w-full px-4 py-3 md:px-6 md:py-4 rounded-lg font-bold text-center text-xl md:text-2xl mb-4 border-2
                        bg-white text-black border-[#CC213B]
                        dark:bg-[#1e1e1e] dark:text-white dark:border-[#E6B96F]
                        focus:outline-none focus:ring-2 focus:ring-[#CC213B] dark:focus:ring-[#E6B96F]
                      "
                    />

                    <button
                      onClick={handleSubmit}
                      onMouseEnter={handleHover}
                      className={`${gameButtonStyle} w-full py-3 md:py-4 px-6 text-lg md:text-xl`}
                    >
                      {t.validate}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 whitespace-pre-line text-lg text-[#CC213B] dark:text-[#E6B96F]">
                      {getResultMessage()}
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={handleNext}
                        onMouseEnter={handleHover}
                        className={`${gameButtonStyle} py-3 px-8 text-lg`}
                      >
                        {t.next}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

export default HardGamePage;