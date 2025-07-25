import React, { useRef, useEffect } from 'react';

const IMG_SRC = '/All_logo_and_pictures-main/cloud/IMG_3928.png'; // Portfolio image path
const PIECES = 60;
const DURATION = 2000; // 2 seconds for wind phase
const SIZE = 260; // Final image size

const PaperAssemble: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId: number;
    let startTime: number | null = null;
    let assembling = false;
    let pieces: any[] = [];
    let imgLoaded = false;

    // Load the image
    const img = new window.Image();
    img.src = IMG_SRC;
    img.onload = () => {
      imgLoaded = true;
      // Create pieces
      pieces = [];
      const grid = Math.ceil(Math.sqrt(PIECES));
      const pieceW = SIZE / grid;
      const pieceH = SIZE / grid;
      for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
          if (pieces.length >= PIECES) break;
          // Random start position (wind)
          const angle = Math.random() * 2 * Math.PI;
          const radius = 120 + Math.random() * 80;
          const startX = SIZE / 2 + Math.cos(angle) * radius;
          const startY = SIZE / 2 + Math.sin(angle) * radius;
          // Final position in grid
          const finalX = j * pieceW;
          const finalY = i * pieceH;
          pieces.push({
            startX, startY, finalX, finalY, x: startX, y: startY, i, j,
            windAngle: angle,
            windSpeed: 0.5 + Math.random() * 1.2,
            windPhase: Math.random() * Math.PI * 2,
          });
        }
      }
      animate(0);
    };
    imgRef.current = img;

    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      ctx.clearRect(0, 0, SIZE, SIZE);
      // Wind phase
      if (elapsed < DURATION) {
        for (const p of pieces) {
          // Windy float
          p.x = p.startX + Math.sin(ts * 0.002 + p.windPhase) * 10;
          p.y = p.startY + Math.cos(ts * 0.002 + p.windPhase) * 10;
        }
      } else {
        // Assemble phase
        assembling = true;
        for (const p of pieces) {
          // Lerp to final position
          p.x += (p.finalX - p.x) * 0.08;
          p.y += (p.finalY - p.y) * 0.08;
        }
      }
      // Draw pieces
      if (imgLoaded) {
        const grid = Math.ceil(Math.sqrt(PIECES));
        const pieceW = SIZE / grid;
        const pieceH = SIZE / grid;
        for (let idx = 0; idx < pieces.length; idx++) {
          const p = pieces[idx];
          ctx.save();
          ctx.globalAlpha = assembling ? 1 : 0.85;
          ctx.shadowColor = '#fff';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.rect(p.x, p.y, pieceW, pieceH);
          ctx.clip();
          ctx.drawImage(
            img,
            p.j * pieceW, p.i * pieceH, pieceW, pieceH,
            p.x, p.y, pieceW, pieceH
          );
          ctx.restore();
        }
      }
      animationId = requestAnimationFrame(animate);
    }
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none"
      style={{ maxHeight: 400, maxWidth: 320, opacity: 0.95 }}
    />
  );
};

export default PaperAssemble; 