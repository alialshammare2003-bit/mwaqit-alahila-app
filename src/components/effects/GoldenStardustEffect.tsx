import React, { useEffect, useRef } from 'react';

export const GoldenStardustEffect: React.FC = () => {
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

    interface DustMote {
      x: number;
      y: number;
      radius: number;
      baseRadius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      pulseSpeed: number;
      angle: number;
      color: string;
      isStar: boolean;
    }

    const goldPalette = [
      'rgba(251, 191, 36, ',  // amber-400
      'rgba(245, 158, 11, ',  // amber-500
      'rgba(252, 211, 77, ',  // amber-300
      'rgba(234, 179, 8, ',   // yellow-500
      'rgba(254, 240, 138, ', // yellow-200
    ];

    const count = Math.min(50, Math.floor(width / 26));
    const motes: DustMote[] = [];

    for (let i = 0; i < count; i++) {
      const baseR = 1 + Math.random() * 2.2;
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: baseR,
        baseRadius: baseR,
        speedY: -0.2 - Math.random() * 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: 0.2 + Math.random() * 0.6,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        angle: Math.random() * Math.PI * 2,
        color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
        isStar: Math.random() > 0.65,
      });
    }

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: string, alpha: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = `${color}${alpha})`;
      ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.angle += m.pulseSpeed;
        const currentAlpha = m.opacity * (0.6 + Math.sin(m.angle) * 0.4);

        if (m.isStar) {
          drawStar(m.x, m.y, 4, m.baseRadius * 2.2, m.baseRadius * 0.8, m.color, currentAlpha);
        } else {
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.baseRadius, 0, Math.PI * 2);
          ctx.fillStyle = `${m.color}${currentAlpha})`;
          ctx.shadowColor = 'rgba(251, 191, 36, 0.6)';
          ctx.shadowBlur = 6;
          ctx.fill();
        }

        m.y += m.speedY;
        m.x += m.speedX;

        if (m.y < -20) {
          m.y = height + 10;
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
