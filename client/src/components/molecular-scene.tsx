import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

function CSSFallbackScene({ className }: { className?: string }) {
  return (
    <div className={className} data-testid="canvas-molecular-3d">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `hsla(210, ${50 + Math.random() * 30}%, ${45 + Math.random() * 20}%, ${0.2 + Math.random() * 0.4})`,
              animation: `float-particle ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        <svg className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[300px] h-[400px] opacity-30" viewBox="0 0 200 400" style={{ animation: "spin-slow 30s linear infinite" }}>
          {Array.from({ length: 40 }).map((_, i) => {
            const t = i / 40;
            const angle = t * Math.PI * 4;
            const y = t * 380 + 10;
            const x1 = 100 + Math.cos(angle) * 50;
            const x2 = 100 + Math.cos(angle + Math.PI) * 50;
            return (
              <g key={i}>
                <circle cx={x1} cy={y} r="3" fill="hsl(210, 70%, 50%)" opacity="0.6" />
                <circle cx={x2} cy={y} r="3" fill="hsl(210, 70%, 50%)" opacity="0.6" />
                {i % 3 === 0 && (
                  <line x1={x1} y1={y} x2={x2} y2={y} stroke="hsl(210, 50%, 60%)" strokeWidth="1" opacity="0.3" />
                )}
              </g>
            );
          })}
        </svg>
        <svg className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[200px] h-[300px] opacity-25" viewBox="0 0 150 300" style={{ animation: "float-chain 8s ease-in-out infinite" }}>
          {Array.from({ length: 14 }).map((_, i) => {
            const t = i / 14;
            const x = 75 + Math.sin(t * Math.PI * 3) * 40;
            const y = t * 280 + 10;
            const colors = ["hsl(210, 65%, 55%)", "hsl(190, 55%, 50%)", "hsl(230, 50%, 55%)", "hsl(170, 45%, 50%)"];
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="5" fill={colors[i % 4]} opacity="0.7" />
                {i > 0 && (
                  <line
                    x1={75 + Math.sin(((i - 1) / 14) * Math.PI * 3) * 40}
                    y1={((i - 1) / 14) * 280 + 10}
                    x2={x}
                    y2={y}
                    stroke="hsl(210, 40%, 50%)"
                    strokeWidth="2"
                    opacity="0.4"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function initScene(container: HTMLDivElement) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 10);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambient);
  const point1 = new THREE.PointLight(0x6b9dd4, 0.8);
  point1.position.set(10, 10, 10);
  scene.add(point1);
  const point2 = new THREE.PointLight(0x4a7bb5, 0.4);
  point2.position.set(-10, -5, 5);
  scene.add(point2);
  const point3 = new THREE.PointLight(0x8bb5e0, 0.3);
  point3.position.set(0, 8, -5);
  scene.add(point3);

  const strandMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("hsl(210, 70%, 50%)"),
    emissive: new THREE.Color("hsl(210, 70%, 25%)"),
    emissiveIntensity: 0.3,
    roughness: 0.4,
    metalness: 0.6,
  });
  const rungMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("hsl(210, 50%, 65%)"),
    emissive: new THREE.Color("hsl(210, 60%, 20%)"),
    emissiveIntensity: 0.2,
    transparent: true,
    opacity: 0.7,
  });
  const sphereGeo = new THREE.SphereGeometry(0.08, 8, 8);
  const cylGeo = new THREE.CylinderGeometry(0.025, 0.025, 1, 6);

  const dnaGroup = new THREE.Group();
  for (let i = 0; i < 60; i++) {
    const t = i / 60;
    const angle = t * Math.PI * 4;
    const y = t * 12 - 6;
    const x1 = Math.cos(angle) * 1.2;
    const z1 = Math.sin(angle) * 1.2;
    const x2 = Math.cos(angle + Math.PI) * 1.2;
    const z2 = Math.sin(angle + Math.PI) * 1.2;

    const s1 = new THREE.Mesh(sphereGeo, strandMat);
    s1.position.set(x1, y, z1);
    dnaGroup.add(s1);
    const s2 = new THREE.Mesh(sphereGeo, strandMat);
    s2.position.set(x2, y, z2);
    dnaGroup.add(s2);

    if (i % 3 === 0) {
      const start = new THREE.Vector3(x1, y, z1);
      const end = new THREE.Vector3(x2, y, z2);
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const dir = new THREE.Vector3().subVectors(end, start);
      const len = dir.length();
      const rung = new THREE.Mesh(cylGeo, rungMat);
      rung.position.copy(mid);
      rung.scale.y = len;
      const quat = new THREE.Quaternion();
      quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
      rung.quaternion.copy(quat);
      dnaGroup.add(rung);
    }
  }
  dnaGroup.position.set(2.5, 0, -2);
  scene.add(dnaGroup);

  const peptideGroup = new THREE.Group();
  const pepColors = [
    new THREE.Color("hsl(210, 65%, 55%)"),
    new THREE.Color("hsl(190, 55%, 50%)"),
    new THREE.Color("hsl(230, 50%, 55%)"),
    new THREE.Color("hsl(170, 45%, 50%)"),
  ];
  const pepSphereGeo = new THREE.SphereGeometry(0.15, 10, 10);
  const bondMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("hsl(210, 40%, 50%)"),
    transparent: true,
    opacity: 0.6,
  });
  const pepPositions: THREE.Vector3[] = [];
  for (let i = 0; i < 18; i++) {
    const t = i / 18;
    const x = Math.sin(t * Math.PI * 3) * 1.5 - 4;
    const y = t * 6 - 3;
    const z = Math.cos(t * Math.PI * 2) * 0.8 - 1;
    pepPositions.push(new THREE.Vector3(x, y, z));
    const mat = new THREE.MeshStandardMaterial({
      color: pepColors[i % 4],
      emissive: pepColors[i % 4],
      emissiveIntensity: 0.15,
      roughness: 0.3,
      metalness: 0.5,
    });
    const sphere = new THREE.Mesh(pepSphereGeo, mat);
    sphere.position.set(x, y, z);
    peptideGroup.add(sphere);
    if (i > 0) {
      const pStart = pepPositions[i - 1];
      const pEnd = pepPositions[i];
      const pMid = new THREE.Vector3().addVectors(pStart, pEnd).multiplyScalar(0.5);
      const pDir = new THREE.Vector3().subVectors(pEnd, pStart);
      const pLen = pDir.length();
      const bond = new THREE.Mesh(cylGeo, bondMat);
      bond.position.copy(pMid);
      bond.scale.y = pLen;
      const bQuat = new THREE.Quaternion();
      bQuat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pDir.clone().normalize());
      bond.quaternion.copy(bQuat);
      peptideGroup.add(bond);
    }
  }
  scene.add(peptideGroup);

  const particlesGroup = new THREE.Group();
  const particleColors = [
    new THREE.Color("hsl(210, 60%, 55%)"),
    new THREE.Color("hsl(200, 50%, 45%)"),
    new THREE.Color("hsl(220, 40%, 60%)"),
  ];
  const particleSphereGeo = new THREE.SphereGeometry(1, 6, 6);
  for (let i = 0; i < 50; i++) {
    const pMat = new THREE.MeshStandardMaterial({
      color: particleColors[i % 3],
      emissive: particleColors[i % 3],
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.4 + Math.random() * 0.3,
    });
    const mesh = new THREE.Mesh(particleSphereGeo, pMat);
    const size = Math.random() * 0.07 + 0.02;
    mesh.scale.setScalar(size);
    mesh.position.set(
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 10 - 3
    );
    mesh.userData = {
      baseY: mesh.position.y,
      speed: Math.random() * 0.5 + 0.2,
      offset: Math.random() * Math.PI * 2,
      amplitude: Math.random() * 0.4 + 0.1,
    };
    particlesGroup.add(mesh);
  }
  scene.add(particlesGroup);

  return { scene, camera, renderer, dnaGroup, peptideGroup, particlesGroup };
}

export function MolecularScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported] = useState(() => isWebGLAvailable());

  useEffect(() => {
    if (!webglSupported) return;
    const container = containerRef.current;
    if (!container) return;

    let animationId = 0;
    let disposed = false;

    try {
      const { scene, camera, renderer, dnaGroup, peptideGroup, particlesGroup } = initScene(container);

      let elapsed = 0;
      let lastTime = performance.now();

      const animate = () => {
        if (disposed) return;
        animationId = requestAnimationFrame(animate);
        const now = performance.now();
        const delta = (now - lastTime) / 1000;
        lastTime = now;
        elapsed += delta;

        dnaGroup.rotation.y += 0.002;
        peptideGroup.rotation.y = Math.sin(elapsed * 0.3) * 0.15;
        peptideGroup.position.y = Math.sin(elapsed * 0.2) * 0.3;

        particlesGroup.children.forEach((child) => {
          const { baseY, speed, offset, amplitude } = child.userData;
          child.position.y = baseY + Math.sin(elapsed * speed + offset) * amplitude;
        });

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!container || disposed) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        disposed = true;
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationId);
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry?.dispose();
            const mat = object.material;
            if (Array.isArray(mat)) {
              mat.forEach((m) => m.dispose());
            } else if (mat) {
              mat.dispose();
            }
          }
        });
        renderer.dispose();
        renderer.forceContextLoss();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch {
      return;
    }
  }, [webglSupported]);

  if (!webglSupported) {
    return <CSSFallbackScene className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      data-testid="canvas-molecular-3d"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
