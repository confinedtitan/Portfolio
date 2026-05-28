import { motion } from 'framer-motion';
import { staggerContainer, fadeIn, scaleIn } from '../utils/motion';
import { useRef } from 'react';
import profileImg from '../assets/profile.jpg';

const stats = [
  { number: '4+', label: 'Hackathon Teams Led' },
  { number: '1st', label: 'Place — Inter-College Tech Competition' },
  { number: '3+', label: 'Production Projects' },
  { number: '1', label: 'Internship' },
];

export default function About() {
  const ref = useRef(null);

  return (
    <section id="about" ref={ref} className="py-24 bg-[#0A0A0F] relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeIn('up', 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-medium tracking-widest text-sm uppercase mb-3">Who I Am</p>
          <h2 className="section-heading">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div 
          variants={staggerContainer(0.2, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left — Profile Image */}
          <motion.div
            variants={fadeIn('right', 0.3)}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Gradient border wrapper */}
              <div className="p-[2px] bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl"
                style={{ boxShadow: '0 0 30px rgba(6,182,212,0.25)' }}>
                <div className="rounded-2xl overflow-hidden w-72 h-80 sm:w-80 sm:h-96">
                  <img
                    src={profileImg}
                    alt="R Shamganesh"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Floating badge */}
              
            </div>
          </motion.div>

          {/* Right — Bio + Stats */}
          <motion.div
            variants={fadeIn('left', 0.4)}
            className="flex flex-col"
          >
            <h3 className="font-heading text-2xl font-bold text-white mb-4">
              Building with purpose, shipping with precision.
            </h3>
            <p className="text-[#94A3B8] leading-relaxed mb-4">
              I'm a third-year Information Technology student at RMK Engineering College,
              Kavaraipettai.I am a type of person who doesn't wait to graduate before shipping real products.
            </p>
            <p className="text-[#94A3B8] leading-relaxed mb-8">
              I've built a PropTech SaaS platform for property management, a privacy-first
              AI adaptive learning system with end-to-end encryption, and a full-stack
              membership portal for a temple trust — complete with a custom Tamil phonetic
              input engine I built from scratch, zero dependencies and various other small scale projects
            </p>

            <motion.div 
              variants={staggerContainer(0.1, 0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={scaleIn(0)}
                  className="glass-card p-5 text-center hover:border-cyan-500/30 transition-colors duration-300"
                >
                  <p className="font-heading text-3xl font-bold text-cyan-400 mb-1">{stat.number}</p>
                  <p className="text-[#94A3B8] text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
