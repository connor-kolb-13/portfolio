import { motion } from 'framer-motion'
import type { VisualKind } from '../content'
import { ease } from './motion'

const card = 'rounded-xl border border-line bg-surface shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)]'

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative isolate aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-bg-2"
    >
      <div aria-hidden className="aurora absolute inset-0 -z-10 opacity-80" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(var(--line-strong) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          maskImage: 'radial-gradient(80% 80% at 50% 50%, #000, transparent)',
        }}
      />
      {children}
    </div>
  )
}

const pop = (i: number) => ({
  initial: { opacity: 0, y: 14, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.8, ease, delay: 0.1 + i * 0.08 },
})

function Agents() {
  const agents = [
    { name: 'Discovery', x: '8%', y: '14%' },
    { name: 'Checks', x: '64%', y: '10%' },
    { name: 'Docs', x: '6%', y: '66%' },
    { name: 'Review', x: '66%', y: '68%' },
  ]
  return (
    <Frame label="Diagram of AI agents working around an engineer">
      <svg className="absolute inset-0 h-full w-full text-navy-bright" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden>
        {[
          [80, 62],
          [320, 52],
          [72, 222],
          [328, 226],
        ].map(([x, y], i) => (
          <path key={i} d={`M200 150 Q ${(x + 200) / 2} ${y < 150 ? 150 : 150} ${x} ${y}`} className="flow" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2" />
        ))}
      </svg>
      <motion.div {...pop(0)} className={`${card} absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2 p-3 text-center`}>
        <div className="mx-auto grid size-9 place-items-center rounded-full bg-navy font-display font-semibold tracking-tight text-[#f3e6c4]">ck</div>
        <p className="mt-2 text-[11px] font-medium text-ink">Engineer approves</p>
        <p className="font-mono text-[9px] text-muted">human in the loop</p>
      </motion.div>
      {agents.map((a, i) => (
        <motion.div
          key={a.name}
          {...pop(i + 1)}
          className={`${card} absolute flex items-center gap-2 px-2.5 py-2`}
          style={{ left: a.x, top: a.y }}
        >
          <span className="size-2 rounded-full bg-brass" />
          <span className="text-[11px] text-ink">{a.name} agent</span>
        </motion.div>
      ))}
      <motion.div {...pop(6)} className="absolute bottom-3 left-1/2 w-[72%] -translate-x-1/2 rounded-lg border border-line bg-bg/80 px-3 py-2 font-mono text-[9.5px] text-ink-2 backdrop-blur">
        <span className="text-brass">skill</span> environment-check · shared with the team
      </motion.div>
    </Frame>
  )
}

function Pipeline() {
  return (
    <Frame label="Data flowing from sources into a secured hub and reports">
      <div className="absolute inset-0 flex items-center justify-between gap-3 px-[6%]">
        <div className="flex w-[22%] flex-col gap-2">
          {['Core banking', 'Loans', 'Files'].map((s, i) => (
            <motion.div key={s} {...pop(i)} className={`${card} px-2 py-2 text-[10px] text-ink`}>
              {s}
            </motion.div>
          ))}
        </div>
        <motion.div {...pop(3)} className="relative flex h-[70%] w-[38%] flex-col items-center justify-center rounded-2xl border border-dashed border-brass/60 p-3">
          <span className="absolute -top-2.5 left-3 bg-bg-2 px-1.5 font-mono text-[9px] uppercase tracking-widest text-brass">
            ⌂ bank network
          </span>
          <div className={`${card} w-full p-3 text-center`}>
            <p className="text-[11px] font-medium text-ink">Data hub</p>
            <p className="mt-1 font-mono text-[9px] text-muted">kerberos · backups · rbac</p>
          </div>
          <div className="mt-3 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1 w-6 rounded-full bg-navy-bright/40" />
            ))}
          </div>
        </motion.div>
        <motion.div {...pop(4)} className={`${card} w-[26%] p-2.5`}>
          <p className="text-[10px] text-ink">Reporting</p>
          <div className="mt-2 flex h-14 items-end gap-1">
            {[40, 62, 48, 80, 70, 92].map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-sm bg-navy-bright/70"
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease, delay: 0.5 + i * 0.06 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
      <svg className="absolute inset-0 h-full w-full text-navy-bright" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden>
        <path d="M112 150 H140" className="flow" stroke="currentColor" strokeOpacity="0.6" fill="none" />
        <path d="M268 150 H290" className="flow" stroke="currentColor" strokeOpacity="0.6" fill="none" />
      </svg>
    </Frame>
  )
}

function Studio() {
  const lanes = [
    { name: 'Plan', cards: ['Scope v2', 'Decision log'] },
    { name: 'Build', cards: ['Auth flow', 'API'] },
    { name: 'Review', cards: ['PR checks'] },
    { name: 'Ship', cards: ['Awaiting CK'] },
  ]
  return (
    <Frame label="Board of AI agent lanes from planning to shipping">
      <div className="absolute inset-[7%] grid grid-cols-4 gap-2">
        {lanes.map((l, i) => (
          <motion.div key={l.name} {...pop(i)} className="flex flex-col gap-1.5 rounded-xl border border-line bg-bg/40 p-1.5">
            <p className="px-1 font-mono text-[9px] uppercase tracking-widest text-muted">{l.name}</p>
            {l.cards.map((c, j) => (
              <div
                key={c}
                className={`${card} px-2 py-1.5 text-[10px] ${l.name === 'Ship' ? 'border-brass/60 text-brass' : 'text-ink'}`}
              >
                {c}
                {l.name !== 'Ship' && <span className="mt-1 block h-1 w-[70%] rounded-full bg-line-strong" style={{ width: `${55 + j * 20}%` }} />}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
      <motion.div {...pop(5)} className="absolute bottom-[7%] right-[7%] rounded-full border border-brass/50 bg-bg/80 px-3 py-1 font-mono text-[9.5px] text-brass backdrop-blur">
        ● human gate before deploy
      </motion.div>
    </Frame>
  )
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[86%] w-[38%] rounded-[22px] border border-line-strong bg-surface p-1.5 shadow-[var(--shadow)]">
      <div className="absolute left-1/2 top-2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-line-strong" />
      <div className="h-full overflow-hidden rounded-[17px] bg-bg pt-5">{children}</div>
    </div>
  )
}

function Storefront() {
  return (
    <Frame label="Phone showing a bakery catalog with an order confirmation">
      <div className="absolute inset-0 flex items-center justify-center gap-[6%]">
          <Phone>
            <div className="px-2.5">
              <p className="font-display text-[13px] text-ink">Today’s bakes</p>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {['#c99a5b', '#8a5a3c', '#e3c48f', '#b0764a'].map((c, i) => (
                  <div key={i} className="rounded-lg border border-line bg-surface p-1">
                    <div className="aspect-square rounded-md" style={{ background: `radial-gradient(circle at 40% 35%, ${c}, ${c}55 70%)` }} />
                    <span className="mt-1 block h-1 w-3/4 rounded-full bg-line-strong" />
                  </div>
                ))}
              </div>
            </div>
          </Phone>
        <div className="flex w-[34%] flex-col gap-2">
          <motion.div {...pop(2)} className={`${card} p-2.5`}>
            <p className="text-[10px] text-muted">Before</p>
            <p className="mt-1 text-[11px] text-ink">“is the lemon loaf still available??”</p>
            <p className="mt-1 font-mono text-[9px] text-muted">47 comments</p>
          </motion.div>
          <motion.div {...pop(3)} className={`${card} border-brass/50 p-2.5`}>
            <p className="text-[10px] text-brass">After</p>
            <p className="mt-1 text-[11px] text-ink">Order #0142 placed</p>
            <p className="mt-1 font-mono text-[9px] text-muted">pickup Sat · 9:00 AM</p>
          </motion.div>
        </div>
      </div>
    </Frame>
  )
}

function Club() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const booked = new Set([2, 5, 6, 9, 12, 13, 19, 20])
  return (
    <Frame label="Reservation calendar for club boats and gear">
      <div className="absolute inset-[7%] grid grid-cols-5 gap-3">
        <motion.div {...pop(0)} className={`${card} col-span-3 p-3`}>
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-ink">Boat and rod reservations</p>
            <span className="font-mono text-[9px] text-muted">April</span>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {days.map((d, i) => (
              <span key={i} className="text-center font-mono text-[8px] text-muted">
                {d}
              </span>
            ))}
            {Array.from({ length: 21 }).map((_, i) => (
              <motion.span
                key={i}
                className={`aspect-square rounded-[5px] border ${booked.has(i) ? 'border-transparent bg-navy-bright/70' : 'border-line bg-bg/50'}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.02 }}
              />
            ))}
          </div>
        </motion.div>
        <div className="col-span-2 flex flex-col gap-2">
          <motion.div {...pop(2)} className={`${card} p-2.5`}>
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted">Members</p>
            <p className="display mt-1 text-2xl text-ink">130</p>
          </motion.div>
          <motion.div {...pop(3)} className={`${card} p-2.5`}>
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted">Shop</p>
            <p className="mt-1 text-[11px] text-ink">Team jersey</p>
            <span className="mt-1 inline-block rounded-full bg-brass px-2 py-0.5 text-[9px] text-brass-ink">Add to cart</span>
          </motion.div>
          <motion.div {...pop(4)} className="rounded-xl border border-dashed border-brass/60 p-2 text-center font-mono text-[9px] text-brass">
            pro bono
          </motion.div>
        </div>
      </div>
    </Frame>
  )
}

function Resident() {
  return (
    <Frame label="Phone showing condo announcements and a maintenance request">
      <div className="absolute inset-0 flex items-center justify-center gap-[6%]">
        <Phone>
          <div className="space-y-1.5 px-2.5">
            <p className="font-display text-[13px] text-ink">Good morning</p>
            {[
              { t: 'Pool reopens Friday', s: 'Board · 2h' },
              { t: 'Hurricane prep checklist', s: 'Management · 1d' },
              { t: 'Garage sweep Tuesday', s: 'Board · 3d' },
            ].map((n, i) => (
              <motion.div key={n.t} {...pop(i)} className="rounded-lg border border-line bg-surface p-1.5">
                <p className="text-[9.5px] text-ink">{n.t}</p>
                <p className="font-mono text-[8px] text-muted">{n.s}</p>
              </motion.div>
            ))}
          </div>
        </Phone>
        <div className="flex w-[34%] flex-col gap-2">
          <motion.div {...pop(3)} className={`${card} p-2.5`}>
            <p className="text-[10px] text-muted">Request #18</p>
            <p className="mt-1 text-[11px] text-ink">Hallway light out</p>
            <div className="mt-2 flex gap-1">
              <span className="h-1 flex-1 rounded-full bg-brass" />
              <span className="h-1 flex-1 rounded-full bg-brass" />
              <span className="h-1 flex-1 rounded-full bg-line-strong" />
            </div>
            <p className="mt-1 font-mono text-[9px] text-muted">in progress</p>
          </motion.div>
          <motion.div {...pop(4)} className="rounded-xl border border-dashed border-brass/60 p-2 text-center font-mono text-[9px] text-brass">
            in design · pro bono
          </motion.div>
        </div>
      </div>
    </Frame>
  )
}

export default function CaseVisual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case 'agents':
      return <Agents />
    case 'pipeline':
      return <Pipeline />
    case 'studio':
      return <Studio />
    case 'storefront':
      return <Storefront />
    case 'club':
      return <Club />
    case 'resident':
      return <Resident />
  }
}
