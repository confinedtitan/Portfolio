import { forwardRef, useMemo, useRef, useEffect, useCallback } from 'react';
import './VariableProximity.css';

// rAF loop that only runs while the component is mounted
function useAnimationFrame(callback) {
  // Keep callback stable via ref so the loop doesn't restart on re-renders
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    let frameId;
    const loop = () => {
      callbackRef.current();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []); // ← empty deps: loop created once, callback updated via ref
}

// Tracks mouse position in a ref — no state, no re-renders
function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x, y) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = ev => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = ev => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

const VariableProximity = forwardRef((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef([]);
  // Cache letter bounding rects — recalculated only on resize, not per frame
  const letterRectsRef = useRef([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef({ x: null, y: null });

  const parsedSettings = useMemo(() => {
    const parseSettings = settingsStr =>
      new Map(
        settingsStr
          .split(',')
          .map(s => s.trim())
          .map(s => {
            const [name, value] = s.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  // Refresh cached letter rects on mount and on resize
  const refreshLetterRects = useCallback(() => {
    if (!containerRef?.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    letterRectsRef.current = letterRefs.current.map(el => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        cx: r.left + r.width / 2 - containerRect.left,
        cy: r.top + r.height / 2 - containerRect.top
      };
    });
  }, [containerRef]);

  useEffect(() => {
    // Initial cache population (after a short delay to let layout settle)
    const t = setTimeout(refreshLetterRects, 100);
    const ro = new ResizeObserver(refreshLetterRects);
    if (containerRef?.current) ro.observe(containerRef.current);
    window.addEventListener('resize', refreshLetterRects, { passive: true });
    // Scroll changes getBoundingClientRect values — refresh on scroll so
    // distance calculations stay accurate as the page is scrolled.
    window.addEventListener('scroll', refreshLetterRects, { passive: true });
    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener('resize', refreshLetterRects);
      window.removeEventListener('scroll', refreshLetterRects);
    };
  }, [containerRef, refreshLetterRects]);

  const calculateFalloff = useCallback(
    (distance) => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
      switch (falloff) {
        case 'exponential': return norm ** 2;
        case 'gaussian': return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
        case 'linear':
        default: return norm;
      }
    },
    [radius, falloff]
  );

  useAnimationFrame(() => {
    const { x, y } = mousePositionRef.current;
    // Skip if mouse hasn't moved
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) return;
    lastPositionRef.current = { x, y };

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return;
      const cached = letterRectsRef.current[index];
      if (!cached) return;

      const dx = x - cached.cx;
      const dy = y - cached.cy;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings;
        return;
      }

      const falloffValue = calculateFalloff(distance);
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolatedValue}`;
        })
        .join(', ');

      letterRef.style.fontVariationSettings = newSettings;
    });
  });

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      className={`${className} variable-proximity`}
      onClick={onClick}
      style={{ display: 'inline', ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map(letter => {
            const currentLetterIndex = letterIndex++;
            return (
              <span
                key={currentLetterIndex}
                ref={el => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings: fromFontVariationSettings
                }}
                aria-hidden="true"
              >
                {letter}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
