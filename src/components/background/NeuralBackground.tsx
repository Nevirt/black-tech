'use client';

import { useEffect, useRef } from 'react';

const NeuralBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        let particles: Particle[] = [];
        let animationFrameId: number;

        const options = {
            particleColor: "rgba(255, 255, 255, 0.4)",
            lineColor: "rgba(255, 255, 255, 0.1)",
            particleAmount: Math.floor((w * h) / 18000),
            defaultRadius: 1.2,
            variantRadius: 0.8,
            speed: 0.3,
            linkRadius: 130
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * options.speed;
                this.vy = (Math.random() - 0.5) * options.speed;
                this.size = options.defaultRadius + Math.random() * options.variantRadius;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = options.particleColor;
                ctx.fill();
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < options.particleAmount; i++) {
                particles.push(new Particle());
            }
        }

        function drawLines() {
            if (!ctx) return;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < options.linkRadius) {
                        const opacity = 1 - distance / options.linkRadius;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, w, h);

            drawLines();
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            options.particleAmount = Math.floor((w * h) / 18000);
            init();
        };

        window.addEventListener('resize', handleResize);
        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
            style={{ background: '#000000' }}
        />
    );
};

export default NeuralBackground;
