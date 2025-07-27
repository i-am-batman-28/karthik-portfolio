import { useState, useEffect, useRef } from 'react';

export const SpinningProfilePic = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef(null);

  const startSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    let currentRotation = rotationY;
    const targetRotation = currentRotation + 720; // 2 full rotations
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const newRotation = currentRotation + (targetRotation - currentRotation) * easeOut;
      setRotationY(newRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div
        className="relative group cursor-pointer perspective-1000"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={startSpin}
      >
        {/* Spinning Profile Picture */}
        <div
          className={`
            w-48 h-48 rounded-full border-4 border-primary shadow-xl 
            transition-all duration-500 ease-out
            ${isHovered ? 'scale-110 shadow-2xl shadow-primary/50' : 'scale-100'}
            ${isSpinning ? 'animate-pulse' : ''}
          `}
          style={{
            transform: `rotateY(${rotationY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src="/karthik.jpg"
            alt="Karthik M Sarma"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* Glow effect */}
        <div
          className={`
            absolute inset-0 rounded-full transition-all duration-500
            ${isHovered || isSpinning 
              ? 'bg-primary/30 scale-125 blur-xl' 
              : 'bg-transparent scale-100'
            }
          `}
        />

        {/* Spinning indicator */}
        <div
          className={`
            absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full 
            flex items-center justify-center text-white text-xs font-bold
            transition-all duration-300
            ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
          `}
        >
          ⚡
        </div>

        {/* Click hint */}
        <div
          className={`
            absolute -bottom-8 left-1/2 transform -translate-x-1/2
            text-xs text-muted-foreground text-center transition-all duration-300
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}
        >
          Click to spin!
        </div>

        {/* 3D Shadow */}
        <div
          className={`
            absolute inset-0 rounded-full transition-all duration-500
            ${isHovered || isSpinning 
              ? 'bg-black/20 scale-90 -translate-y-2 blur-md' 
              : 'bg-transparent scale-100 translate-y-0'
            }
          `}
          style={{ zIndex: -1 }}
        />
      </div>
    </div>
  );
}; 