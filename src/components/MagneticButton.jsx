import { useState, useRef, useEffect } from 'react';

export const MagneticButton = ({ children, className = "", ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      if (!isHovered) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Magnetic strength
      const strength = 0.3;
      
      setPosition({
        x: deltaX * strength,
        y: deltaY * strength
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isHovered]);

  return (
    <button
      ref={buttonRef}
      className={`
        relative transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-xl hover:shadow-primary/50
        ${className}
      `}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      {...props}
    >
      {children}
      
      {/* Magnetic glow effect */}
      <div
        className={`
          absolute inset-0 rounded-lg transition-all duration-300
          ${isHovered 
            ? 'bg-primary/20 scale-110 blur-md' 
            : 'bg-transparent scale-100'
          }
        `}
        style={{ zIndex: -1 }}
      />
    </button>
  );
}; 