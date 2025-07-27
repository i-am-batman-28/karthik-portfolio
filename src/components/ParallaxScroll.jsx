import { useEffect, useRef } from 'react';

export const ParallaxScroll = () => {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = parallaxRef.current;
      if (!parallax) return;

      // Create multiple parallax layers
      const layers = parallax.children;
      Array.from(layers).forEach((layer, index) => {
        const speed = (index + 1) * 0.5;
        const yPos = -(scrolled * speed);
        layer.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={parallaxRef} className="fixed inset-0 pointer-events-none z-0">
      {/* Background layers with different speeds */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary rounded-full blur-xl" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-primary rounded-full blur-xl" />
      </div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-60 left-1/3 w-20 h-20 bg-primary rounded-full blur-lg" />
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-primary rounded-full blur-lg" />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-primary rounded-full blur-lg" />
      </div>
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-80 left-1/2 w-12 h-12 bg-primary rounded-full blur-md" />
        <div className="absolute bottom-60 right-1/4 w-8 h-8 bg-primary rounded-full blur-md" />
        <div className="absolute top-1/3 right-1/2 w-6 h-6 bg-primary rounded-full blur-md" />
      </div>
    </div>
  );
}; 