import React from 'react';
import Hero from '../components/reel/Hero';
import Showcase from '../components/reel/Showcase';
import Outro from '../components/reel/Outro';
import { showcases } from '../data/reels';

export default function Home() {
  return (
    <main id="content">
      <Hero />
      <div className="marble">
        <div className="marble-blobs" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="relative">
          {showcases.map((s) => <Showcase key={s.id} section={s} />)}
          <Outro />
        </div>
      </div>
    </main>
  );
}
