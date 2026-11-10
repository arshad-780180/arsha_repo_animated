import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Github, Check } from 'lucide-react';

// A 9:16 card that behaves like a short reel: the picture drifts, a progress bar runs,
// and bold captions pop in one after another.
export default function ReelCard({ card }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-15% 0px' });
  const reduce = useReducedMotion();
  const [cap, setCap] = useState(0);
  const playing = inView && !reduce;

  useEffect(() => {
    if (!playing) return undefined;
    const t = setInterval(() => setCap((c) => (c + 1) % card.captions.length), 1300);
    return () => clearInterval(t);
  }, [playing, card.captions.length]);

  const image = card.project?.image || card.cert?.image;
  const link = card.project?.githubUrl || card.cert?.verifyUrl || '';
  const title = card.project?.title || card.cert?.name || card.title;
  const sub = card.project?.summary || card.cert?.issuer || '';
  const Wrapper = link ? 'a' : 'div';

  return (
    <Wrapper ref={ref} {...(link ? { href: link, target: '_blank', rel: 'noopener noreferrer' } : {})} className={`reel-card group ${card.kind}`} aria-label={link ? `${title} – open on GitHub` : title}>
      <div className="reel-progress" aria-hidden="true"><span key={cap} className={playing ? 'run' : ''} /></div>

      {card.kind === 'qa' ? (
        <div className="absolute inset-0 qa-bg flex flex-col justify-end px-4 pb-[34%] gap-2">
          {card.checks.map((c, i) => (
            <motion.div key={c} className="qa-row" initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.25 }}>
              <span className="qa-tick"><Check className="w-3 h-3" aria-hidden="true" /></span>{c}
            </motion.div>
          ))}
        </div>
      ) : (
        <img src={image} alt="" loading="lazy" className={`reel-media ${card.kind === 'cert' ? 'is-cert' : ''} ${playing ? 'pan' : ''}`} />
      )}
      <div className="reel-shade" aria-hidden="true" />

      <div className={`absolute inset-x-0 ${card.kind === 'qa' ? 'top-[18%]' : 'top-[38%]'} flex justify-center pointer-events-none`}>
        <AnimatePresence mode="wait">
          <motion.span
            key={cap}
            className="reel-caption"
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
          >
            {card.captions[cap]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-white font-bold leading-tight">{title}</p>
        {sub && <p className="text-white/75 text-[12px] mt-1 line-clamp-2">{sub}</p>}
        {link && <span className="inline-flex items-center gap-1.5 mt-2 text-[12px] font-semibold text-[#ffd0c9]">{card.kind === 'project' ? <><Github className="w-3.5 h-3.5" aria-hidden="true" /> View the code</> : 'View certificate'}</span>}
      </div>
    </Wrapper>
  );
}
