import { useState, useRef, useEffect } from 'react';
import { TypingText } from './TypingText';

export const MagneticTypingProfile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const profileRef = useRef(null);

  useEffect(() => {
    // Start the typing animation after a short delay
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!profileRef.current) return;

    const rect = profileRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    setMousePosition({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Calculate magnetic effect
  const magneticX = mousePosition.x * 0.1;
  const magneticY = mousePosition.y * 0.1;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Profile Picture Container */}
      <div
        ref={profileRef}
        className="relative group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Magnetic Profile Picture */}
        <div
          className={`
            w-48 h-48 rounded-full border-4 border-primary shadow-xl overflow-hidden
            transition-all duration-500 ease-out
            ${isHovered ? 'scale-110 shadow-2xl' : 'scale-100'}
          `}
          style={{
            transform: `translate(${magneticX}px, ${magneticY}px) scale(${isHovered ? 1.1 : 1})`,
          }}
        >
          {/* Blurred overlay that fades out */}
          <div
            className={`
              absolute inset-0 bg-background/80 backdrop-blur-sm
              transition-all duration-1000 ease-out z-10
              ${isRevealed ? 'opacity-0' : 'opacity-100'}
            `}
          />
          
          {/* Profile Image */}
          <img
            src="/karthik.jpg"
            alt="Karthik M Sarma"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Glow effect on hover */}
        <div
          className={`
            absolute inset-0 rounded-full bg-primary/20 blur-xl
            transition-all duration-500 ease-out -z-10
            ${isHovered ? 'opacity-100 scale-125' : 'opacity-0 scale-100'}
          `}
        />
      </div>

      {/* Typing Animation */}
      <div className="text-center space-y-2">
        {isRevealed && (
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground">
              <TypingText text="Karthik" speed={100} />
            </h2>
            <p className="text-muted-foreground text-sm">
              <TypingText text="IIIT Sri City" speed={80} delay={1500} />
            </p>
          </div>
        )}
      </div>

      {/* Hover hint */}
      <div
        className={`
          text-sm text-muted-foreground text-center transition-all duration-300
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-1'}
        `}
      >
        {isHovered ? '' : 'Hover for interaction'}
      </div>
    </div>
  );
}; 