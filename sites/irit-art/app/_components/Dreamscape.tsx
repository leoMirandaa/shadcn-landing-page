import { Motion } from "./Motion";

// Deterministic PRNG so server and client render the same stars.
function rng(seed: number) {
  return () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
}

const rand = rng(7);
const stars = Array.from({ length: 70 }, () => ({
  x: rand() * 100,
  y: rand() * 100,
  s: 1 + rand() * 2.4,
  d: 2.5 + rand() * 5,
  o: rand() * 6,
}));

/** Fixed, non-interactive background: drifting colour orbs + twinkling stars. */
export function Dreamscape() {
  return (
    <div className="dreamscape" aria-hidden="true">
      <div className="orb-wrap o1"><div className="orb" /></div>
      <div className="orb-wrap o2"><div className="orb" /></div>
      <div className="orb-wrap o3"><div className="orb" /></div>
      <div className="orb-wrap o4"><div className="orb" /></div>
      {stars.map((s, i) => (
        <i
          key={i}
          className="star"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDuration: `${s.d}s`, animationDelay: `-${s.o}s` }}
        />
      ))}
      <div className="cursor-glow" />
      <Motion />
    </div>
  );
}
