import React, { useState, useEffect } from 'react';

// Import frame images
import frameYellow from '../assets/questions_panel/questions panel.png';
import frameBlue from '../assets/questions_panel/questions panel-6.png';
import frameRed from '../assets/questions_panel/questions panel-8.png';
import frameDark from '../assets/questions_panel/questions panel-4.png';

const QuestionPanel = ({ question, onAnswer, currentQuestionIndex, totalQuestions, levelIdx }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const [shakeIndex, setShakeIndex] = useState(null); 

    useEffect(() => {
        setSelectedIndex(null);
        setIsLocked(false);
        setShakeIndex(null);
    }, [question]);

    const handleOptionClick = (index) => {
        if (isLocked) return;
        setSelectedIndex(index);
        setIsLocked(true);
        
        const isCorrect = index === question.correctIndex;
        
        if (!isCorrect) {
            setShakeIndex(index);
        }

        setTimeout(() => {
            onAnswer(isCorrect);
        }, 1000);
    };

    const getLevelConfig = (idx) => {
        switch (idx) {
            case 0:
                return { frame: frameYellow, textColor: '#4e342e', accentColor: '#ffd806', buttonBg: '#ffffff', buttonBorder: '#ffd806', pageBg: '#ffffff' };
            case 1:
                return { frame: frameBlue, textColor: '#0d47a1', accentColor: '#1CB7B8', buttonBg: '#ffffff', buttonBorder: '#1CB7B8', pageBg: '#ffffff' };
            case 2:
                return { frame: frameRed, textColor: '#ffffff', accentColor: '#F16723', buttonBg: 'rgba(28, 12, 12, 0.92)', buttonBorder: '#F16723', pageBg: '#1a1a1a' };
            case 3:
                return { 
                    frame: frameBlue, 
                    textColor: '#1c110f', 
                    accentColor: '#6B2F67', 
                    buttonBg: 'rgba(0, 0, 0, 0.75)', 
                    buttonBorder: '#6B2F67', 
                    filter: 'hue-rotate(240deg) saturate(1.5)', 
                    pageBg: '#1a1a1a' 
                };
            case 4:
                return { frame: frameDark, textColor: '#e0e59e', accentColor: '#E4296B', buttonBg: 'rgba(0, 0, 0, 0.85)', buttonBorder: '#E4296B', glow: '0 0 15px rgba(228, 41, 107, 0.4)', pageBg: '#1a1a1a' };
            default:
                return { frame: frameYellow, textColor: '#333', accentColor: '#FF9900', buttonBg: 'white', buttonBorder: '#ddd', pageBg: '#ffffff' };
        }
    };

    const [viewMode, setViewMode] = useState('DESKTOP'); 

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setViewMode('MOBILE');
            } else if (width >= 768 && width < 1150) {
                setViewMode('TABLET'); 
            } else {
                setViewMode('DESKTOP');
            }
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = viewMode === 'MOBILE';
    const isTablet = viewMode === 'TABLET';
    const config = getLevelConfig(levelIdx);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            minHeight: '100vh',
            backgroundColor: config.pageBg, 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            zIndex: 500,
            overflowX: 'hidden',
            overflowY: 'auto',
            fontFamily: '"Riona Sans W01 Regular", sans-serif',
            boxSizing: 'border-box'
        }}>
            {/* Background Frame Layer - Changed position to fixed to prevent crashing during scroll */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundImage: `url("${config.frame}")`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                filter: config.filter,
                zIndex: 1,
                pointerEvents: 'none'
            }} />

            {/* CORE WRAPPER STAGE BOX */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: isMobile ? '100%' : '1240px', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: isMobile ? '115px 16px 25px 16px' : (isTablet ? '130px 45px 40px 45px' : '140px 60px 40px 60px'), 
                boxSizing: 'border-box',
                minHeight: '100vh'
            }}>
                
                {/* Progress Tracker Label */}
                <div style={{
                    position: 'absolute',
                    top: isMobile ? '78px' : (isTablet ? '54px' : '58px'), 
                    right: isMobile ? '28px' : (isTablet ? '55px' : '72px'), 
                    color: config.accentColor,
                    fontFamily: '"Riona Sans W04 Black", sans-serif',
                    fontSize: isMobile ? '1.05rem' : '1.35rem',
                    textShadow: levelIdx >= 2 ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
                    letterSpacing: '0.5px',
                    fontWeight: 'bold',
                    zIndex: 40
                }}>
                    {isMobile ? `(${currentQuestionIndex}/${totalQuestions})` : `QUESTION ${currentQuestionIndex} / ${totalQuestions}`}
                </div>

                <div style={{ width: '100%', textAlign: 'center' }}>
                    
                    <div style={{
                        width: '100%',
                        height: 'auto', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: isMobile ? '5px' : '10px', 
                        marginBottom: isMobile ? '15px' : '35px',
                        boxSizing: 'border-box'
                    }}>
                        {/* Main Scenario Heading */}
                        <h2 className="question-text" style={{
                            fontSize: isMobile ? '1.12rem' : (isTablet ? '1.75rem' : '2.2rem'), 
                            margin: 0,
                            fontWeight: 'normal',
                            fontFamily: '"Riona Sans W04 Black", sans-serif',
                            lineHeight: '1.35',
                            color: config.textColor,
                            textShadow: levelIdx === 3 ? 'none' : ((levelIdx === 0 || levelIdx === 1) ? '0 1px 2px rgba(0,0,0,0.02)' : '2px 3px 6px rgba(0,0,0,0.6)'),
                            padding: isMobile ? '0 5px' : '0 50px',
                            wordBreak: 'break-word',
                            width: '100%'
                        }}>
                            {question.scenario || question.question}
                        </h2>
                    </div>

                    {/* TWO-COLUMN RESPONSE CONTAINER TRACK */}
                    <div className="options-grid" style={{ 
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                        gap: isMobile ? '12px' : (isTablet ? '20px 24px' : '24px 32px'), 
                        width: '100%',
                        maxWidth: '1160px', 
                        margin: '0 auto',
                        boxSizing: 'border-box'
                    }}>
                        {question.options.map((option, index) => {
                            const isSelected = selectedIndex === index;
                            const isCorrect = index === question.correctIndex;
                            const showResult = selectedIndex !== null;
                            const shouldShake = shakeIndex === index;

                            let bgColor = config.buttonBg;
                            let borderColor = config.buttonBorder;
                            let innerTextColor = (levelIdx === 0 || levelIdx === 1) ? config.textColor : '#ffffff';

                            if (showResult) {
                                if (isCorrect) { 
                                    bgColor = '#4caf50'; borderColor = '#2e7d32'; innerTextColor = '#ffffff'; 
                                } else if (isSelected) { 
                                    bgColor = '#f44336'; borderColor = '#b71c1c'; innerTextColor = '#ffffff'; 
                                } else { 
                                    bgColor = (levelIdx === 0 || levelIdx === 1) ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.08)'; 
                                    borderColor = (levelIdx === 0 || levelIdx === 1) ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.15)'; 
                                    innerTextColor = (levelIdx === 0 || levelIdx === 1) ? 'rgba(78, 52, 46, 0.4)' : 'rgba(255, 255, 255, 0.3)'; 
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                    disabled={isLocked}
                                    style={{
                                        fontSize: isMobile ? '0.88rem' : (isTablet ? '1.1rem' : '1.2rem'), 
                                        backgroundColor: bgColor,
                                        border: `2px solid ${borderColor}`, 
                                        borderRadius: '60px', 
                                        padding: isMobile ? '12px 18px' : '20px 35px', 
                                        cursor: isLocked ? 'default' : 'pointer',
                                        transition: 'background-color 0.15s, border-color 0.15s, color 0.15s, transform 0.1s ease',
                                        fontWeight: '700', 
                                        color: innerTextColor,
                                        textAlign: 'left',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: isMobile ? '10px' : '20px', 
                                        boxShadow: (levelIdx === 0 || levelIdx === 1) ? '0 8px 20px rgba(0,0,0,0.06)' : '0 8px 16px rgba(0,0,0,0.35)', 
                                        width: '100%',
                                        height: 'auto', 
                                        minHeight: isMobile ? 'auto' : '90px', 
                                        boxSizing: 'border-box',
                                        lineHeight: isMobile ? '1.35' : '1.45',
                                        animation: shouldShake ? 'wrongNudge 0.4s ease-in-out' : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isLocked) e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isLocked) e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {/* Bubble Badge Index Marker */}
                                    <span style={{
                                        width: isMobile ? '30px' : '40px', 
                                        height: isMobile ? '30px' : '40px',
                                        borderRadius: '50%',
                                        backgroundColor: showResult ? (isCorrect ? '#2e7d32' : isSelected ? '#b71c1c' : '#ccc') : config.accentColor,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: isMobile ? '0.85rem' : '1.15rem',
                                        color: '#ffffff', 
                                        flexShrink: 0,
                                        fontFamily: '"Riona Sans W04 Black", sans-serif',
                                        opacity: (showResult && !isCorrect && !isSelected) ? 0.6 : 1,
                                        textShadow: '1px 1px 2px rgba(0,0,0,0.15)',
                                        boxShadow: '0 3px 6px rgba(0,0,0,0.08)'
                                    }}>
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <div style={{ flex: 1, wordBreak: 'break-word', paddingRight: '2px' }}>{option}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes wrongNudge {
                    0% { transform: translateX(0); }
                    12.5% { transform: translateX(-6px) rotate(-0.5deg); }
                    37.5% { transform: translateX(5px) rotate(0.5deg); }
                    62.5% { transform: translateX(-4px) rotate(-0.3deg); }
                    87.5% { transform: translateX(2px) rotate(0.1deg); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
};

export default QuestionPanel;