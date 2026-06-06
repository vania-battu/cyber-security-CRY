import React from 'react';
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
import frameL4 from '../assets/questions_panel/questions panel-6.png'; // Will tint
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
                    accentColor: '#ffd806', // CRY Primary Yellow
                    filter: 'none'
                };
            case 1:
                return {
                    levelNum: "Level II",
                    friendName: "Rohan",
                    friendImg: rohanImg,
                    villainName: "The Phish Master",
                    frame: frameL2,
                    accentColor: '#1CB7B8', // CRY Blue
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
                   // textColor:'#000000',// CRY Orange
                    filter: 'none'
                };
            case 3:
                return {
                    levelNum: "Level IV",
                    friendName: "Aliah",
                    friendImg: aliahImg,
                    villainName: "The Deceiver",
                    frame: frameL4,
                    accentColor: '#6B2F67',// CRY Purple
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
                    accentColor: '#E4296B', // CRY Pink
                    textColor: '#E4296B',
                    filter: 'none'
                };
            default:
                return {};
        }
    };

    const data = getLevelData(levelIdx);

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
            overflow: 'hidden'
        }}>
            {/* Designer Border Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url("${data.frame}")`,
                backgroundSize: '100% 100%',
                filter: data.filter,
                zIndex: 1
            }} />

            {/* Content Container */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '100px 40px 40px 40px'
            }}>
                <div style={{ marginBottom: '10px' }}>
                    <h1 style={{ fontSize: '3.5rem', margin: 0, color: data.textColor || data.accentColor, fontWeight: 'normal', fontFamily: '"Riona Sans W04 Black", sans-serif', letterSpacing: '2px' }}>COMPLETED!!</h1>
                </div>

                {/* Stars */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} style={{
                            width: '80px',
                            height: '80px',
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

                <p style={{ fontSize: '1.8rem',color: levelIdx === 2 ? '#ffffff' : 
                levelIdx === 4 ? '#e1c62a' :
                '#444',  // ✅ ONLY Level 3 changes
  maxWidth: '700px',
  fontWeight: '600',
  marginBottom: '60px',
  lineHeight: '1.4' }}>
                    You helped Priya defeat <strong style={{ color: data.accentColor }}>{data.villainName}</strong> and save <strong style={{ color: data.accentColor }}>{data.friendName}</strong> !!
                </p>

                {/* Characters */}
                <div className="char-container left-char">
                    <img src={priyankaImg} alt="Priya" className="char-img" />
                </div>

                <div className="char-container right-char">
                    <img src={data.friendImg} alt={data.friendName} className="char-img" />
                </div>

                {/* Buttons Row */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '40px',
                    zIndex: 20
                }}>
                    {/* Retry Button */}
                    <button
                        onClick={onRetry}
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: '#ffd806', // CRY Yellow
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                            transition: 'transform 0.2s',
                            color: 'black'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.65 6.35c-1.63-1.63-3.94-2.57-6.48-2.31-3.67.37-6.69 3.35-7.1 7.02C3.52 15.91 7.27 20 12 20c3.19 0 5.93-1.87 7.21-4.56.32-.67-.16-1.44-.9-1.44-.44 0-.83.24-1.02.64-1 2.1-3.21 3.51-5.7 3.27-2.61-.25-4.71-2.39-4.9-5-.23-3.15 2.27-5.75 5.31-5.75 1.52 0 2.89.63 3.88 1.63l-1.88 1.88c-.31.32-.09.87.35.87H20V4c0-.45-.54-.67-.85-.35l-1.5 1.7z" />
                        </svg>
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={onNext}
                        style={{
                            padding: '20px 80px',
                            backgroundColor: '#ffd806', // CRY Yellow
                            color: 'black', // Black text for contrast
                            border: 'none',
                            borderRadius: '50px',
                            fontSize: '2.5rem',
                            fontWeight: 'normal',
                            fontFamily: '"Riona Sans W04 Black", sans-serif',
                            cursor: 'pointer',
                            boxShadow: '0 8px 0 #ccaa00, 0 10px 20px rgba(0,0,0,0.3)',
                            transition: 'all 0.1s'
                        }}
                        onMouseDown={(e) => e.target.style.transform = 'translateY(4px)'}
                        onMouseUp={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Next
                    </button>


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
                    transition: all 0.5s ease;
                }
                .left-char { left: 50px; animation: slideInLeft 0.8s ease-out; }
                .right-char { right: 50px; animation: slideInRight 0.8s ease-out; }
                .char-img {
                    height: 500px;
                    object-fit: contain;
                    filter: drop-shadow(10px 10px 20px rgba(0,0,0,0.2));
                }

                @media (max-width: 768px) {
                    .char-container {
                        bottom: 120px; /* Push up above buttons */
                        opacity: 0.3; /* Fade out to avoid text clash or make smaller */
                    }
                    .char-img {
                        height: 250px; /* Smaller on mobile */
                    }
                    /* Ensure text is readable */
                    h1 { font-size: 2.5rem !important; }
                    h2 { font-size: 1.8rem !important; }
                    p { font-size: 1.2rem !important; margin-bottom: 20px !important; }
                    
                    /* Adjust layout to stack */
                    .left-char { left: -50px; opacity: 0.6; } /* Move to edges */
                    .right-char { right: -50px; opacity: 0.6; }
                }
            `}</style>
        </div>
    );
};

export default LevelSuccess;
