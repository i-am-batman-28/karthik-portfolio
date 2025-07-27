import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const particlesRef = useRef([]);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorTrail = cursorTrailRef.current;
    if (!cursor || !cursorTrail) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let trailX = 0;
    let trailY = 0;

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.color = `hsl(${Math.random() * 60 + 240}, 70%, 60%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size *= 0.98;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Click handler for particle burst
    const handleClick = (e) => {
      for (let i = 0; i < 15; i++) {
        particlesRef.current.push(new Particle(e.clientX, e.clientY));
      }
    };

    // Animation loop
    const animate = () => {
      // Fast cursor following
      cursorX += (mouseX - cursorX) * 0.3;
      cursorY += (mouseY - cursorY) * 0.3;
      
      // Trail following
      trailX += (cursorX - trailX) * 0.25;
      trailY += (cursorY - trailY) * 0.25;

      // Update cursor position
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;

      // Update particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.update();
        return particle.life > 0;
      });

      // Draw particles
      const canvas = document.getElementById('particle-canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesRef.current.forEach(particle => particle.draw(ctx));
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Set up canvas for particles
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9998';
    document.body.appendChild(canvas);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    window.addEventListener('resize', resizeCanvas);

    // Start animation
    animate();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Cursor trail */}
      <div
        ref={cursorTrailRef}
        className="fixed w-12 h-12 bg-primary/30 rounded-full pointer-events-none z-[9998] mix-blend-difference transition-transform duration-200 ease-out"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}; 