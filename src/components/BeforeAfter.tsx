import { Reveal } from './Reveal'

/**
 * Plain card vs. reworked card — a one-glance illustration of the design service.
 * Pure inline SVG so it themes with the site tokens.
 */
export function BeforeAfter() {
  return (
    <Reveal className="mt-14">
      <figure className="overflow-hidden rounded-2xl border border-line bg-paper-raised p-5 sm:p-8">
        <svg viewBox="0 0 920 380" className="h-auto w-full" role="img" aria-label="Карточка товара до и после переработки">
          <defs>
            <style>{`
              .lbl { font: 700 13px var(--font-display); letter-spacing: 2px; fill: var(--ink-faint); }
              .lbl-a { fill: var(--accent); }
            `}</style>
          </defs>

          {/* BEFORE */}
          <text x="20" y="22" className="lbl">КАРТОЧКА ДО</text>
          <g transform="translate(20 40)">
            <rect width="360" height="320" rx="14" fill="none" stroke="var(--line)" />
            <rect x="90" y="26" width="180" height="150" rx="10" fill="var(--ink)" opacity="0.06" />
            <rect x="28" y="200" width="220" height="14" rx="6" fill="var(--ink)" opacity="0.18" />
            <rect x="28" y="226" width="150" height="14" rx="6" fill="var(--ink)" opacity="0.12" />
            <rect x="28" y="268" width="110" height="26" rx="6" fill="var(--ink)" opacity="0.22" />
          </g>

          <g transform="translate(430 190)" opacity="0.4">
            <circle r="20" fill="none" stroke="var(--ink)" />
            <path d="M-6 -6 L6 0 L-6 6 Z" fill="var(--ink)" />
          </g>

          {/* AFTER */}
          <text x="520" y="22" className="lbl lbl-a">КАРТОЧКА ПОСЛЕ</text>
          <g transform="translate(520 40)">
            <rect width="380" height="320" rx="14" fill="none" stroke="var(--ink)" opacity="0.25" />
            <rect x="20" y="20" width="340" height="150" rx="10" fill="var(--ink)" opacity="0.09" />
            <rect x="90" y="46" width="98" height="98" rx="14" fill="var(--ink)" opacity="0.18" />
            <rect x="20" y="20" width="66" height="28" rx="7" fill="var(--accent)" />
            <text x="53" y="39" textAnchor="middle" fontFamily="var(--font-display)" fontSize={13} fontWeight={700} fill="var(--accent-ink)">-30%</text>
            <rect x="20" y="188" width="250" height="14" rx="6" fill="var(--ink)" opacity="0.75" />
            <rect x="20" y="210" width="170" height="14" rx="6" fill="var(--ink)" opacity="0.3" />
            <rect x="20" y="238" width="96" height="24" rx="6" fill="var(--ink)" />
            <rect x="128" y="243" width="60" height="14" rx="6" fill="var(--ink)" opacity="0.25" />
            {/* infographic feature rows */}
            <g transform="translate(20 278)">
              <rect width="24" height="24" rx="6" fill="var(--accent)" opacity="0.16" />
              <rect x="34" y="6" width="150" height="12" rx="6" fill="var(--ink)" opacity="0.22" />
              <rect x="200" width="24" height="24" rx="6" fill="var(--accent)" opacity="0.16" />
              <rect x="234" y="6" width="120" height="12" rx="6" fill="var(--ink)" opacity="0.22" />
            </g>
            <rect x="20" y="314" width="340" height="34" rx="17" fill="var(--ink)" />
          </g>
        </svg>
        <figcaption className="mt-4 text-sm text-ink-soft">
          Слева — как было: пустой визуал без структуры. Справа — переработка: инфографика под
          возражения, выноски, читаемая иерархия, единый стиль.
        </figcaption>
      </figure>
    </Reveal>
  )
}
