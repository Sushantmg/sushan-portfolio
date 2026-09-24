import type { CSSProperties } from "react";

const PINK = ["#ffc2d4", "#ffd6e2", "#ffb7c9", "#ffa9c0"];

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 7.3 + 3) % 100,
  size: 9 + ((i * 7) % 5) * 2,
  duration: 13 + ((i * 5) % 7) * 1.9,
  delay: -(((i * 2.3) % 12) + 2) * (0.8 + ((i * 3) % 4) * 0.3),
  sway: 16 + ((i * 3) % 5) * 7,
  rotate: (i * 47) % 180,
  color: PINK[i % PINK.length],
  opacity: 0.55 + ((i * 13) % 4) * 0.12,
}));

export function Petals() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              opacity: p.opacity,
              "--dur": `${p.duration}s`,
              "--delay": `${p.delay}s`,
              "--sway": `${p.sway}px`,
              "--rot": `${p.rotate}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}