import React, { useState, useEffect } from 'react';

// Import frame images
import frameYellow from '../assets/questions_panel/questions panel.png';
import frameBlue from '../assets/questions_panel/questions panel-6.png';
import frameRed from '../assets/questions_panel/questions panel-8.png';
import frameDark from '../assets/questions_panel/questions panel-4.png';

const QuestionPanel = ({ question, onAnswer, currentQuestionIndex, totalQuestions, levelIdx }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isLocked, setIsLocked] = useState(false);

    // Reset state when question changes
    useEffect(() => {
        setSelectedIndex(null);
        setIsLocked(false);
    }, [question]);

    const handleOptionClick = (index) => {
        if (isLocked) return;

        setSelectedIndex(index);
        setIsLocked(true);

        const isCorrect = index === question.correctIndex;

        // Delay proceeding so player can see feedback
        setTimeout(() => {
            onAnswer(isCorrect);
        }, 1000);
    };

    // Level-specific configurations
    const getLevelConfig = (idx) => {
        switch (idx) {
            case 0: // Level 1
                return {
                    frame: frameYellow,
                    textColor: '#4e342e',
                    accentColor: '#ffd806', // CRY Yellow
                    buttonBg: 'rgba(255, 255, 255, 0.9)',
                    buttonBorder: '#ffd806',
                    filter: 'none'
                };
            case 1: // Level 2
                return {
                    frame: frameBlue,
                    textColor: '#0d47a1',
                    accentColor: '#1CB7B8', // CRY Blue
                    buttonBg: 'rgba(255, 255, 255, 0.9)',
                    buttonBorder: '#1CB7B8',
                    filter: 'none'
                };
            case 2: // Level 3
                return {
                    frame: frameRed,
                    textColor: '#ffffff',
                    accentColor: '#F16723', // CRY Orange
                    buttonBg: 'rgba(0, 0, 0, 0.7)',
                    buttonBorder: '#F16723',
                    filter: 'none'
                };
            case 3: // Level 4
                return {
                    frame: frameBlue,
                    textColor: '#ffffff',
                    accentColor: '#6B2F67', // CRY Purple
                    buttonBg: 'rgba(0, 0, 0, 0.75)',
                    buttonBorder: '#6B2F67',
                    filter: 'hue-rotate(240deg) saturate(1.5)' // Adjusted to purple
                };
            case 4: // Level 5
                return {
                    frame: frameDark,
                    textColor: '#E4296B', // CRY Pink
                    accentColor: '#E4296B',
                    buttonBg: 'rgba(0, 0, 0, 0.85)',
                    buttonBorder: '#E4296B',
                    filter: 'none',
                    glow: '0 0 15px rgba(228, 41, 107, 0.4)'
                };
            default:
                return {
                    frame: frameYellow,
                    textColor: '#333',
                    accentColor: '#FF9900',
                    buttonBg: 'white',
                    buttonBorder: '#ddd'
                };
        }
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const config = getLevelConfig(levelIdx);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 500,
            overflow: 'hidden',
            fontFamily: '"Riona Sans W01 Regular", sans-serif'
        }}>
            {/* The Designer Border Frame */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url("${config.frame}")`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                filter: config.filter,
                zIndex: 1
            }} />

            {/* Central Content Area (Transparent to show frame) */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: isMobile ? '80px 40px 20px 40px' : '100px 100px 40px 100px',
                boxSizing: 'border-box',
                animation: 'fadeIn 0.5s ease-out'
            }}>
                {/* Progress Indicator */}
                <div style={{
                    position: 'absolute',
                    top: isMobile ? '20px' : '50px',
                    right: isMobile ? '40px' : '80px',
                    color: config.accentColor,
                    fontFamily: '"Riona Sans W04 Black", sans-serif',
                    fontSize: isMobile ? '1rem' : '1.4rem',
                    textShadow: '0 0 10px rgba(0,0,0,0.5)',
                    opacity: 0.8
                }}>
                    QUESTION {currentQuestionIndex} / {totalQuestions}
                </div>

                <div style={{ maxWidth: '1000px', width: '100%', textAlign: 'center' }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.8rem' : '2.2rem',
                        marginBottom: isMobile ? '20px' : '40px',
                        marginTop: '0',
                        fontWeight: 'normal',
                        fontFamily: '"Riona Sans W04 Black", sans-serif',
                        lineHeight: '1.2',
                        color: config.textColor,
                        textShadow: levelIdx >= 2 ? '3px 3px 8px rgba(0,0,0,0.8)' : '1px 1px 2px rgba(255,255,255,0.8)'
                    }}>
                        {question.scenario || question.question}
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: isMobile ? '15px' : '30px',
                        width: '100%',
                        maxHeight: isMobile ? '60vh' : 'auto',
                        overflowY: isMobile ? 'auto' : 'visible'
                    }}>
                        {question.options.map((option, index) => {
                            const isSelected = selectedIndex === index;
                            const isCorrect = index === question.correctIndex;
                            const showResult = selectedIndex !== null;

                            let bgColor = config.buttonBg;
                            let borderColor = config.buttonBorder;
                            let textColor = config.textColor;

                            if (showResult) {
                                if (isCorrect) {
                                    bgColor = '#4caf50';
                                    borderColor = '#2e7d32';
                                    textColor = '#ffffff';
                                } else if (isSelected) {
                                    bgColor = '#f44336';
                                    borderColor = '#b71c1c';
                                    textColor = '#ffffff';
                                } else {
                                    bgColor = 'rgba(255, 255, 255, 0.1)';
                                    borderColor = 'rgba(0, 0, 0, 0.1)';
                                    textColor = 'rgba(0, 0, 0, 0.3)';
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                    disabled={isLocked}
                                    style={{
                                        padding: isMobile ? '15px 20px' : '30px 40px',
                                        fontSize: isMobile ? '1rem' : '1.4rem',
                                        backgroundColor: bgColor,
                                        border: `3px solid ${borderColor}`,
                                        borderRadius: '60px',
                                        cursor: isLocked ? 'default' : 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        fontWeight: '700',
                                        color: textColor,
                                        textAlign: 'left',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: isMobile ? '10px' : '20px',
                                        boxShadow: (isSelected || (showResult && isCorrect)) ? '0 0 20px rgba(0,0,0,0.3)' : config.glow ? `0 0 15px ${config.accentColor}, 0 6px 15px rgba(0,0,0,0.3)` : '0 8px 15px rgba(0,0,0,0.2)',
                                        width: '100%',
                                        outline: 'none',
                                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                        animation: (isSelected && !isCorrect) ? 'shake 0.4s ease-in-out' : (isSelected && isCorrect) ? 'correctPop 0.5s ease-out' : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (isLocked) return;
                                        e.target.style.transform = 'scale(1.04)';
                                        e.target.style.borderColor = config.accentColor;
                                        e.target.style.boxShadow = config.glow ? `0 0 25px ${config.accentColor}, 0 10px 20px rgba(0,0,0,0.4)` : '0 12px 25px rgba(0,0,0,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (isLocked) return;
                                        e.target.style.transform = 'scale(1)';
                                        e.target.style.borderColor = borderColor;
                                        e.target.style.boxShadow = config.glow ? `0 0 15px ${config.accentColor}, 0 6px 15px rgba(0,0,0,0.3)` : '0 8px 15px rgba(0,0,0,0.2)';
                                    }}
                                >
                                    <span style={{
                                        width: isMobile ? '30px' : '50px',
                                        height: isMobile ? '30px' : '50px',
                                        borderRadius: '50%',
                                        backgroundColor: showResult ? (isCorrect ? '#2e7d32' : isSelected ? '#b71c1c' : '#ccc') : config.accentColor,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: isMobile ? '1rem' : '1.3rem',
                                        color: 'white',
                                        flexShrink: 0,
                                        fontFamily: '"Riona Sans W04 Black", sans-serif',
                                        fontWeight: 'normal',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                                    }}>
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                @keyframes correctPop {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1.05); }
                }
            `}</style>
        </div>
    );
};

export default QuestionPanel;
