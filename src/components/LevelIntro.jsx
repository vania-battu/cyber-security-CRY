import React, { useEffect, useState } from 'react';
import { surakshaLevels } from '../data/surakshaQuestions';

const LevelIntro = ({ levelIdx, onStartLevel }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => {
            onStartLevel();
        }, 8000); // 8 seconds countdown loop
        return () => clearTimeout(timer);
    }, [onStartLevel]);

    const level = surakshaLevels[levelIdx];

    // Theme configurations mapping
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

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                cursor: 'pointer',
                boxSizing: 'border-box',
                padding: '20px'
            }}
        >
            {/* FIXED: Background pulse circle uses viewport constraints to prevent clipping blowouts */}
            <div style={{
                position: 'absolute',
                width: isMobile ? '50vw' : '30vw',
                height: isMobile ? '50vw' : '30vw',
                borderRadius: '50%',
                backgroundColor: currentTheme.color,
                opacity: 0.08,
                transform: animate ? 'scale(3.5)' : 'scale(0)',
                transition: 'transform 2s ease-out',
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
                pointerEvents: 'none',
                width: '100%',
                maxWidth: '900px'
            }}>
                {/* Main Level Label Display */}
                <h1 style={{
                    fontSize: isMobile ? '2.8rem' : 'calc(3rem + 2.5vw)', /* FIXED: Fluid responsive header calculations */
                    margin: '0',
                    color: currentTheme.color,
                    fontWeight: 'normal',
                    fontFamily: '"Riona Sans W04 Black", sans-serif',
                    textShadow: '0 4px 15px rgba(0,0,0,0.5)',
                    lineHeight: '1.1'
                }}>
                    {title.trim()}
                </h1>

                {/* Level Title Subheading Description */}
                <p style={{
                    fontSize: isMobile ? '1.2rem' : '1.8rem',
                    color: 'white',
                    width: '100%',
                    maxWidth: '750px',
                    margin: isMobile ? '10px auto 25px auto' : '15px auto 35px auto',
                    lineHeight: '1.3',
                    fontFamily: '"Riona Sans W01 Regular", sans-serif',
                    opacity: 0.95
                }}>
                    {cleanSubtitle.trim()}
                </p>

                {/* Security Guru Fact Box Overlay Container */}
                <div style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                    padding: isMobile ? '18px 24px' : '25px 45px',
                    borderRadius: '24px',
                    borderLeft: `10px solid ${currentTheme.color}`,
                    width: '100%',
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'left',
                    animation: animate ? 'fadeInUp 0.8s ease-out 0.6s forwards' : 'none',
                    opacity: 0,
                    transform: 'translateY(20px)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.3)'
                }}>
                    <span style={{
                        display: 'block',
                        color: currentTheme.color,
                        fontFamily: '"Riona Sans W04 Black", sans-serif',
                        fontSize: isMobile ? '0.85rem' : '1rem',
                        letterSpacing: '1.5px',
                        marginBottom: '8px',
                        textTransform: 'uppercase'
                    }}>
                        Security Guru Fact
                    </span>
                    <p style={{
                        fontSize: isMobile ? '1.1rem' : '1.4rem',
                        lineHeight: '1.4',
                        color: 'white',
                        fontFamily: '"Goodlife W00 Sans Condensed", sans-serif',
                        margin: 0,
                        fontWeight: 'normal'
                    }}>
                        "{level.guruTip}"
                    </p>
                </div>
            </div>

            {/* Click to skip tooltip hint text */}
            <div style={{
                position: 'absolute',
                bottom: isMobile ? '15px' : '25px',
                right: isMobile ? '50%' : '40px',
                transform: isMobile ? 'translateX(50%)' : 'none', /* FIXED: Centers tooltip hint bottom middle on mobile viewports */
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.85rem',
                fontFamily: '"Riona Sans W01 Regular", sans-serif',
                animation: 'pulse 2s infinite',
                whiteSpace: 'nowrap'
            }}>
                (Click anywhere to skip)
            </div>

            {/* FIXED: Time tracking countdown bar changed from 400px to percentage width */}
            <div style={{
                position: 'absolute',
                bottom: '12%',
                width: isMobile ? '70%' : '350px', 
                height: '5px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '10px',
                overflow: 'hidden',
                pointerEvents: 'none'
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
                @keyframes fadeInUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
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