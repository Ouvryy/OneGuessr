import React, { useEffect, useState, useRef } from 'react';
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

function GamePage() {
  const { language } = useLanguage();
  const { playSound } = useSound();

  const translations = {
    fr: {
      title: "OneGuessr",
      score: "Score :",
      best: "Meilleur :", 
      preparation: "Préparation de la partie...",
      next: "Suivant",
      replay: "Rejouer",
      winMessage: "Bien joué",
      lossMessageStart: "CE N'EST PAS CET ARC... Bonne réponse :",
      gameOverMessage: "Tu as perdu... 3 mauvaises réponses...",
      tooSlow: "Faut être plus rapide",
      unknownLocation: "Lieu inconnu",
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
      title: "OneGuessr",
      score: "Score:",
      best: "Best:",
      preparation: "Preparing game...",
      next: "Next",
      replay: "Replay",
      winMessage: "Nice job",
      lossMessageStart: "THIS IS NOT THIS ARC... Correct answer:",
      gameOverMessage: "You lost... You reached 3 wrong answers...",
      tooSlow: "Gotta be quicker",
      unknownLocation: "Unknown location",
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

  const [dataset, setDataset] = useState([]);
  const [gameQueue, setGameQueue] = useState([]); 
  const [isInitializing, setIsInitializing] = useState(true);
  const [currentRound, setCurrentRound] = useState(null);
  
 
  const [resultState, setResultState] = useState(null); 
  
  const [timer, setTimer] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(localStorage.getItem("bestScore") || 0);

  const [streak, setStreak] = useState(0); 
  const [showStreakAnim, setShowStreakAnim] = useState(false);

  const datasetRef = useRef([]);
  const hasInitialized = useRef(false);

  const handleHover = () => playSound('/sounds/sound_effect/zipclick.mp3', 0.4);
  const handleClick = () => playSound('/sounds/sound_effect/button-click-289742.mp3');

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
    text-sm md:text-base py-3 px-4
    hover:scale-105
    bg-[#E6B96F] border-[#E6B96F] text-black 
    hover:bg-transparent hover:text-[#E6B96F] 
    dark:bg-[#CC213B] dark:border-[#CC213B] dark:text-white 
    dark:hover:bg-transparent dark:hover:text-[#CC213B]
  `;

  const getLocationByChapter = (chapter) => {
    const arc = ARC_LOCATIONS.find(a => chapter >= a.from && chapter <= a.to);
    return arc ? arc.location : t.unknownLocation;
  };

  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`Failed to load image ${url}`));
    });
  };

  const generateRoundData = async (data) => {
    if (!data || data.length === 0) return null;
    const randomEntry = data[Math.floor(Math.random() * data.length)];
    const rawImageUrl = randomEntry.images[Math.floor(Math.random() * randomEntry.images.length)];
    const imageUrl = rawImageUrl.replace(/^https:\/\/lelscans\.nethttps:\/\/lelscans\.net/, "https://lelscans.net");

    try {
      await preloadImage(imageUrl);
    } catch (e) {
      console.warn("Erreur chargement image", e);
      return generateRoundData(data); 
    }

    const chapter = randomEntry.chapter;
    const location = getLocationByChapter(chapter);
    const filteredArcs = ARC_LOCATIONS.filter(loc => loc.from >= 640 && loc.location !== location);
    const options = [
      location,
      ...filteredArcs.sort(() => 0.5 - Math.random()).slice(0, 3).map(loc => loc.location)
    ].sort(() => 0.5 - Math.random());

    return { image: imageUrl, correctAnswer: location, options: options };
  };

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    const initGame = async () => {
      try {
        const res = await fetch("/onepiece_dataset.json");
        const data = await res.json();
        const validData = data.filter(entry => getLocationByChapter(entry.chapter) !== t.unknownLocation && getLocationByChapter(entry.chapter) !== "Lieu inconnu");
        
        setDataset(validData);
        datasetRef.current = validData;

        const roundsBuffer = [];
        for (let i = 0; i < 5; i++) {
          const round = await generateRoundData(validData);
          if (round) roundsBuffer.push(round);
        }

        if (roundsBuffer.length > 0) {
            setCurrentRound(roundsBuffer[0]);      
            setGameQueue(roundsBuffer.slice(1));   
            setIsInitializing(false);
            
            playSound('/sounds/sound_effect/Point.mp3');
                          
            replenishQueue(validData);
        }
      } catch (error) {
        console.error("Erreur init:", error);
      }
    };
    initGame();
  }, []); 

  const replenishQueue = (dataSource) => {
    generateRoundData(dataSource).then(newRound => {
        if (newRound) setGameQueue(prev => [...prev, newRound]);
    });
  };

  const loadNextRound = () => {
    handleClick();
    setShowStreakAnim(false); 

    if (gameQueue.length > 0) {
        const next = gameQueue[0];
        setCurrentRound(next);
        setGameQueue(prev => prev.slice(1));
        setResultState(null);
        setTimer(10);
        setAnswered(false);
        replenishQueue(datasetRef.current);
    } else {
        setIsInitializing(true);
        replenishQueue(datasetRef.current);
    }
  };

  useEffect(() => {
    if (isInitializing && gameQueue.length > 0 && !currentRound && hasInitialized.current) {
        loadNextRound();
        setIsInitializing(false);
    }
  }, [gameQueue, isInitializing, currentRound]);

  useEffect(() => {
    let interval = null;
    if (!gameOver && !answered && !isInitializing && currentRound && !showStreakAnim) {
      interval = setInterval(() => {
        setTimer(prev => Math.max(prev - 0.05, 0));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [gameOver, answered, isInitializing, currentRound, showStreakAnim]);

  useEffect(() => {
    if (timer <= 0.01 && !answered && !gameOver && !isInitializing) {
      setErrorCount(prev => {
        const newCount = prev + 1;
        setStreak(0);
        if (newCount >= 3) {
          playSound('/sounds/sound_effect/GameOversound.mp3');
          setGameOver(true);
          setResultState({ type: 'GAMEOVER' });
        } else {
          setResultState({ type: 'TIMEOUT' });
          setAnswered(true);
        }
        return newCount;
      });
    }
  }, [timer, answered, gameOver, isInitializing, playSound]);

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

  const handleAnswer = (choice) => {
    if (!currentRound) return;

    const isCorrect = choice === currentRound.correctAnswer;
    const history = JSON.parse(localStorage.getItem("answerHistory") || "[]");
    history.push({ correctArc: currentRound.correctAnswer, userAnswer: choice, isCorrect, timestamp: Date.now() });
    localStorage.setItem("answerHistory", JSON.stringify(history));

    if (isCorrect) {
      playSound('/sounds/sound_effect/Point.mp3');
      triggerWinConfetti();
      setScore(prev => prev + 1);
      setResultState({ type: 'WIN' });

      setStreak(prevStreak => {
        const newStreak = prevStreak + 1;
        if (newStreak > 0 && newStreak % 5 === 0) {
          playSound('/sounds/sound_effect/Brook,s laugh !!! Yo ho ho ho ho ho !!!.mp3'); 
          setShowStreakAnim(true);
          setTimeout(() => setShowStreakAnim(false), 4000);
        }
        return newStreak;
      });

    } else {
      setStreak(0);
      const newErrors = errorCount + 1;
      setErrorCount(newErrors);
      setResultState({ type: 'LOSE', payload: currentRound.correctAnswer });
      if (newErrors >= 3) {
        playSound('/sounds/sound_effect/GameOversound.mp3');
        setGameOver(true);
        setResultState({ type: 'GAMEOVER' });
        return;
      }
    }
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score);
    }
    setAnswered(true);
  };

  const handleReplay = async () => {
    handleClick();
    setScore(0);
    setErrorCount(0);
    setStreak(0); 
    setGameOver(false);
    setResultState(null);
    setShowStreakAnim(false);

    if (gameQueue.length === 0) {
        setIsInitializing(true);
        const round = await generateRoundData(datasetRef.current);
        setGameQueue([round]);
        setCurrentRound(round);
        replenishQueue(datasetRef.current);
        
        setIsInitializing(false);
        playSound('/sounds/sound_effect/Point.mp3');
    } else {
        loadNextRound();
    }
  };

  const hats = [
    errorCount < 1 && "/images/Mugiwara.png",
    errorCount < 2 && "/images/Mugiwara.png",
    errorCount < 3 && "/images/Mugiwara.png"
  ];

  
  const getResultMessage = () => {
    if (!resultState) return '';
    switch (resultState.type) {
        case 'WIN': return t.winMessage;
        case 'LOSE': return `${t.lossMessageStart} ${resultState.payload}.`;
        case 'GAMEOVER': return t.gameOverMessage;
        case 'TIMEOUT': return t.tooSlow;
        default: return '';
    }
  };

  return (
    <>
      <ReturnHomeButton />
      
      {showStreakAnim && (
          streak >= 15
          ? <BuggyWinAnimation streakCount={streak} onClose={() => setShowStreakAnim(false)} t={t} />
          : streak % 10 === 0 
            ? <ZoroWinAnimation streakCount={streak} onClose={() => setShowStreakAnim(false)} t={t} />
            : <LuffyWinAnimation streakCount={streak} onClose={() => setShowStreakAnim(false)} t={t} />
      )}

      <div className="
        min-h-screen w-full
        bg-white text-black
        dark:bg-[#1e1e1e] dark:text-white
        transition-colors duration-300
        flex flex-col items-center 
        p-4 pt-20 md:p-6 text-center
      ">
        
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#CC213B] dark:text-[#E6B96F] underline">
          {t.title}
        </h1>

        <div className="flex items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8 text-base md:text-lg font-bold">
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
        
        {streak > 1 && (
            <div className={`mb-2 text-sm font-bold animate-pulse ${
                streak >= 15 ? "text-red-500" :
                streak % 10 === 0 ? "text-green-500" : 
                "text-orange-500"
            }`}>
                {t.streakLabel} {streak}
            </div>
        )}

        <div className="flex justify-center mb-4">
          {hats.map((hat, i) => hat && (<img key={i} src={hat} alt="" className="w-8 h-8 md:w-12 md:h-12 mx-1 md:mx-2" />))}
        </div>

        {!gameOver && !isInitializing && (
          <div className="relative mb-4 w-full max-w-[300px] md:max-w-[500px] mx-auto">
            <div
              className="h-2 rounded-full bg-[#CC213B] dark:bg-[#E6B96F]"
              style={{ width: `${(timer / 10) * 100}%`, transition: 'width 50ms linear' }}
            />
            <p className="absolute inset-0 flex items-center justify-center text-sm md:text-lg font-bold">
              {Math.ceil(timer)} s
            </p>
          </div>
        )}

        {isInitializing ? (
           <div className="mt-12 text-xl md:text-2xl font-bold text-[#CC213B] dark:text-[#E6B96F] flex items-end justify-center gap-2">
             <span className="mb-2">{t.preparation}</span>
             <LuffyLoader />
           </div>
        ) : (
            <>
              {gameOver ? (
                <div className="mt-6 text-lg text-[#CC213B] dark:text-[#E6B96F] flex flex-col items-center gap-4">
                  <p>{getResultMessage()}</p>
                  <button
                    onClick={handleReplay}
                    onMouseEnter={handleHover}
                    className={`${gameButtonStyle}`}
                  >
                    {t.replay}
                  </button>
                </div>
              ) : (
                <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                  {currentRound && (
                    <>
                      <img
                        src={currentRound.image}
                        alt="One Piece"
                        className="
                          h-auto object-contain mx-auto
                          max-h-[300px] md:max-h-[500px]
                          mb-4 rounded-lg shadow-lg border-2 
                          border-[#CC213B] dark:border-[#E6B96F]
                        "
                      />

                      {!answered ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-2xl mb-4">
                            {currentRound.options.map((opt, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleAnswer(opt)}
                                onMouseEnter={handleHover}
                                className={gameButtonStyle}
                              >
                                {opt}
                              </button>
                            ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center animate-fadeIn w-full">
                            <div className="mb-6 text-lg md:text-xl font-bold text-[#CC213B] dark:text-[#E6B96F]">
                                {getResultMessage()}
                            </div>
                            
                            <button
                                onClick={loadNextRound}
                                onMouseEnter={handleHover}
                                className={`${gameButtonStyle} w-full max-w-xs md:w-auto text-lg`}
                            >
                                {t.next}
                            </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </>
        )}
      </div>
    </>
  );
}

export default GamePage;