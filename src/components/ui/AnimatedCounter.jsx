import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * AnimatedCounter — counts up from 0 to `end` when scrolled into view.
 * Handles numeric strings like '4+', '3+', and plain text like '1st'.
 */
export default function AnimatedCounter({ value, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Parse the numeric portion and suffix
  const match = String(value).match(/^(\d+)(.*)/);
  const numericEnd = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;
  const isNumeric = match !== null;

  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView || !isNumeric || done) return;

    let start = 0;
    const duration = 1200; // ms
    const stepTime = Math.max(Math.floor(duration / numericEnd), 30);

    const timer = setInterval(() => {
      start += 1;
      if (start >= numericEnd) {
        setCount(numericEnd);
        setDone(true);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, numericEnd, isNumeric, done]);

  return (
    <span ref={ref} className={className}>
      {isNumeric ? `${isInView ? count : 0}${suffix}` : value}
    </span>
  );
}
