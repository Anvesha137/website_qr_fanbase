import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashLoaderProps {
  onComplete: () => void;
}

type Phase = 'video' | 'moving' | 'eclipse';

export default function SplashLoader({ onComplete }: SplashLoaderProps) {
  const [phase, setPhase] = useState<Phase>('video');
  const [targetPos, setTargetPos] = useState<{ x: number; y: number; scale: number }>({
    x: 0,
    y: 0,
    scale: 0.35,
  });
  const [eclipseRadius, setEclipseRadius] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Measure exact pixel location of Navbar Logo (#navbar-logo)
  const measureTarget = () => {
    const navLogo = document.getElementById('navbar-logo');
    if (navLogo) {
      const rect = navLogo.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;

      const deltaX = centerX - screenCenterX;
      const deltaY = centerY - screenCenterY;

      // Calculate scale relative to initial video container size
      const scale = Math.max(0.18, Math.min(0.28, rect.height / 100));

      setTargetPos({ x: deltaX, y: deltaY, scale });
    } else {
      // Fallback relative coordinates if navbar logo is rendering
      setTargetPos({
        x: -window.innerWidth * 0.38,
        y: -window.innerHeight * 0.42,
        scale: 0.22,
      });
    }
  };

  const handleVideoEnd = () => {
    if (phase !== 'video') return;
    measureTarget();
    setPhase('moving');
  };

  useEffect(() => {
    measureTarget();
    window.addEventListener('resize', measureTarget);

    // Safety fallback if video onEnded is delayed
    const videoTimer = setTimeout(() => {
      if (phase === 'video') {
        handleVideoEnd();
      }
    }, 3400);

    return () => {
      window.removeEventListener('resize', measureTarget);
      clearTimeout(videoTimer);
    };
  }, [phase]);

  // Handle phase transitions
  useEffect(() => {
    if (phase === 'moving') {
      // After 1.1s logo flight to exact navbar spot, trigger Eclipse reveal
      const moveTimer = setTimeout(() => {
        setPhase('eclipse');
      }, 1100);
      return () => clearTimeout(moveTimer);
    } else if (phase === 'eclipse') {
      // Trigger completion immediately so hero typewriter starts right as eclipse reveals the hero
      onComplete();

      const startTime = performance.now();
      const duration = 1200; // Snappy 1.2-second eclipse opening

      const animateEclipse = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setEclipseRadius(easeProgress * 2800);

        if (progress < 1) {
          requestAnimationFrame(animateEclipse);
        }
      };

      requestAnimationFrame(animateEclipse);
    }
  }, [phase, onComplete]);

  // Exact screen coordinates of the docked Navbar Logo
  const logoScreenX = window.innerWidth / 2 + targetPos.x;
  const logoScreenY = window.innerHeight / 2 + targetPos.y;

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden pointer-events-none select-none">
      {/* Dark Overlay with Expanding Eclipse Iris Hole */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-300"
        style={{
          background:
            phase === 'eclipse'
              ? `radial-gradient(circle ${eclipseRadius}px at ${logoScreenX}px ${logoScreenY}px, transparent 0%, transparent 85%, #000000 100%)`
              : '#000000',
          opacity: phase === 'eclipse' && eclipseRadius > 2200 ? (2800 - eclipseRadius) / 600 : 1,
        }}
      />

      {/* Moving Logo / Video Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={
            phase === 'moving' || phase === 'eclipse'
              ? {
                  x: targetPos.x,
                  y: targetPos.y,
                  scale: targetPos.scale,
                  opacity: phase === 'eclipse' ? 0 : 1,
                }
              : {
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1,
                }
          }
          transition={{
            duration: phase === 'moving' ? 1.1 : 0.3,
            ease: [0.16, 1, 0.3, 1], // Smooth docking ease
          }}
          className="relative flex items-center justify-center w-full max-w-5xl px-4"
        >
          {/* Video Container */}
          <div className="relative w-full max-w-4xl aspect-video overflow-hidden flex items-center justify-center bg-black rounded-3xl">
            <video
              ref={videoRef}
              src="/Scene.mp4"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover scale-[1.55] pointer-events-none"
            />

            {/* Bottom-right watermark patch */}
            <div className="absolute bottom-0 right-0 w-44 h-20 bg-black z-20 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
