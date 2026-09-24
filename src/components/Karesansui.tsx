const ROWS = [
  "M2 8h8M13 8h8M24 8h8M35 8h8M46 8h9M57 8h8M68 8h8M79 8h8M90 8h8M101 8h8M112 8h8M123 8h9M134 8h8M145 8h8M156 8h8M167 8h8M178 8h8M189 8h8",
  "M2 17h8M19 17h8M36 17h8M53 17h9M70 17h8M87 17h8M104 17h8M121 17h8M138 17h9M155 17h8M172 17h8M189 17h8",
  "M2 26h8M20 26h8M38 26h9M56 26h8M74 26h8M92 26h8M110 26h8M128 26h9M146 26h8M164 26h8M182 26h8",
];

export function Karesansui() {
  return (
    <div aria-hidden className="pointer-events-none flex justify-center py-3 lg:pl-16">
      <svg width="196" height="32" viewBox="0 0 196 32" className="opacity-70">
        <g fill="none" stroke="#2a2e26" strokeWidth="1">
          {ROWS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <ellipse cx="70" cy="7" rx="7" ry="4" fill="#141712" stroke="#2a2e26" />
        <ellipse cx="130" cy="16" rx="9" ry="5.5" fill="#141712" stroke="#2a2e26" />
        <ellipse cx="34" cy="25" rx="5" ry="3" fill="#141712" stroke="#2a2e26" />
        <ellipse cx="172" cy="6" rx="4" ry="2.6" fill="#141712" stroke="#2a2e26" strokeDasharray="2 1.5" />
      </svg>
    </div>
  );
}