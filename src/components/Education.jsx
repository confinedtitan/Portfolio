import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiAcademicCap } from 'react-icons/hi';

const education = [
  {
    degree: 'B.Tech Information Technology',
    institution: 'RMK Engineering College',
    location: 'Kavaraipettai',
    period: '2023 – 2027',
    score: 'CGPA: 6.99 (until 6th sem)',
    scoreColor: 'text-cyan-400',
    current: true,
  },
  {
    degree: 'Class 12 – CBSE',
    institution: 'Ryan International School',
    location: 'Bangalore',
    period: '2022 – 2023',
    score: '60.06%',
    scoreColor: 'text-purple-400',
    current: false,
  },
  {
    degree: 'Class 10 – CBSE',
    institution: 'Sri Chaitanya Techno School',
    location: 'Bangalore',
    period: '2020 – 2021',
    score: '77.40%',
    scoreColor: 'text-purple-400',
    current: false,
  },
];

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" ref={ref} className="py-24 bg-[#0A0A0F] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-medium tracking-widest text-sm uppercase mb-3">Academic Background</p>
          <h2 className="section-heading">Education</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
              className="glass-card overflow-hidden hover:border-white/20 transition-all duration-300 group"
              whileHover={{ y: -4 }}
            >
              {/* Top gradient border */}
              <div className="h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500" />

              <div className="p-6">
                {/* Icon + Period badge */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                    <HiAcademicCap size={22} className="text-cyan-400" />
                  </div>
                  <span className="bg-cyan-400/10 text-cyan-400 text-xs font-medium px-3 py-1 rounded-full">
                    {edu.period}
                  </span>
                </div>

                {/* Degree */}
                <h3 className="font-heading text-lg font-bold text-white mb-1 leading-snug">
                  {edu.degree}
                </h3>

                {/* Institution */}
                <p className="text-[#94A3B8] text-sm mb-1">{edu.institution}</p>
                <p className="text-[#94A3B8] text-xs mb-4">{edu.location}</p>

                {/* Score */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-xs text-[#94A3B8]">Score</span>
                  <span className={`font-heading text-base font-bold ${edu.scoreColor}`}>{edu.score}</span>
                </div>

                {edu.current && (
                  <div className="mt-3">
                    <span className="bg-green-400/10 text-green-400 text-xs font-medium px-3 py-1 rounded-full">
                      Currently Enrolled
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
