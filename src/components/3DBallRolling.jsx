import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

export const ThreeDBallRolling = () => {
  const [isRolling, setIsRolling] = useState(false);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const ballRef = useRef(null);
  const animationIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create 3D sphere with profile picture texture
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    
    // Load profile picture as texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/karthik.jpg');
    
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9
    });

    const ball = new THREE.Mesh(geometry, material);
    ball.position.set(-10, 2, 0); // Start position (left side)
    ballRef.current = ball;
    scene.add(ball);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Add floor
    const floorGeometry = new THREE.PlaneGeometry(30, 10);
    const floorMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x333333, 
      transparent: true, 
      opacity: 0.3 
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    scene.add(floor);

    // Animation function
    const animate = () => {
      if (isRolling) {
        const elapsed = Date.now() - startTimeRef.current;
        const totalDuration = 4000; // 4 seconds
        const progress = elapsed / totalDuration;
        
        if (progress >= 1) {
          // Animation complete
          ball.position.set(0, 2, 0);
          ball.rotation.set(0, 0, 0);
          setIsRolling(false);
        } else {
          // Calculate ball position and rotation
          let x, rotation;
          
          if (progress < 0.5) {
            // Roll from left to right
            const rollProgress = progress / 0.5;
            x = -10 + (20 * rollProgress); // Move from -10 to 10
            rotation = rollProgress * Math.PI * 4; // 2 full rotations
          } else {
            // Roll back to center
            const returnProgress = (progress - 0.5) / 0.5;
            x = 10 - (10 * returnProgress); // Move from 10 to 0
            rotation = Math.PI * 4 - (returnProgress * Math.PI * 2); // Continue rotation
          }
          
          ball.position.x = x;
          ball.rotation.z = rotation; // Rotate around Z axis for rolling
        }
      }
      
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isRolling]);

  const startRolling = () => {
    if (isRolling) return;
    setIsRolling(true);
    startTimeRef.current = Date.now();
  };

  return (
    <div className="flex justify-center">
      <div
        className="relative group cursor-pointer"
        onClick={startRolling}
      >
        {/* 3D Canvas Container */}
        <div 
          ref={mountRef} 
          className="w-96 h-64 relative"
        />
        
        {/* Overlay controls */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Launch indicator */}
          <div
            className={`
              absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full 
              flex items-center justify-center text-white text-xs font-bold
              transition-all duration-300 pointer-events-auto
              ${!isRolling ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
            `}
          >
            🏀
          </div>

          {/* Click hint */}
          <div
            className={`
              absolute -bottom-8 left-1/2 transform -translate-x-1/2
              text-xs text-muted-foreground text-center transition-all duration-300
              ${!isRolling ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
            `}
          >
            Click to roll the ball!
          </div>
        </div>
      </div>
    </div>
  );
}; 