import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiBriefcase, HiLightningBolt } from 'react-icons/hi';

const experiences = [
  {
    icon: HiBriefcase,
    title: 'Full Stack Developer Intern',
    company: 'EDAINFRONT',
    type: 'Internship',
    date: 'Jun 2025 – Jul 2025',
    color: 'cyan',
    bullets: [
      'Built a tiered membership portal using React + Node.js/Python FastAPI for a charitable trust',
      'Delivered responsive registration, payment, and profile workflows (web + mobile)',
      'Improved backend API efficiency through optimized query handling and structured routing',
    ],
  },
  {
    icon: HiLightningBolt,
    title: 'Hackathon Lead',
    company: 'Hackathon Experience',
    type: 'Hackathon Experience',
    date: '2024 – 2026',
    color: 'purple',
    bullets: [
      'Led 4+ cross-functional teams in national and institute-level hackathons',
      'Won ₹10,000 cash prize at Envision Hackathon (SSN Engineering College)',
      'Built a privacy-first AI adaptive learning platform that won first place',
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-medium tracking-widest text-sm uppercase mb-3">Where I've Worked</p>
          <h2 className="section-heading">Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400/50 via-purple-500/30 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, i) => {
              const Icon = exp.icon;
              const isCyan = exp.color === 'cyan';
              return (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -60 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-[15px] top-6 w-[26px] h-[26px] rounded-full border-2 flex items-center justify-center
                    ${isCyan
                      ? 'border-cyan-400 bg-cyan-400/20'
                      : 'border-purple-400 bg-purple-400/20'
                    }`}
                    style={{
                      boxShadow: isCyan
                        ? '0 0 12px rgba(6,182,212,0.5)'
                        : '0 0 12px rgba(139,92,246,0.5)',
                    }}
                  >
                    <Icon size={12} className={isCyan ? 'text-cyan-400' : 'text-purple-400'} />
                  </div>

                  {/* Card */}
                  <div className="glass-card p-6 hover:border-white/20 transition-all duration-300"
                    style={{
                      borderLeft: `2px solid ${isCyan ? 'rgba(6,182,212,0.4)' : 'rgba(139,92,246,0.4)'}`,
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <span className={`text-xs font-medium tracking-wider uppercase px-2 py-1 rounded-full mb-2 inline-block
                          ${isCyan ? 'bg-cyan-400/10 text-cyan-400' : 'bg-purple-400/10 text-purple-400'}`}>
                          {exp.type}
                        </span>
                        <h3 className="font-heading text-xl font-bold text-white">{exp.title}</h3>
                        <p className={`font-medium ${isCyan ? 'text-cyan-400' : 'text-purple-400'}`}>
                          {exp.company}
                        </p>
                      </div>
                      <span className="glass-card px-3 py-1.5 text-sm text-[#94A3B8] whitespace-nowrap self-start">
                        {exp.date}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-3 text-[#94A3B8] text-sm leading-relaxed">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0
                            ${isCyan ? 'bg-cyan-400' : 'bg-purple-400'}`} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
