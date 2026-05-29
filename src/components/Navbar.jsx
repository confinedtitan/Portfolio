import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import Magnetic from './Magnetic';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/5 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Magnetic className="inline-flex">
            <motion.a
              href="#"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-heading text-2xl font-bold gradient-text cursor-pointer select-none"
              whileHover={{ scale: 1.05 }}
            >
              RS
            </motion.a>
          </Magnetic>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Magnetic key={link.label} className="inline-flex">
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-[#94A3B8] hover:text-cyan-400 transition-colors duration-200 text-sm font-medium tracking-wide"
                >
                  {link.label}
                </button>
              </Magnetic>
            ))}
          </div>

          {/* Resume Button */}
          <div className="hidden md:flex items-center gap-4">
            <Magnetic className="inline-flex">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-[#0A0A0F] font-semibold px-5 py-2 rounded-xl text-sm transition-all duration-300"
              >
                Resume
              </a>
            </Magnetic>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[#94A3B8] hover:text-cyan-400 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/5 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-[#94A3B8] hover:text-cyan-400 transition-colors py-2 text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-[#0A0A0F] font-semibold px-5 py-2 rounded-xl text-sm transition-all duration-300 text-center mt-2"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
