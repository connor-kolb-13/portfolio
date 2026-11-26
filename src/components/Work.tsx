import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cases, moreBuilds } from '../content'
import CaseVisual from './CaseVisual'
import { Reveal, SectionHead, ease } from './motion'

export default function Work() {
  const [active, setActive] = useState(0)
  const current = cases[active]

  return (
    <section id="work" className="scroll-mt-24 py-28 sm:py-36" aria-labelledby="work-title">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHead
          index="01"
          label="Selected work"
          title={
            <span id="work-title">
              Real problems, <em className="text-brass">real</em> changes.
            </span>
          }
          aside="Each project starts with how people actually worked and ends with what is different now. Client names stay private; the outcomes don’t."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <ol className="lg:col-span-7">
            {cases.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 0.04}>
                <Link
                  to={`/work/${c.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative grid grid-cols-[auto_1fr_auto] items-start gap-x-5 border-b border-line py-7 sm:gap-x-8"
                  aria-describedby={`case-${c.slug}-outcome`}
                >
                  <span
                    className={`font-mono text-[12px] tabular-nums transition-colors duration-500 ${
                      active === i ? 'text-brass' : 'text-muted'
                    }`}
                  >
                    {c.index}
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="eyebrow">{c.sector}</span>
                      {c.status && (
                        <span className="rounded-full border border-brass/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-brass">
                          {c.status}
                        </span>
                      )}
                    </span>
                    <span className="display mt-2 block text-[clamp(1.5rem,2.6vw,2.15rem)] leading-[1.08] text-ink transition-transform duration-700 ease-out-expo group-hover:translate-x-1.5">
                      {c.title}
                    </span>
                    <span id={`case-${c.slug}-outcome`} className="mt-2 block max-w-[34rem] text-[15px] leading-relaxed text-ink-2">
                      {c.outcome}
                    </span>
                    <span className="mt-5 block lg:hidden">
                      <CaseVisual kind={c.visual} />
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="mt-1 grid size-10 place-items-center rounded-full border border-line text-ink-2 transition-all duration-500 ease-out-expo group-hover:border-brass group-hover:bg-brass group-hover:text-brass-ink"
                  >
                    <span className="transition-transform duration-500 ease-out-expo group-hover:-rotate-45">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                  transition={{ duration: 0.5, ease }}
                >
                  <CaseVisual kind={current.visual} />
                  <div className="mt-5 flex items-start justify-between gap-6">
                    <div>
                      <p className="eyebrow">{current.context}</p>
                      <p className="mt-2 text-[14px] text-ink-2">{current.role}</p>
                    </div>
                    <ul className="flex flex-wrap justify-end gap-1.5">
                      {current.stack.slice(0, 3).map((s) => (
                        <li key={s} className="rounded-full border border-line px-2.5 py-1 text-[12px] text-muted">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <Reveal className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
            <h3 className="eyebrow">More builds</h3>
            <span className="eyebrow">Side projects and smaller work</span>
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-b-2xl bg-line sm:grid-cols-2 lg:grid-cols-4">
            {moreBuilds.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 0.06} className="group bg-bg p-6 transition-colors duration-500 hover:bg-surface/60">
                <p className="eyebrow text-brass">{b.kind}</p>
                <p className="display mt-3 text-2xl">{b.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{b.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
