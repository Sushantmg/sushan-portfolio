import type { CSSProperties } from "react";

const PATHS = [
  "M16 4 C12 4 8.5 6 7 10 C5.5 14 5 18 7.5 23 C9.5 27 12.5 29 16 30 C19.5 29 22.5 27 24.5 23 C27 18 26.5 14 25 10 C23.5 6 20 4 16 4 Z",
  "M16 3 C20 5 24 8 25.5 13 C27 18 26 23 22 26.5 C18 30 14 30 10 26.5 C6 23 5 18 6.5 13 C8 8 12 5 16 3 Z",
  "M16 6 C11 6 7 9 6.5 14 C6 19 9 23 13 26 C14.5 27 17.5 27 19 26 C23 23 26 19 25.5 14 C25 9 21 6 16 6 Z",
];

type Tier = "far" | "mid" | "near";
const TIERS: Record<Tier, number> = { near: 6, mid: 9, far: 7 };

type Petal = {
  key: number;
  left: number;
  size: number;
  fall: number;
  tumble: number;
  delay: number;
  wind: number;
  opacity: number;
  blur: number;
  shape: number;
};

const PETALS: Petal[] = (() => {
  const out: Petal[] = [];
  let i = 0;
  for (const [tier, count] of Object.entries(TIERS) as [Tier, number][]) {
    for (let k = 0; k < count; k++, i++) {
      const far = tier === "far";
      const mid = tier === "mid";
      out.push({
        key: i,
        left: (i * 7.3 + 4 * (k % 3)) % 100,
        size: far ? 10 + ((i * 3) % 5) : mid ? 15 + ((i * 5) % 5) : 21 + ((i * 7) % 8),
        fall: far ? 19 + ((i * 3) % 8) : mid ? 13 + ((i * 5) % 7) : 9 + ((i * 3) % 6),
        tumble: 2.8 + ((i * 11) % 5) * 0.6,
        delay: -(((i * 2.9) % 20) + 1),
        wind: far ? 60 + ((i * 13) % 50) : mid ? 95 + ((i * 17) % 55) : 130 + ((i * 23) % 90),
        opacity: far ? 0.28 + ((i * 7) % 3) * 0.06 : mid ? 0.5 + ((i * 5) % 4) * 0.08 : 0.78 + ((i * 3) % 3) * 0.07,
        blur: far ? 1.2 : mid ? 0.45 : 0,
        shape: i % PATHS.length,
      });
    }
  }
  return out;
})();

function PetalShape({ uid, shape }: { uid: string; shape: number }) {
  const gradId = `petal-grad-${uid}`;
  return (
    <svg viewBox="0 0 32 32" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe4ec" />
          <stop offset="50%" stopColor="#ffc4d6" />
          <stop offset="100%" stopColor="#ff9dbb" />
        </linearGradient>
      </defs>
      <path
        d={PATHS[shape]}
        fill={`url(#${gradId})`}
        stroke="#f297b5"
        strokeOpacity="0.55"
        strokeWidth="0.7"
      />
    </svg>
  );
}

export function Petals() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {PETALS.map((p) => (
        <span
          key={p.key}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              filter: p.blur ? `blur(${p.blur}px)` : undefined,
              "--fall": `${p.fall}s`,
              "--tumble": `${p.tumble}s`,
              "--delay": `${p.delay}s`,
              "--wind": `${p.wind}px`,
            } as CSSProperties
          }
        >
          <PetalShape uid={`${p.key}`} shape={p.shape} />
        </span>
      ))}
    </div>
  );
}

const BRANCH_FLOWERS = [
  { x: 58, y: 132, s: 1.15, r: -12 },
  { x: 118, y: 92, s: 0.95, r: 8 },
  { x: 178, y: 52, s: 1.05, r: -6 },
  { x: 236, y: 28, s: 0.8, r: 14 },
  { x: 150, y: 70, s: 0.6, r: 20 },
];

function Blossom({ x, y, s, r, id }: { x: number; y: number; s: number; r: number; id: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <g>
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-9"
            rx="6.5"
            ry="9.5"
            transform={`rotate(${deg})`}
            fill={`url(#blossom-grad-${id})`}
            stroke="#f297b5"
            strokeOpacity="0.5"
            strokeWidth="0.6"
          />
        ))}
      </g>
      <circle r="3.4" fill="#ffd6e2" />
      <circle r="1.4" fill="#ff9dbb" />
    </g>
  );
}

export function SakuraBranch() {
  return (
    <div
      aria-hidden
      className="branch pointer-events-none fixed right-0 top-0 z-[28] hidden w-72 opacity-70 sm:block lg:w-80"
    >
      <svg viewBox="0 0 280 220" className="h-auto w-full">
        <defs>
          <linearGradient id="blossom-grad-0" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe4ec" />
            <stop offset="100%" stopColor="#ffa9c6" />
          </linearGradient>
        </defs>
        <path
          d="M10 218 C 60 170 82 128 126 78 C 146 54 180 34 206 22 C 226 14 244 10 258 8"
          stroke="#6d4c36"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M126 78 C 126 60 138 46 150 40 C 164 34 176 32 190 30"
          stroke="#6d4c36"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M84 150 C 76 142 66 128 60 116"
          stroke="#754f37"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {BRANCH_FLOWERS.map((f, i) => (
          <Blossom key={i} id="0" {...f} />
        ))}
        <circle cx="60" cy="116" r="2" fill="#ffc4d6" />
        <circle cx="190" cy="30" r="2.5" fill="#ffc4d6" />
        <circle cx="16" cy="215" r="2" fill="#ffb7cb" />
      </svg>
    </div>
  );
}