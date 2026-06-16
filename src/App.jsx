import React, { useState, useEffect, useCallback, useRef } from 'react'; 
import GameCanvas from './components/GameCanvas';
import StartScreen from './components/StartScreen';
import LandingScreen from './components/LandingScreen';
import IntroStory from './components/IntroStory';
import QuestionPanel from './components/QuestionPanel';
import HUD from './components/HUD';
import LevelSuccess from './components/LevelSuccess';
import LevelIntro from './components/LevelIntro';
import SecurityGuru from './components/SecurityGuru';
import { generateSafetyReport } from './utils/pdfGenerator';
import cryLogo from './assets/Child_Rights_and_You_(CRY)_Organization_logo.png';
import { level1 } from './levels/level1';
import { level2 } from './levels/level2';
import { level3 } from './levels/level3';
import { level4 } from './levels/level4';
import { level5 } from './levels/level5';
import { surakshaLevels } from './data/surakshaQuestions';

// Visual and Audio Asset Imports
import quizMusicAsset from './assets/audio/final_click.mp3';
import globalBgmAsset from './assets/audio/final_bgm.mp3';

const levels = [level1, level2, level3, level4, level5];

const SHEET_URL = "https://script.google.com/macros/s/AKfycbz1oK5mByUcmvvvlp7qTzvsm0q8PRHfOQyJJcqgAD5G4bDYmBv6a1oNxVKThwdXbSAezg/exec";

function App() {
  const [gameState, setGameState] = useState('LANDING'); 
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [activeEnemy, setActiveEnemy] = useState(null);
  const [playerInfo, setPlayerInfo] = useState(null);
  const [questionQueue, setQuestionQueue] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [levelCycle, setLevelCycle] = useState(0);
  const [lastCorrectCount, setLastCorrectCount] = useState(0);
  const [hasShared, setHasShared] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // Audio Controller Instances Tracker
  const quizAudioRef = useRef(null);
  const globalBgmRef = useRef(null);

  // Initialize both Audio tracks securely once on mount
  useEffect(() => {
    // 1. Setup Quiz Audio
    const quizAudio = new Audio(quizMusicAsset);
    quizAudio.loop = true;
    quizAudio.volume = 0.4;
    quizAudioRef.current = quizAudio;

    // 2. Setup Global Background Music
    const globalBgm = new Audio(globalBgmAsset);
    globalBgm.loop = true; 
    globalBgm.volume = 0.35; 
    globalBgmRef.current = globalBgm;

    // ✅ FIXED: Global listener to instantly kick-start the music on the landing page at first interaction
    const startBgmOnInteraction = () => {
      if (globalBgmRef.current && gameState !== 'GURU_TIP' && gameState !== 'QUIZ') {
        globalBgmRef.current.play().then(() => {
          // Clean up listeners once successfully playing
          window.removeEventListener('click', startBgmOnInteraction);
          window.removeEventListener('touchstart', startBgmOnInteraction);
        }).catch(err => console.log("BGM playback update waiting on gesture:", err));
      }
    };

    window.addEventListener('click', startBgmOnInteraction);
    window.addEventListener('touchstart', startBgmOnInteraction);

    return () => {
      if (quizAudioRef.current) quizAudioRef.current.pause();
      if (globalBgmRef.current) globalBgmRef.current.pause();
      window.removeEventListener('click', startBgmOnInteraction);
      window.removeEventListener('touchstart', startBgmOnInteraction);
    };
  }, []);

  // Master Audio Lifecycle System Manager
  useEffect(() => {
    if (!quizAudioRef.current || !globalBgmRef.current) return;

    const isQuizPhase = gameState === 'GURU_TIP' || gameState === 'QUIZ';

    if (isQuizPhase) {
      globalBgmRef.current.pause();

      if (quizAudioRef.current.paused) {
        quizAudioRef.current.currentTime = 0;
      }
      quizAudioRef.current.play().catch(err => {
        console.log("Quiz audio waiting for a user gesture to fire safely:", err);
      });
    } else {
      quizAudioRef.current.pause();

      // ✅ FIXED: Ensures seamless playback continuation across all pages, including landing/login loops
      globalBgmRef.current.play().catch(err => {
        console.log("Global BGM auto-resume deferred until layout interaction:", err);
      });
    }
  }, [gameState]);

  const submitToSheet = (data) => {
    console.log("Submitting:", JSON.stringify(data));
    fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(data)
    }).then(() => {
      console.log("Data submitted successfully");
    }).catch(err => console.error("Error submitting to sheet:", err));
  };

  const level = levels[currentLevelIdx];

  const handleStart = (info) => {
    setPlayerInfo(info);
    setGameState('STORY');
    setLives(3);
    setScore(0);
    setCurrentLevelIdx(0);
    setCorrectCount(0);
    setQuestionQueue([]);
    setHasShared(false);

    const newSessionId = Date.now().toString();
    setSessionId(newSessionId);

    submitToSheet({
      ...info,
      score: 0,
      finished: false,
      shared: false,
      sessionId: newSessionId
    });
  };

  const handleLevelFinished = useCallback(() => {
    const questions = surakshaLevels[currentLevelIdx].questions;
    setQuestionQueue([...questions]);
    setGameState('GURU_TIP'); 
    setCorrectCount(0);
  }, [currentLevelIdx]);

  const handleAnswer = (isCorrect) => {
    const currentQ = questionQueue[0];
    const newCorrectCount = isCorrect ? correctCount + 1 : correctCount;

    setQuestionHistory(prev => [...prev, {
      question: currentQ.scenario,
      userAnswer: currentQ.options[isCorrect ? currentQ.correctIndex : (currentQ.correctIndex + 1) % currentQ.options.length],
      isCorrect: isCorrect,
      correctAnswer: currentQ.options[currentQ.correctIndex],
      level: surakshaLevels[currentLevelIdx].title
    }]);

    if (isCorrect) {
      setScore(prev => prev + 100);
      setCorrectCount(newCorrectCount);
    }

    const remainingQuestions = questionQueue.slice(1);

    if (remainingQuestions.length > 0) {
      setQuestionQueue(remainingQuestions);
    } else {
      if (newCorrectCount >= 3) {
        setGameState('LEVEL_SUCCESS');
      } else {
        setGameState('LEVEL_FAIL');
        setLives(prev => Math.max(0, prev - 1));
      }
      setQuestionQueue([]);
      setLastCorrectCount(newCorrectCount);
      setCorrectCount(0);
    }
  };

  const handleLevelSuccessNext = () => {
    if (currentLevelIdx < levels.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
      setGameState('LEVEL_INTRO');
    } else {
      setGameState('VICTORY');
      if (playerInfo) {
        submitToSheet({
          ...playerInfo,
          score: Math.floor(score),
          finished: true,
          shared: hasShared,
          sessionId: sessionId
        });
      }
    }
  };

  const handleLevelStart = () => {
    setGameState('PLAYING');
  };

  const handleGameOver = () => {
    setGameState('GAMEOVER');
    if (playerInfo) {
      submitToSheet({
        ...playerInfo,
        score: Math.floor(score),
        finished: false,
        shared: hasShared,
        sessionId: sessionId
      });
    }
  };

  const handleShare = async () => {
    const formattedText = `I just completed CRY's Cyber Safety Challenge—a fun game that tests how safely children (can) navigate the online world.\n` +
                          `My score: ${Math.floor(score)} points 🏆\n` +
                          `Can you do better? Play, learn, and challenge 3 more friends!\n` +
                          `🎮 https://cyber-champ-cry.vercel.app/\n` +
                          `For more on CRY's work for children: www.cry.org`;

    const shareData = {
      title: "CRY's Cyber Safety Challenge",
      text: formattedText,
      url: 'https://cyber-champ-cry.vercel.app/' 
    };

    try {
      let sharedSuccessfully = false;

      if (navigator.share) {
        await navigator.share({
          title: shareData.title,
          text: shareData.text
        });
        sharedSuccessfully = true; 
      } else {
        await navigator.clipboard.writeText(shareData.text);
        alert("Share details copied to clipboard! Paste it to share with your friends.");
        sharedSuccessfully = true; 
      }

      if (sharedSuccessfully && !hasShared) {
        setHasShared(true);
        if (playerInfo) {
          submitToSheet({
            ...playerInfo,
            score: Math.floor(score),
            finished: true,
            shared: true,
            sessionId: sessionId
          });
        }
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleRestart = () => {
    setGameState('LANDING');
    setQuestionHistory([]);
    setHasShared(false);
  };

  const handleDownloadReport = () => {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = cryLogo;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      generateSafetyReport(playerInfo, score, questionHistory, dataURL);
    };
  };

  const handleRetryLevel = () => {
    setGameState('PLAYING');
    setCorrectCount(0);
    setQuestionQueue([]);
    setLevelCycle(prev => prev + 1);
  };

  const isFaintScreen = gameState === 'GURU_TIP';

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#333',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'auto'
    }}>
      {/* Global CRY Logo Header */}
      {gameState !== 'LANDING' && gameState !== 'LEVEL_INTRO' && (
        <div className="global-cry-logo" style={{
          position: 'absolute',
          top: '-8px', 
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2001, 
          pointerEvents: 'none',
          backgroundColor: isFaintScreen ? 'transparent' : 'white', 
          padding: '12px 24px',
          borderRadius: '0 0 25px 25px',
          boxShadow: isFaintScreen ? 'none' : '0 4px 15px rgba(0,0,0,0.2)', 
          overflow: 'hidden'
        }}>
          <img 
            src={cryLogo} 
            alt="CRY Logo" 
            style={{ 
              height: '84px', 
              objectFit: 'contain', 
              display: 'block',
              transform: 'scale(1.22)',
              transformOrigin: 'center top',
              marginTop: '4px',
              opacity: isFaintScreen ? 0.12 : 1, 
              filter: isFaintScreen ? 'brightness(0.6) contrast(1.1)' : 'none' 
            }} 
          />
        </div>
      )}

      {gameState === 'LANDING' && <LandingScreen onFinishLoading={() => setGameState('START')} />}
      {gameState === 'START' && <StartScreen onStart={handleStart} />}
      {gameState === 'STORY' && <IntroStory onComplete={() => setGameState('LEVEL_INTRO')} />}
      {gameState === 'LEVEL_INTRO' && <LevelIntro levelIdx={currentLevelIdx} onStartLevel={handleLevelStart} />}

      {(gameState === 'PLAYING' || gameState === 'QUIZ') && (
        <GameCanvas
          key={`level-${currentLevelIdx}-${levelCycle}`}
          level={level}
          isPaused={gameState === 'QUIZ' || gameState === 'LEVEL_FAIL'}
          onLevelComplete={handleLevelFinished}
          lives={lives}
          onGameOver={handleGameOver}
          onScoreUpdate={setScore}
        />
      )}

      {gameState === 'GURU_TIP' && (
        <SecurityGuru
          levelData={surakshaLevels[currentLevelIdx]}
          onStartBossBattle={() => setGameState('QUIZ')}
        />
      )}

      {/* Renders the Question Panel Quiz using our layout system rules */}
      {gameState === 'QUIZ' && questionQueue.length > 0 && (
        <div className="quiz-container" style={{ paddingTop: '110px' }}>
          <QuestionPanel
            question={questionQueue[0]}
            onAnswer={handleAnswer}
            currentQuestionIndex={5 - questionQueue.length + 1}
            totalQuestions={5}
            levelIdx={currentLevelIdx}
          />
        </div>
      )}

      {gameState === 'LEVEL_SUCCESS' && (
        <div className="responsive-modal-panel">
          <LevelSuccess
            levelIdx={currentLevelIdx}
            stars={lastCorrectCount}
            score={score}
            onNext={handleLevelSuccessNext}
            onRetry={handleRetryLevel}
            onExit={handleRestart}
          />
        </div>
      )}

      {/* RESPONSIVE LEVEL FAIL MODAL */}
      {gameState === 'LEVEL_FAIL' && (
        <div className="responsive-modal-panel" style={{
          position: 'absolute', top: 0, left: 0, width: '100%', minHeight: '100%',
          backgroundColor: '#E4296B', color: '#fff',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          zIndex: 500, fontFamily: '"Riona Sans W01 Regular", sans-serif', textAlign: 'center',
          padding: '110px 20px 20px 20px', boxSizing: 'border-box'
        }}>
          <h1 className="question-text" style={{ fontSize: 'calc(2rem + 2vw)', fontWeight: 'normal', fontFamily: '"Riona Sans W04 Black", sans-serif', color: '#ffd806', marginBottom: '20px' }}>DON'T GIVE UP!</h1>
          <p style={{ fontSize: 'calc(1rem + 0.5vw)', marginBottom: '40px', maxWidth: '600px', lineHeight: '1.4' }}>
            That was a tough one, but every Hero learns from their mistakes. <br />
            <b>Let's try again!</b>
          </p>

          <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '400px', justifyContent: 'center' }}>
            <button
              onClick={handleRetryLevel}
              style={{
                width: '100%',
                padding: '15px 30px',
                fontSize: '1.3rem',
                cursor: 'pointer',
                borderRadius: '50px',
                border: 'none',
                fontFamily: '"Riona Sans W04 Black", sans-serif',
                backgroundColor: '#ffd806',
                color: 'black',
                boxShadow: '0 6px 0 #6B8E2D, 0 10px 20px rgba(0,0,0,0.3)'
              }}
            >
              RETRY LEVEL
            </button>
          </div>
        </div>
      )}

      {/* RESPONSIVE GAMEOVER MODAL */}
      {gameState === 'GAMEOVER' && (
        <div className="responsive-modal-panel" style={{
          position: 'absolute', top: 0, left: 0, width: '100%', minHeight: '100%',
          backgroundColor: '#E4296B', color: '#fff',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          zIndex: 300, fontFamily: '"Riona Sans W01 Regular", sans-serif', textAlign: 'center',
          padding: '120px 20px 20px 20px', boxSizing: 'border-box'
        }}>
          <h1 style={{ fontSize: 'calc(2rem + 2vw)', fontWeight: 'normal', fontFamily: '"Riona Sans W04 Black", sans-serif', color: '#ff4444', marginBottom: '10px' }}>MISSION FAILED</h1>
          <p style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Don't give up, {playerInfo?.name}!</p>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '20px',
            borderRadius: '20px',
            marginBottom: '30px',
            width: '100%',
            maxWidth: '500px',
            border: '2px solid rgba(255,255,255,0.2)'
          }}>
            <p style={{ fontSize: '1.2rem' }}>You got <b>{questionHistory.filter(h => h.isCorrect).length}</b> safety questions right!</p>
            <p style={{ fontSize: '1.1rem', opacity: 0.8, marginTop: '5px' }}>Score: {Math.floor(score)}</p>
          </div>
          <div style={{ display: 'flex', gap: '15px', flexDirection: 'column', width: '100%', maxWidth: '400px' }}>
            <button onClick={handleRestart} style={{ width: '100%', padding: '14px', fontSize: '1.2rem', cursor: 'pointer', borderRadius: '50px', border: 'none', fontFamily: '"Riona Sans W04 Black", sans-serif', backgroundColor: '#ffd806', color: 'black' }}>
              RETRY MISSION
            </button>
            <button onClick={handleDownloadReport} style={{ width: '100%', padding: '14px', fontSize: '1.2rem', cursor: 'pointer', borderRadius: '50px', border: '2px solid #fff', fontFamily: '"Riona Sans W04 Black", sans-serif', backgroundColor: 'transparent', color: '#fff' }}>
              GET SAFETY REPORT
            </button>
          </div>
        </div>
      )}

      {/* RESPONSIVE VICTORY MODAL */}
      {gameState === 'VICTORY' && (
        <div className="victory-modal-container" style={{
          position: 'absolute', top: 0, left: 0, width: '100%', minHeight: '100%',
          backgroundColor: '#E4296B', color: '#fff',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          zIndex: 300, fontFamily: '"Riona Sans W01 Regular", sans-serif', textAlign: 'center',
          padding: '80px 20px 20px 20px', boxSizing: 'border-box'
        }}>
          {/* Inline structural wrapper for Mobile Logo layout tracking */}
          <div className="victory-mobile-logo-spacer" style={{ display: 'none', width: '100%', justifyContent: 'center', marginBottom: '15px' }}>
             <div style={{ backgroundColor: 'white', padding: '12px 24px', borderRadius: '0 0 25px 25px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', overflow: 'hidden', marginTop: '-8px' }}>
                <img 
                  src={cryLogo} 
                  alt="CRY Logo" 
                  style={{ 
                    height: '64px', 
                    objectFit: 'contain',
                    transform: 'scale(1.22)',
                    transformOrigin: 'center top',
                    marginTop: '4px'
                  }} 
                />
             </div>
          </div>

          <h1 className="victory-title-heading" style={{ fontSize: 'calc(2.2rem + 2vw)', fontWeight: 'normal', fontFamily: '"Riona Sans W04 Black", sans-serif', color: '#ffd806', marginBottom: '10px' }}>CYBER CHAMPION!</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Outstanding work, {playerInfo?.name}!</p>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '20px',
            borderRadius: '25px',
            marginBottom: '30px',
            width: '100%',
            maxWidth: '500px',
            border: '2px solid #8CB63D'
          }}>
            <p style={{ fontSize: '1.3rem' }}>Final Score: <b>{Math.floor(score)}</b></p>
            <p style={{ fontSize: '1.1rem', marginTop: '5px' }}>Safety Master: <b>{questionHistory.filter(h => h.isCorrect).length}/{questionHistory.length}</b> Correct</p>
          </div>
          <div className="victory-buttons-group" style={{ display: 'flex', gap: '15px', flexDirection: 'column', width: '100%', maxWidth: '400px' }}>
            <button onClick={handleShare} style={{ width: '100%', padding: '15px', fontSize: '1.1rem', cursor: 'pointer', borderRadius: '50px', border: 'none', fontFamily: '"Riona Sans W04 Black", sans-serif', backgroundColor: '#ffd806', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span>SHARE THIS GAME- READY LINK</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.66 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" /></svg>
            </button>
            <button onClick={handleDownloadReport} style={{ width: '100%', padding: '15px', fontSize: '1.1rem', cursor: 'pointer', borderRadius: '50px', border: '2px solid #fff', fontFamily: '"Riona Sans W04 Black", sans-serif', backgroundColor: 'transparent', color: '#fff' }}>
              DOWNLOAD PERFORMANCE CARD
            </button>
            <button onClick={handleRestart} style={{ width: '100%', padding: '15px', fontSize: '1.1rem', cursor: 'pointer', borderRadius: '50px', border: 'none', fontFamily: '"Riona Sans W04 Black", sans-serif', backgroundColor: '#ffd806', color: 'black' }}>
              PLAY AGAIN
            </button>
          </div>
          <div className="victory-footer-text" style={{ marginTop: '30px', opacity: 0.8, paddingBottom: '30px' }}>
            <p style={{ fontSize: '1rem', margin: '5px 0' }}>Remember: Use Technology responsibly and stay safe!</p>
            <p style={{ margin: '5px 0', fontSize: '0.8rem' }}>© CRY - Child Rights and You</p>
          </div>
        </div>
      )}

      {/* Responsive layout configuration rules inside global styled sheet layout context */}
      <style>{`
        /* --- ALL MOBILE/PHONE SCREENS --- */
        @media (max-width: 768px) {
          .global-cry-logo {
            display: block !important;
            top: -8px !important;
            padding: 8px 16px !important;
            border-radius: 0 0 18px 18px !important;
          }
          .global-cry-logo img {
            height: 60px !important;
            transform: scale(1.22) !important;
            transform-origin: center top !important;
            margin-top: 4px !important;
          }
          
          .victory-modal-container .global-cry-logo {
            display: none !important; 
          }
          
          .victory-title-heading {
            font-size: 1.8rem !important;
            white-space: nowrap !important;
            letter-spacing: 0.5px !important;
            margin-top: 5px !important;
            margin-bottom: 5px !important;
          }
          
          .victory-modal-container {
            position: relative !important;
            display: block !important;
            width: 100% !important;
            height: auto !important;
            min-height: 100vh !important;
            overflow-y: auto !important;
            padding: 0px 16px 40px 16px !important;
          }
          
          .responsive-modal-panel {
            padding-top: 105px !important; 
          }
          
          .victory-mobile-logo-spacer {
            display: flex !important;
          }
          
          .victory-buttons-group {
            margin: 0 auto 25px auto !important;
          }
          
          .victory-footer-text {
            margin-top: 15px !important;
            padding-bottom: 35px !important;
            display: block !important;
          }
        }
        
        /* --- LAPTOP, TABLET & MINIMIZED DESKTOP VIEWS --- */
        @media (min-width: 769px) {
          .global-cry-logo {
            display: block !important;
            position: absolute !important;
          }
          .victory-modal-container {
            justify-content: center !important;
            padding-top: 130px !important; 
          }
          .responsive-modal-panel {
            padding-top: 140px !important;
          }
        }
        
        /* --- COMPRESSED BREAKPOINTS --- */
        @media (min-width: 769px) and (max-width: 1150px), (max-height: 750px) and (min-width: 769px) {
          .victory-modal-container {
            justify-content: flex-start !important;
            padding-top: 120px !important;
            overflow-y: auto !important;
          }
          .responsive-modal-panel {
            justify-content: flex-start !important;
            padding-top: 130px !important;
            overflow-y: auto !important;
          }
          .victory-title-heading {
            font-size: 2.8rem !important;
          }
          .victory-modal-container p {
            margin-bottom: 10px !important;
          }
          .victory-modal-container div {
            margin-bottom: 15px !important;
          }
        }

        @media (max-height: 700px) and (min-width: 769px) {
          .victory-modal-container {
            justify-content: flex-start !important;
            padding-top: 115px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;