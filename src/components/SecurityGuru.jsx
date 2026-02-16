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

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            fontFamily: '"Riona Sans W01 Regular", sans-serif',
            overflow: 'hidden',
            padding: '100px 20px 20px 20px'
        }}>
            {/* Animated Background Elements */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: -1,
                opacity: 0.2
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: '40%',
                    height: '40%',
                    borderRadius: '50%',
                    backgroundColor: theme.main,
                    filter: 'blur(100px)',
                    animation: 'float 10s infinite alternate'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-10%',
                    width: '30%',
                    height: '30%',
                    borderRadius: '50%',
                    backgroundColor: theme.main,
                    filter: 'blur(80px)',
                    animation: 'float 8s infinite alternate-reverse'
                }} />
            </div>

            <div style={{
                maxWidth: '900px',
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '40px',
                padding: '40px',
                border: `2px solid ${theme.main}`,
                boxShadow: `0 0 30px ${theme.main}33`,
                transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                textAlign: 'center'
            }}>
                <div>
                    <h3 style={{ color: theme.main, fontSize: '1.2rem', fontWeight: 'normal', fontFamily: '"Riona Sans W04 Black", sans-serif', letterSpacing: '2px', marginBottom: '10px' }}>
                        BOSS LEVEL CHALLENGE
                    </h3>
                    <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 'normal', fontFamily: '"Riona Sans W04 Black", sans-serif' }}>
                        {title}
                    </h2>
                </div>

                <hr style={{ width: '50%', border: 'none', borderTop: '1px solid rgba(255,255,255,0.2)' }} />

                {/* Boss Briefing */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        backgroundColor: 'rgba(255, 68, 68, 0.1)',
                        padding: '10px 25px',
                        borderRadius: '50px',
                        border: '1px solid #ff4444'
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                        <span style={{ color: '#ff4444', fontWeight: 'normal', fontFamily: '"Riona Sans W04 Black", sans-serif', fontSize: '1.2rem' }}>BOSS BATTLE: {villain.toUpperCase()}</span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', maxWidth: '700px', lineHeight: '1.4' }}>
                        {bossBrief}
                    </p>
                </div>

                {/* Action Button */}
                <button
                    onClick={onStartBossBattle}
                    style={{
                        alignSelf: 'center',
                        marginTop: '10px',
                        padding: '20px 60px',
                        fontSize: '1.5rem',
                        fontWeight: 'normal',
                        fontFamily: '"Riona Sans W04 Black", sans-serif',
                        backgroundColor: theme.main,
                        color: id === 1 ? '#000' : '#fff',
                        border: 'none',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        boxShadow: `0 10px 0 ${theme.main}77, 0 15px 30px rgba(0,0,0,0.5)`,
                        transition: 'all 0.2s',
                        transform: 'scale(1)'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = `0 8px 0 ${theme.main}77, 0 12px 25px rgba(0,0,0,0.4)`;
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = `0 10px 0 ${theme.main}77, 0 15px 30px rgba(0,0,0,0.5)`;
                    }}
                    onMouseDown={(e) => {
                        e.target.style.transform = 'translateY(4px)';
                        e.target.style.boxShadow = `0 4px 0 ${theme.main}77, 0 10px 20px rgba(0,0,0,0.3)`;
                    }}
                    onMouseUp={(e) => {
                        e.target.style.transform = 'translateY(0) scale(1.05)';
                        e.target.style.boxShadow = `0 8px 0 ${theme.main}77, 0 12px 25px rgba(0,0,0,0.4)`;
                    }}
                >
                    {id === 1 ? 'DEFEND THE GATEWAY!' :
                        id === 2 ? 'SPOT THE TRAPS!' :
                            id === 3 ? 'SHINE THE LIGHT!' :
                                id === 4 ? 'SEE THROUGH THE MASK!' :
                                    'BALANCE THE WORLD!'}
                </button>
            </div>

            <style>{`
                @keyframes float {
                    from { transform: translate(0, 0); }
                    to { transform: translate(30px, 30px); }
                }
            `}</style>
        </div>
    );
};

export default SecurityGuru;
