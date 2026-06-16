import React, { useState, useEffect } from 'react';

const SecurityGuru = ({ levelData, onStartBossBattle }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const { id, title, guruTip, villain, bossBrief } = levelData;

    // Theme based on level
    const themes = [
        { main: '#ffd806', secondary: '#4e342e', text: '#4e342e' }, // L1: Yellow
        { main: '#1CB7B8', secondary: '#0d47a1', text: '#ffffff' }, // L2: Blue
        { main: '#F16723', secondary: '#ffffff', text: '#ffffff' }, // L3: Orange
        { main: '#6B2F67', secondary: '#ffffff', text: '#ffffff' }, // L4: Purple
        { main: '#E4296B', secondary: '#ffffff', text: '#ffffff' }  // L5: Pink
    ];

    const theme = themes[id - 1] || themes[0];
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.85)', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            fontFamily: '"Riona Sans W01 Regular", sans-serif',
            overflowX: 'hidden',
            overflowY: 'auto', 
            padding: isMobile ? '60px 16px 20px 16px' : '20px', 
            boxSizing: 'border-box'
        }}>
            {/* AMBIENT BACKGROUND GLOWS (Top Right & Bottom Left) */}
            {!isMobile && (
                <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
                    {/* Top Right Yellow Glow */}
                    <div style={{ 
                        position: 'absolute', 
                        top: '-15%', 
                        right: '-15%', 
                        width: '45%', 
                        height: '45%', 
                        borderRadius: '50%', 
                        backgroundColor: theme.main, 
                        filter: 'blur(130px)',
                        opacity: 0.22,
                        mixBlendMode: 'screen'
                    }} />
                    {/* Bottom Left Yellow Glow */}
                    <div style={{ 
                        position: 'absolute', 
                        bottom: '-15%', 
                        left: '-15%', 
                        width: '40%', 
                        height: '40%', 
                        borderRadius: '50%', 
                        backgroundColor: theme.main, 
                        filter: 'blur(110px)',
                        opacity: 0.18,
                        mixBlendMode: 'screen'
                    }} />
                </div>
            )}

            {/* IDENTICAL WIDE CONSOLE BOX MODEL CONTAINER */}
            <div style={{
                maxWidth: isMobile ? '340px' : '850px', /* FIXED: Exact original wide frame layout dimension map */
                width: '100%',
                backgroundColor: '#111113', /* True charcoal black inner panel matching image */
                borderRadius: '24px',       
                padding: isMobile ? '30px 20px' : '45px 60px', /* Generous horizontal inner breathing cushion */
                border: `1.5px solid ${theme.main}`, 
                boxShadow: `0 25px 50px rgba(0,0,0,0.6), 0 0 35px ${theme.main}15`, 
                transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '20px' : '28px', 
                textAlign: 'center',
                boxSizing: 'border-box'
            }}>
                <div>
                    <h3 style={{ 
                        color: theme.main, 
                        fontSize: isMobile ? '0.8rem' : '0.95rem', 
                        fontWeight: 'normal', 
                        fontFamily: '"Riona Sans W04 Black", sans-serif', 
                        letterSpacing: '2.5px', 
                        marginBottom: '8px',
                        textTransform: 'uppercase'
                    }}>
                        BOSS LEVEL CHALLENGE
                    </h3>
                    <h2 style={{ 
                        color: '#fff', 
                        fontSize: isMobile ? '1.5rem' : '2.8rem', /* Balanced typography scale mapping */
                        fontWeight: 'normal', 
                        fontFamily: '"Riona Sans W04 Black", sans-serif',
                        lineHeight: '1.2',
                        margin: 0
                    }}>
                        {title}
                    </h2>
                </div>

                <hr style={{ width: '25%', border: 'none', borderTop: '1px solid rgba(255,255,255,0.15)', margin: '0 auto' }} />

                {/* Threat Briefing Array */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'rgba(239, 68, 68, 0.08)', 
                        padding: isMobile ? '6px 14px' : '8px 24px', 
                        borderRadius: '50px',
                        border: '1px solid rgba(239,68,68,0.25)'
                    }}>
                        <span style={{ fontSize: isMobile ? '1rem' : '1.1rem' }}>⚠️</span>
                        <span style={{ 
                            color: '#ef4444', 
                            fontFamily: '"Riona Sans W04 Black", sans-serif', 
                            fontSize: isMobile ? '0.8rem' : '0.95rem',
                            letterSpacing: '0.5px'
                        }}>
                            BOSS BATTLE: {villain.toUpperCase()}
                        </span>
                    </div>
                    
                    <p style={{ 
                        color: 'rgba(255,255,255,0.8)', 
                        fontSize: isMobile ? '0.9rem' : '1.15rem', 
                        maxWidth: '680px', /* Allows textual strings to sprawl wide and elegant */
                        lineHeight: '1.5',
                        margin: 0,
                        padding: isMobile ? '0' : '0 15px'
                    }}>
                        {bossBrief}
                    </p>
                </div>

                {/* Defend / Engagement Trigger Button */}
                <button
                    onClick={onStartBossBattle}
                    style={{
                        alignSelf: 'center',
                        marginTop: '5px',
                        padding: isMobile ? '12px 36px' : '16px 50px', 
                        fontSize: isMobile ? '1.1rem' : '1.4rem',
                        fontWeight: 'normal',
                        fontFamily: '"Riona Sans W04 Black", sans-serif',
                        backgroundColor: theme.main,
                        color: id === 1 ? '#000000' : '#ffffff', 
                        border: 'none',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        boxShadow: `0 6px 0 ${theme.main}4D, 0 10px 20px rgba(0,0,0,0.4)`, 
                        transition: 'all 0.1s ease',
                        width: isMobile ? '100%' : 'auto'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.transform = 'translateY(3px)';
                        e.currentTarget.style.boxShadow = `0 3px 0 ${theme.main}4D, 0 6px 12px rgba(0,0,0,0.25)`;
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03) translateY(0)';
                        e.currentTarget.style.boxShadow = `0 6px 0 ${theme.main}4D, 0 10px 20px rgba(0,0,0,0.4)`;
                    }}
                >
                    {id === 1 ? 'DEFEND THE GATEWAY!' :
                        id === 2 ? 'SPOT THE TRAPS!' :
                            id === 3 ? 'SHINE THE LIGHT!' :
                                id === 4 ? 'SEE THROUGH THE MASK!' :
                                    'BALANCE THE WORLD!'}
                </button>
            </div>
        </div>
    );
};

export default SecurityGuru;