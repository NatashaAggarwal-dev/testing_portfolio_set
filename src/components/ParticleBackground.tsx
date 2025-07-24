import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      glow?: boolean; // Added glow property
    }> = [];

    // Create particles
    const themeColors = [
      'rgba(168, 85, 247, 0.7)', // purple-400
      'rgba(59, 130, 246, 0.7)', // blue-500
      'rgba(255, 255, 255, 0.7)', // white
      'rgba(40, 9, 89, 0.5)',     // deep purple
    ];
    // Main star particles
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: Math.random() * 0.9 + 0.3,
        color: themeColors[Math.floor(Math.random() * themeColors.length)],
      });
    }
    // Glowing purple particles (smaller, faster, more glow)
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.38, // faster
        vy: (Math.random() - 0.5) * 0.38, // faster
        size: Math.random() * 0.4 + 0.12, // very tiny
        color: 'rgba(168, 85, 247, 0.95)', // strong purple
        glow: true,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen for infinite field effect
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        if (particle.glow) {
          ctx.shadowColor = 'rgba(168, 85, 247, 1)';
          ctx.shadowBlur = 16;
        } else {
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 6;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-50"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleBackground;