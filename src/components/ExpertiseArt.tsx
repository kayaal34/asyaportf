import type { CSSProperties, JSX, ReactNode } from 'react'

/**
 * Line drawings that explain each discipline at a glance. Strokes draw
 * themselves (`.draw`, pathLength=1) and labels fade up (`.fade`) once the
 * enclosing `<Reveal group>` is shown — see `.art` rules in index.css.
 */
const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

const mono = { fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }
const faint = { stroke: 'currentColor', strokeOpacity: 0.22 }

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className="art h-auto w-full text-ink"
      role="img"
      aria-label={label}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

/** 01 — search results: your card climbs to the top. */
function SeoArt() {
  const rows = [0, 1, 2, 3]
  return (
    <Frame label="Карточка поднимается на первое место в поиске">
      <rect className="draw" pathLength={1} x="16" y="14" width="368" height="44" rx="22" stroke="currentColor" strokeWidth="1.5" />
      <circle className="draw" pathLength={1} cx="42" cy="36" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path className="draw" pathLength={1} d="M48 42 L54 48" stroke="currentColor" strokeWidth="1.5" />
      <text className="fade" style={{ ...mono, ...d(0.3) }} x="66" y="41" fontSize="13" fill="currentColor">
        термобутылка 500 мл
      </text>
      <rect className="animate-blink" x="222" y="27" width="1.6" height="18" fill="var(--accent)" />

      {rows.map((r) => {
        const y = 78 + r * 52
        const top = r === 0
        return (
          <g key={r} className="fade" style={d(0.35 + r * 0.12)}>
            {top && (
              <rect x="12" y={y - 4} width="376" height="48" rx="12" fill="var(--accent-wash)" stroke="var(--accent)" strokeWidth="1.5" />
            )}
            <text x="26" y={y + 26} fontSize="13" fill={top ? 'var(--accent)' : 'currentColor'} style={mono} opacity={top ? 1 : 0.45}>
              {r + 1}
            </text>
            <rect x="46" y={y + 2} width="36" height="36" rx="7" fill={top ? 'var(--accent)' : 'currentColor'} opacity={top ? 1 : 0.1} />
            <rect x="94" y={y + 9} width={top ? 150 : 130 - r * 12} height="7" rx="3.5" fill="currentColor" opacity={top ? 0.85 : 0.18} />
            <rect x="94" y={y + 23} width={top ? 96 : 80 - r * 6} height="7" rx="3.5" fill="currentColor" opacity={top ? 0.35 : 0.1} />
            {top && (
              <text x="276" y={y + 25} fontSize="11" fill="var(--accent)" style={mono}>
                ВАША КАРТОЧКА
              </text>
            )}
          </g>
        )
      })}

      <path className="draw" style={d(0.9)} pathLength={1} d="M372 262 C 396 220, 396 140, 376 104" stroke="var(--accent)" strokeWidth="2" />
      <path className="draw" style={d(1.9)} pathLength={1} d="M368 112 L376 102 L384 112" stroke="var(--accent)" strokeWidth="2" />
      <text className="fade" style={{ ...mono, ...d(1.6) }} x="252" y="292" fontSize="12" fill="var(--accent)">
        ↑ выше в выдаче
      </text>
    </Frame>
  )
}

/** 02 — a product card with infographic callouts. */
function DesignArt() {
  return (
    <Frame label="Карточка товара с инфографикой и выносками">
      <rect className="draw" pathLength={1} x="122" y="10" width="156" height="280" rx="18" stroke="currentColor" strokeWidth="1.5" />
      <rect className="fade" style={d(0.2)} x="134" y="24" width="132" height="150" rx="10" fill="currentColor" opacity="0.07" />
      {/* bottle */}
      <g className="draw-group">
        <rect className="draw" style={d(0.3)} pathLength={1} x="187" y="40" width="26" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <rect className="draw" style={d(0.4)} pathLength={1} x="178" y="54" width="44" height="106" rx="16" stroke="currentColor" strokeWidth="1.5" />
        <rect className="fade" style={d(0.8)} x="178" y="92" width="44" height="22" fill="var(--accent)" />
      </g>
      <rect className="fade" style={d(0.6)} x="134" y="24" width="48" height="22" rx="6" fill="var(--accent)" />
      <text className="fade" style={{ ...mono, ...d(0.6) }} x="158" y="39" fontSize="11" textAnchor="middle" fill="var(--accent-ink)">
        −30%
      </text>

      {/* callouts */}
      {[
        { from: [178, 70], to: [100, 50], label: '24 ч тепла', x: 12, y: 38, w: 88, delay: 1 },
        { from: [222, 104], to: [300, 84], label: 'BPA free', x: 300, y: 72, w: 88, delay: 1.2 },
        { from: [190, 150], to: [100, 176], label: '500 мл', x: 12, y: 164, w: 88, delay: 1.4 },
      ].map((c) => (
        <g key={c.label}>
          <circle className="fade" style={d(c.delay)} cx={c.from[0]} cy={c.from[1]} r="3.5" fill="var(--accent)" />
          <path className="draw" style={d(c.delay)} pathLength={1} d={`M${c.from[0]} ${c.from[1]} L${c.to[0]} ${c.to[1]}`} stroke="var(--accent)" strokeWidth="1.3" />
          <rect className="draw" style={d(c.delay + 0.2)} pathLength={1} x={c.x} y={c.y} width={c.w} height="24" rx="12" stroke="currentColor" strokeWidth="1.3" />
          <text className="fade" style={{ ...mono, ...d(c.delay + 0.3) }} x={c.x + c.w / 2} y={c.y + 16} fontSize="11" textAnchor="middle" fill="currentColor">
            {c.label}
          </text>
        </g>
      ))}

      <rect className="fade" style={d(0.9)} x="134" y="188" width="112" height="8" rx="4" fill="currentColor" opacity="0.8" />
      <rect className="fade" style={d(1)} x="134" y="204" width="76" height="8" rx="4" fill="currentColor" opacity="0.25" />
      <text className="fade" style={{ ...d(1.1), fontFamily: 'var(--font-display)' }} x="134" y="236" fontSize="17" fontWeight="800" fill="currentColor">
        990 ₽
      </text>
      <rect className="fade" style={d(1.2)} x="134" y="252" width="132" height="26" rx="13" fill="currentColor" />
    </Frame>
  )
}

/** 03 — a dashboard: KPI tiles, bars, trend line. */
function AnalyticsArt() {
  const bars = [46, 62, 54, 78, 70, 96, 112, 138]
  const base = 270
  return (
    <Frame label="Дашборд с юнит-экономикой и графиком роста">
      {[
        { x: 12, k: 'МАРЖА', v: '32%' },
        { x: 142, k: 'ROI', v: '3,4×' },
        { x: 272, k: 'ABC', v: 'A·B·C' },
      ].map((t, i) => (
        <g key={t.k}>
          <rect className="draw" style={d(i * 0.12)} pathLength={1} x={t.x} y="10" width="116" height="62" rx="10" stroke="currentColor" strokeWidth="1.3" />
          <text className="fade" style={{ ...mono, ...d(0.4 + i * 0.12) }} x={t.x + 14} y="32" fontSize="10" fill="currentColor" opacity="0.55">
            {t.k}
          </text>
          <text className="fade" style={{ ...d(0.5 + i * 0.12), fontFamily: 'var(--font-display)' }} x={t.x + 14} y="58" fontSize="20" fontWeight="800" fill={i === 1 ? 'var(--accent)' : 'currentColor'}>
            {t.v}
          </text>
        </g>
      ))}
      <path className="draw" pathLength={1} d={`M12 ${base} H388`} style={faint} strokeWidth="1" />
      {bars.map((h, i) => (
        <rect
          key={i}
          className="grow"
          style={{ ...d(0.5 + i * 0.07), transformOrigin: `0 ${base}px` }}
          x={24 + i * 46}
          y={base - h}
          width="26"
          height={h}
          rx="4"
          fill={i === bars.length - 1 ? 'var(--accent)' : 'currentColor'}
          opacity={i === bars.length - 1 ? 1 : 0.14}
        />
      ))}
      <path
        className="draw"
        style={d(1.2)}
        pathLength={1}
        d={`M37 ${base - 66} L83 ${base - 80} L129 ${base - 72} L175 ${base - 98} L221 ${base - 92} L267 ${base - 118} L313 ${base - 134} L359 ${base - 162}`}
        stroke="var(--accent)"
        strokeWidth="2"
      />
      <circle className="fade" style={d(2.2)} cx="359" cy={base - 162} r="5" fill="var(--accent)" />
    </Frame>
  )
}

/** 04 — the ad funnel down to orders, with ROAS. */
function AdsArt() {
  const steps = [
    { w: 330, k: 'ПОКАЗЫ', v: '120 000' },
    { w: 260, k: 'КЛИКИ', v: '6 400' },
    { w: 190, k: 'КОРЗИНА', v: '1 100' },
    { w: 124, k: 'ЗАКАЗЫ', v: '380' },
  ]
  return (
    <Frame label="Рекламная воронка от показов до заказов">
      {steps.map((s, i) => {
        const y = 12 + i * 56
        const next = steps[i + 1]?.w ?? s.w - 50
        const x1 = 200 - s.w / 2
        const x2 = 200 + s.w / 2
        const last = i === steps.length - 1
        return (
          <g key={s.k}>
            <path
              className={last ? 'fade' : 'draw'}
              style={d(i * 0.18)}
              pathLength={1}
              d={`M${x1} ${y} L${x2} ${y} L${200 + next / 2} ${y + 46} L${200 - next / 2} ${y + 46} Z`}
              stroke={last ? 'none' : 'currentColor'}
              strokeWidth="1.4"
              fill={last ? 'var(--accent)' : 'none'}
            />
            <text className="fade" style={{ ...mono, ...d(0.3 + i * 0.18) }} x="200" y={y + 20} fontSize="10" textAnchor="middle" fill={last ? 'var(--accent-ink)' : 'currentColor'} opacity={last ? 0.8 : 0.55}>
              {s.k}
            </text>
            <text className="fade" style={{ ...d(0.35 + i * 0.18), fontFamily: 'var(--font-display)' }} x="200" y={y + 38} fontSize="15" fontWeight="800" textAnchor="middle" fill={last ? 'var(--accent-ink)' : 'currentColor'}>
              {s.v}
            </text>
          </g>
        )
      })}
      <rect className="draw" style={d(1.1)} pathLength={1} x="138" y="248" width="124" height="36" rx="18" stroke="var(--accent)" strokeWidth="1.6" />
      <text className="fade" style={{ ...mono, ...d(1.4) }} x="200" y="271" fontSize="13" textAnchor="middle" fill="var(--accent)">
        ROAS 3×
      </text>
      <circle className="draw" style={d(1.2)} pathLength={1} cx="352" cy="262" r="22" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" />
      <circle className="draw" style={d(1.35)} pathLength={1} cx="352" cy="262" r="12" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
      <circle className="fade" style={d(1.6)} cx="352" cy="262" r="4" fill="var(--accent)" />
    </Frame>
  )
}

/** 05 — warehouses, stock levels, a refill threshold and a truck. */
function OpsArt() {
  const stores = [
    { x: 40, n: 3, k: 'КОЛЕДИНО' },
    { x: 160, n: 1, k: 'КАЗАНЬ' },
    { x: 280, n: 4, k: 'ЕКБ' },
  ]
  const floor = 244
  return (
    <Frame label="Остатки по складам и плановые поставки">
      <path className="draw" pathLength={1} d={`M12 ${floor} H388`} stroke="currentColor" strokeWidth="1.4" />
      {stores.map((s, si) => (
        <g key={s.k}>
          {Array.from({ length: s.n }).map((_, bi) => {
            const y = floor - 40 * (bi + 1)
            const low = s.n < 2
            return (
              <g key={bi} className="fade" style={d(0.3 + si * 0.15 + bi * 0.1)}>
                <rect x={s.x} y={y} width="80" height="38" rx="4" stroke={low ? 'var(--accent)' : 'currentColor'} strokeWidth="1.4" fill={low ? 'var(--accent-wash)' : 'none'} />
                <path d={`M${s.x + 40} ${y} V${y + 38} M${s.x} ${y + 12} H${s.x + 80}`} style={faint} strokeWidth="1.2" />
              </g>
            )
          })}
          <text className="fade" style={{ ...mono, ...d(0.5 + si * 0.15) }} x={s.x + 40} y={floor + 22} fontSize="10" textAnchor="middle" fill="currentColor" opacity="0.55">
            {s.k}
          </text>
        </g>
      ))}
      <path className="fade" style={d(1)} d={`M12 ${floor - 80} H388`} stroke="var(--accent)" strokeWidth="1.3" strokeDasharray="5 6" />
      <text className="fade" style={{ ...mono, ...d(1.3) }} x="14" y={floor - 88} fontSize="10" fill="var(--accent)">
        МИН. ОСТАТОК
      </text>
      {/* truck heading to the low warehouse */}
      <g className="truck fade" style={d(1.4)}>
        <rect x="150" y="18" width="62" height="34" rx="4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M212 28 H230 L242 40 V52 H212 Z" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="166" cy="56" r="6" stroke="currentColor" strokeWidth="1.4" fill="var(--paper)" />
        <circle cx="228" cy="56" r="6" stroke="currentColor" strokeWidth="1.4" fill="var(--paper)" />
        <text x="181" y="40" fontSize="10" textAnchor="middle" fill="var(--accent)" style={mono}>
          +120
        </text>
      </g>
      <path className="fade" style={d(1.6)} d="M200 74 V150" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="3 5" />
      <path className="draw" style={d(2)} pathLength={1} d="M193 142 L200 152 L207 142" stroke="var(--accent)" strokeWidth="1.4" />
    </Frame>
  )
}

const ART: Record<string, () => JSX.Element> = {
  '01': SeoArt,
  '02': DesignArt,
  '03': AnalyticsArt,
  '04': AdsArt,
  '05': OpsArt,
}

export function ExpertiseArt({ index }: { index: string }) {
  const Art = ART[index]
  return Art ? <Art /> : null
}
