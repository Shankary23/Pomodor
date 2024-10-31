import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  const particleCount = 100; 
  const colors = ['#ff5733', '#33c1ff', '#f4d03f', '#2ecc71'];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 2 - 1, 
        speedY: Math.random() * 2 - 1, 
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x + particle.radius > canvas.width || particle.x - particle.radius < 0) {
          particle.speedX *= -1;
        }
        if (particle.y + particle.radius > canvas.height || particle.y - particle.radius < 0) {
          particle.speedY *= -1;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      particles.current = [];
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }} />;
};

export default ParticleBackground;
