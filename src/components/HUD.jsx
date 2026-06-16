import React, { useState, useEffect } from 'react';

const HUD = ({ score, lives, levelName, threat }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: isMobile ? '80px' : '20px', /* FIXED: Clears your global center logo vertically on mobile screens */
            left: isMobile ? '10px' : '20px',
            right: isMobile ? '10px' : '20px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row', /* FIXED: Stacks interface options cleanly on mobile viewports */
            justifyContent: 'space-between',
            alignItems: isMobile ? 'stretch' : 'center',
            gap: isMobile ? '8px' : '20px',
            pointerEvents: 'none',
            fontFamily: '"Riona Sans W01 Regular", sans-serif',
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            zIndex: 50
        }}>
            {/* Level Information Badge */}
            <div style={{ 
                backgroundColor: 'rgba(0,0,0,0.6)', /* FIXED: Darkened contrast matrix for fast running visibility splits */
                padding: isMobile ? '6px 14px' : '10px 20px', 
                borderRadius: '12px', 
                borderLeft: '4px solid #ffd806',
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'center' : 'flex-start'
            }}>
                <div style={{ 
                    fontSize: isMobile ? '1.1rem' : '1.4rem', 
                    fontFamily: '"Riona Sans W04 Black", sans-serif', 
                    color: '#ffd806' 
                }}>
                    {levelName}
                </div>
                <div style={{ 
                    fontSize: isMobile ? '0.85rem' : '1rem', 
                    opacity: 0.9,
                    marginTop: isMobile ? '0' : '2px'
                }}>
                    Threat: {threat}
                </div>
            </div>

            {/* Score & Player Vitals Row */}
            <div style={{ 
                display: 'flex', 
                gap: isMobile ? '8px' : '20px',
                width: isMobile ? '100%' : 'auto'
            }}>
                {/* Score Tracker Box */}
                <div style={{ 
                    flex: 1, /* FIXED: Fills display layout space evenly when screen splits down */
                    backgroundColor: 'rgba(0,0,0,0.6)', 
                    padding: isMobile ? '8px 14px' : '10px 20px', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: '10px' 
                }}>
                    <span style={{ fontSize: isMobile ? '0.85rem' : '1rem', color: '#ffd806', fontFamily: '"Riona Sans W04 Black", sans-serif' }}>SCORE:</span>
                    <span style={{ fontSize: isMobile ? '1.1rem' : '1.4rem', fontFamily: '"Riona Sans W04 Black", sans-serif' }}>{Math.floor(score)}</span>
                </div>

                {/* Vitals Hearts Tracker Box */}
                <div style={{ 
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.6)', 
                    padding: isMobile ? '8px 14px' : '10px 20px', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: '10px' 
                }}>
                    <span style={{ fontSize: isMobile ? '0.85rem' : '1rem', color: '#ffd806', fontFamily: '"Riona Sans W04 Black", sans-serif' }}>LIVES:</span>
                    <span style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', letterSpacing: '2px' }}>
                        {lives > 0 ? Array(lives).fill('❤️').join(' ') : '💀'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HUD;