"use client";

import React, { useEffect, useRef } from "react";

interface ConfettiCanvasProps {
  active: boolean;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const OCEAN_COLORS = [
  "#14B8A6", // teal
  "#06B6D4", // cyan
  "#38BDF8", // light blue
  "#FF6B6B", // coral accent
  "#F59E0B", // sea gold
  "#A7F3D0", // mint
];

export default function ConfettiCanvas({ active, onComplete }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      particles.current = [];
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles: erupting from the center bottom
    particles.current = Array.from({ length: 140 }, () => {
      const angle = Math.random() * Math.PI * 0.4 + Math.PI * 1.3; // shoot upwards
      const speed = Math.random() * 12 + 8;
      return {
        x: canvas.width / 2 + (Math.random() - 0.5) * 50,
        y: canvas.height - 20,
        size: Math.random() * 8 + 6,
        color: OCEAN_COLORS[Math.floor(Math.random() * OCEAN_COLORS.length)],
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
      };
    });

    const gravity = 0.25;
    const wind = 0.05;
    let startTime = Date.now();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      const elapsed = Date.now() - startTime;

      particles.current.forEach((p) => {
        // Update physics
        p.x += p.speedX + (Math.random() - 0.5) * wind * 10;
        p.y += p.speedY + gravity;
        p.speedY += gravity * 0.1; // accelerate downwards slowly
        p.rotation += p.rotationSpeed;
        
        // Fade out after 2 seconds
        if (elapsed > 2000) {
          p.opacity -= 0.02;
        }

        // Draw particle
        if (p.opacity > 0 && p.y < canvas.height + 20 && p.x > -20 && p.x < canvas.width + 20) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;

          // Alternate drawing rectangles and circles
          if (p.size % 2 === 0) {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      });

      if (alive && elapsed < 4000) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (onComplete) onComplete();
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [active, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}
