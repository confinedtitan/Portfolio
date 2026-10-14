import { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';
import MagneticCursor from './components/MagneticCursor';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiquidEther from './components/LiquidEther';

const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Leadership = lazy(() => import('./components/Leadership'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// ─── Preload critical lazy chunks in background as soon as JS loads ──────────
const preloadModules = () => {
  import('./components/About');
  import('./components/Experience');
  import('./components/Projects');
  import('./components/Skills');
  import('./components/Leadership');
  import('./components/Education');
  import('./components/Contact');
  import('./components/Footer');
};

// ─── SplashScreen ────────────────────────────────────────────────────────────
/**
 * Props:
 *  progress  – number 0–100 (the real loading progress driven by App)
 *  onDone    – called once progress reaches 100 and the exit transition ends
 */
function SplashScreen({ progress, onDone }) {
  const digitRef = useRef(null);
  // Drive the displayed number directly via DOM mutation (no re-renders per tick)
  const displayedRef = useRef(0);
  const rafRef = useRef(null);
  const doneFiredRef = useRef(false);

  // Animate the digit counter toward `progress` using RAF + lerp
  useEffect(() => {
    const animate = () => {
      const current = displayedRef.current;
      const diff = progress - current;
      const step = Math.max(0.4, Math.abs(diff) * 0.12);
      const next = diff > 0
        ? Math.min(progress, current + step)
        : Math.max(progress, current - step);

      displayedRef.current = next;
      if (digitRef.current) {
        digitRef.current.textContent = Math.floor(next);
      }

      if (Math.abs(progress - next) > 0.5) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        displayedRef.current = progress;
        if (digitRef.current) digitRef.current.textContent = Math.floor(progress);
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [progress]);

  // Primary path: framer-motion exit animation completes → call onDone
  const handleExitComplete = useCallback(() => {
    if (doneFiredRef.current) return;
    doneFiredRef.current = true;
    onDone();
  }, [onDone]);

  // Fallback: if onExitComplete never fires (e.g. reduced-motion, FM quirk),
  // reveal the site after the exit animation duration + a small buffer.
  useEffect(() => {
    if (progress < 100) return;
    const timer = setTimeout(() => {
      if (!doneFiredRef.current) {
        doneFiredRef.current = true;
        onDone();
      }
    }, 700); // 550ms exit + 150ms buffer
    return () => clearTimeout(timer);
  }, [progress, onDone]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {progress < 100 && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0F]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center select-none"
          >
            <h1 className="font-heading text-8xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4 tracking-tighter tabular-nums">
              <span ref={digitRef}>0</span>%
            </h1>

            {/* Progress bar */}
            <div className="w-48 h-[2px] mx-auto bg-white/10 rounded-full overflow-hidden mt-6">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-6 opacity-50">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── BackToTop ───────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setVisible(window.scrollY > 400);
        rafId = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-cyan-500 text-[#0A0A0F] flex items-center justify-center hover:bg-cyan-400 transition-colors duration-200 shadow-lg"
          style={{ boxShadow: '0 0 20px rgba(6,182,212,0.5)' }}
          aria-label="Back to top"
        >
          <HiArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── useLoadingProgress ───────────────────────────────────────────────────────
/**
 * Tracks real loading milestones and returns a 0–100 progress value.
 *
 * Milestones (weights add up to 100):
 *  10 – document.readyState "interactive"  (DOM parsed)
 *  20 – Google Fonts loaded (FontFaceSet.ready)
 *  30 – profile image decoded
 *  20 – LiquidEther WebGL ready (signalled via callback)
 *  20 – window "load" event (all remaining network resources)
 *
 * A 12-second hard-cap ensures the user is never stuck on the splash screen.
 */
function useLoadingProgress() {
  const [progress, setProgress] = useState(0);
  const achievedRef = useRef(0);
  const doneRef = useRef(false);

  const advance = useCallback((amount) => {
    if (doneRef.current) return;
    achievedRef.current = Math.min(100, achievedRef.current + amount);
    setProgress(Math.floor(achievedRef.current));
    if (achievedRef.current >= 100) doneRef.current = true;
  }, []);

  // Hard cap: reach 100 after 12 s no matter what
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!doneRef.current) {
        achievedRef.current = 100;
        setProgress(100);
        doneRef.current = true;
      }
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  // Milestone 1 — DOM interactive (10 pts)
  useEffect(() => {
    if (
      document.readyState === 'interactive' ||
      document.readyState === 'complete'
    ) {
      advance(10);
    } else {
      const handler = () => {
        if (
          document.readyState === 'interactive' ||
          document.readyState === 'complete'
        ) {
          advance(10);
          document.removeEventListener('readystatechange', handler);
        }
      };
      document.addEventListener('readystatechange', handler);
      return () => document.removeEventListener('readystatechange', handler);
    }
  }, [advance]);

  // Milestone 2 — Google Fonts ready (20 pts)
  useEffect(() => {
    document.fonts.ready.then(() => advance(20)).catch(() => advance(20));
  }, [advance]);

  // Milestone 3 — Profile image decoded (30 pts)
  useEffect(() => {
    const img = new Image();
    img.src = new URL('./assets/profile.jpg', import.meta.url).href;
    img.decode()
      .then(() => advance(30))
      .catch(() => advance(30)); // still advance on error
  }, [advance]);

  // Milestone 4 — WebGL animation ready (20 pts)
  // Exposed as a callback so LiquidEther can signal readiness
  const signalWebGLReady = useCallback(() => advance(20), [advance]);

  // Milestone 5 — window "load" (all network resources) (20 pts)
  useEffect(() => {
    if (document.readyState === 'complete') {
      advance(20);
    } else {
      const handler = () => advance(20);
      window.addEventListener('load', handler, { once: true });
      return () => window.removeEventListener('load', handler);
    }
  }, [advance]);

  return { progress, signalWebGLReady };
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  // Kick off lazy module pre-loading immediately
  useEffect(() => { preloadModules(); }, []);

  const { progress, signalWebGLReady } = useLoadingProgress();

  return (
    <div className="bg-[#0A0A0F] min-h-screen relative z-0">
      <MagneticCursor />

      {/* Background animation — always mounted so it loads during splash */}
      <div className="fixed inset-0 z-[-1]">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B497CF']}
          mouseForce={15}
          cursorSize={80}
          isViscous={false}
          viscous={30}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.25}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          onReady={signalWebGLReady}
        />
      </div>

      {/* Splash screen driven by real loading progress */}
      <SplashScreen progress={progress} onDone={() => setSplashDone(true)} />

      {/* Main content — rendered immediately but invisible until splashDone */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        aria-hidden={!splashDone}
      >
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<div className="h-32 flex items-center justify-center text-cyan-500/50">Loading...</div>}>
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Leadership />
            <Education />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <BackToTop />
      </motion.div>
    </div>
  );
}
