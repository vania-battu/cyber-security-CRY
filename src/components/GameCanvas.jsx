import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useGameLoop } from '../engine/useGameLoop';
import Player from '../engine/Player';
import Enemy from '../engine/Enemy';
import { checkCollision } from '../engine/collision';

const GameCanvas = ({ level, isPaused, onLevelComplete, lives, onGameOver, onScoreUpdate }) => {
    const canvasRef = useRef(null);
    const gameRef = useRef({
        player: null,
        enemies: [],
        backgrounds: [],
        distanceTraveled: 0,
        mapWidth: 0,
        loopsCompleted: 0,
        isLevelFinishing: false,
        antagonistImg: null,
        antagonistRatio: 0.75 
    });

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    const [isAssetsLoading, setIsAssetsLoading] = useState(true);
    const timeoutRef = useRef(null);

    const GROUND_OFFSET_Y = 185;

    // Handle Window Resizing Proportions with orientation-aware balancing
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setDimensions({ width, height });
            
            if (canvasRef.current) {
                canvasRef.current.width = width;
                canvasRef.current.height = height;
            }
            
            if (gameRef.current.player) {
                const isCompressed = width < 1150;
                const isPortrait = height > width;
                
                // ✅ FIXED: Responsive scale factor adapts cleanly to portrait views without clashing
                const scaleFactor = isCompressed 
                    ? (isPortrait ? Math.max(0.6, width / 650) : Math.max(0.7, width / 1100)) 
                    : 1.0;
                
                const playerHeight = 130 * scaleFactor;
                const adjustedY = height - GROUND_OFFSET_Y - playerHeight + (isCompressed ? 15 : 0);

                gameRef.current.player.x = isCompressed ? Math.max(20, width * 0.05) : width * 0.12;
                gameRef.current.player.groundY = adjustedY;
                gameRef.current.player.y = adjustedY;
                gameRef.current.player.height = playerHeight;
                gameRef.current.player.width = playerHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Asynchronous Asset Management Lifecycle Block
    useEffect(() => {
        let isCurrentLoad = true;
        setIsAssetsLoading(true); 

        const canvas = canvasRef.current;
        if (!canvas) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const isCompressed = width < 1150;
        const isPortrait = height > width;
        const scaleFactor = isCompressed 
            ? (isPortrait ? Math.max(0.6, width / 650) : Math.max(0.7, width / 1100)) 
            : 1.0;

        const playerHeight = 130 * scaleFactor;
        const adjustedY = height - GROUND_OFFSET_Y - playerHeight + (isCompressed ? 15 : 0);

        // Initialize Player Sprite
        gameRef.current.player = new Player({
            imageArray: (() => {
                const glob = import.meta.glob('../assets/player/run_f*.png', { eager: true, as: 'url' });
                return Object.keys(glob).sort().map(key => glob[key]);
            })(),
            x: isCompressed ? Math.max(20, width * 0.05) : width * 0.12,
            y: adjustedY,
            width: playerHeight,
            height: playerHeight,
            frameCount: 5,
            frameRate: 8,
            scale: 1.2 * scaleFactor 
        });
        gameRef.current.player.groundY = adjustedY;

        gameRef.current.enemies = [];
        gameRef.current.distanceTraveled = 0;
        gameRef.current.loopsCompleted = 0;
        gameRef.current.isLevelFinishing = false;

        const bgPromises = level.backgrounds.map(bg => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = bg.src;
                img.onload = () => resolve({ img, speedModifier: bg.speedModifier, x: 0 });
                img.onerror = () => resolve({ img, speedModifier: bg.speedModifier, x: 0 });
            });
        });

        const antPromise = new Promise((resolve) => {
            const img = new Image();
            img.src = level.antagonist.src;
            img.onload = () => {
                if (img.naturalWidth && img.naturalHeight) {
                    resolve({ img, ratio: img.naturalWidth / img.naturalHeight });
                } else {
                    resolve({ img, ratio: 0.75 }); 
                }
            };
            img.onerror = () => resolve({ img, ratio: 0.75 });
        });

        Promise.all([...bgPromises, antPromise]).then((resolvedAssets) => {
            if (!isCurrentLoad) return;

            const antagonistData = resolvedAssets[resolvedAssets.length - 1];
            const backgroundData = resolvedAssets.slice(0, resolvedAssets.length - 1);

            gameRef.current.backgrounds = backgroundData;
            gameRef.current.antagonistImg = antagonistData.img;
            gameRef.current.antagonistRatio = antagonistData.ratio;
            setIsAssetsLoading(false); 
        });

        return () => {
            isCurrentLoad = false;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [level]);

    useEffect(() => {
        if (gameRef.current.player) {
            gameRef.current.player.setStill(isPaused || gameRef.current.isLevelFinishing);
        }
    }, [isPaused]);

    const update = useCallback((deltaTime) => {
        if (isPaused || isAssetsLoading) return;

        const canvas = canvasRef.current;
        if (!canvas || !gameRef.current.player) return;
        if (gameRef.current.isLevelFinishing) return;

        const speed = level.speed;
        gameRef.current.distanceTraveled += speed;
        gameRef.current.player.update();

        const targetLoops = (level.title === "Level 1" || level.id === 1) ? 2 : 3;

        gameRef.current.backgrounds.forEach(bg => {
            const aspect = bg.img.naturalWidth / bg.img.naturalHeight || 1;
            const bgWidth = Math.max(canvas.width, canvas.height * aspect);

            if (bg.speedModifier === 1.0) {
                gameRef.current.mapWidth = bgWidth;
            }

            bg.x -= speed * bg.speedModifier;
            if (bg.x <= -bgWidth) {
                bg.x = 0;
                if (bg.speedModifier === 1.0) {
                    gameRef.current.loopsCompleted += 1;
                    if (gameRef.current.loopsCompleted >= targetLoops) {
                        gameRef.current.isLevelFinishing = true;
                        if (gameRef.current.player) gameRef.current.player.setStill(true);
                        timeoutRef.current = setTimeout(onLevelComplete, 2000);
                    }
                }
            }
        });

        onScoreUpdate(gameRef.current.distanceTraveled / 10);
    }, [level, onLevelComplete, onScoreUpdate, isPaused, isAssetsLoading]);

    const draw = useCallback(() => {
        if (isAssetsLoading) return; 

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        gameRef.current.backgrounds.forEach(bg => {
            const aspect = (bg.img.naturalWidth && bg.img.naturalHeight)
                ? bg.img.naturalWidth / bg.img.naturalHeight
                : 1;
            const bgWidth = Math.max(canvas.width, canvas.height * aspect);
            ctx.drawImage(bg.img, bg.x, 0, bgWidth, canvas.height);
            ctx.drawImage(bg.img, bg.x + bgWidth, 0, bgWidth, canvas.height);
        });

        gameRef.current.player.draw(ctx);

        // Draw Antagonist safely configured inside relative space margins
        if ((gameRef.current.isLevelFinishing || isPaused) && gameRef.current.antagonistImg) {
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            
            const isCompressed = canvasWidth < 1150;
            const isPortrait = canvasHeight - 150 > canvasWidth;
            const scaleFactor = isCompressed ? (isPortrait ? Math.max(0.6, canvasWidth / 650) : Math.max(0.7, canvasWidth / 1100)) : 1.0;

            // ✅ FIXED: Keeps the antagonist monster from horizontally compressing into Priya on small phones
            const antHeight = isPortrait ? Math.min(220, 340 * scaleFactor) : 360 * scaleFactor; 
            const antWidth = gameRef.current.antagonistRatio * antHeight;

            const floatOffset = Math.sin(Date.now() / 350) * 12;
            const rightPadding = isCompressed ? canvasWidth * 0.02 : canvasWidth * 0.08;
            const calculatedY = canvasHeight - GROUND_OFFSET_Y - antHeight + floatOffset + (isCompressed ? 35 : 65);

            ctx.drawImage(
                gameRef.current.antagonistImg,
                canvasWidth - antWidth - rightPadding,
                calculatedY,
                antWidth,
                antHeight
            );
        }
    }, [level, isPaused, isAssetsLoading]);

    useGameLoop((deltaTime) => {
        update(deltaTime);
        draw();
    }, false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                !isPaused && !isAssetsLoading && gameRef.current.player.jump();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPaused, isAssetsLoading]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            {isAssetsLoading && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: '#2d1440', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', zIndex: 99, color: 'white', fontSize: '1.5rem',
                    fontFamily: '"Riona Sans W01 Regular", sans-serif'
                }}>
                    <span>Loading Arena...</span>
                </div>
            )}
            <canvas
                ref={canvasRef}
                onClick={() => !isPaused && !isAssetsLoading && gameRef.current.player.jump()}
                style={{
                    display: 'block',
                    backgroundColor: '#87CEEB',
                    width: '100%',
                    height: '100%'
                }}
            />
            <button
                onClick={toggleFullScreen}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    padding: '10px 15px',
                    background: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '20px', 
                    cursor: 'pointer',
                    fontSize: '14px',
                    zIndex: 100
                }}
            >
                Toggle Fullscreen
            </button>
        </div>
    );
};

export default GameCanvas;