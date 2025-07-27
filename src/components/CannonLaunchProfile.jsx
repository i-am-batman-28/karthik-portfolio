import { useState, useRef, useEffect } from 'react';

export const CannonLaunchProfile = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('idle'); // idle, launch, rolling, return
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0, rotation: 0 });
  const animationRef = useRef(null);
  const startTimeRef = useRef(0);

  const startCannonLaunch = () => {
    if (isLaunching) return;
    
    setIsLaunching(true);
    setAnimationPhase('launch');
    startTimeRef.current = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const totalDuration = 4000; // 4 seconds total
      const progress = elapsed / totalDuration;
      
      if (progress >= 1) {
        // Animation complete
        setPosition({ x: 0, y: 0, z: 0, rotation: 0 });
        setAnimationPhase('idle');
        setIsLaunching(false);
        return;
      }
      
      if (progress < 0.2) {
        // Phase 1: Launch from cannon (0-20%)
        const launchProgress = progress / 0.2;
        const easeOut = 1 - Math.pow(1 - launchProgress, 3);
        
        setPosition({
          x: -window.innerWidth * 0.4 + (window.innerWidth * 0.4 * easeOut),
          y: -50 * easeOut,
          z: 100 * easeOut,
          rotation: 0
        });
        setAnimationPhase('launch');
             } else if (progress < 0.8) {
         // Phase 2: Rolling across the page (20-80%)
         const rollingProgress = (progress - 0.2) / 0.6;
         const easeInOut = rollingProgress < 0.5 
           ? 2 * rollingProgress * rollingProgress 
           : 1 - Math.pow(-2 * rollingProgress + 2, 2) / 2;
         
         const xPos = window.innerWidth * 0.4 + (window.innerWidth * 0.2 * easeInOut);
         // 3D ball rolling on floor - rotate around X axis (like a ball rolling forward)
         const rotation = 360 * rollingProgress * 2; // Natural ball rolling
         
         setPosition({
           x: xPos,
           y: 0,
           z: 50,
           rotation: rotation
         });
         setAnimationPhase('rolling');
      } else {
        // Phase 3: Return to center (80-100%)
        const returnProgress = (progress - 0.8) / 0.2;
        const easeIn = returnProgress * returnProgress;
        
                 const xPos = window.innerWidth * 0.6 - (window.innerWidth * 0.6 * easeIn);
         const yPos = 0;
         const zPos = 50 - (50 * easeIn);
         const rotation = 360 * 2 - (360 * 2 * easeIn); // Match the rolling rotation
        
        setPosition({
          x: xPos,
          y: yPos,
          z: zPos,
          rotation: rotation
        });
        setAnimationPhase('return');
      }
      
      animationRef.current = requestAnimationFrame(animate);
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
        onClick={startCannonLaunch}
      >
        {/* Cannon (visible during launch) */}
        <div
          className={`
            absolute -left-20 top-1/2 transform -translate-y-1/2
            w-16 h-8 bg-gray-800 rounded-r-full transition-all duration-500
            ${animationPhase === 'launch' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
          `}
        >
          {/* Cannon barrel */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-4 bg-gray-600 rounded-r-full" />
          {/* Cannon base */}
          <div className="absolute bottom-0 left-2 w-8 h-2 bg-gray-700 rounded" />
        </div>

        {/* Launch smoke effect */}
        <div
          className={`
            absolute -left-16 top-1/2 transform -translate-y-1/2
            transition-all duration-500
            ${animationPhase === 'launch' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
          `}
        >
          <div className="w-8 h-8 bg-orange-500/50 rounded-full blur-sm animate-pulse" />
        </div>

        {/* Profile Picture Sphere */}
        <div
          className={`
            w-48 h-48 rounded-full border-4 border-primary shadow-xl 
            transition-all duration-100 ease-out relative
            ${isLaunching ? 'animate-pulse' : ''}
          `}
                     style={{
             transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateX(${position.rotation}deg)`,
             transformStyle: 'preserve-3d',
           }}
        >
          <img
            src="/karthik.jpg"
            alt="Karthik M Sarma"
            className="w-full h-full rounded-full object-cover"
          />
          
          {/* 3D sphere effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-primary/20" />
        </div>

        {/* Rolling trail effect */}
        <div
          className={`
            absolute top-1/2 transform -translate-y-1/2 transition-all duration-500
            ${animationPhase === 'rolling' ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            left: `${position.x}px`,
            transform: `translateY(-50%) translateX(-50%)`,
          }}
        >
          <div className="w-4 h-4 bg-primary/30 rounded-full blur-sm animate-ping" />
        </div>

        {/* Glow effect */}
        <div
          className={`
            absolute inset-0 rounded-full transition-all duration-500
            ${isLaunching 
              ? 'bg-primary/30 scale-125 blur-xl' 
              : 'bg-transparent scale-100'
            }
          `}
        />

        {/* Launch indicator */}
        <div
          className={`
            absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full 
            flex items-center justify-center text-white text-xs font-bold
            transition-all duration-300
            ${!isLaunching ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
          `}
        >
          🚀
        </div>

        {/* Click hint */}
        <div
          className={`
            absolute -bottom-8 left-1/2 transform -translate-x-1/2
            text-xs text-muted-foreground text-center transition-all duration-300
            ${!isLaunching ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}
        >
          Click to launch!
        </div>

        {/* 3D Shadow */}
        <div
          className={`
            absolute inset-0 rounded-full transition-all duration-500
            ${isLaunching 
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