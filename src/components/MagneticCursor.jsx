import { useEffect, useRef } from 'react';

/**
 * MagneticCursor — fully ref-based, zero React state updates on mouse move.
 * Position is applied directly via style mutation inside a rAF loop,
 * avoiding per-frame React re-renders entirely.
 */
export default function MagneticCursor() {
  const cursorRef = useRef(null);
  // Raw target position (updated by event listener, never triggers render)
  const targetRef = useRef({ x: -200, y: -200 });
  // Smoothed position (lerped in the rAF loop)
  const currentRef = useRef({ x: -200, y: -200 });
  const hoveredRef = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const LERP = 0.18; // smoothing factor (0 = no movement, 1 = instant)

    const onMouseMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const onMouseOver = (e) => {
      const isInteractive =
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('.magnetic-target');
      hoveredRef.current = !!isInteractive;
    };

    const loop = () => {
      const tx = targetRef.current.x;
      const ty = targetRef.current.y;
      const cx = currentRef.current.x + (tx - currentRef.current.x) * LERP;
      const cy = currentRef.current.y + (ty - currentRef.current.y) * LERP;
      currentRef.current.x = cx;
      currentRef.current.y = cy;

      const hovered = hoveredRef.current;
      const size = hovered ? 64 : 24;
      const offset = size / 2;

      el.style.transform = `translate3d(${cx - offset}px, ${cy - offset}px, 0)`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;

      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] will-change-transform"
      style={{
        width: 24,
        height: 24,
        backgroundColor: 'rgba(255,255,255,1)',
        mixBlendMode: 'exclusion',
        transform: 'translate3d(-200px,-200px,0)',
        transition: 'width 0.15s ease, height 0.15s ease',
      }}
    />
  );
}
