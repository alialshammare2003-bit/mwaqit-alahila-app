import React, { useEffect, useRef } from 'react';

export const FlowerPetalsEffect: React.FC = () => {
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

    // Petal structure
    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      swayOffset: number;
      swaySpeed: number;
      color: string;
      petalType: 'rose_petal' | 'flower';
      opacity: number;
    }

    const petalColors = [
      'rgba(244, 114, 182, ', // pink-400
      'rgba(251, 113, 133, ', // rose-400
      'rgba(236, 72, 153, ',  // pink-500
      'rgba(253, 164, 175, ', // rose-300
      'rgba(255, 182, 193, ', // light pink
      'rgba(252, 211, 77, ',  // soft gold center flower
    ];

    const count = Math.min(45, Math.floor(width / 28));
    const petals: Petal[] = [];

    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 8 + Math.random() * 14,
        speedY: 0.8 + Math.random() * 1.6,
        speedX: -0.5 + Math.random() * 1.0,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: 0.015 + Math.random() * 0.02,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        petalType: Math.random() > 0.3 ? 'rose_petal' : 'flower',
        opacity: 0.55 + Math.random() * 0.4,
      });
    }

    const drawRosePetal = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = `${color}${opacity})`;

      ctx.beginPath();
      // Draw organic petal curve
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(size / 2, -size / 2, size, size / 3, 0, size);
      ctx.bezierCurveTo(-size, size / 3, -size / 2, -size / 2, 0, 0);
      ctx.fill();

      // Subtle inner petal vein
      ctx.strokeStyle = `${color}${opacity * 0.4})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(0, size * 0.5, 0, size * 0.85);
      ctx.stroke();

      ctx.restore();
    };

    const drawMiniFlower = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      const petalNum = 5;
      for (let p = 0; p < petalNum; p++) {
        const angle = (p * Math.PI * 2) / petalNum;
        ctx.save();
        ctx.rotate(angle);
        ctx.fillStyle = `${color}${opacity * 0.9})`;
        ctx.beginPath();
        ctx.ellipse(0, size * 0.45, size * 0.3, size * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Golden center
      ctx.fillStyle = `rgba(251, 191, 36, ${opacity})`;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.22, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        p.swayOffset += p.swaySpeed;
        const currentX = p.x + Math.sin(p.swayOffset) * 20;

        if (p.petalType === 'rose_petal') {
          drawRosePetal(currentX, p.y, p.size, p.rotation, p.color, p.opacity);
        } else {
          drawMiniFlower(currentX, p.y, p.size * 0.75, p.rotation, p.color, p.opacity);
        }

        // Update movement
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;
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
    />
  );
};
