import { useRef } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn, scaleIn } from '../utils/motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profileImg from '../assets/profile.jpg';
import VariableProximity from './VariableProximity';
import Magnetic from './Magnetic';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Hero() {
  const containerRef = useRef(null);
  
  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-cyan-400/8 rounded-full blur-3xl animate-blob animation-delay-4000" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column */}
          <motion.div
            ref={containerRef}
            className="flex-1 text-center lg:text-left"
            variants={staggerContainer(0.15, 0.3)}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={fadeIn('up')}
              className="text-cyan-400 font-medium tracking-widest text-sm uppercase mb-4"
            >
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              variants={fadeIn('up')}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4"
              style={{ color: 'hsl(0, 0%, 28%)' }}
            >
              <VariableProximity
                label={"Hi, I'm Shamganesh"}
                className={'variable-proximity-demo'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff='linear'
              />
            </motion.h1>

            <motion.div variants={fadeIn('up')} className="text-2xl sm:text-3xl font-heading font-semibold mb-6 h-auto min-h-[4rem] sm:min-h-[3rem]">
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  'AI Builder',
                  2000,
                  'Hackathon Winner',
                  2000,
                  'SaaS Architect',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-cyan-400"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-[#94A3B8] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Third-year IT student at RMK Engineering College. I build scalable
              full-stack platforms, AI systems, and mobile-ready
              products.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Magnetic className="inline-flex">
                <button
                  onClick={() => scrollToSection('#projects')}
                  className="btn-primary text-center w-full sm:w-auto"
                >
                  View My Work
                </button>
              </Magnetic>
              <Magnetic className="inline-flex">
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-outline text-center w-full sm:w-auto"
                >
                  Let's Connect
                </button>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 justify-center lg:justify-start"
            >
              <Magnetic className="inline-flex">
                <a
                  href="https://github.com/confinedtitan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94A3B8] hover:text-cyan-400 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <FaGithub size={26} />
                </a>
              </Magnetic>
              <Magnetic className="inline-flex">
                <a
                  href="https://www.linkedin.com/in/shamganesh-r-394969370"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94A3B8] hover:text-cyan-400 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={26} />
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Right Column — Profile Image */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center"
            variants={scaleIn(0.4, 0.8)}
            initial="hidden"
            animate="show"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl scale-110 animate-pulse-slow" />
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full ring-2 ring-cyan-400/50 overflow-hidden"
                style={{ boxShadow: '0 0 40px rgba(6,182,212,0.4), 0 0 80px rgba(6,182,212,0.15)' }}>
                <img
                  src={profileImg}
                  alt="R Shamganesh"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <span className="text-[#94A3B8] text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-[1px] h-10 bg-gradient-to-b from-cyan-400 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
