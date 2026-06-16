import React, { useState, useEffect } from 'react';
import priyankaImg from '../assets/girl.png';

// Friends
import anujImg from '../assets/friends/friend_f2.png';
import rohanImg from '../assets/friends/friend_f1.png';
import mitaliImg from '../assets/friends/friend_f3.png';
import aliahImg from '../assets/friends/friend_f4.png';
import kaajuImg from '../assets/friends/friend_f5.png';

// Frames
import frameL1 from '../assets/questions_panel/questions panel.png';
import frameL2 from '../assets/questions_panel/questions panel-6.png';
import frameL3 from '../assets/questions_panel/questions panel-8.png';
import frameL4 from '../assets/questions_panel/questions panel-6.png'; 
import frameL5 from '../assets/questions_panel/questions panel-4.png';

const LevelSuccess = ({ levelIdx, stars, score, onNext, onRetry, onExit }) => {

    const getLevelData = (idx) => {
        switch (idx) {
            case 0:
                return {
                    levelNum: "Level I",
                    friendName: "Anuj",
                    friendImg: anujImg,
                    villainName: "Captain Hack",
                    frame: frameL1,
                    accentColor: '#ffd806', 
                    filter: 'none'
                };
            case 1:
                return {
                    levelNum: "Level II",
                    friendName: "Rohan",
                    friendImg: rohanImg,
                    villainName: "The Phish Master",
                    frame: frameL2,
                    accentColor: '#1CB7B8', 
                    filter: 'none'
                };
            case 2:
                return {
                    levelNum: "Level III",
                    friendName: "Mitali",
                    friendImg: mitaliImg,
                    villainName: "Shadow Bully",
                    frame: frameL3,
                    accentColor: '#F16723',
                    filter: 'none'
                };
            case 3:
                return {
                    levelNum: "Level IV",
                    friendName: "Aliah",
                    friendImg: aliahImg,
                    villainName: "The Deceiver",
                    frame: frameL4,
                    accentColor: '#6B2F67',
                    textColor: '#b540aa', 
                    filter: 'hue-rotate(90deg) saturate(1.5)'
                };
            case 4:
                return {
                    levelNum: "Level V",
                    friendName: "Kaaju",
                    friendImg: kaajuImg,
                    villainName: "Master Lag",
                    frame: frameL5,
                    accentColor: '#E4296B', 
                    textColor: '#E4296B',
                    filter: 'none'
                };
            default:
                return {};
        }
    };

    // ✅ FIXED: Now passing the levelIdx integer cleanly directly into the data extractor function
    const data = getLevelData(levelIdx);
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

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 600,
            fontFamily: '"Riona Sans W01 Regular", sans-serif',
            overflowX: 'hidden',
            overflowY: 'auto'
        }}>
            {/* Background Frame Layer */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url("${data.frame}")`,
                backgroundSize: isMobile ? 'auto 100%' : '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: data.filter,
                zIndex: 1,
                pointerEvents: 'none'
            }} />

            {/* Main Stage Stagebox Container Wrapper */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: '1440px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                padding: isMobile ? '90px 20px 140px 20px' : '40px'
            }}>
                
                {/* CENTRAL MENU COMPONENT PANEL */}
                <div style={{
                    position: 'relative',
                    zIndex: 20, 
                    maxWidth: isMobile ? '300px' : (isTablet ? '550px' : '820px'), 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    transition: 'max-width 0.3s ease'
                }}>
                    <div style={{ marginBottom: isMobile ? '12px' : '15px' }}>
                        <h1 style={{ 
                            fontSize: isMobile ? '2.4rem' : (isTablet ? '3.4rem' : '4.2rem'), 
                            margin: 0, 
                            color: data.textColor || data.accentColor, 
                            fontWeight: 'normal', 
                            fontFamily: '"Riona Sans W04 Black", sans-serif', 
                            letterSpacing: '1px',
                            textShadow: '1px 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            COMPLETED!!
                        </h1>
                    </div>

                    {/* Reward Stars Track */}
                    <div style={{ 
                        display: 'flex', 
                        gap: isMobile ? '10px' : '16px', 
                        marginBottom: isMobile ? '20px' : '35px' 
                    }}>
                        {[1, 2, 3, 4, 5].map((s) => (
                            <div key={s} style={{
                                width: isMobile ? '38px' : (isTablet ? '55px' : '72px'), 
                                height: isMobile ? '38px' : (isTablet ? '55px' : '72px'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                animation: `flowerPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${s * 0.1}s forwards`,
                                opacity: 0,
                                transform: 'scale(0)'
                            }}>
                                <svg width="100%" height="100%" viewBox="0 0 100 100">
                                    <path
                                        d="M50 0 C60 30 90 40 100 50 C90 60 60 70 50 100 C40 70 10 60 0 50 C10 40 40 30 50 0"
                                        fill={s <= stars ? data.accentColor : 'none'}
                                        stroke={data.accentColor}
                                        strokeWidth="4"
                                    />
                                </svg>
                            </div>
                        ))}
                    </div>

                    {/* Spacious Layout Description Context Block */}
                    <p style={{ 
                        fontSize: isMobile ? '1.15rem' : (isTablet ? '1.45rem' : '1.75rem'), 
                        color: levelIdx === 2 ? '#ffffff' : levelIdx === 4 ? '#e1c62a' : '#4f4f4f',
                        width: '100%',
                        maxWidth: isTablet ? '460px' : '100%', 
                        fontWeight: '600',
                        marginBottom: isMobile ? '30px' : '45px',
                        lineHeight: '1.45',
                        textAlign: 'center',
                        marginRight: 'auto',
                        marginLeft: 'auto'
                    }}>
                        You helped Priya defeat <strong style={{ color: data.accentColor }}>{data.villainName}</strong> and save <strong style={{ color: data.accentColor }}>{data.friendName}</strong> !!
                    </p>

                    {/* Operational Buttons Tray Wrapper */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isMobile ? '16px' : '24px',
                        width: '100%'
                    }}>
                        {/* Retry Button */}
                        <button
                            onClick={onRetry}
                            style={{
                                width: isMobile ? '50px' : '68px', 
                                height: isMobile ? '50px' : '68px',
                                borderRadius: '50%',
                                backgroundColor: '#ffd806', 
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0 5px 0 #ccaa00, 0 8px 15px rgba(0,0,0,0.15)',
                                transition: 'transform 0.1s ease',
                                color: 'black',
                                flexShrink: 0
                            }}
                        >
                            <svg width={isMobile ? "22" : "32"} height={isMobile ? "22" : "32"} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.65 6.35c-1.63-1.63-3.94-2.57-6.48-2.31-3.67.37-6.69 3.35-7.1 7.02C3.52 15.91 7.27 20 12 20c3.19 0 5.93-1.87 7.21-4.56.32-.67-.16-1.44-.9-1.44-.44 0-.83.24-1.02.64-1 2.1-3.21 3.51-5.7 3.27-2.61-.25-4.71-2.39-4.9-5-.23-3.15 2.27-5.75 5.31-5.75 1.52 0 2.89.63 3.88 1.63l-1.88 1.88c-.31.32-.09.87.35.87H20V4c0-.45-.54-.67-.85-.35l-1.5 1.7z" />
                            </svg>
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={onNext}
                            style={{
                                width: isMobile ? '180px' : (isTablet ? '260px' : '360px'),
                                padding: isMobile ? '12px 0' : '15px 0', 
                                backgroundColor: '#ffd806', 
                                color: 'black', 
                                border: 'none',
                                borderRadius: '50px',
                                fontSize: isMobile ? '1.3rem' : '1.9rem', 
                                fontWeight: 'normal',
                                fontFamily: '"Riona Sans W04 Black", sans-serif',
                                cursor: 'pointer',
                                boxShadow: '0 6px 0 #ccaa00, 0 10px 20px rgba(0,0,0,0.2)',
                                transition: 'all 0.1s'
                            }}
                            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(3px)'}
                            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* VISUAL CHARACTERS SIDE ANCHORS */}
                <div className={`char-container left-char ${viewMode.toLowerCase()}-mode`}>
                    <img src={priyankaImg} alt="Priya" className="char-img" />
                </div>

                <div className={`char-container right-char ${viewMode.toLowerCase()}-mode`}>
                    <img src={data.friendImg} alt={data.friendName} className="char-img" />
                </div>

            </div>

            <style>{`
                @keyframes flowerPop {
                    from { transform: scale(0) rotate(0deg); opacity: 0; }
                    to { transform: scale(1) rotate(45deg); opacity: 1; }
                }

                .char-container {
                    position: absolute;
                    bottom: 50px; 
                    z-index: 5; 
                    pointer-events: none;
                    transition: all 0.3s ease;
                }
                
                .left-char { left: 45px; }
                .right-char { right: 45px; }
                
                .char-img {
                    height: 56vh; 
                    max-height: 500px;
                    object-fit: contain;
                    filter: drop-shadow(5px 5px 15px rgba(0,0,0,0.12));
                }

                .char-container.tablet-mode {
                    bottom: 35px;
                }
                .left-char.tablet-mode { left: 15px; }
                .right-char.tablet-mode { right: 15px; }
                .tablet-mode .char-img {
                    height: 42vh; 
                }

                @media (max-width: 768px) {
                    .char-container {
                        bottom: 30px !important;
                        top: auto;
                    }
                    .char-img {
                        height: 24vh !important; 
                        max-height: 180px;
                        opacity: 1.0; 
                    }
                    .left-char { left: 10px !important; } 
                    .right-char { right: 10px !important; }
                }
            `}</style>
        </div>
    );
};

export default LevelSuccess;