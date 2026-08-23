import React, { useEffect, useRef } from 'react';

export const CyanStarlightEffect: React.FC = () => {
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

    interface CyanStar {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      twinkle: number;
      twinkleSpeed: number;
      color: string;
      isEightPoint: boolean;
    }

    const turquoisePalette = [
      'rgba(34, 211, 238, ',  // cyan-400
      'rgba(6, 182, 212, ',   // cyan-500
      'rgba(56, 189, 248, ',  // sky-400
      'rgba(147, 197, 253, ', // blue-300
      'rgba(255, 255, 255, ', // pure starlight
    ];

    const count = Math.min(48, Math.floor(width / 26));
    const stars: CyanStar[] = [];

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1 + Math.random() * 2.2,
        speedY: -0.2 - Math.random() * 0.4,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: 0.3 + Math.random() * 0.6,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        color: turquoisePalette[Math.floor(Math.random() * turquoisePalette.length)],
        isEightPoint: Math.random() > 0.7,
      });
    }

    const drawIslamicStar = (cx: number, cy: number, radius: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = `${color}${alpha})`;
      ctx.lineWidth = 1;
      ctx.shadowColor = 'rgba(34, 211, 238, 0.9)';
      ctx.shadowBlur = 8;

      // Draw two overlapping squares rotated 45 deg (8-point Islamic star)
      const s = radius * 1.5;
      ctx.strokeRect(-s / 2, -s / 2, s, s);
      ctx.rotate(Math.PI / 4);
      ctx.strokeRect(-s / 2, -s / 2, s, s);

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.twinkle += s.twinkleSpeed;
        const currentAlpha = s.opacity * (0.5 + Math.sin(s.twinkle) * 0.5);

        if (s.isEightPoint) {
          drawIslamicStar(s.x, s.y, s.radius * 2, s.color, currentAlpha);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${s.color}${currentAlpha})`;
          ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
          ctx.shadowBlur = 6;
          ctx.fill();
        }

        s.y += s.speedY;
        s.x += s.speedX;

        if (s.y < -20) {
          s.y = height + 15;
          s.x = Math.random() * width;
        }
        if (s.x < -20) s.x = width + 10;
        if (s.x > width + 20) s.x = -10;
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
