import React from 'react';
import { motion } from 'framer-motion';
import ReelCard from './ReelCard';

const from = [
  { x: -160, y: 40, rotate: -10 },
  { x: 0, y: 160, rotate: 0 },
  { x: 160, y: 40, rotate: 10 },
];

export default function Showcase({ section }) {
  return (
    <section id={section.id} className="showcase relative py-16 sm:py-24">
      <motion.h2
        className="showcase-title"
        initial={{ opacity: 0, y: -24, letterSpacing: '0.3em' }}
        whileInView={{ opacity: 1, y: 0, letterSpacing: '0.02em' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {section.title}
      </motion.h2>
      <ul className="reel-row mt-8 sm:mt-10">
        {section.cards.map((card, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, ...from[i] }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.15 + i * 0.15, type: 'spring', stiffness: 70, damping: 14 }}
          >
            <ReelCard card={card} />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
