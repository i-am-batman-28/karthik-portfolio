import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const skills = [
  { name: "Python", level: 95, color: "#3776AB" },
  { name: "FastAPI", level: 90, color: "#059669" },
  { name: "LangChain", level: 95, color: "#8B5CF6" },
  { name: "React", level: 85, color: "#61DAFB" },
  { name: "Docker", level: 85, color: "#2496ED" },
  { name: "Pandas", level: 95, color: "#130654" },
  { name: "OpenAI", level: 90, color: "#10A37F" },
  { name: "Pinecone", level: 90, color: "#FF6B35" },
];

export const ThreeDSkillSpheres = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const spheresRef = useRef([]);
  const animationIdRef = useRef(null);

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
    camera.position.z = 8;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create skill spheres
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    skills.forEach((skill, index) => {
      const radius = 0.8 + (skill.level / 100) * 0.4;
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      
      // Create gradient material
      const material = new THREE.MeshPhongMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.8,
        shininess: 100,
        emissive: skill.color,
        emissiveIntensity: 0.1
      });

      const sphere = new THREE.Mesh(geometry, material);
      
      // Position spheres in a circle
      const angle = (index / skills.length) * Math.PI * 2;
      const distance = 4;
      sphere.position.x = Math.cos(angle) * distance;
      sphere.position.y = Math.sin(angle) * distance;
      sphere.position.z = 0;
      
      // Add text label
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 64;
      
      context.fillStyle = '#ffffff';
      context.font = '24px Arial';
      context.textAlign = 'center';
      context.fillText(skill.name, 128, 32);
      context.fillText(`${skill.level}%`, 128, 56);
      
      const texture = new THREE.CanvasTexture(canvas);
      const labelMaterial = new THREE.SpriteMaterial({ map: texture });
      const label = new THREE.Sprite(labelMaterial);
      label.scale.set(2, 0.5, 1);
      label.position.y = radius + 0.5;
      
      sphere.add(label);
      sphereGroup.add(sphere);
      
      spheresRef.current.push({
        mesh: sphere,
        originalPosition: sphere.position.clone(),
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.02 + 0.01,
        floatOffset: Math.random() * Math.PI * 2
      });
    });

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x8B5CF6, 1, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    mountRef.current.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Rotate and animate spheres
      spheresRef.current.forEach((sphere, index) => {
        sphere.mesh.rotation.x += sphere.rotationSpeed.x;
        sphere.mesh.rotation.y += sphere.rotationSpeed.y;
        sphere.mesh.rotation.z += sphere.rotationSpeed.z;
        
        // Floating animation
        sphere.mesh.position.y = sphere.originalPosition.y + 
          Math.sin(Date.now() * sphere.floatSpeed + sphere.floatOffset) * 0.3;
        
        // Mouse interaction
        sphere.mesh.position.x += (sphere.originalPosition.x + mouseX * 2 - sphere.mesh.position.x) * 0.05;
        sphere.mesh.position.z += (sphere.originalPosition.z + mouseY * 2 - sphere.mesh.position.z) * 0.05;
      });

      // Rotate the entire group
      sphereGroup.rotation.y += 0.005;

      renderer.render(scene, camera);
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
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-96 relative"
    />
  );
}; 