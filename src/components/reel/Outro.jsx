import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { profile } from '../../data/profile';

const line2 = 'SOFTWARE THAT HOLDS UP';

export default function Outro() {
  return (
    <section id="contact" className="showcase relative min-h-[90svh] flex flex-col items-center justify-center text-center px-5 py-24">
      <motion.p className="outro-1" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
        If you’re looking for
      </motion.p>
      <motion.p className="outro-2 mt-2" initial="hide" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.6 } } }} aria-label={line2}>
        {line2.split('').map((c, i) => (
          <motion.span key={i} aria-hidden="true" className="inline-block" variants={{ hide: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>{c === ' ' ? '\u00A0' : c}</motion.span>
        ))}
      </motion.p>
      <motion.a
        href={`mailto:${profile.email}`}
        className="dm-btn mt-14"
        initial={{ opacity: 0, scaleX: 0.15 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.8, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        Email for work
      </motion.a>
      <motion.ul className="flex flex-wrap justify-center gap-3 mt-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.4 }}>
        <li><a className="pill-link" href={`mailto:${profile.email}`}><Mail className="w-4 h-4" aria-hidden="true" />{profile.email}</a></li>
        <li><a className="pill-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="w-4 h-4" aria-hidden="true" />LinkedIn</a></li>
        <li><a className="pill-link" href={profile.github} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4" aria-hidden="true" />GitHub</a></li>
        <li><a className="pill-link" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer"><FileText className="w-4 h-4" aria-hidden="true" />Resume</a></li>
      </motion.ul>
      <p className="text-white/70 text-[12px] mt-16" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>© {new Date().getFullYear()} {profile.name} · {profile.role} at {profile.company} · {profile.location}</p>
    </section>
  );
}
