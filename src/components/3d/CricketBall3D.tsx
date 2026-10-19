import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface CricketBall3DProps {
  size?: number;
  className?: string;
  enableParallax?: boolean;
  glowColor?: string;
  autoRotateSpeed?: number;
}

export const CricketBall3D: React.FC<CricketBall3DProps> = ({
  size = 320,
  className = '',
  enableParallax = true,
  glowColor = '#00F59B',
  autoRotateSpeed = 0.008,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    // Check WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGlSupported(false);
      return () => motionQuery.removeEventListener('change', motionListener);
    }

    const container = containerRef.current;
    if (!container) return () => motionQuery.removeEventListener('change', motionListener);

    // Three.js Scene Setup
    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch {
      setWebGlSupported(false);
      return () => motionQuery.removeEventListener('change', motionListener);
    }

    // Cricket Ball Group
    const ballGroup = new THREE.Group();
    scene.add(ballGroup);

    // Procedural Leather Texture for Cricket Ball
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 1024;
    textureCanvas.height = 512;
    const ctx = textureCanvas.getContext('2d');
    if (ctx) {
      // Base deep red cricket ball leather
      const gradient = ctx.createLinearGradient(0, 0, 1024, 0);
      gradient.addColorStop(0, '#8A0E17');
      gradient.addColorStop(0.3, '#A81420');
      gradient.addColorStop(0.5, '#BD1825');
      gradient.addColorStop(0.7, '#A81420');
      gradient.addColorStop(1, '#8A0E17');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1024, 512);

      // Fine leather grain speckles
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const alpha = Math.random() * 0.12;
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.fillRect(x, y, 1.5, 1.5);
      }

      // Golden foil embossed manufacturer stamp
      ctx.fillStyle = 'rgba(235, 185, 80, 0.75)';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ANKIX 4-PIECE', 512, 210);
      ctx.font = '14px sans-serif';
      ctx.fillText('SPECIAL TEST GRADE', 512, 235);
    }

    const canvasTexture = new THREE.CanvasTexture(textureCanvas);
    canvasTexture.wrapS = THREE.RepeatWrapping;
    canvasTexture.wrapT = THREE.ClampToEdgeWrapping;

    // Ball Sphere
    const sphereGeo = new THREE.SphereGeometry(1.6, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: canvasTexture,
      roughness: 0.32,
      metalness: 0.08,
      bumpScale: 0.04,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    ballGroup.add(sphereMesh);

    // Raised Cricket Seam (White stitched seam around the equator)
    const seamGroup = new THREE.Group();
    ballGroup.add(seamGroup);

    // Seam ridge
    const seamRidgeGeo = new THREE.TorusGeometry(1.61, 0.038, 16, 128);
    const seamRidgeMat = new THREE.MeshStandardMaterial({
      color: 0xE8ECEF,
      roughness: 0.45,
      metalness: 0.05,
    });
    const seamRidge = new THREE.Mesh(seamRidgeGeo, seamRidgeMat);
    seamGroup.add(seamRidge);

    // Stitched dashes on the seam
    const stitchCount = 72;
    for (let i = 0; i < stitchCount; i++) {
      const angle = (i / stitchCount) * Math.PI * 2;
      const stitchGeo = new THREE.BoxGeometry(0.018, 0.09, 0.012);
      const stitchMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
      const stitch = new THREE.Mesh(stitchGeo, stitchMat);
      
      const r = 1.63;
      stitch.position.x = Math.cos(angle) * r;
      stitch.position.y = Math.sin(angle) * r;
      stitch.position.z = (i % 2 === 0 ? 0.025 : -0.025);
      stitch.rotation.z = angle + Math.PI / 4;
      seamGroup.add(stitch);
    }

    // Default angle for iconic seam showcase
    ballGroup.rotation.x = 0.45;
    ballGroup.rotation.y = 0.7;

    // Atmospheric Stadium Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.4);
    scene.add(ambientLight);

    // Stadium Key Floodlight (Top-Left White Light)
    const keyLight = new THREE.DirectionalLight(0xFFFFFF, 2.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Soft Blue-Navy Fill Light
    const fillLight = new THREE.DirectionalLight(0x3B82F6, 0.8);
    fillLight.position.set(-4, -2, -2);
    scene.add(fillLight);

    // Electric Emerald Rim Light (ANKIX signature sports glow)
    const emeraldRimLight = new THREE.DirectionalLight(new THREE.Color(glowColor), 3.0);
    emeraldRimLight.position.set(-3.5, 3.5, -3);
    scene.add(emeraldRimLight);

    // Cyan Bottom Accent
    const cyanLight = new THREE.PointLight(0x00D8F6, 1.2, 10);
    cyanLight.position.set(2, -3.5, 2);
    scene.add(cyanLight);

    // Mouse Parallax Interaction
    let targetRotationX = 0.45;
    let targetRotationY = 0.7;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableParallax) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || size;
      const newH = container.clientHeight || size;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Render Loop with visibility detection
    let animationFrameId: number;
    let isVisible = true;

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    intersectionObserver.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      if (!motionQuery.matches) {
        ballGroup.rotation.y += autoRotateSpeed;
      }

      if (enableParallax && !motionQuery.matches) {
        targetRotationY = 0.7 + mouseX * 0.45;
        targetRotationX = 0.45 - mouseY * 0.35;
        ballGroup.rotation.y += (targetRotationY - ballGroup.rotation.y) * 0.05;
        ballGroup.rotation.x += (targetRotationX - ballGroup.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      motionQuery.removeEventListener('change', motionListener);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      canvasTexture.dispose();
      seamRidgeGeo.dispose();
      seamRidgeMat.dispose();
    };
  }, [size, enableParallax, glowColor, autoRotateSpeed]);

  if (!webGlSupported || prefersReducedMotion) {
    // High-resolution SVG 3D Fallback
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
        aria-label="3D Cricket Ball Graphic"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] filter"
        >
          <defs>
            <radialGradient id="ballShade" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#E52D3D" />
              <stop offset="45%" stopColor="#A81420" />
              <stop offset="85%" stopColor="#5E0B12" />
              <stop offset="100%" stopColor="#300307" />
            </radialGradient>
            <linearGradient id="seamStitch" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <filter id="emeraldRim">
              <feDropShadow dx="-4" dy="-4" stdDeviation="6" floodColor="#00F59B" floodOpacity="0.4" />
            </filter>
          </defs>
          <circle cx="100" cy="100" r="82" fill="url(#ballShade)" filter="url(#emeraldRim)" />
          {/* Seam line */}
          <ellipse
            cx="100"
            cy="100"
            rx="82"
            ry="24"
            fill="none"
            stroke="url(#seamStitch)"
            strokeWidth="3.5"
            strokeDasharray="4 3"
            transform="rotate(-35 100 100)"
          />
          {/* Brand stamp */}
          <text
            x="100"
            y="78"
            fill="rgba(245, 180, 50, 0.7)"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            letterSpacing="1"
          >
            ANKIX
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Interactive 3D Cricket Ball with realistic seam and emerald rim lighting"
    />
  );
};
