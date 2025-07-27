import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

export const BasketballGame = () => {
  const [gameState, setGameState] = useState('idle'); // idle, aiming, shooting, scored, missed
  const [tries, setTries] = useState(5);
  const [score, setScore] = useState(0);
  const [isAiming, setIsAiming] = useState(false);
  const [aimPosition, setAimPosition] = useState({ x: 0, y: 0 });
  
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const ballRef = useRef(null);
  const hoopRef = useRef(null);
  const animationIdRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

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
    camera.position.set(0, 5, 15);
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

    // Create basketball
    const ballGeometry = new THREE.SphereGeometry(1, 32, 32);
    const ballMaterial = new THREE.MeshPhongMaterial({
      color: 0xff8c00, // Orange basketball color
      transparent: true,
      opacity: 0.9
    });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0, 0, 0);
    ballRef.current = ball;
    scene.add(ball);

    // Create basketball hoop
    const hoopGeometry = new THREE.TorusGeometry(2, 0.2, 16, 32);
    const hoopMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const hoop = new THREE.Mesh(hoopGeometry, hoopMaterial);
    hoop.position.set(0, 8, -10);
    hoop.rotation.x = Math.PI / 2;
    hoopRef.current = hoop;
    scene.add(hoop);

    // Add backboard
    const backboardGeometry = new THREE.BoxGeometry(4, 3, 0.1);
    const backboardMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const backboard = new THREE.Mesh(backboardGeometry, backboardMaterial);
    backboard.position.set(0, 8, -8);
    scene.add(backboard);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Add floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
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
      if (gameState === 'aiming') {
        // Update ball position based on mouse
        ball.position.x = mouseRef.current.x * 0.1;
        ball.position.y = Math.max(0, mouseRef.current.y * 0.1);
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
  }, [gameState]);

  const startGame = () => {
    setGameState('aiming');
    setIsAiming(true);
    setTries(5);
    setScore(0);
  };

  const shootBall = () => {
    if (gameState !== 'aiming' || tries <= 0) return;

    setGameState('shooting');
    setIsAiming(false);

    // Calculate shot trajectory
    const ball = ballRef.current;
    const hoop = hoopRef.current;
    
    const startPos = ball.position.clone();
    const endPos = hoop.position.clone();
    endPos.y += Math.random() * 2 - 1; // Add some randomness
    
    const distance = startPos.distanceTo(endPos);
    const time = 2; // 2 seconds for the shot
    
    let startTime = Date.now();
    
    const shootAnimation = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = elapsed / time;
      
      if (progress >= 1) {
        // Check if ball went through hoop
        const finalY = ball.position.y;
        const hoopY = hoop.position.y;
        const hoopRadius = 2;
        
        if (Math.abs(finalY - hoopY) < hoopRadius && 
            Math.abs(ball.position.x) < hoopRadius) {
          // Scored!
          setScore(prev => prev + 1);
          setGameState('scored');
        } else {
          // Missed
          setGameState('missed');
        }
        
        setTries(prev => prev - 1);
        
        // Reset ball position
        setTimeout(() => {
          ball.position.set(0, 0, 0);
          if (tries > 1) {
            setGameState('aiming');
            setIsAiming(true);
          } else {
            setGameState('gameOver');
          }
        }, 1000);
        
        return;
      }
      
      // Parabolic trajectory
      const x = startPos.x + (endPos.x - startPos.x) * progress;
      const y = startPos.y + (endPos.y - startPos.y) * progress + 
                Math.sin(progress * Math.PI) * 5; // Arc
      const z = startPos.z + (endPos.z - startPos.z) * progress;
      
      ball.position.set(x, y, z);
      
      // Rotate ball as it moves
      ball.rotation.x += 0.2;
      ball.rotation.z += 0.1;
      
      requestAnimationFrame(shootAnimation);
    };
    
    shootAnimation();
  };

  const handleMouseMove = (e) => {
    if (!isAiming) return;
    
    const rect = mountRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const handleClick = () => {
    if (gameState === 'idle') {
      startGame();
    } else if (gameState === 'aiming') {
      shootBall();
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Game Container */}
      <div className="relative">
        {/* 3D Canvas */}
        <div 
          ref={mountRef} 
          className="w-96 h-64 relative cursor-crosshair"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />
        
        {/* Game UI Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
          {/* Score and Tries */}
          <div className="flex justify-between items-center">
            <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              Score: {score}
            </div>
            <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              Tries: {tries}
            </div>
          </div>
          
          {/* Game Status */}
          <div className="text-center">
            {gameState === 'idle' && (
              <div className="bg-primary/80 text-white px-4 py-2 rounded-lg">
                Click to start basketball game!
              </div>
            )}
            {gameState === 'aiming' && (
              <div className="bg-green-500/80 text-white px-4 py-2 rounded-lg">
                Click to shoot! Move mouse to aim
              </div>
            )}
            {gameState === 'scored' && (
              <div className="bg-green-500/80 text-white px-4 py-2 rounded-lg animate-bounce">
                🏀 SCORED! 🏀
              </div>
            )}
            {gameState === 'missed' && (
              <div className="bg-red-500/80 text-white px-4 py-2 rounded-lg">
                Missed! Try again
              </div>
            )}
            {gameState === 'gameOver' && (
              <div className="bg-purple-500/80 text-white px-4 py-2 rounded-lg">
                Game Over! Final Score: {score}/5
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-center text-sm text-muted-foreground">
        {gameState === 'idle' && (
          <p>Transform your profile into a basketball and shoot some hoops!</p>
        )}
        {gameState === 'aiming' && (
          <p>Move your mouse to aim, then click to shoot!</p>
        )}
      </div>
    </div>
  );
}; 