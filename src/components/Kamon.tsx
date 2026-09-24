export function Kamon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="29.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="32" cy="32" r="26.5" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="1.2 3.2" />
      <text
        x="32"
        y="43"
        textAnchor="middle"
        fontFamily="'Hiragino Mincho ProN','Yu Mincho','Songti SC','Noto Serif JP',serif"
        fontSize="27"
        fill="currentColor"
      >
        山
      </text>
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M11 47c6 2.2 12 1.4 16 -0.8" />
        <path d="M53 47c-6 2.2 -12 1.4 -16 -0.8" />
        <path d="M20 51c1.2 1.8 1.2 3.4 0 5" />
        <path d="M44 51c-1.2 1.8 -1.2 3.4 0 5" />
      </g>
    </svg>
  );
}