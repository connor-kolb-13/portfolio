import { motion } from 'framer-motion'
import type { DiagramSpec, DiagramNode, NodeKind, Side } from '../content'
import { ease } from './motion'

/* ------------------------------------------------------------------
   Architecture diagrams, drawn from data in content.ts.
   Fixed viewBox (no distortion), theme-aware colors, numbered steps
   that match the walkthrough printed under the figure.
------------------------------------------------------------------- */

type Pt = { x: number; y: number }

function anchor(n: DiagramNode, side: Side, offset = 0): Pt {
  switch (side) {
    case 'l':
      return { x: n.x, y: n.y + n.h / 2 + offset }
    case 'r':
      return { x: n.x + n.w, y: n.y + n.h / 2 + offset }
    case 't':
      return { x: n.x + n.w / 2 + offset, y: n.y }
    case 'b':
      return { x: n.x + n.w / 2 + offset, y: n.y + n.h }
  }
}

const horizontal = (s: Side) => s === 'l' || s === 'r'

function route(a: Pt, sa: Side, b: Pt, sb: Side): Pt[] {
  if (Math.abs(a.x - b.x) < 1 || Math.abs(a.y - b.y) < 1) return [a, b]
  if (horizontal(sa) && horizontal(sb)) {
    const mx = (a.x + b.x) / 2
    return [a, { x: mx, y: a.y }, { x: mx, y: b.y }, b]
  }
  if (!horizontal(sa) && !horizontal(sb)) {
    const my = (a.y + b.y) / 2
    return [a, { x: a.x, y: my }, { x: b.x, y: my }, b]
  }
  if (horizontal(sa)) return [a, { x: b.x, y: a.y }, b]
  return [a, { x: a.x, y: b.y }, b]
}

function rounded(pts: Pt[], r = 10): string {
  let d = `M${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i - 1]
    const c = pts[i]
    const n = pts[i + 1]
    const d1 = Math.hypot(c.x - p.x, c.y - p.y)
    const d2 = Math.hypot(n.x - c.x, n.y - c.y)
    const k = Math.min(r, d1 / 2, d2 / 2)
    const s = { x: c.x - ((c.x - p.x) / d1) * k, y: c.y - ((c.y - p.y) / d1) * k }
    const e = { x: c.x + ((n.x - c.x) / d2) * k, y: c.y + ((n.y - c.y) / d2) * k }
    d += ` L${s.x} ${s.y} Q${c.x} ${c.y} ${e.x} ${e.y}`
  }
  const last = pts[pts.length - 1]
  return d + ` L${last.x} ${last.y}`
}

function midpoint(pts: Pt[], at = 0.5): Pt {
  const segs = pts.slice(1).map((p, i) => Math.hypot(p.x - pts[i].x, p.y - pts[i].y))
  let target = segs.reduce((a, b) => a + b, 0) * at
  for (let i = 0; i < segs.length; i++) {
    if (target <= segs[i]) {
      const t = segs[i] ? target / segs[i] : 0
      return { x: pts[i].x + (pts[i + 1].x - pts[i].x) * t, y: pts[i].y + (pts[i + 1].y - pts[i].y) * t }
    }
    target -= segs[i]
  }
  return pts[pts.length - 1]
}

function Glyph({ kind, x, y }: { kind: NodeKind; x: number; y: number }) {
  const s = { stroke: 'currentColor', strokeWidth: 1.4, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <g transform={`translate(${x} ${y})`} className="text-navy-bright">
      <rect x="0" y="0" width="28" height="28" rx="6" fill="var(--surface-2)" stroke="var(--line)" />
      <g transform="translate(6 6)">
        {kind === 'person' && (
          <>
            <circle cx="8" cy="5.5" r="3" {...s} />
            <path d="M2.5 15c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5" {...s} />
          </>
        )}
        {kind === 'agent' && (
          <path d="M8 1.5l1.6 4.4L14 7.5l-4.4 1.6L8 13.5 6.4 9.1 2 7.5l4.4-1.6z" {...s} className="text-brass" stroke="var(--brass)" />
        )}
        {kind === 'store' && (
          <>
            <ellipse cx="8" cy="3.5" rx="5.5" ry="2" {...s} />
            <path d="M2.5 3.5v9c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2v-9M2.5 8c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2" {...s} />
          </>
        )}
        {kind === 'service' && (
          <>
            <rect x="2" y="2.5" width="12" height="11" rx="2" {...s} />
            <path d="M2 6h12M5 4.25h.01M7 4.25h.01" {...s} />
          </>
        )}
        {kind === 'code' && <path d="M5.5 4.5L2 8l3.5 3.5M10.5 4.5L14 8l-3.5 3.5M9 3l-2 10" {...s} />}
        {kind === 'doc' && (
          <>
            <path d="M4 1.5h5.5L13 5v9.5H4z" {...s} />
            <path d="M9.5 1.5V5H13M6 8.5h5M6 11h5" {...s} />
          </>
        )}
        {kind === 'device' && (
          <>
            <rect x="4" y="1.5" width="8" height="13" rx="1.8" {...s} />
            <path d="M7 12.2h2" {...s} />
          </>
        )}
        {kind === 'external' && (
          <>
            <circle cx="8" cy="8" r="6" {...s} />
            <path d="M2 8h12M8 2c1.8 1.8 2.6 3.8 2.6 6S9.8 12.2 8 14C6.2 12.2 5.4 10.2 5.4 8S6.2 3.8 8 2" {...s} />
          </>
        )}
        {kind === 'shield' && (
          <>
            <path d="M8 1.5l5.5 2v4.2c0 3.3-2.3 5.7-5.5 6.8-3.2-1.1-5.5-3.5-5.5-6.8V3.5z" {...s} />
            <path d="M5.5 8l1.8 1.8L10.8 6.3" {...s} />
          </>
        )}
      </g>
    </g>
  )
}

export default function Diagram({ spec, index }: { spec: DiagramSpec; index: string }) {
  const nodes = Object.fromEntries(spec.nodes.map((n) => [n.id, n]))
  const edges = spec.edges.map((e) => {
    const a = nodes[e.from]
    const b = nodes[e.to]
    const pts = e.via
      ? [anchor(a, e.fromSide, e.fromOffset), ...e.via, anchor(b, e.toSide, e.toOffset)]
      : route(anchor(a, e.fromSide, e.fromOffset), e.fromSide, anchor(b, e.toSide, e.toOffset), e.toSide)
    return { ...e, d: rounded(pts), badge: e.step ? midpoint(pts, e.badgeAt ?? 0.5) : null }
  })
  const markerId = `arrow-${index}`

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-bg-2">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line px-5 py-4 sm:px-6">
        <span className="flex items-baseline gap-3">
          <span className="shrink-0 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-brass">Fig. {index}</span>
          <span className="text-[15px] text-ink">{spec.title}</span>
        </span>
        <span className="font-mono text-[11px] text-muted">{spec.caption}</span>
        <span className="w-full font-mono text-[11px] text-brass md:hidden">Swipe to see the whole diagram →</span>
      </figcaption>

      <div className="relative overflow-x-auto [scrollbar-width:thin]">
        <svg
          viewBox={`0 0 ${spec.width} ${spec.height}`}
          className="block h-auto w-full min-w-[760px]"
          role="img"
          aria-labelledby={`diagram-${index}-desc`}
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <desc id={`diagram-${index}-desc`}>{spec.alt}</desc>
          <defs>
            <pattern id={`dots-${index}`} width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill="var(--line-strong)" />
            </pattern>
            <marker id={markerId} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M1 1.5L8.5 5 1 8.5" fill="none" stroke="var(--navy-bright)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
          <rect width={spec.width} height={spec.height} fill={`url(#dots-${index})`} opacity="0.55" />

          {spec.zones?.map((z, i) => (
            <motion.g
              key={z.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease, delay: i * 0.05 }}
            >
              <rect
                x={z.x}
                y={z.y}
                width={z.w}
                height={z.h}
                rx="14"
                fill={z.tone === 'accent' ? 'color-mix(in oklab, var(--brass) 5%, transparent)' : 'color-mix(in oklab, var(--navy-bright) 4%, transparent)'}
                stroke={z.tone === 'accent' ? 'color-mix(in oklab, var(--brass) 55%, transparent)' : 'var(--line-strong)'}
                strokeDasharray="5 5"
              />
              <text
                x={z.x + 16}
                y={z.y + 24}
                fill={z.tone === 'accent' ? 'var(--brass)' : 'var(--muted)'}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em' }}
              >
                {z.label.toUpperCase()}
              </text>
            </motion.g>
          ))}

          {edges.map((e, i) => (
            <motion.path
              key={`${e.from}-${e.to}-${i}`}
              d={e.d}
              fill="none"
              stroke="var(--navy-bright)"
              strokeOpacity={e.style === 'muted' ? 0.35 : 0.7}
              strokeWidth="1.5"
              strokeDasharray={e.style === 'dashed' || e.style === 'muted' ? '4 5' : undefined}
              markerEnd={e.both ? `url(#${markerId})` : `url(#${markerId})`}
              markerStart={e.both ? `url(#${markerId})` : undefined}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1.1, ease, delay: 0.35 + i * 0.07 }}
            />
          ))}

          {spec.nodes.map((n, i) => (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.04 }}
            >
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={n.h}
                rx="9"
                fill="var(--surface)"
                stroke={n.highlight ? 'var(--brass)' : 'var(--line-strong)'}
                strokeWidth={n.highlight ? 1.4 : 1}
              />
              <Glyph kind={n.kind} x={n.x + 12} y={n.y + (n.h - 28) / 2} />
              <text x={n.x + 50} y={n.y + n.h / 2 - (n.sub ? 3 : -5)} fill="var(--ink)" style={{ fontSize: 14, fontWeight: 500 }}>
                {n.label}
              </text>
              {n.sub && (
                <text x={n.x + 50} y={n.y + n.h / 2 + 15} fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5 }}>
                  {n.sub}
                </text>
              )}
            </motion.g>
          ))}

          {edges.map(
            (e, i) =>
              e.badge && (
                <motion.g
                  key={`b-${i}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  transition={{ duration: 0.5, ease, delay: 0.9 + i * 0.07 }}
                  style={{ transformOrigin: `${e.badge.x}px ${e.badge.y}px` }}
                >
                  <circle cx={e.badge.x} cy={e.badge.y} r="11" fill="var(--brass)" stroke="var(--bg-2)" strokeWidth="3" />
                  <text
                    x={e.badge.x}
                    y={e.badge.y + 4}
                    textAnchor="middle"
                    fill="var(--brass-ink)"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600 }}
                  >
                    {e.step}
                  </text>
                </motion.g>
              ),
          )}
        </svg>
      </div>

      {spec.steps.length > 0 && (
        <ol className="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {spec.steps.map((s, i) => (
            <li key={s} className="flex gap-3.5 bg-bg-2 px-5 py-4 sm:px-6">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brass font-mono text-[10.5px] font-semibold text-brass-ink">
                {i + 1}
              </span>
              <span className="text-[14px] leading-relaxed text-ink-2">{s}</span>
            </li>
          ))}
        </ol>
      )}
    </figure>
  )
}
