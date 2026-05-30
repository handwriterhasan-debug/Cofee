/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

export default function CheckoutConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || canvas.offsetWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || canvas.offsetWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Premium Color Palette matching the Veloura Café aesthetic
    const COLORS = [
      '#C67B3D', // Warm Gold / Caramel
      '#6B3E26', // Fresh Coffee Bean Brown
      '#E7C9B2', // Warm Almond Cream
      '#F7F3EE', // Fresh Milk Froth
      '#FFFDF9', // Velvet Base Ivory
      '#D9B9A0', // Butter Toasted Pecan
    ];

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
      type: 'circle' | 'bean' | 'sparkle' | 'ring';
    }

    const particles: Particle[] = [];
    const maxParticles = 90;

    // Initialize particles starting above the view
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * -height - 20, // Distributed along height above screen
        size: Math.random() * 5 + 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 + 1.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        opacity: Math.random() * 0.7 + 0.3,
        type: ['circle', 'bean', 'sparkle', 'ring'][Math.floor(Math.random() * 4)] as any,
      });
    }

    const drawParticle = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.2;

      if (p.type === 'sparkle') {
        // Draw 4-pointed golden star sparkle
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(0, -p.size);
          ctx.lineTo(p.size * 0.3, -p.size * 0.3);
          ctx.rotate(Math.PI / 2);
        }
        ctx.closePath();
        ctx.fill();
      } else if (p.type === 'bean') {
        // Draw miniature organic coffee bean
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.4, p.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Characteristic crease down the bean center
        ctx.beginPath();
        ctx.strokeStyle = '#2B1B16';
        ctx.globalAlpha = p.opacity * 0.35;
        ctx.lineWidth = p.size * 0.18;
        ctx.moveTo(-p.size * 1.1, 0);
        ctx.quadraticCurveTo(0, p.size * 0.15, p.size * 1.1, 0);
        ctx.stroke();
      } else if (p.type === 'ring') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Rectangular paper leaflet
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      }

      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        // Subtle swaying effect based on sine wave
        p.speedX += Math.sin(p.y / 40) * 0.02;

        // Reset elements back up if they drift off bottom
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
          p.speedY = Math.random() * 2 + 1.8;
          p.speedX = Math.random() * 2 - 1;
          p.opacity = Math.random() * 0.7 + 0.3;
        }

        drawParticle(p);
      }

      animationId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}
