import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Color config per project type
const COLOR_MAP = {
  cyan:   { border: 'rgba(6,182,212,0.6)',   glow: 'rgba(6,182,212,0.15)',   badge: 'bg-cyan-400/10 text-cyan-400',   dot: 'bg-cyan-400' },
  purple: { border: 'rgba(139,92,246,0.6)',  glow: 'rgba(139,92,246,0.15)',  badge: 'bg-purple-400/10 text-purple-400', dot: 'bg-purple-400' },
  teal:   { border: 'rgba(16,185,129,0.6)',  glow: 'rgba(16,185,129,0.15)',  badge: 'bg-emerald-400/10 text-emerald-400', dot: 'bg-emerald-400' },
  orange: { border: 'rgba(249,115,22,0.6)',  glow: 'rgba(249,115,22,0.15)',  badge: 'bg-orange-400/10 text-orange-400', dot: 'bg-orange-400' },
};

const projects = [
  {
    id: 'nestorix',
    title: 'Nestorix',
    category: 'Full Stack',
    badge: 'SaaS / Full Stack',
    color: 'cyan',
    stack: ['Django', 'Python', 'React Native', 'React', 'SQL'],
    description:
      'A full-stack PropTech SaaS platform where tenants raise digital maintenance requests and property owners manage contractor workflows.',
    bullets: [
      'Architected the full SaaS backend with Django REST Framework',
      'Built a cross-platform mobile app using React Native for tenant workflows',
      'Implemented structured request prioritization and contractor assignment logic',
      'Designed an owner dashboard for real-time workflow and status management',
    ],
    github: 'https://github.com/confinedtitan',
  },
  {
    id: 'ai-learning',
    title: 'FocusFlow',
    category: 'AI/ML',
    badge: 'AI / ML',
    color: 'purple',
    trophy: ' ₹10,000 Prize',
    stack: ['Next.js', 'Convex', 'Gemini API', 'Web Crypto'],
    description:
      'Built during a 24-hour hackathon at SSN Engineering College, this is a privacy-preserving adaptive learning system that personalizes content in real-time using LLM-driven transformations with zero plaintext storage.',
    bullets: [
      'Built E2EE data pipelines with client-side encryption using Web Crypto API',
      'Integrated Gemini API for intelligent, real-time content transformation',
      'Implemented anonymized analytics dashboard for aggregate attention trends',
      'Zero plaintext storage architecture — all user data encrypted at rest',
    ],
    github: 'https://github.com/confinedtitan/FocusFlow.git',
  },
  {
    id: 'kalingar-trust',
    title: 'Kalingar Trust Membership Portal',
    category: 'Full Stack',
    badge: 'Full Stack / SaaS',
    color: 'teal',
    stack: ['Django', 'React', 'Django REST Framework', 'SQLite', 'Python', 'Axios'],
    description:
      'A full-stack membership management system for a temple trust — replacing paper records with a role-based digital portal for member registration, payment tracking, and community content.',
    bullets: [
      'Role-based access: Admin and Member portals with token authentication',
      'Custom Tamil phonetic IME built from scratch — 300+ mapping entries, zero dependencies',
      'Atomic member creation handling User + Member + Children in a single transaction',
      'Automatic financial tracking: amount_due recomputed on every save',
      'Bilingual UI (English & Tamil) with instant language switching',
      'Single-command deployment — Django serves both API and compiled React frontend',
    ],
    github: 'https://github.com/confinedtitan/kalingar-portal.git',
  },
  {
    id: 'eduverse',
    title: 'EduVerse — College Management Platform',
    category: 'Full Stack',
    badge: 'Full Stack',
    color: 'orange',
    trophy: '🏆 1st Place — ₹10,000 Prize',
    stack: ['React 19', 'Node.js', 'Express.js', 'MySQL', 'Sequelize', 'JWT', 'Tailwind CSS v4', 'Twilio API'],
    description:
      'A comprehensive full-stack college management platform with dedicated portals for Students, Teachers, Admins, and Alumni — built as a team for an inter-college tech competition, winning 1st place and ₹10,000.',
    bullets: [
      '4 role-based portals: Student, Teacher, Admin, Alumni — each with dedicated dashboards',
      'JWT authentication with RBAC routing users to their specific portal securely',
      'Twilio WhatsApp API integration for automated student assignment reminders',
      '15+ interconnected MySQL tables with Sequelize ORM handling complex Many-to-Many relations',
      'Alumni job board, mentorship system, and real-time messaging UI',
      'Digital OD/Leave/Gate Pass request system with one-click teacher approvals',
    ],
    github: 'https://github.com/confinedtitan/Eduverse.git',
  },
];

const filters = ['All', 'Full Stack', 'AI/ML'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 font-medium tracking-widest text-sm uppercase mb-3">What I've Built</p>
          <h2 className="section-heading">Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-cyan-500 text-[#0A0A0F] shadow-lg'
                  : 'glass-card text-[#94A3B8] hover:text-cyan-400 hover:border-cyan-500/30'
              }`}
              style={activeFilter === f ? { boxShadow: '0 0 20px rgba(6,182,212,0.4)' } : {}}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {filtered.map((project, i) => {
              const c = COLOR_MAP[project.color] ?? COLOR_MAP.cyan;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-card p-6 group cursor-default transition-all duration-300"
                  style={{ borderTop: `2px solid ${c.border}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 60px ${c.glow}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; }}
                >
                  {/* Badge + Title */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-xs font-medium tracking-wider uppercase px-2.5 py-1 rounded-full ${c.badge}`}>
                        {project.badge}
                      </span>
                      {project.trophy && (
                        <span className="text-xs font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400">
                          {project.trophy}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white">{project.title}</h3>
                  </div>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="bg-white/10 text-[#94A3B8] rounded-md px-2.5 py-1 text-xs font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">{project.description}</p>

                  {/* Bullets */}
                  <ul className="space-y-1.5 mb-6">
                    {project.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[#94A3B8]">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-white/5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-cyan-400 transition-colors"
                    >
                      <FaGithub size={16} />
                      GitHub
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
