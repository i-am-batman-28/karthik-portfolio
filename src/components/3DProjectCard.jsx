import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ExternalLink, Github } from "lucide-react";

export const ThreeDProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="group relative perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`
          bg-card rounded-lg overflow-hidden shadow-xs transition-all duration-500
          ${isHovered ? 'shadow-2xl scale-105' : 'hover:shadow-lg'}
        `}
        style={{
          transform: isHovered 
            ? `rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg) translateZ(20px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 3D Card Content */}
        <div className="relative">
          {/* Image/Video Container */}
          <div className="h-48 overflow-hidden relative">
            {project.id === 1 ? (
              <video
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
            
            {/* 3D Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-6 relative">
            {/* Tags with 3D effect */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium border rounded-full bg-primary/10 text-primary border-primary/20 backdrop-blur-sm"
                  style={{
                    transform: isHovered ? `translateZ(${index * 5}px)` : 'translateZ(0px)',
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title with 3D text effect */}
            <h3 
              className="text-xl font-semibold mb-2 text-glow"
              style={{
                transform: isHovered ? 'translateZ(10px)' : 'translateZ(0px)',
                textShadow: isHovered ? '0 0 20px rgba(139, 92, 246, 0.5)' : 'none'
              }}
            >
              {project.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4">
              {project.description}
            </p>

            {/* 3D Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:rotate-12"
                    style={{
                      transform: isHovered ? 'translateZ(15px) rotateY(5deg)' : 'translateZ(0px) rotateY(0deg)'
                    }}
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:-rotate-12"
                  style={{
                    transform: isHovered ? 'translateZ(15px) rotateY(-5deg)' : 'translateZ(0px) rotateY(0deg)'
                  }}
                >
                  <Github size={18} />
                </a>
              </div>
              
              {/* Floating arrow */}
              <div
                className="text-primary transition-all duration-300"
                style={{
                  transform: isHovered ? 'translateZ(20px) translateX(5px)' : 'translateZ(0px) translateX(0px)'
                }}
              >
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 3D Shadow Effect */}
      <div
        className="absolute inset-0 bg-black/20 rounded-lg blur-xl -z-10 transition-all duration-500"
        style={{
          transform: isHovered 
            ? `rotateX(${mousePosition.x * 0.5}deg) rotateY(${mousePosition.y * 0.5}deg) translateZ(-20px) scale(0.9)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
          opacity: isHovered ? 0.8 : 0
        }}
      />
    </div>
  );
}; 