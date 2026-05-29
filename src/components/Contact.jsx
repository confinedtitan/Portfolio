import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle } from 'react-icons/hi';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const contactLinks = [
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'github.com/confinedtitan',
      href: 'https://github.com/confinedtitan',
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/shamganesh-r-394969370',
      href: 'https://www.linkedin.com/in/shamganesh-r-394969370',
    },
    {
      icon: HiMail,
      label: 'Email',
      value: 'rshamganesh@gmail.com',
      href: 'mailto:rshamganesh@gmail.com',
    },
    {
      icon: HiPhone,
      label: 'Phone',
      value: '+91 8217856602',
      href: 'tel:+918217856602',
    },
    {
      icon: HiLocationMarker,
      label: 'Location',
      value: 'Bangalore, India',
      href: null,
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-medium tracking-widest text-sm uppercase mb-3">Get In Touch</p>
          <h2 className="section-heading">Contact</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-heading text-3xl font-bold text-white mb-4">
              Let's build something{' '}
              <span className="gradient-text">together.</span>
            </h3>
            <p className="text-[#94A3B8] mb-10 leading-relaxed">
              Open to internships, freelance projects, and collaborations.
              Whether you have a project in mind or just want to say hi, I'd love
              to hear from you!
            </p>

            <div className="space-y-5">
              {contactLinks.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 group">
                  <div className="w-11 h-11 glass-card rounded-xl flex items-center justify-center flex-shrink-0 group-hover:border-cyan-500/40 transition-colors">
                    <Icon size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8] mb-0.5">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F1F5F9] text-sm hover:text-cyan-400 transition-colors truncate block max-w-xs"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-[#F1F5F9] text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="glass-card p-8">
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-green-400/10 border border-green-400/20 rounded-xl p-4 mb-6"
                >
                  <HiCheckCircle size={20} className="text-green-400 flex-shrink-0" />
                  <p className="text-green-400 text-sm font-medium">
                    Message sent! I'll get back to you soon.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-[#94A3B8] mb-2 font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F1F5F9] placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#94A3B8] mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F1F5F9] placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#94A3B8] mb-2 font-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F1F5F9] placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#94A3B8] mb-2 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or idea..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F1F5F9] placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-semibold text-[#0A0A0F] bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ boxShadow: '0 0 24px rgba(6,182,212,0.3)' }}
                >
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
