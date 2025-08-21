'use client';

import { useEffect, useRef } from 'react';

interface ParticleOptions {
  particleColor: string;
  lineColor: string;
  particleAmount: number;
  defaultRadius: number;
  variantRadius: number;
  defaultSpeed: number;
  variantSpeed: number;
  linkRadius: number;
}

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w: number = canvas.width;
    let h: number = canvas.height;
    let particles: any[];
    let animationFrameId: number;

    const options: ParticleOptions = {
      particleColor: "rgba(255,255,255,0.7)",
      lineColor: "rgba(0,181,255,0.22)",
      particleAmount: window.innerWidth <= 768 ? 10 : 22,
      defaultRadius: 1.8,
      variantRadius: 1.5,
      defaultSpeed: 0.6,
      variantSpeed: 0.8,
      linkRadius: 160
    };

    const rgb = options.lineColor.match(/\d+/g);

    class Particle {
      x: number;
      y: number;
      color: string;
      radius: number;
      speed: number;
      directionAngle: number;
      vector: { x: number; y: number };

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.color = options.particleColor;
        this.radius = options.defaultRadius + Math.random() * options.variantRadius;
        this.speed = options.defaultSpeed + Math.random() * options.variantSpeed;
        this.directionAngle = Math.floor(Math.random() * 360);
        this.vector = {
          x: Math.cos(this.directionAngle) * this.speed,
          y: Math.sin(this.directionAngle) * this.speed
        };
      }

      update() {
        this.border();
        this.x += this.vector.x;
        this.y += this.vector.y;
      }

      border() {
        if (this.x >= w || this.x <= 0) {
          this.vector.x *= -1;
        }
        if (this.y >= h || this.y <= 0) {
          this.vector.y *= -1;
        }
        if (this.x > w) this.x = w;
        if (this.y > h) this.y = h;
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function resizeReset() {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function initialiseElements() {
      particles = [];
      for (var i = 0; i < options.particleAmount; i++) {
        particles.push(new Particle());
      }
    }

    function drawParticle() {
      for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
    }

    function drawLine() {
      for (var i = 0; i < particles.length; i++) {
        linkPoints(particles[i], particles);
      }
    }

    function linkPoints(point: Particle, hubs: Particle[]) {
      for (var i = 0; i < hubs.length; i++) {
        var distance = checkDistance(point.x, point.y, hubs[i].x, hubs[i].y);
        var opacity = 1 - distance / options.linkRadius;
        if (opacity > 0 && ctx) {
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = `rgba(${rgb?.[0] || 0},${rgb?.[1] || 181},${rgb?.[2] || 255},${opacity})`;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(hubs[i].x, hubs[i].y);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }

    function checkDistance(x1: number, y1: number, x2: number, y2: number) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    function drawScene() {
      drawLine();
      drawParticle();
    }

    function animationLoop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      drawScene();
      animationFrameId = requestAnimationFrame(animationLoop);
    }

    const handleResize = () => {
      options.particleAmount = window.innerWidth <= 768 ? 6 : 22;
      resizeReset();
      initialiseElements();
    };

    // Initialize
    resizeReset();
    initialiseElements();
    animationLoop();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticlesBackground; 