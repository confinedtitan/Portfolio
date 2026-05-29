import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiHeart } from 'react-icons/hi';
import Magnetic from './Magnetic';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          {/* Monogram */}
          <span className="font-heading text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            RS
          </span>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <Magnetic className="inline-flex">
              <a
                href="https://github.com/confinedtitan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-cyan-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
            </Magnetic>
            <Magnetic className="inline-flex">
              <a
                href="https://www.linkedin.com/in/shamganesh-r-394969370"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </Magnetic>
          </div>

          {/* Credit Line */}
          <p className="text-[#94A3B8] text-sm flex items-center gap-1.5">
            Designed & Built by{' '}
            <span className="text-cyan-400 font-medium">R Shamganesh</span>
            <HiHeart size={14} className="text-red-400" />
          </p>

          {/* Copyright */}
          <p className="text-white/30 text-xs">
            © 2026 Shamganesh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
