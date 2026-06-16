import React, { useState, useEffect } from 'react';
import cryLogo from '../assets/Child_Rights_and_You_(CRY)_Organization_logo.png';
import priyaImg from '../assets/girl.png';

const StartScreen = ({ onStart }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: ''
    });

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (formData.name && formData.age && formData.gender) {
            onStart(formData);
        } else {
            alert('Please fill in all fields!');
        }
    };

    const backgroundRed = '#E4296B'; // CRY Pink (Secondary)
    const cardBorderGold = '#ffd806'; // CRY Yellow (Primary)
    const buttonYellow = '#ffd806';
    const ochreCircle = '#ffd806';

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: backgroundRed,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: '"Riona Sans W01 Regular", sans-serif',
            zIndex: 200,
            overflowX: 'hidden',
            overflowY: 'auto', 
            boxSizing: 'border-box',
            padding: isMobile ? '90px 16px 30px 16px' : '40px 20px'
        }}>

            {/* Main Form Card */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                width: '90%',
                maxWidth: isMobile ? '340px' : '850px',
                minHeight: isMobile ? 'auto' : '480px', 
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row', 
                zIndex: 20,
                overflow: 'hidden',
                animation: 'floatUp 0.6s ease-out',
                boxSizing: 'border-box'
            }}>
                {/* Left Side: Form */}
                <div style={{
                    flex: 1,
                    padding: isMobile ? '35px 24px' : '40px 50px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    boxSizing: 'border-box'
                }}>
                    {/* Star Icon */}
                    <div style={{
                        width: isMobile ? '48px' : '55px',
                        height: isMobile ? '48px' : '55px',
                        borderRadius: '50%',
                        border: `2px solid ${ochreCircle}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '12px'
                    }}>
                        <svg width={isMobile ? "22" : "30"} height={isMobile ? "22" : "30"} viewBox="0 0 24 24" fill={ochreCircle}>
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    </div>

                    <h1 style={{
                        color: backgroundRed,
                        fontSize: isMobile ? '2.4rem' : '3.2rem', 
                        fontWeight: 'normal',
                        fontFamily: '"Riona Sans W04 Black", sans-serif',
                        margin: '0 0 15px 0',
                    }}>Hello!!</h1>

                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
                        {/* Name Input */}
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: isMobile ? '14px 20px' : '12px 20px', 
                                borderRadius: '30px',
                                border: `2px solid ${cardBorderGold}`,
                                fontSize: '1.1rem',
                                outline: 'none',
                                color: '#333',
                                boxSizing: 'border-box',
                                fontWeight: '500'
                            }}
                        />

                        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                            {/* Age Input */}
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleChange}
                                style={{
                                    width: '38%',
                                    padding: isMobile ? '14px 15px' : '12px 20px',
                                    borderRadius: '30px',
                                    border: `2px solid ${cardBorderGold}`,
                                    fontSize: '1.1rem',
                                    outline: 'none',
                                    color: '#333',
                                    boxSizing: 'border-box',
                                    fontWeight: '500',
                                    textAlign: 'center'
                                }}
                            />

                            {/* Gender Dropdown */}
                            <div style={{ position: 'relative', width: '62%' }}>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: isMobile ? '14px 20px' : '12px 20px',
                                        borderRadius: '30px',
                                        border: `2px solid ${cardBorderGold}`,
                                        fontSize: '1.1rem',
                                        outline: 'none',
                                        color: '#333',
                                        background: 'white',
                                        appearance: 'none',
                                        cursor: 'pointer',
                                        boxSizing: 'border-box',
                                        fontWeight: '500'
                                    }}
                                >
                                    <option value="" disabled>Gender</option>
                                    <option value="Male">Boy</option>
                                    <option value="Female">Girl</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#333"><path d="M7 10l5 5 5-5z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        style={{
                            marginTop: isMobile ? '25px' : '35px',
                            padding: isMobile ? '14px 0' : '14px 70px',
                            width: '100%', 
                            maxWidth: isMobile ? '100%' : '280px',
                            backgroundColor: buttonYellow,
                            color: 'black',
                            border: 'none',
                            borderRadius: '40px',
                            fontSize: isMobile ? '1.5rem' : '1.8rem',
                            fontWeight: 'normal',
                            fontFamily: '"Riona Sans W04 Black", sans-serif',
                            cursor: 'pointer',
                            boxShadow: '0 5px 0 #cc7a00',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'all 0.1s'
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.transform = 'scale(0.97) translateY(2px)';
                            e.currentTarget.style.boxShadow = '0 2px 0 #cc7a00';
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.transform = 'scale(1) translateY(0)';
                            e.currentTarget.style.boxShadow = '0 5px 0 #cc7a00';
                        }}
                    >
                        Next
                    </button>
                </div>

                {/* Right Side: Visual */}
                {/* ✅ FIXED: Implemented a clean, solid yellow block box with smooth rounded edges to map exactly with image f94fab.png */}
                {!isMobile && (
                    <div style={{
                        flex: 1,
                        padding: '24px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{
                            backgroundColor: '#ffd806', 
                            borderRadius: '40px',       
                            overflow: 'hidden',         
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',     
                            width: '100%',
                            height: '100%',
                            minHeight: '400px',
                            position: 'relative'
                        }}>
                            <img
                                src={priyaImg}
                                alt="Priya"
                                style={{
                                    height: '92%',
                                    objectFit: 'contain',
                                    display: 'block',
                                    marginBottom: '-5px',
                                    filter: 'drop-shadow(5px 5px 15px rgba(0,0,0,0.15))'
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes floatUp {
                    from { transform: translateY(15px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }
            `}</style>
        </div>
    );
};

export default StartScreen;