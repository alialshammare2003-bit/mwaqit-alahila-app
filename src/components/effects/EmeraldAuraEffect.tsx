import React, { useEffect, useRef } from 'react';

export const EmeraldAuraEffect: React.FC = () => {
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

    interface EmeraldMote {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
      color: string;
    }

    const emeraldPalette = [
      'rgba(52, 211, 153, ', // emerald-400
      'rgba(16, 185, 129, ', // emerald-500
      'rgba(110, 231, 183, ', // emerald-300
      'rgba(251, 191, 36, ',  // golden spark
      'rgba(45, 212, 191, ',  // teal-400
    ];

    const count = Math.min(45, Math.floor(width / 28));
    const motes: EmeraldMote[] = [];

    for (let i = 0; i < count; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.2 + Math.random() * 2.4,
        speedY: -0.3 - Math.random() * 0.6,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: 0.25 + Math.random() * 0.6,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.03,
        color: emeraldPalette[Math.floor(Math.random() * emeraldPalette.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.pulse += m.pulseSpeed;
        const currentAlpha = m.opacity * (0.5 + Math.sin(m.pulse) * 0.5);

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${m.color}${currentAlpha})`;
        ctx.shadowColor = 'rgba(16, 185, 129, 0.7)';
        ctx.shadowBlur = 8;
        ctx.fill();

        m.y += m.speedY;
        m.x += m.speedX;

        if (m.y < -20) {
          m.y = height + 15;
          m.x = Math.random() * width;
        }
        if (m.x < -20) m.x = width + 10;
        if (m.x > width + 20) m.x = -10;
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
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
