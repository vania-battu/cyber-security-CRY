import React, { useEffect, useState } from 'react';

import frame8 from '../assets/frames/Frame 8.png';
import frame9 from '../assets/frames/Frame 9.png';
import frame10 from '../assets/frames/Frame 10.png';
import frame11 from '../assets/frames/Frame 11.png';
import frame12 from '../assets/frames/Frame 12.png';
import frame13 from '../assets/frames/Frame 13.png';
import frame14 from '../assets/frames/Frame 14.png';
import frame15 from '../assets/frames/Frame 15.png';
import frame16 from '../assets/frames/Frame 16.png';

const frames = [
    frame8, frame9, frame10, frame11, frame12,
    frame13, frame14, frame15, frame16,
];

const IntroStory = ({ onComplete }) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isFading, setIsFading] = useState(false);

    const handleNext = () => {
        if (isFading) return;

        setIsFading(true);
        setTimeout(() => {
            if (currentFrame < frames.length - 1) {
                setCurrentFrame(prev => prev + 1);
                setIsFading(false);
            } else {
                onComplete();
            }
        }, 500);
    };

    useEffect(() => {
        const timer = setTimeout(handleNext, 5000);
        return () => clearTimeout(timer);
    }, [currentFrame]);

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768 || window.innerHeight < 500);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768 || window.innerHeight < 500);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            onClick={handleNext}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 400,
                cursor: 'pointer',
                overflow: 'hidden'
            }}
        >
            {/* FIXED STAGE: Employs a true 16:9 widescreen presentation aspect lock box ratio map */}
            <div style={{
                width: '100vw',
                height: '56.25vw', /* 16:9 Aspect Ratio */
                maxHeight: '100vh',
                maxWidth: '177.78vh', /* 16:9 Aspect Ratio */
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: isFading ? 0 : 1,
                position: 'relative'
            }}>
                <img
                    src={frames[currentFrame]}
                    alt={`Story frame ${currentFrame + 8}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', /* FIXED: Eliminates blank side black gutters entirely */
                        pointerEvents: 'none'
                    }}
                />
            </div>

            {/* ✅ FIXED: Translucent Frosted Glass style applied to match image_f9484b.jpg */}
            <div style={{
                position: 'absolute',
                bottom: isSmallScreen ? '15px' : '30px', 
                right: isSmallScreen ? '20px' : '40px',
                backgroundColor: 'rgba(0, 0, 0, 0.65)', /* Translucent dark wash */
                backdropFilter: 'blur(8px)', /* Frosting effect */
                WebkitBackdropFilter: 'blur(8px)', /* Safari support */
                color: '#ffffff', /* Clean white text fields */
                padding: isSmallScreen ? '8px 20px' : '10px 24px',
                borderRadius: '30px',
                fontFamily: 'sans-serif', /* Compact layout look */
                fontSize: isSmallScreen ? '12px' : '14px',
                fontWeight: '600',
                letterSpacing: '1px', /* Horizontal font tracking spacing */
                pointerEvents: 'none',
                opacity: isFading ? 0 : 1,
                zIndex: 510,
                border: '1px solid rgba(255, 255, 255, 0.15)' /* Subtle light rim */
            }}>
                {currentFrame === frames.length - 1 ? 'START GAME' : 'NEXT >'}
            </div>

            {/* ✅ FIXED: Also updated the Skip Button to follow the exact same translucent appearance rules */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onComplete();
                }}
                style={{
                    position: 'absolute',
                    top: isSmallScreen ? '15px' : '30px',
                    right: isSmallScreen ? '20px' : '30px',
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: isSmallScreen ? '6px 18px' : '8px 22px',
                    borderRadius: '30px',
                    fontFamily: 'sans-serif',
                    fontSize: isSmallScreen ? '11px' : '13px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    zIndex: 550,
                    outline: 'none',
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)'}
            >
                SKIP STORY
            </button>

            {/* Progress line indicator */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '5px',
                backgroundColor: '#fffdfc',
                width: '100%',
                transformOrigin: 'left',
                animation: !isFading ? 'progress 5s linear forwards' : 'none',
                zIndex: 520
            }} />
        </div>
    );
};

export default IntroStory;