import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MdVerified } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';

export default function Leadership() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="leadership" ref={ref} className="py-24 bg-[#0A0A0F] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-medium tracking-widest text-sm uppercase mb-3">Leadership</p>
          <h2 className="section-heading">Leadership & Responsibility</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Leadership Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start hover:border-white/20 transition-all duration-300"
          style={{ borderLeft: '3px solid rgba(6,182,212,0.6)' }}
        >
          {/* Icon Badge */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/10 flex items-center justify-center"
              style={{ boxShadow: '0 0 24px rgba(6,182,212,0.2)' }}>
              <MdVerified size={36} className="text-cyan-400" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <HiUsers size={20} className="text-purple-400" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="font-heading text-xl font-bold text-white mb-1">
                  Vice Chair – IEEE Consumer Technology Society (CTS)
                </h3>
                <p className="text-cyan-400 font-medium">Student Chapter</p>
              </div>
              <span className="glass-card px-3 py-1.5 text-sm text-[#94A3B8] whitespace-nowrap self-start mx-auto sm:mx-0">
                2024 – Present
              </span>
            </div>

            <p className="text-[#94A3B8] leading-relaxed mb-4">
              Supported planning and execution of technical events and workshops for student members.
              Contributed to building a thriving engineering community focused on emerging technologies
              in consumer electronics and digital innovations.
            </p>

            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="bg-cyan-400/10 text-cyan-400 rounded-full px-3 py-1 text-sm font-medium">IEEE Member</span>
              <span className="bg-purple-400/10 text-purple-400 rounded-full px-3 py-1 text-sm font-medium">Event Planning</span>
              <span className="bg-white/10 text-[#94A3B8] rounded-full px-3 py-1 text-sm font-medium">Student Leadership</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
