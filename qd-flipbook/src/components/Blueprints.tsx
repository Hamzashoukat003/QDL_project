// Original line illustrations in a technical-drawing style. They are schematic,
// not as-built drawings; dimensions quoted are the figures stated in the profile.

const S = { fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function Dim({ x1, x2, y, label, color }: { x1: number; x2: number; y: number; label: string; color: string }) {
  return (
    <g stroke={color} strokeWidth={0.8} {...S}>
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <path d={`M${x1 + 7} ${y - 3} L${x1} ${y} L${x1 + 7} ${y + 3}`} />
      <path d={`M${x2 - 7} ${y - 3} L${x2} ${y} L${x2 - 7} ${y + 3}`} />
      <line x1={x1} y1={y - 8} x2={x1} y2={y + 8} />
      <line x1={x2} y1={y - 8} x2={x2} y2={y + 8} />
      <rect x={(x1 + x2) / 2 - 34} y={y - 8} width={68} height={16} fill="#fff" stroke="none" />
      <text
        x={(x1 + x2) / 2}
        y={y + 3.5}
        textAnchor="middle"
        fill={color}
        stroke="none"
        style={{ font: '500 10px "IBM Plex Mono", monospace', letterSpacing: '0.06em' }}
      >
        {label}
      </text>
    </g>
  );
}

/** Floating-roof crude oil storage tank — elevation. */
export function TankElevation({ className, color = '#330065', accent = '#CC3433' }: { className?: string; color?: string; accent?: string }) {
  const courses = [0, 1, 2, 3, 4, 5, 6];
  return (
    <svg viewBox="0 0 600 300" className={className} aria-label="Schematic elevation of a floating-roof storage tank">
      <g stroke={color} {...S}>
        {/* ground & foundation */}
        <line x1={20} y1={250} x2={580} y2={250} strokeWidth={1.2} />
        <path d="M70 250 L80 240 L520 240 L530 250" strokeWidth={1} />
        {/* shell */}
        <rect x={80} y={90} width={440} height={150} strokeWidth={1.6} />
        {courses.map((c) => (
          <line key={c} x1={80} y1={90 + c * 21.4} x2={520} y2={90 + c * 21.4} strokeWidth={0.6} opacity={0.6} />
        ))}
        {/* vertical plate seams, staggered */}
        {courses.slice(0, 7).map((c) =>
          [0, 1, 2, 3, 4, 5].map((k) => {
            const x = 80 + 36 + k * 74 + (c % 2 ? 37 : 0);
            return x < 515 ? (
              <line key={`${c}-${k}`} x1={x} y1={90 + c * 21.4} x2={x} y2={90 + (c + 1) * 21.4} strokeWidth={0.5} opacity={0.4} />
            ) : null;
          }),
        )}
        {/* wind girder */}
        <path d="M74 96 L526 96" strokeWidth={1.2} />
        {/* floating roof (dashed, inside) */}
        <path d="M86 128 L514 128" strokeDasharray="6 4" strokeWidth={1} stroke={accent} />
        <path d="M86 128 L100 136 L500 136 L514 128" strokeDasharray="6 4" strokeWidth={0.8} stroke={accent} />
        {/* rolling ladder */}
        <path d="M300 96 L420 128" strokeWidth={0.8} />
        <path d="M304 94 L424 126" strokeWidth={0.8} />
        {/* spiral stair */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <line key={i} x1={520 + i * 4.2} y1={240 - i * 12.5} x2={526 + i * 4.2} y2={240 - i * 12.5} strokeWidth={0.8} />
        ))}
        <path d="M520 240 L566 90" strokeWidth={0.9} />
        <path d="M528 240 L572 92" strokeWidth={0.6} opacity={0.7} />
        <path d="M566 90 L566 72 M520 72 L572 72" strokeWidth={0.9} />
        {/* nozzles / manways */}
        <circle cx={140} cy={220} r={9} strokeWidth={1} />
        <circle cx={140} cy={220} r={4} strokeWidth={0.6} />
        <rect x={60} y={212} width={20} height={10} strokeWidth={0.9} />
        {/* centreline */}
        <line x1={300} y1={60} x2={300} y2={262} strokeWidth={0.5} strokeDasharray="14 3 2 3" opacity={0.6} />
      </g>
      <Dim x1={80} x2={520} y={30} label="Ø 62 m" color={color} />
      <g stroke={color} strokeWidth={0.5} opacity={0.5}>
        <line x1={80} y1={38} x2={80} y2={88} />
        <line x1={520} y1={38} x2={520} y2={88} />
      </g>
      <text x={300} y={282} textAnchor="middle" fill={color} style={{ font: '500 8.5px "IBM Plex Mono", monospace', letterSpacing: '0.2em' }}>
        FLOATING-ROOF TANK · ELEVATION · SCHEMATIC
      </text>
    </svg>
  );
}

/** Pre-heater tower steel structure — elevation. */
export function TowerElevation({ className, color = '#330065', accent = '#CC3433' }: { className?: string; color?: string; accent?: string }) {
  const levels = [0, 1, 2, 3, 4, 5, 6, 7];
  const top = 40;
  const base = 560;
  const step = (base - top) / levels.length;
  return (
    <svg viewBox="0 0 260 620" className={className} aria-label="Schematic elevation of a pre-heater tower steel structure">
      <g stroke={color} {...S}>
        <line x1={20} y1={base} x2={240} y2={base} strokeWidth={1.2} />
        <line x1={60} y1={top} x2={60} y2={base} strokeWidth={1.6} />
        <line x1={190} y1={top} x2={190} y2={base} strokeWidth={1.6} />
        <line x1={125} y1={top} x2={125} y2={base} strokeWidth={0.9} />
        {levels.map((l) => {
          const y = top + l * step;
          return (
            <g key={l}>
              <line x1={52} y1={y} x2={198} y2={y} strokeWidth={1.3} />
              <path d={`M60 ${y} L125 ${y + step} M125 ${y} L60 ${y + step}`} strokeWidth={0.6} opacity={0.7} />
              <path d={`M125 ${y} L190 ${y + step} M190 ${y} L125 ${y + step}`} strokeWidth={0.6} opacity={0.7} />
            </g>
          );
        })}
        {/* cyclones */}
        {[1, 3, 5].map((l) => {
          const y = top + l * step + 10;
          return (
            <path
              key={l}
              d={`M84 ${y} L166 ${y} L166 ${y + 22} L138 ${y + step - 22} L112 ${y + step - 22} L84 ${y + 22} Z`}
              stroke={accent}
              strokeWidth={1}
            />
          );
        })}
      </g>
      {/* height dimension */}
      <g stroke={color} strokeWidth={0.8} {...S}>
        <line x1={225} y1={top} x2={225} y2={base} />
        <path d={`M222 ${top + 7} L225 ${top} L228 ${top + 7}`} />
        <path d={`M222 ${base - 7} L225 ${base} L228 ${base - 7}`} />
        <line x1={196} y1={top} x2={233} y2={top} opacity={0.5} />
      </g>
      <rect x={213} y={282} width={24} height={60} fill="#fff" />
      <text
        x={229}
        y={312}
        textAnchor="middle"
        fill={color}
        transform="rotate(-90 229 312)"
        style={{ font: '500 10px "IBM Plex Mono", monospace', letterSpacing: '0.06em' }}
      >
        263 ft
      </text>
      <text x={125} y={600} textAnchor="middle" fill={color} style={{ font: '500 8px "IBM Plex Mono", monospace', letterSpacing: '0.2em' }}>
        PRE-HEATER · 750 TON
      </text>
    </svg>
  );
}
