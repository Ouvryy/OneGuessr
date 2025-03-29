import React, { useEffect, useState } from 'react';
import '../App.css';

const loseSound = new Audio('/sounds/crocodile2.mp3');

const ARC_LOCATIONS = [
  { from: 579, to: 625, location: 'Punk Hazard' },
  { from: 629, to: 746, location: 'Dressrosa' },
  { from: 751, to: 779, location: 'Zou' },
  { from: 783, to: 877, location: 'Whole Cake Island' },
  { from: 890, to: 1088, location: 'Wano' },
  { from: 1058, to: 1125, location: 'Egg Head' },
  { from: 1126, to: 1144, location: 'Erbaf' }
];

function GamePage() {
  const [image, setImage] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState('');
  const [dataset, setDataset] = useState([]);
  const [timer, setTimer] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(localStorage.getItem("bestScore") || 0);

  // Fonction pour déterminer la localisation à partir du numéro de chapitre
  const getLocationByChapter = (chapter) => {
    const arc = ARC_LOCATIONS.find(a => chapter >= a.from && chapter <= a.to);
    return arc ? arc.location : 'Lieu inconnu';
  };

  useEffect(() => {
    fetch("/onepiece_dataset.json")
      .then((res) => res.json())
      .then((data) => {
        // On ne conserve que les entrées dont le chapitre correspond à un arc connu
        const validData = data.filter(entry => getLocationByChapter(entry.chapter) !== "Lieu inconnu");
        setDataset(validData);
        pickRandomImage(validData);
      });

    return () => {
      // Arrêter le son lors du démontage du composant
      loseSound.pause();
      loseSound.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (timer === 0 && !answered && !gameOver) {
      setErrorCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 3) {
          loseSound.currentTime = 0;
          loseSound.play();
          setGameOver(true);
          setResult('You lost... You reached 3 wrong answers...');
          setImage(null);
          setOptions([]);
          return newCount;
        } else {
          setResult('Gotta be quicker than that buddy');
          setImage(null);
          setOptions([]);
          setAnswered(true);
          setTimeout(() => {
            setAnswered(false);
            setTimer(10);
            pickRandomImage(dataset);
          }, 1000);
          return newCount;
        }
      });
    }

    if (!gameOver && !answered) {
      const interval = setInterval(() => {
        setTimer(prev => Math.max(prev - 1, 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, gameOver, answered, dataset]);

  const pickRandomImage = (data) => {
    const randomEntry = data[Math.floor(Math.random() * data.length)];
    const imageUrl = randomEntry.images[Math.floor(Math.random() * randomEntry.images.length)];
    // Correction de l'URL en utilisant une expression régulière pour retirer le doublon
    const correctedImage = imageUrl.replace(/^https:\/\/lelscans\.nethttps:\/\/lelscans\.net/, "https://lelscans.net");
    setImage(correctedImage);

    const chapter = randomEntry.chapter;
    const location = getLocationByChapter(chapter);
    setCorrectAnswer(location);

    // Sélectionner 3 distracteurs pour garantir que la bonne réponse est toujours affichée parmi 4 choix
    const filteredArcs = ARC_LOCATIONS.filter(loc => loc.from >= 640 && loc.location !== location);
    const shuffled = [
      location,
      ...filteredArcs.sort(() => 0.5 - Math.random()).slice(0, 3).map(loc => loc.location),
    ].sort(() => 0.5 - Math.random());

    setOptions(shuffled);
    setResult('');
    setTimer(10);
    setAnswered(false);
  };

  const handleAnswer = (choice) => {
    const isCorrect = choice === correctAnswer;
    const history = JSON.parse(localStorage.getItem("answerHistory") || "[]");
    history.push({
      correctArc: correctAnswer,
      userAnswer: choice,
      isCorrect,
      timestamp: Date.now(),
    });
    localStorage.setItem("answerHistory", JSON.stringify(history));

    if (isCorrect) {
      setScore(prev => prev + 1);
      setResult('Nice job 🗿🗿');
    } else {
      const newErrorCount = errorCount + 1;
      setErrorCount(newErrorCount);
      setResult(`THIS IS NOT THIS ARC DUMB ASS 🫵🤣🤣... La bonne réponse était ${correctAnswer}.`);
      if (newErrorCount >= 3) {
        loseSound.currentTime = 0;
        loseSound.play();
        setGameOver(true);
        setResult('You lost... You reached 3 wrong answers...');
        setImage(null);
        setOptions([]);
        return;
      }
    }

    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score);
    }

    setAnswered(true);
    setTimeout(() => {
      setAnswered(false);
      setTimer(10);
      pickRandomImage(dataset);
    }, 1000);
  };

  const handleReplay = () => {
    loseSound.pause();
    loseSound.currentTime = 0;
    setScore(0);
    setErrorCount(0);
    setGameOver(false);
    setResult('');
    pickRandomImage(dataset);
  };

  const chapeaux = [
    errorCount < 1 && "/images/Mugiwara.png",
    errorCount < 2 && "/images/Mugiwara.png",
    errorCount < 3 && "/images/Mugiwara.png"
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 text-center flex flex-col items-center">
      <div className="absolute top-4 left-4 text-lg font-bold" style={{ color: '#CC213B' }}>
        Score: {score}
      </div>
      <div className="absolute top-4 right-4 text-lg font-bold " style={{ color: '#CC213B' }}>
        Best Score: {bestScore}
      </div>

      <h1
        className="text-4xl font-bold mb-12 mt-8"
        style={{
          color: '#E6B96F',
          textDecoration: 'underline',
          textDecorationColor: '#E6B96F',
        }}
      >
        OneGuessr
      </h1>

      <div className="flex justify-center mb-4 mt-2">
        {chapeaux.map((chapeau, index) => chapeau && (
          <img
            key={index}
            src={chapeau}
            alt={`Chapeau ${index + 1}`}
            className="w-12 h-12 mx-2 object-cover"
          />
        ))}
      </div>

      {!answered && !gameOver && (
        <div className="relative mb-4 w-full max-w-[500px] mx-auto">
          <div
            className="h-2 bg-[#E6B96F] rounded-full"
            style={{ width: `${(timer / 10) * 100}%`, transition: 'width 1s linear' }}
          />
          <p className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-lg font-bold">
            {timer} s
          </p>
        </div>
      )}

      {gameOver ? (
        <div className="mt-6 text-lg" style={{ color: '#E6B96F' }}>
          {result}
          <div className="mt-4">
            <button
              onClick={handleReplay}
              className="bg-[#CC213B] text-white font-bold py-2 px-4 rounded-lg shadow"
            >
              Rejouer
            </button>
          </div>
        </div>
      ) : (
        <>
          {!answered && image && (
            <>
              <img
                src={image}
                alt="One Piece scene"
                className="mx-auto mb-4 rounded-lg shadow-lg max-h-[400px] border-4"
                style={{ borderColor: '#CC213B' }}
              />
              <div className="grid grid-cols-2 gap-4 mb-4">
                {options.slice(0, 4).map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt)}
                    className="text-black font-bold py-2 px-4 rounded-lg shadow"
                    style={{ backgroundColor: '#E6B96F' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button
                onClick={handleReplay}
                className="bg-[#CC213B] text-white font-bold py-2 px-4 rounded-lg shadow mt-2"
              >
                Relancer
              </button>
            </>
          )}
          <div className="mt-6 text-lg" style={{ color: '#E6B96F' }}>{result}</div>
        </>
      )}
    </div>
  );
}

export default GamePage;
