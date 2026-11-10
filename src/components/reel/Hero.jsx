import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, animate } from 'framer-motion';
import { profile, education } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { certifications } from '../../data/certifications';

const WORD = 'PORTFOLIO';
const LETTER = 0.17; // seconds per letter of the big word
const T = {
  photo: WORD.length * LETTER + 0.3,
  hello: WORD.length * LETTER + 1.0,
  name: WORD.length * LETTER + 1.3,
  role: WORD.length * LETTER + 2.0,
  list: WORD.length * LETTER + 2.5,
  stats: WORD.length * LETTER + 3.6,
  tagline: WORD.length * LETTER + 5.0,
};
const skills = ['Software Testing', 'Python Development', 'Data Science', 'Full-Stack Web'];

// Letters appear one at a time, like someone typing.
function Typed({ text, start, step = 0.06, className = '' }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span key={i} aria-hidden="true" className="inline-block" initial={{ opacity: 0, x: 6, filter: 'blur(6px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} transition={{ delay: start + i * step, duration: 0.18 }}>
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}

function Count({ to, decimals = 0, delay }) {
  const [v, setV] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) { setV(to); return undefined; }
    const c = animate(0, to, { delay, duration: 1.1, ease: [0.2, 0.8, 0.2, 1], onUpdate: setV });
    return () => c.stop();
  }, [to, delay, reduce]);
  return <>{v.toFixed(decimals)}</>;
}

export default function Hero() {
  const reduce = useReducedMotion();
  const stats = [
    { to: parseFloat(education.cgpa), decimals: 2, l1: 'CGPA', l2: 'so far' },
    { to: projectsData.length, l1: 'Projects', l2: 'built', pad: true },
    { to: certifications.length, l1: 'Certificates', l2: 'earned', pad: true },
  ];

  return (
    <section id="home" className="hero-reel relative min-h-[100svh] overflow-hidden">
      {/* Giant word: each letter is drawn as a glowing outline, then fills in */}
      <h2 className="sr-only">Portfolio</h2>
      <div aria-hidden="true" className="absolute inset-x-0 top-[5svh] sm:top-[4svh] flex justify-center select-none px-[2vw]">
        {WORD.split('').map((ch, i) => (
          <span key={i} className="giant-letter">
            <motion.span className="giant-outline" initial={{ opacity: 0 }} animate={{ opacity: reduce ? 0 : [0, 1, 1, 0] }} transition={{ delay: i * LETTER, duration: 0.8, times: [0, 0.15, 0.6, 1] }}>{ch}</motion.span>
            <motion.span className="giant-fill" initial={{ opacity: reduce ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ delay: i * LETTER + 0.3, duration: 0.4 }}>{ch}</motion.span>
          </span>
        ))}
      </div>

      {/* Portrait rises up through the word */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center sm:pl-[6vw] pointer-events-none">
        <motion.div
          initial={reduce ? false : { y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: T.photo, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <img src={profile.photo} alt={profile.name} className="reel-photo" />
        </motion.div>
      </div>

      {/* Left column: hello, name, role, skills */}
      <div className="relative z-20 h-[100svh] max-w-[1500px] mx-auto px-5 sm:px-10 flex flex-col justify-end sm:justify-center pb-8 sm:pb-0">
        <div className="reel-copy sm:mt-[12svh]">
          <motion.p className="font-script text-3xl sm:text-5xl text-white" initial={reduce ? false : { opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: T.hello, duration: 0.5 }} style={{ transformOrigin: 'left center' }}>Hello I’m</motion.p>
          <h1 className="font-impact uppercase text-white leading-[0.88] text-[17vw] sm:text-[7.5vw] mt-1">
            <Typed text="Arshad" start={T.name} /><br />
            <Typed text="V A" start={T.name + 0.4} />
          </h1>
          <p className="reel-role mt-2"><Typed text="QA Analyst" start={T.role} step={0.05} /></p>
          <ul className="mt-3 space-y-1">
            {skills.map((s, i) => (
              <motion.li key={s} className="flex items-center gap-2 text-white text-[15px] sm:text-[1.35vw]" initial={reduce ? false : { opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: T.list + i * 0.28, duration: 0.35 }}>
                <span className="plus-ring" aria-hidden="true">+</span>{s}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right column: stat badges and tagline */}
      <div className="stats-wrap absolute z-20 flex gap-2 sm:gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.l1} className="stat-badge" initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ delay: T.stats + i * 0.45, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}>
            <span className="stat-num">{s.pad ? String(Math.round(s.to)).padStart(2, '0') : <Count to={s.to} decimals={s.decimals} delay={T.stats + i * 0.45} />}</span>
            <span className="stat-label">{s.l1}<br />{s.l2}</span>
          </motion.div>
        ))}
      </div>
      <motion.div className="absolute z-20 right-4 sm:right-10 top-[42svh] sm:top-[32svh] hidden sm:flex items-center gap-3 max-w-[15rem]" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.tagline, duration: 0.6 }}>
        <span className="sparkle" aria-hidden="true">✦</span>
        <p className="text-white text-[15px] leading-tight">Turning ideas into<br />reliable, tested<br /><span className="font-bold tracking-wide">SOFTWARE</span></p>
      </motion.div>

      <motion.a href="#data-science" onClick={(e) => { const el = document.getElementById('data-science'); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); } }} className="scroll-cue z-30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: T.tagline + 0.5 }}>
        Scroll to see the work ↓
      </motion.a>
    </section>
  );
}
