import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface CricketStadium3DProps {
  className?: string;
  glowColor?: string;
}

export const CricketStadium3D: React.FC<CricketStadium3DProps> = ({
  className = '',
  glowColor = '#00F59B',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Check WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGlSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3.2, 5.8);
    camera.lookAt(0, 0.4, 0);

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
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);
    } catch {
      setWebGlSupported(false);
      return;
    }

    // STADIUM ENVIRONMENT GROUP
    const stadiumGroup = new THREE.Group();
    scene.add(stadiumGroup);

    // 1. Stadium Turf Ground (Deep Sports Emerald Green Oval)
    const groundGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.15, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0A331E,
      roughness: 0.85,
      metalness: 0.05,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.08;
    stadiumGroup.add(ground);

    // Mowing Strip Patterns on Grass (Concentric rings)
    const ringGeo = new THREE.RingGeometry(2.2, 3.5, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00F59B,
      transparent: true,
      opacity: 0.07,
      side: THREE.DoubleSide,
    });
    const grassRings = new THREE.Mesh(ringGeo, ringMat);
    grassRings.rotation.x = -Math.PI / 2;
    grassRings.position.y = 0.005;
    stadiumGroup.add(grassRings);

    // 2. Cricket Pitch Strip (Authentic rectangular clay strip)
    const pitchGeo = new THREE.PlaneGeometry(1.2, 3.2);
    const pitchMat = new THREE.MeshStandardMaterial({
      color: 0xD8B576, // Clay pitch color
      roughness: 0.9,
      metalness: 0.02,
    });
    const pitch = new THREE.Mesh(pitchGeo, pitchMat);
    pitch.rotation.x = -Math.PI / 2;
    pitch.position.y = 0.01;
    stadiumGroup.add(pitch);

    // Crease Lines (Bowling crease, Popping crease)
    const creaseMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const poppingCrease1 = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.03), creaseMat);
    poppingCrease1.rotation.x = -Math.PI / 2;
    poppingCrease1.position.set(0, 0.015, -1.0);
    stadiumGroup.add(poppingCrease1);

    const poppingCrease2 = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.03), creaseMat);
    poppingCrease2.rotation.x = -Math.PI / 2;
    poppingCrease2.position.set(0, 0.015, 1.0);
    stadiumGroup.add(poppingCrease2);

    // 3. Stumps & Bails (Far end)
    const stumpMat = new THREE.MeshStandardMaterial({ color: 0xF3E5AB, roughness: 0.5 });
    for (let i = -1; i <= 1; i++) {
      const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.35, 16), stumpMat);
      stump.position.set(i * 0.06, 0.175, -1.1);
      stadiumGroup.add(stump);
    }
    // Bail
    const bail = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.16, 8), stumpMat);
    bail.rotation.z = Math.PI / 2;
    bail.position.set(0, 0.355, -1.1);
    stadiumGroup.add(bail);

    // 4. FLOODLIGHT TOWERS (4 Corner Stadium Towers)
    const towerMat = new THREE.MeshStandardMaterial({ color: 0x1E2D4A, metalness: 0.7, roughness: 0.3 });
    const lampGlowMat = new THREE.MeshBasicMaterial({ color: 0x00F59B });

    const towerPositions = [
      [-3.0, -1.8],
      [3.0, -1.8],
      [-3.0, 1.8],
      [3.0, 1.8],
    ];

    towerPositions.forEach(([tx, tz]) => {
      // Tower Pole
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.08, 2.5, 12), towerMat);
      pole.position.set(tx, 1.25, tz);
      stadiumGroup.add(pole);

      // Light Bank Head
      const lightHead = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.25, 0.1), towerMat);
      lightHead.position.set(tx, 2.5, tz);
      lightHead.lookAt(0, 1, 0);
      stadiumGroup.add(lightHead);

      // Glowing Lamp Panel
      const lamp = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.2), lampGlowMat);
      lamp.position.set(tx * 0.95, 2.5, tz * 0.95);
      lamp.lookAt(0, 1, 0);
      stadiumGroup.add(lamp);
    });

    // 5. ICONIC 3D CRICKET BALL (Floating in stadium key focus)
    const ballGroup = new THREE.Group();
    ballGroup.position.set(0, 1.35, 0);
    stadiumGroup.add(ballGroup);

    // Red Leather Sphere
    const ballCanvas = document.createElement('canvas');
    ballCanvas.width = 512;
    ballCanvas.height = 256;
    const bCtx = ballCanvas.getContext('2d');
    if (bCtx) {
      const grad = bCtx.createLinearGradient(0, 0, 512, 0);
      grad.addColorStop(0, '#8A0E17');
      grad.addColorStop(0.5, '#BD1825');
      grad.addColorStop(1, '#8A0E17');
      bCtx.fillStyle = grad;
      bCtx.fillRect(0, 0, 512, 256);

      bCtx.fillStyle = 'rgba(235, 185, 80, 0.85)';
      bCtx.font = 'bold 18px sans-serif';
      bCtx.textAlign = 'center';
      bCtx.fillText('ANKIX SPECIAL', 256, 110);
    }
    const ballTex = new THREE.CanvasTexture(ballCanvas);

    const ballMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.85, 48, 48),
      new THREE.MeshStandardMaterial({
        map: ballTex,
        roughness: 0.32,
        metalness: 0.08,
      })
    );
    ballGroup.add(ballMesh);

    // Raised Seam with stitches
    const seamRidge = new THREE.Mesh(
      new THREE.TorusGeometry(0.86, 0.02, 16, 64),
      new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.4 })
    );
    ballGroup.add(seamRidge);

    // 6. ATMOSPHERIC LIGHTING
    const ambient = new THREE.AmbientLight(0xFFFFFF, 0.65);
    scene.add(ambient);

    // Emerald Rim Light (Signature ANKIX theme)
    const emeraldLight = new THREE.DirectionalLight(new THREE.Color(glowColor), 3.2);
    emeraldLight.position.set(-4, 6, 2);
    scene.add(emeraldLight);

    // Cyan Fill Light
    const cyanLight = new THREE.DirectionalLight(0x00D8F6, 1.4);
    cyanLight.position.set(4, 5, -2);
    scene.add(cyanLight);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 450;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    // Animation Loop
    let animId: number;
    let isVisible = true;
    const io = new IntersectionObserver(([e]) => {
      isVisible = e.isIntersecting;
    });
    io.observe(container);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (!motionQuery.matches) {
        // Natural ball rotation
        ballGroup.rotation.y += 0.012;
        ballGroup.rotation.x = 0.35;

        // Subtle stadium floating animation
        ballGroup.position.y = 1.35 + Math.sin(Date.now() * 0.002) * 0.08;

        // Parallax camera sway
        stadiumGroup.rotation.y += (mouseX * 0.35 - stadiumGroup.rotation.y) * 0.05;
        stadiumGroup.rotation.x = Math.max(-0.1, Math.min(0.2, (mouseY * 0.2)));
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      ro.disconnect();
      io.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [glowColor]);

  if (!webGlSupported) {
    return (
      <div className={`flex items-center justify-center p-6 ${className}`}>
        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-brand-emerald/20 to-brand-cyan/20 border border-brand-emerald/40 flex items-center justify-center">
          <span className="text-brand-emerald font-mono text-xs">ANKIX 3D STADIUM ARENA</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: '100%', height: '460px', maxWidth: '520px' }}
      role="img"
      aria-label="3D Cricket Stadium Environment with green turf pitch, floodlights, and rotating cricket ball"
    />
  );
};
