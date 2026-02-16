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
    const [phase, setPhase] = useState('LOADING'); // LOADING, INTRO



    useEffect(() => {
        if (phase === 'LOADING') {
            const loadAssets = async () => {
                // 1. Gather all asset URLs
                const levels = [level1, level2, level3, level4, level5];

                // Level Backgrounds & Antagonists
                const levelAssets = levels.flatMap(level => {
                    const bgs = level.backgrounds.map(bg => bg.src);
                    const villain = level.antagonist.src;
                    return [...bgs, villain];
                });

                // Player Animation Frames
                const playerGlob = import.meta.glob('../assets/player/run_f*.png', { eager: true, as: 'url' });
                const playerFrames = Object.values(playerGlob);

                // Static Assets (already imported at top, but let's ensure they are cached by the browser)
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
                            console.warn(`Failed to preload asset: ${src}`);
                            // Still resolve to not block the game
                            updateProgress();
                            resolve();
                        };
                    });
                });

                await Promise.all(imagePromises);

                // Ensure 100% is shown for a moment
                setProgress(100);
                setTimeout(() => setPhase('INTRO'), 800);
            };

            loadAssets();
        }
    }, [phase]);

    // Define colors
    const deepPurple = '#3b1d5f';
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
            {/* Background with blurred friends */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                overflow: 'hidden',
                filter: 'blur(15px) brightness(0.5) opacity(0.7)'
            }}>
                <img src={f1} style={{ position: 'absolute', top: '10%', left: '5%', height: '400px' }} alt="" />
                <img src={f2} style={{ position: 'absolute', top: '20%', right: '10%', height: '350px' }} alt="" />
                <img src={f3} style={{ position: 'absolute', bottom: '15%', left: '20%', height: '450px' }} alt="" />
                <img src={f4} style={{ position: 'absolute', bottom: '10%', right: '25%', height: '400px' }} alt="" />
                <img src={f5} style={{ position: 'absolute', top: '40%', left: '45%', height: '380px' }} alt="" />
                {/* Overlay scribbles if we had them, or just a dark tint */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(45, 20, 64, 0.4)'
                }} />
            </div>

            {/* Logo */}
            <div style={{
                marginTop: '0',
                zIndex: 10,
                backgroundColor: 'white',
                padding: '10px 40px',
                borderRadius: '0 0 30px 30px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
            }}>
                <img src={cryLogo} alt="CRY Logo" style={{ height: '80px', objectFit: 'contain' }} />
            </div>

            {/* Main Title Area */}
            <div style={{
                marginTop: '10px',
                textAlign: 'center',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                lineHeight: '0.85'
            }}>
                <h1 style={{
                    fontSize: '6.5rem',
                    color: accentYellow,
                    margin: 0,
                    fontWeight: 'normal',
                    fontFamily: '"Riona Sans W04 Black", sans-serif',
                    textTransform: 'none',
                    letterSpacing: '-2px',
                    textShadow: '4px 4px 15px rgba(0,0,0,0.5)'
                }}>Cyber</h1>
                <h1 style={{
                    fontSize: '6.5rem',
                    color: accentYellow,
                    margin: 0,
                    fontWeight: 'normal',
                    fontFamily: '"Riona Sans W04 Black", sans-serif',
                    textTransform: 'none',
                    letterSpacing: '-2px',
                    textShadow: '4px 4px 15px rgba(0,0,0,0.5)'
                }}>Champs</h1>
            </div>

            {/* Content Area */}
            <div style={{
                marginTop: '20px',
                width: '80%',
                maxWidth: '700px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 30,
                minHeight: '150px'
            }}>
                {phase === 'LOADING' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                        <div style={{
                            width: '350px',
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
                        <span style={{ marginTop: '12px', color: 'white', fontSize: '1.4rem', fontWeight: '500', opacity: 0.9 }}>loading</span>
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        animation: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <p style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: '500', lineHeight: '1.4', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                            <strong style={{ color: accentYellow }}>CRY – Child Rights and You</strong> – works to keep every child safe and happy.
                            Come along with <strong style={{ color: accentYellow }}>Priya</strong> on a cyber safety adventure!
                        </p>
                        <p style={{ fontSize: '1.2rem', marginBottom: '25px', color: 'rgba(255,255,255,0.95)', fontWeight: '400', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                            Children, parents, and caring adults — learn, play, and be a <strong style={{ color: accentYellow }}>Cyber Smart Hero</strong> together
                        </p>
                        <button
                            onClick={onFinishLoading}
                            style={{
                                padding: '16px 60px',
                                backgroundColor: '#ffd806', // CRY Yellow
                                color: 'white',
                                border: 'none',
                                borderRadius: '40px',
                                fontSize: '1.8rem',
                                fontWeight: 'normal',
                                fontFamily: '"Riona Sans W04 Black", sans-serif',
                                cursor: 'pointer',
                                transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                boxShadow: '0 8px 0 #cc7a00, 0 10px 25px rgba(0,0,0,0.4)',
                                outline: 'none'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05) translateY(-2px)';
                                e.target.style.boxShadow = '0 10px 0 #cc7a00, 0 12px 30px rgba(0,0,0,0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1) translateY(0)';
                                e.target.style.boxShadow = '0 8px 0 #cc7a00, 0 10px 25px rgba(0,0,0,0.4)';
                            }}
                            onMouseDown={(e) => {
                                e.target.style.transform = 'scale(0.98) translateY(2px)';
                                e.target.style.boxShadow = '0 2px 0 #cc7a00, 0 4px 10px rgba(0,0,0,0.2)';
                            }}
                        >
                            LET'S GO!
                        </button>
                    </div>
                )}
            </div>

            {/* Main Character Hero Girl (Priya) - Left */}
            <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '20px',
                zIndex: 25,
                animation: 'slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1)',
                filter: 'drop-shadow(5px 5px 15px rgba(0,0,0,0.4))'
            }}>
                <img src={heroGirl} alt="Priya" style={{ height: '550px', objectFit: 'contain' }} />
            </div>

            {/* Five Friends - Right */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                zIndex: 20,
                display: 'flex',
                alignItems: 'flex-end',
                gap: '-25px',
                animation: 'slideInRight 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                filter: 'drop-shadow(2px 2px 10px rgba(0,0,0,0.3))'
            }}>
                <img src={f1} alt="Friend 1" style={{ height: '150px', objectFit: 'contain' }} />
                <img src={f2} alt="Friend 2" style={{ height: '160px', objectFit: 'contain' }} />
                <img src={f3} alt="Friend 3" style={{ height: '145px', objectFit: 'contain' }} />
                <img src={f4} alt="Friend 4" style={{ height: '180px', objectFit: 'contain' }} />
                <img src={f5} alt="Friend 5" style={{ height: '170px', objectFit: 'contain' }} />
            </div>

            {/* Wavy Ground Layer */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '160px',
                backgroundColor: '#3b1d5f',
                borderRadius: '100% 100% 0 0 / 100% 100% 0 0',
                transform: 'scaleX(1.15) translateY(40px)',
                zIndex: 5,
                boxShadow: '0 -10px 30px rgba(0,0,0,0.3)'
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
            `}</style>
        </div>
    );
};

export default LandingScreen;

