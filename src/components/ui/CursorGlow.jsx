import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CursorGlow — a subtle ambient glow that follows the mouse cursor.
 * Hidden on touch / mobile devices via CSS media query.
 */
export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on devices that support hover (non-touch)
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;

    setVisible(true);

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] w-[280px] h-[280px] rounded-full"
      animate={{ x: pos.x - 140, y: pos.y - 140 }}
      transition={{ type: 'spring', stiffness: 100, damping: 25, mass: 0.4 }}
      style={{
        background:
          'radial-gradient(circle, rgba(34,211,238,0.07) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)',
      }}
      aria-hidden="true"
    />
  );
}
