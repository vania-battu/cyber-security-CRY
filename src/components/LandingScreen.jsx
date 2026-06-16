import React, { useEffect, useState } from 'react';
import cryLogo from '../assets/Child_Rights_and_You_(CRY)_Organization_logo.png';
import heroGirl from '../assets/girl.png';
import homeBg from '../assets/home_bg.png';

// Friends
import f1 from '../assets/friends/friend_f1.png';
import f2 from '../assets/friends/friend_f2.png';
import f3 from '../assets/friends/friend_f3.png';
import f4 from '../assets/friends/friend_f4.png';
import f5 from '../assets/friends/friend_f5.png';

import { level1 } from '../levels/level1';
import { level2 } from '../levels/level2';
import { level3 } from '../levels/level3';
import { level4 } from '../levels/level4';
import { level5 } from '../levels/level5';

const LandingScreen = ({ onFinishLoading }) => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState('LOADING'); 

    useEffect(() => {
        if (phase === 'LOADING') {
            const loadAssets = async () => {
                const levels = [level1, level2, level3, level4, level5];

                const levelAssets = levels.flatMap(level => {
                    const bgs = level.backgrounds.map(bg => bg.src);
                    const villain = level.antagonist.src;
                    return [...bgs, villain];
                });

                const playerGlob = import.meta.glob('../assets/player/run_f*.png', { eager: true, as: 'url' });
                const playerFrames = Object.values(playerGlob);

                const staticAssets = [
                    cryLogo, heroGirl, homeBg,
                    f1, f2, f3, f4, f5
                ];

                const allAssets = [...new Set([...levelAssets, ...playerFrames, ...staticAssets])];
                const totalAssets = allAssets.length;
                let loadedCount = 0;

                const updateProgress = () => {
                    loadedCount++;
                    const percent = Math.min(Math.round((loadedCount / totalAssets) * 100), 100);
                    setProgress(percent);
                };

                const imagePromises = allAssets.map(src => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.src = src;
                        img.onload = () => {
                            updateProgress();
                            resolve();
                        };
                        img.onerror = () => {
                            updateProgress();
                            resolve();
                        };
                    });
                });

                await Promise.all(imagePromises);

                setProgress(100);
                setTimeout(() => setPhase('INTRO'), 800);
            };

            loadAssets();
        }
    }, [phase]);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const accentYellow = '#ffd806';

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#2d1440',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: '"Riona Sans W01 Regular", sans-serif',
            zIndex: 300,
            overflow: 'hidden',
            color: 'white'
        }}>
            {/* Background with blurred decorative assets */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                overflow: 'hidden',
                filter: 'blur(15px) brightness(0.5) opacity(0.7)',
                pointerEvents: 'none'
            }}>
                <img src={f1} style={{ position: 'absolute', top: '10%', left: '5%', height: '400px' }} alt="" />
                <img src={f2} style={{ position: 'absolute', top: '20%', right: '10%', height: '350px' }} alt="" />
                <img src={f3} style={{ position: 'absolute', bottom: '15%', left: '20%', height: '450px' }} alt="" />
                <img src={f4} style={{ position: 'absolute', bottom: '10%', right: '25%', height: '400px' }} alt="" />
                <img src={f5} style={{ position: 'absolute', top: '40%', left: '45%', height: '380px' }} alt="" />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(45, 20, 64, 0.4)'
                }} />
            </div>

            {/* Logo Tab */}
            <div className="landing-logo-tab" style={{
                position: 'relative',
                top: '-8px',
                zIndex: 10,
                backgroundColor: 'white',
                padding: '12px 24px',
                borderRadius: '0 0 25px 25px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                flexShrink: 0,
                overflow: 'hidden'
            }}>
                <img 
                    src={cryLogo} 
                    alt="CRY Logo" 
                    style={{ 
                        height: isMobile ? '60px' : '84px', 
                        objectFit: 'contain', 
                        display: 'block',
                        transform: 'scale(1.22)',
                        transformOrigin: 'center top',
                        marginTop: '4px'
                    }} 
                />
            </div>

            {/* Main Title Area */}
            <div className="landing-title-wrapper" style={{
                marginTop: isMobile ? '5px' : '10px',
                textAlign: 'center',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                lineHeight: '0.85',
                flexShrink: 0
            }}>
                <h1 style={{
                    fontSize: isMobile ? '3.8rem' : '6.5rem',
                    color: accentYellow,
                    margin: 0,
                    fontWeight: 'normal',
                    fontFamily: '"Riona Sans W04 Black", sans-serif',
                    letterSpacing: '-1px',
                    textShadow: '4px 4px 15px rgba(0,0,0,0.5)'
                }}>Cyber</h1>
                <h1 style={{
                    fontSize: isMobile ? '3.8rem' : '6.5rem',
                    color: accentYellow,
                    margin: 0,
                    fontWeight: 'normal',
                    fontFamily: '"Riona Sans W04 Black", sans-serif',
                    letterSpacing: '-1px',
                    textShadow: '4px 4px 15px rgba(0,0,0,0.5)'
                }}>Champs</h1>
            </div>

            {/* Main Text & Progress Container */}
            <div className="landing-info-card" style={{
                marginTop: isMobile ? '12px' : '20px',
                width: '85%',
                maxWidth: '750px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 30,
                boxSizing: 'border-box'
            }}>
                {phase === 'LOADING' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                        <div style={{
                            width: '240px',
                            height: '24px',
                            backgroundColor: 'rgba(255, 153, 0, 0.1)',
                            border: '1.5px solid #FF9900',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            position: 'relative',
                            padding: '3px'
                        }}>
                            <div style={{
                                width: `${progress}%`,
                                height: '100%',
                                backgroundColor: '#FF9900',
                                borderRadius: '10px',
                                transition: 'width 0.1s linear'
                            }} />
                        </div>
                        <span style={{ marginTop: '12px', color: 'white', fontSize: '1.2rem', fontWeight: '500', opacity: 0.9 }}>loading</span>
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        animation: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <p className="landing-desc-p1" style={{ fontSize: isMobile ? '1.1rem' : '1.4rem', marginBottom: '12px', fontWeight: '500', lineHeight: '1.4', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                            <strong style={{ color: accentYellow }}>CRY – Child Rights and You</strong> – works to keep every child safe and happy.
                            Come along with <strong style={{ color: accentYellow }}>Priya</strong> on a cyber safety adventure!
                        </p>
                        <p className="landing-desc-p2" style={{ fontSize: isMobile ? '0.95rem' : '1.2rem', marginBottom: '20px', color: 'rgba(255,255,255,0.95)', fontWeight: '400', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                            Children, parents, and caring adults — learn, play, and be a <strong style={{ color: accentYellow }}>Cyber Smart Hero</strong> together
                        </p>
                        
                        <button
                            onClick={onFinishLoading}
                            style={{
                                padding: isMobile ? '12px 45px' : '16px 60px',
                                backgroundColor: '#ffd806', 
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '40px',
                                fontSize: isMobile ? '1.4rem' : '1.8rem',
                                fontWeight: 'normal',
                                fontFamily: '"Riona Sans W04 Black", sans-serif',
                                cursor: 'pointer',
                                transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                boxShadow: '0 8px 0 #cc7a00, 0 10px 25px rgba(0,0,0,0.4)',
                                outline: 'none'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 10px 0 #cc7a00, 0 12px 30px rgba(0,0,0,0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 0 #cc7a00, 0 10px 25px rgba(0,0,0,0.4)';
                            }}
                            onMouseDown={(e) => {
                                e.currentTarget.style.transform = 'scale(0.98) translateY(2px)';
                                e.currentTarget.style.boxShadow = '0 2px 0 #cc7a00, 0 4px 10px rgba(0,0,0,0.2)';
                            }}
                        >
                            LET'S GO!
                        </button>
                    </div>
                )}
            </div>

            {/* Priya character asset block */}
            <div className="landing-left-character" style={{
                position: 'absolute',
                bottom: isMobile ? '-10px' : '10px',
                left: isMobile ? '-25px' : '20px',
                zIndex: 25,
                animation: 'slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1)',
                filter: 'drop-shadow(5px 5px 15px rgba(0,0,0,0.4))',
                pointerEvents: 'none'
            }}>
                <img src={heroGirl} alt="Priya" style={{ height: isMobile ? '230px' : '550px', objectFit: 'contain' }} />
            </div>

            {/* Five friends asset block */}
            <div className="landing-right-group" style={{
                position: 'absolute',
                bottom: isMobile ? '5px' : '20px',
                right: isMobile ? '5px' : '20px',
                zIndex: 20,
                display: 'flex',
                alignItems: 'flex-end',
                animation: 'slideInRight 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                filter: 'drop-shadow(2px 2px 10px rgba(0,0,0,0.3))',
                pointerEvents: 'none'
            }}>
                {/* ✅ FIXED: Set a slightly higher mobile/tablet height base line layout value so they match the new scale parameters */}
                <img src={f1} alt="Friend 1" style={{ height: isMobile ? '110px' : '230px', marginRight: '-8px', objectFit: 'contain' }} />
                <img src={f2} alt="Friend 2" style={{ height: isMobile ? '120px' : '245px', marginRight: '-8px', objectFit: 'contain' }} />
                <img src={f3} alt="Friend 3" style={{ height: isMobile ? '105px' : '220px', marginRight: '-8px', objectFit: 'contain' }} />
                <img src={f4} alt="Friend 4" style={{ height: isMobile ? '135px' : '275px', marginRight: '-8px', objectFit: 'contain' }} />
                <img src={f5} alt="Friend 5" style={{ height: isMobile ? '128px' : '260px', objectFit: 'contain' }} />
            </div>

            {/* Bottom Wavy purple floor strip */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: isMobile ? '50px' : '160px',
                backgroundColor: '#3b1d5f',
                borderRadius: '100% 100% 0 0 / 100% 100% 0 0',
                transform: isMobile ? 'scaleX(1.1) translateY(15px)' : 'scaleX(1.15) translateY(40px)',
                zIndex: 5,
                boxShadow: '0 -10px 30px rgba(0,0,0,0.3)',
                pointerEvents: 'none'
            }} />

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInLeft {
                    from { transform: translateX(-200px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInRight {
                    from { transform: translateX(200px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @media (min-width: 769px) and (max-width: 1150px), (max-height: 750px) and (min-width: 769px) {
                    .landing-title-wrapper {
                        margin-top: 5px !important;
                    }
                    .landing-title-wrapper h1 {
                        font-size: 4.2rem !important;
                    }
                    .landing-info-card {
                        width: 50% !important;
                        max-width: 480px !important;
                        margin-top: 10px !important;
                    }
                    .landing-info-card p:first-of-type {
                        font-size: 1.25rem !important;
                        line-height: 1.4 !important;
                        margin-bottom: 10px !important;
                    }
                    .landing-info-card p:last-of-type {
                        font-size: 1.15rem !important;
                        line-height: 1.3 !important;
                        margin-bottom: 14px !important;
                    }
                    .landing-info-card button {
                        padding: 12px 45px !important;
                        font-size: 1.5rem !important;
                    }
                    .landing-left-character img {
                        height: 420px !important;
                    }
                    /* ✅ FIXED: Enhanced layout consistency rules on tablet/minimized screen heights */
                    .landing-right-group img:nth-child(1) { height: 260px !important; }
                    .landing-right-group img:nth-child(2) { height: 280px !important; }
                    .landing-right-group img:nth-child(3) { height: 250px !important; }
                    .landing-right-group img:nth-child(4) { height: 315px !important; }
                    .landing-right-group img:nth-child(5) { height: 300px !important; }
                }

                @media (min-width: 1151px) and (min-height: 751px) {
                    .landing-title-wrapper h1 {
                        font-size: 9.75rem !important;
                    }
                    .landing-logo-tab {
                        top: -15px !important;
                    }
                    .landing-info-card {
                        width: 95% !important;
                        max-width: 1400px !important; 
                    }
                    .landing-info-card p.landing-desc-p1 {
                        font-size: 2.8rem !important; 
                        line-height: 1.4 !important;
                        margin-bottom: 20px !important;
                    }
                    .landing-info-card p.landing-desc-p2 {
                        font-size: 1.45rem !important; 
                        line-height: 1.4 !important;
                        margin-bottom: 25px !important;
                    }
                    .landing-left-character img {
                        height: 620px !important; 
                    }
                    /* ✅ FIXED: Dramatically expanded laptop asset dimensions to completely consume the red bounding region box */
                    .landing-right-group img:nth-child(1) { height: 560px !important; } 
                    .landing-right-group img:nth-child(2) { height: 600px !important; } 
                    .landing-right-group img:nth-child(3) { height: 545px !important; } 
                    .landing-right-group img:nth-child(4) { height: 680px !important; } 
                    .landing-right-group img:nth-child(5) { height: 640px !important; } 
                }
            `}</style>
        </div>
    );
};

export default LandingScreen;