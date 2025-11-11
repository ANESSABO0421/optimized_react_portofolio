import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const mouseX = clientX;
      const mouseY = clientY;

      positionRef.current.mouseX = mouseX - cursorRef.current.clientWidth / 2;
      positionRef.current.mouseY = mouseY - cursorRef.current.clientHeight / 2;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse);
      
      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current;
      
      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = mouseX;
        positionRef.current.destinationY = mouseY;
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
        positionRef.current.distanceY = (mouseY - destinationY) * 0.1;
        
        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX += distanceX;
          positionRef.current.destinationY += distanceY;
        }
      }
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
      }
    };

    followMouse();

    return () => {
      cancelAnimationFrame(positionRef.current.key);
    };
  }, []);

  // Add hover effects
  useEffect(() => {
    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '50px';
        cursorRef.current.style.height = '50px';
        cursorRef.current.style.opacity = '0.5';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '30px';
        cursorRef.current.style.height = '30px';
        cursorRef.current.style.opacity = '1';
      }
    };

    const clickableElements = document.querySelectorAll('a, button, [role="button"], [data-cursor="pointer"]');
    
    clickableElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      clickableElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-8 h-8 rounded-full bg-white/80 pointer-events-none z-50 mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
      ref={cursorRef}
      style={{
        transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
      }}
    />
  );
};

export default CustomCursor;
