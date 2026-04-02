"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSoundEngine } from "./SoundProvider";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  isLogo: boolean;
  size: number;
  delay: number;
}

export default function PixelHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animationDoneRef = useRef(false);
  const showLogoRef = useRef(false);
  const logoDataRef = useRef<{ col: number; row: number }[]>([]);
  const [animationDone, setAnimationDone] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const { playSE } = useSoundEngine();
  const playSERef = useRef(playSE);
  playSERef.current = playSE;

  // Extract pixel positions from the actual logo image
  const extractLogoPixels = useCallback((): Promise<{ col: number; row: number; gridCols: number; gridRows: number }[]> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const offscreen = document.createElement("canvas");
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        offscreen.width = w;
        offscreen.height = h;
        const octx = offscreen.getContext("2d");
        if (!octx) { resolve([]); return; }

        octx.drawImage(img, 0, 0);
        const imageData = octx.getImageData(0, 0, w, h);
        const data = imageData.data;

        // Sample the image into a grid
        const gridCols = 20;
        const gridRows = Math.round((h / w) * gridCols);
        const cellW = w / gridCols;
        const cellH = h / gridRows;
        const pixels: { col: number; row: number; gridCols: number; gridRows: number }[] = [];

        for (let row = 0; row < gridRows; row++) {
          for (let col = 0; col < gridCols; col++) {
            // Sample center of each cell
            const sx = Math.floor(col * cellW + cellW / 2);
            const sy = Math.floor(row * cellH + cellH / 2);
            const idx = (sy * w + sx) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];
            // Black pixel threshold
            if (r < 128 && g < 128 && b < 128 && a > 128) {
              pixels.push({ col, row, gridCols, gridRows });
            }
          }
        }
        resolve(pixels);
      };
      img.onerror = () => resolve([]);
      img.src = "/logo.jpg";
    });
  }, []);

  const initParticles = useCallback(
    (width: number, height: number, logoPixels: { col: number; row: number; gridCols: number; gridRows: number }[]) => {
      const particles: Particle[] = [];
      const isMobile = width < 768;

      if (logoPixels.length === 0) return;

      const gridCols = logoPixels[0].gridCols;
      const gridRows = logoPixels[0].gridRows;
      const pixelSize = isMobile
        ? Math.floor(Math.min(width * 0.7 / gridCols, height * 0.45 / gridRows))
        : Math.floor(Math.min(width * 0.4 / gridCols, height * 0.5 / gridRows));
      const gridWidth = gridCols * pixelSize;
      const gridHeight = gridRows * pixelSize;
      const offsetX = (width - gridWidth) / 2;
      const offsetY = (height - gridHeight) / 2 - height * 0.1;

      // Logo particles from actual image data
      for (const pixel of logoPixels) {
        const targetX = offsetX + pixel.col * pixelSize;
        const targetY = offsetY + pixel.row * pixelSize;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          targetX,
          targetY,
          originX: targetX,
          originY: targetY,
          vx: 0,
          vy: 0,
          isLogo: true,
          size: pixelSize - 1,
          delay: Math.random() * 0.5,
        });
      }

      // Store logo display position for the real image overlay
      if (logoRef.current) {
        logoRef.current.style.left = `${offsetX}px`;
        logoRef.current.style.top = `${offsetY}px`;
        logoRef.current.style.width = `${gridWidth}px`;
        logoRef.current.style.height = `${gridHeight}px`;
      }

      // Extra floating particles
      const extraCount = isMobile ? 20 : 60;
      for (let i = 0; i < extraCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = isMobile
          ? Math.random() * 5 + 2
          : Math.random() * 8 + 3;
        particles.push({
          x, y,
          targetX: x, targetY: y,
          originX: x, originY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          isLogo: false,
          size,
          delay: 0,
        });
      }

      particlesRef.current = particles;
    },
    []
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    if (mql.matches) {
      setAnimationDone(true);
      setShowLogo(true);
    }
  }, []);

  // Load logo pixels on mount
  useEffect(() => {
    extractLogoPixels().then((pixels) => {
      if (pixels.length > 0) {
        logoDataRef.current = pixels;
        setLogoLoaded(true);
      }
    });
  }, [extractLogoPixels]);

  useEffect(() => {
    if (prefersReducedMotion || !logoLoaded) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let startTime = performance.now();

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      animationDoneRef.current = false;
      showLogoRef.current = false;
      setAnimationDone(false);
      setShowLogo(false);
      initParticles(width, height, logoDataRef.current as never);
      startTime = performance.now();
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse/touch handlers
    const handlePointer = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0]?.clientX ?? -9999 : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY ?? -9999 : e.clientY;
      mouseRef.current = { x: clientX - rect.left, y: clientY - rect.top };
    };
    const handlePointerLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handlePointer);
    canvas.addEventListener("touchmove", handlePointer as EventListener);
    canvas.addEventListener("touchstart", handlePointer as EventListener);
    canvas.addEventListener("mouseleave", handlePointerLeave);
    canvas.addEventListener("touchend", handlePointerLeave);

    const assemblyDuration = 2000;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / assemblyDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const interactionRadius = width < 768 ? 60 : 100;

      for (const p of particlesRef.current) {
        if (p.isLogo) {
          const particleProgress = Math.max(
            0,
            Math.min(1, (eased - p.delay) / (1 - p.delay))
          );
          let drawX = p.x + (p.targetX - p.x) * particleProgress;
          let drawY = p.y + (p.targetY - p.y) * particleProgress;

          if (progress >= 1) {
            const dx = drawX + p.size / 2 - mouse.x;
            const dy = drawY + p.size / 2 - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < interactionRadius && dist > 0) {
              const force = ((interactionRadius - dist) / interactionRadius) * 8;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
            p.vx += (p.originX - (p.targetX + p.vx)) * 0.1;
            p.vy += (p.originY - (p.targetY + p.vy)) * 0.1;
            p.vx *= 0.85;
            p.vy *= 0.85;
            p.targetX = p.originX + p.vx;
            p.targetY = p.originY + p.vy;
            drawX = p.targetX;
            drawY = p.targetY;
          }

          // Fade out logo particles after showing real logo
          if (showLogoRef.current) {
            // Don't render pixel particles - real logo is showing
          } else {
            ctx.fillStyle = "#000000";
            ctx.fillRect(drawX, drawY, p.size, p.size);
          }
        } else {
          // Floating particles
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -p.size) p.x = width;
          if (p.x > width + p.size) p.x = -p.size;
          if (p.y < -p.size) p.y = height;
          if (p.y > height + p.size) p.y = -p.size;

          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < interactionRadius && dist > 0) {
            const force = ((interactionRadius - dist) / interactionRadius) * 2;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }

          const alpha = 0.08 + Math.sin(elapsed * 0.001 + p.delay * 10) * 0.04;
          ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      }

      if (progress >= 1 && !animationDoneRef.current) {
        animationDoneRef.current = true;
        setAnimationDone(true);
        playSERef.current("1up");
        // Show real logo after a brief moment
        setTimeout(() => {
          showLogoRef.current = true;
          setShowLogo(true);
        }, 800);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handlePointer);
      canvas.removeEventListener("touchmove", handlePointer as EventListener);
      canvas.removeEventListener("touchstart", handlePointer as EventListener);
      canvas.removeEventListener("mouseleave", handlePointerLeave);
      canvas.removeEventListener("touchend", handlePointerLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, initParticles, logoLoaded]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {prefersReducedMotion ? (
        <div className="flex flex-col items-center gap-6">
          <img
            src="/logo.jpg"
            alt="養老昆虫クラブ ロゴ"
            className="w-48 md:w-64"
          />
          <h1 className="text-2xl md:text-4xl font-bold tracking-[0.2em]">
            養老昆虫クラブ
          </h1>
          <p className="text-sm text-gray-500">
            養老孟司先生の周りにいる虫好きたちの集まりです
          </p>
        </div>
      ) : (
        <>
          <canvas ref={canvasRef} className="absolute inset-0" />

          {/* Real logo image - fades in after animation */}
          <div
            ref={logoRef}
            className={`absolute z-10 transition-opacity duration-1000 ${
              showLogo ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src="/logo.jpg"
              alt="養老昆虫クラブ ロゴ"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title text */}
          <div
            className={`absolute z-20 text-center pointer-events-none transition-opacity duration-1000 left-0 right-0 ${
              animationDone ? "opacity-100" : "opacity-0"
            }`}
            style={{ bottom: "15%" }}
          >
            <h1 className="text-2xl md:text-4xl font-bold tracking-[0.2em] text-black">
              養老昆虫クラブ
            </h1>
            <p className="mt-3 text-xs md:text-sm text-gray-500 tracking-wider">
              養老孟司先生の周りにいる虫好きたちの集まりです
            </p>
          </div>
        </>
      )}

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-1000 ${
          animationDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <a href="#about" className="block animate-bounce" onClick={() => playSE("select")}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#999"
            strokeWidth="2"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </a>
      </div>
    </section>
  );
}
