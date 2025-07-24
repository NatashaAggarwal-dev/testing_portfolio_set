import React, { useRef, useEffect } from 'react';

const LINES = 14; // number of mesh lines
const WAVE_POINTS = 120;

const DnaWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId: number;
    let phase = 0;

    function resize() {
      canvas.width = window.innerWidth / 2;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function animate(ts: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      phase += 0.04;
      // Draw mesh wave (horizontal lines, wavy vertically)
      for (let l = 0; l < LINES; l++) {
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i <= WAVE_POINTS; i++) {
          const t = i / WAVE_POINTS;
          const x = t * canvas.width;
          // Mesh wave formula: offset phase for each line, fixed amplitude
          const baseY = (canvas.height / (LINES + 1)) * (l + 1);
          const amp = 38 + 22 * Math.sin(phase + l * 0.18);
          const y =
            baseY +
            Math.sin(phase + t * 3 * Math.PI + l * 0.18) * (amp);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255,255,255,${0.13 + 0.08 * (l / LINES)})`;
        ctx.lineWidth = 1.1;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255,255,255,0.18)';
        ctx.globalAlpha = 0.95;
        ctx.stroke();
        ctx.restore();
      }
      animationId = requestAnimationFrame(animate);
    }
    animate(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed right-0 top-0 z-10 pointer-events-none select-none"
      style={{ width: '50vw', height: '100vh', maxWidth: '50vw', maxHeight: '100vh', opacity: 0.97 }}
    />
  );
};

export default DnaWave; 