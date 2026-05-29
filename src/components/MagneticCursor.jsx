import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if hovering over interactive elements
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.magnetic-target')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      width: 24,
      height: 24,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      mixBlendMode: 'exclusion'
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      width: 64,
      height: 64,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      mixBlendMode: 'exclusion',
      scale: 1.1
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      variants={variants}
      animate={isHovered ? "hover" : "default"}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 28, 
        mass: 0.5 
      }}
      style={{
        transform: "translate3d(0,0,0)",
      }}
    />
  );
}
