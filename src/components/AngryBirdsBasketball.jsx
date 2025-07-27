import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

export const AngryBirdsBasketball = () => {
  const [gameState, setGameState] = useState('profile'); // profile, aiming, shooting, scored, missed
  const [tries, setTries] = useState(5);
  const [score, setScore] = useState(0);
  const [isAiming, setIsAiming] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragEnd, setDragEnd] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const ballRef = useRef(null);
  const hoopRef = useRef(null);
  const netRef = useRef(null);
  const slingshotRef = useRef(null);
  const animationIdRef = useRef(null);
  const velocityRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup - wider view for Angry Birds style
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 20);
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

    // Create big basketball
    const ballGeometry = new THREE.SphereGeometry(2, 32, 32);
    const ballMaterial = new THREE.MeshPhongMaterial({
      color: 0xff8c00, // Orange basketball color
      transparent: true,
      opacity: 0.9
    });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(-15, 0, 0); // Start position (left side)
    ballRef.current = ball;
    scene.add(ball);

    // Create huge basketball hoop
    const hoopGeometry = new THREE.TorusGeometry(4, 0.3, 16, 32);
    const hoopMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const hoop = new THREE.Mesh(hoopGeometry, hoopMaterial);
    hoop.position.set(15, 8, 0); // Right side
    hoop.rotation.x = Math.PI / 2;
    hoopRef.current = hoop;
    scene.add(hoop);

    // Create basketball net
    const netGeometry = new THREE.CylinderGeometry(4, 3, 6, 16, 8, true);
    const netMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
      wireframe: true
    });
    const net = new THREE.Mesh(netGeometry, netMaterial);
    net.position.set(15, 5, 0);
    netRef.current = net;
    scene.add(net);

    // Create backboard
    const backboardGeometry = new THREE.BoxGeometry(8, 6, 0.2);
    const backboardMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const backboard = new THREE.Mesh(backboardGeometry, backboardMaterial);
    backboard.position.set(15, 8, -2);
    scene.add(backboard);

    // Create slingshot base
    const slingshotGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 8);
    const slingshotMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const slingshot = new THREE.Mesh(slingshotGeometry, slingshotMaterial);
    slingshot.position.set(-15, -1, 0);
    slingshotRef.current = slingshot;
    scene.add(slingshot);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Add floor
    const floorGeometry = new THREE.PlaneGeometry(40, 20);
    const floorMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x333333, 
      transparent: true, 
      opacity: 0.3 
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3;
    scene.add(floor);

    // Animation function
    const animate = () => {
      if (gameState === 'aiming' && isDragging) {
        // Update ball position based on drag
        const dragVector = {
          x: dragEnd.x - dragStart.x,
          y: dragEnd.y - dragStart.y
        };
        
        // Limit drag distance
        const maxDrag = 10;
        const dragDistance = Math.sqrt(dragVector.x * dragVector.x + dragVector.y * dragVector.y);
        if (dragDistance > maxDrag) {
          dragVector.x = (dragVector.x / dragDistance) * maxDrag;
          dragVector.y = (dragVector.y / dragDistance) * maxDrag;
        }
        
        ball.position.set(-15 + dragVector.x * 0.1, dragVector.y * 0.1, 0);
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
  }, [gameState, isDragging, dragStart, dragEnd]);

  const startGame = () => {
    setGameState('aiming');
    setIsAiming(true);
    setTries(5);
    setScore(0);
  };

  const handleMouseDown = (e) => {
    if (gameState !== 'aiming') return;
    
    const rect = mountRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    setDragStart({ x, y });
    setDragEnd({ x, y });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || gameState !== 'aiming') return;
    
    const rect = mountRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    setDragEnd({ x, y });
  };

  const handleMouseUp = () => {
    if (!isDragging || gameState !== 'aiming') return;
    
    setIsDragging(false);
    
    // Calculate velocity from drag
    const dragVector = {
      x: dragStart.x - dragEnd.x,
      y: dragStart.y - dragEnd.y
    };
    
    // Convert to velocity
    velocityRef.current = {
      x: dragVector.x * 0.5,
      y: dragVector.y * 0.5
    };
    
    shootBall();
  };

  const shootBall = () => {
    if (gameState !== 'aiming' || tries <= 0) return;

    setGameState('shooting');
    setIsAiming(false);

    const ball = ballRef.current;
    const hoop = hoopRef.current;
    
    const startPos = ball.position.clone();
    const velocity = velocityRef.current;
    
    let startTime = Date.now();
    const gravity = -0.02;
    
    const shootAnimation = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      // Physics simulation
      const x = startPos.x + velocity.x * elapsed * 10;
      const y = startPos.y + velocity.y * elapsed * 10 + 0.5 * gravity * elapsed * elapsed * 100;
      const z = startPos.z;
      
      ball.position.set(x, y, z);
      
      // Rotate ball as it moves
      ball.rotation.x += velocity.x * 0.1;
      ball.rotation.z += velocity.y * 0.1;
      
      // Check if ball went through hoop
      const hoopX = hoop.position.x;
      const hoopY = hoop.position.y;
      const hoopRadius = 4;
      
      if (Math.abs(x - hoopX) < hoopRadius && 
          Math.abs(y - hoopY) < hoopRadius && 
          elapsed > 1) {
        // Scored!
        setScore(prev => prev + 1);
        setGameState('scored');
        
        setTimeout(() => {
          resetBall();
        }, 1000);
        return;
      }
      
      // Check if ball is out of bounds or hit ground
      if (y < -3 || x > 25 || elapsed > 5) {
        // Missed
        setGameState('missed');
        
        setTimeout(() => {
          resetBall();
        }, 1000);
        return;
      }
      
      requestAnimationFrame(shootAnimation);
    };
    
    shootAnimation();
  };

  const resetBall = () => {
    const ball = ballRef.current;
    ball.position.set(-15, 0, 0);
    ball.rotation.set(0, 0, 0);
    
    setTries(prev => prev - 1);
    
    if (tries > 1) {
      setGameState('aiming');
      setIsAiming(true);
    } else {
      setGameState('gameOver');
    }
  };

  const handleClick = () => {
    if (gameState === 'profile') {
      startGame();
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
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleClick}
        />
        
        {/* Profile Picture Overlay (when in profile state) */}
        {gameState === 'profile' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 rounded-full border-4 border-primary shadow-xl overflow-hidden">
              <img
                src="/karthik.jpg"
                alt="Karthik M Sarma"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <div className="bg-primary/80 text-white px-4 py-2 rounded-lg">
                Click to start Angry Birds Basketball! 🏀
              </div>
            </div>
          </div>
        )}
        
        {/* Game UI Overlay */}
        {gameState !== 'profile' && (
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
              {gameState === 'aiming' && (
                <div className="bg-green-500/80 text-white px-4 py-2 rounded-lg">
                  {isDragging ? 'Release to shoot!' : 'Drag to aim and shoot!'}
                </div>
              )}
              {gameState === 'scored' && (
                <div className="bg-green-500/80 text-white px-4 py-2 rounded-lg animate-bounce">
                  🏀 SWISH! SCORED! 🏀
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
        )}
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-center text-sm text-muted-foreground">
        {gameState === 'profile' && (
          <p>Transform into Angry Birds-style basketball shooting!</p>
        )}
        {gameState === 'aiming' && (
          <p>Drag the basketball like a slingshot to aim and shoot!</p>
        )}
      </div>
    </div>
  );
}; 