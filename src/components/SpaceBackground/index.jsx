import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const SpaceBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const starsRef = useRef([]);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Star class
  class Star {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.reset();
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.z = Math.random() * this.canvas.width;
      this.pz = this.z;
      this.size = Math.random() * 1.5 + 0.5;
      this.speed = 0.1 + Math.random() * 0.1;
    }

    update() {
      this.pz = this.z;
      this.z -= this.speed * 5;

      if (this.z <= 0) {
        this.reset();
        this.z = this.canvas.width;
      }
    }

    draw() {
      const sx = (this.x - this.canvas.width / 2) * (this.canvas.width / this.z);
      const sy = (this.y - this.canvas.height / 2) * (this.canvas.width / this.z);
      const px = (this.x - this.canvas.width / 2) * (this.canvas.width / this.pz);
      const py = (this.y - this.canvas.height / 2) * (this.canvas.width / this.pz);

      const opacity = Math.min(1, 1 - this.z / this.canvas.width);
      const size = this.size * (1 - this.z / this.canvas.width) * 2;

      this.ctx.beginPath();
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      this.ctx.lineWidth = size;
      this.ctx.lineCap = 'round';
      this.ctx.moveTo(px + this.canvas.width / 2, py + this.canvas.height / 2);
      this.ctx.lineTo(sx + this.canvas.width / 2, sy + this.canvas.height / 2);
      this.ctx.stroke();
    }
  }

  // Handle mouse movement for parallax effect
  const handleMouseMove = useCallback((e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mousePosition.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  // Handle window resize
  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    
    // Set display size (css pixels)
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    // Set actual size in memory (scaled for retina displays)
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    
    // Scale the context to ensure correct drawing operations
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    // Adjust for the scale in the drawing operations
    ctx.scale(1/dpr, 1/dpr);
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with a slight fade for trail effect
    ctx.fillStyle = 'rgba(10, 10, 20, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw stars
    starsRef.current.forEach(star => {
      star.update();
      star.draw();
    });
    
    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Initialize component
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set up canvas
    handleResize();
    
    // Create stars
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 5000);
    starsRef.current = Array.from({ length: starCount }, () => new Star(canvas));
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animate, handleMouseMove, handleResize]);

  return (
    <motion.div 
      className="fixed inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/90 pointer-events-none" />
    </motion.div>
  );
};

export default SpaceBackground;
