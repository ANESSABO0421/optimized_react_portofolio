import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const SmoothScroll = ({ children }) => {
  const location = useLocation();
  const scrollContainer = useRef();

  // Smooth scroll to top on route change
  useEffect(() => {
    const scrollToTop = () => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };

    scrollToTop();
  }, [location.pathname]);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href === '#' || href === '#!') return;

      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without adding to history
        window.history.pushState(null, '', `#${targetId}`);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div 
      ref={scrollContainer}
      className="smooth-scroll-container h-screen overflow-y-auto overflow-x-hidden"
    >
      {children}
    </div>
  );
};

export default SmoothScroll;
