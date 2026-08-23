import React, { useEffect, useRef } from 'react';

export const BloodRainEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Drops array
    interface BloodDrop {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      width: number;
      trail: number;
    }

    const dropCount = Math.min(65, Math.floor(width / 22));
    const drops: BloodDrop[] = [];

    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 12 + Math.random() * 22,
        speed: 3.5 + Math.random() * 5.5,
        opacity: 0.35 + Math.random() * 0.55,
        width: 1.2 + Math.random() * 1.8,
        trail: 0.8 + Math.random() * 0.4,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];

        // Draw blood droplet with gradient (darker red top, vivid crimson bottom)
        const gradient = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.length);
        gradient.addColorStop(0, `rgba(139, 0, 0, ${d.opacity * 0.2})`);
        gradient.addColorStop(0.7, `rgba(200, 16, 46, ${d.opacity * 0.85})`);
        gradient.addColorStop(1, `rgba(255, 30, 60, ${d.opacity})`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = d.width;
        ctx.lineCap = 'round';
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 0.5, d.y + d.length);
        ctx.stroke();

        // Teardrop bead at the tip
        ctx.beginPath();
        ctx.fillStyle = `rgba(220, 20, 50, ${d.opacity})`;
        ctx.arc(d.x - 0.5, d.y + d.length, d.width * 1.1, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        d.y += d.speed;
        d.x -= 0.3; // subtle leftward wind drift

        if (d.y > height + 30) {
          d.y = -30;
          d.x = Math.random() * (width + 50);
        }
        if (d.x < -30) {
          d.x = width + 20;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
