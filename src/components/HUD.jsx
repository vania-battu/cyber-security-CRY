import React from 'react';

const HUD = ({ score, lives, levelName, threat }) => {
    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            pointerEvents: 'none',
            fontFamily: '"Riona Sans W01 Regular", sans-serif',
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            zIndex: 50
        }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: '10px 20px', borderRadius: '15px', borderLeft: '4px solid #ffd806' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 'normal', fontFamily: '"Riona Sans W04 Black", sans-serif', color: '#ffd806' }}>{levelName}</div>
                <div style={{ fontSize: '1rem', opacity: 0.9 }}>Threat: {threat}</div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: '10px 20px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1rem', color: '#ffd806', fontFamily: '"Riona Sans W04 Black", sans-serif' }}>SCORE:</span>
                    <span style={{ fontSize: '1.4rem' }}>{Math.floor(score)}</span>
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: '10px 20px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1rem', color: '#ffd806', fontFamily: '"Riona Sans W04 Black", sans-serif' }}>LIVES:</span>
                    <span>{Array(lives).fill('❤️').join(' ')}</span>
                </div>
            </div>
        </div>
    );
};

export default HUD;
