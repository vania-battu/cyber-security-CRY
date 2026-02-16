import React, { useEffect, useState } from 'react';
import { surakshaLevels } from '../data/surakshaQuestions';

const LevelIntro = ({ levelIdx, onStartLevel }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => {
            onStartLevel();
        }, 8000); // Increased to 8 seconds
        return () => clearTimeout(timer);
    }, [onStartLevel]);

    const level = surakshaLevels[levelIdx];

    // Theme colors/names mapping
    const themes = [
        { color: "#ffd806" }, // L1: Gold
        { color: "#1CB7B8" }, // L2: Cyan/Blue
        { color: "#F16723" }, // L3: Orange
        { color: "#6B2F67" }, // L4: Purple
        { color: "#E4296B" }  // L5: Pink
    ];

    const currentTheme = themes[levelIdx] || { color: "#fff" };
    const [title, subtitle] = level.title.split('(');
    const cleanSubtitle = subtitle ? subtitle.replace(')', '') : '';

    return (
        <div
            onClick={onStartLevel}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#2d1440',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                fontFamily: '"Riona Sans W01 Regular", sans-serif',
                color: 'white',
                overflow: 'hidden',
                cursor: 'pointer'
            }}
        >
            {/* Animated Background Circles */}
            <div style={{
                position: 'absolute',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                backgroundColor: currentTheme.color,
                opacity: 0.1,
                transform: animate ? 'scale(2.5)' : 'scale(0)',
                transition: 'transform 1.5s ease-out',
                pointerEvents: 'none'
            }} />

            <div style={{
                zIndex: 10,
                textAlign: 'center',
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s ease-out 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pointerEvents: 'none'
            }}>

                <h1 style={{
                    fontSize: '5.5rem',
                    margin: '0',
                    color: currentTheme.color,
                    fontWeight: 'normal',
                    fontFamily: '"Riona Sans W04 Black", sans-serif',
                    textShadow: '0 4px 15px rgba(0,0,0,0.5)',
                    lineHeight: '1'
                }}>
                    {title.trim()}
                </h1>

                <p style={{
                    fontSize: '2.2rem',
                    color: 'white',
                    maxWidth: '800px',
                    margin: '10px auto 40px auto',
                    lineHeight: '1.2',
                    fontFamily: '"Riona Sans W01 Regular", sans-serif',
                    opacity: 0.9
                }}>
                    {cleanSubtitle.trim()}
                </p>

                {/* FACTS WALA LINE (Guru Tip) */}
                <div style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(5px)',
                    padding: '25px 45px',
                    borderRadius: '30px',
                    borderLeft: `12px solid ${currentTheme.color}`,
                    maxWidth: '850px',
                    margin: '0 auto',
                    textAlign: 'left',
                    animation: animate ? 'fadeInUp 0.8s ease-out 0.8s forwards' : 'none',
                    opacity: 0,
                    transform: 'translateY(30px)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                }}>
                    <span style={{
                        display: 'block',
                        color: currentTheme.color,
                        fontFamily: '"Riona Sans W04 Black", sans-serif',
                        fontSize: '1.1rem',
                        letterSpacing: '2px',
                        marginBottom: '12px',
                        textTransform: 'uppercase'
                    }}>
                        Security Guru Fact
                    </span>
                    <p style={{
                        fontSize: '1.5rem',
                        lineHeight: '1.5',
                        color: 'white',
                        fontFamily: '"Goodlife W00 Sans Condensed", sans-serif',
                        margin: 0,
                        fontWeight: 'normal'
                    }}>
                        "{level.guruTip}"
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>

            {/* Click to skip hint */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                right: '40px',
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.9rem',
                fontFamily: '"Riona Sans W01 Regular", sans-serif',
                animation: 'pulse 2s infinite'
            }}>
                (Click anywhere to skip)
            </div>

            {/* Progress Bar */}
            <div style={{
                position: 'absolute',
                bottom: '10%',
                width: '400px',
                height: '6px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '3px',
                overflow: 'hidden'
            }}>
                <div style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: currentTheme.color,
                    transform: animate ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 8s linear'
                }} />
            </div>

            <style>{`
                @keyframes pulse {
                    0% { opacity: 0.2; }
                    50% { opacity: 0.5; }
                    100% { opacity: 0.2; }
                }
            `}</style>
        </div>
    );
};

export default LevelIntro;

