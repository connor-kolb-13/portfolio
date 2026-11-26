import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import CaseVisual from '../components/CaseVisual'
import { MaskLines, Reveal, ease } from '../components/motion'
import { cases, profile } from '../content'
import NotFound from './NotFound'
import SectionLink from '../components/SectionLink'

export default function CasePage() {
  const { slug } = useParams()
  const i = cases.findIndex((c) => c.slug === slug)
  const c = cases[i]

  useEffect(() => {
    if (c) document.title = `${c.short} · ${profile.name}`
  }, [c])

  if (!c) return <NotFound />
  const next = cases[(i + 1) % cases.length]

  const meta = [
    { k: 'Sector', v: c.sector },
    { k: 'Context', v: c.context },
    { k: 'Role', v: c.role },
    { k: 'Timeline', v: c.timeline },
  ]

  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="relative"
    >
      <div aria-hidden className="aurora pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80vh]" />
      <article className="mx-auto max-w-(--container) px-5 pt-28 sm:px-8 sm:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-wrap items-center gap-3"
        >
          <SectionLink to="work" className="link-u text-[14px] text-ink-2 hover:text-ink">
            ← All work
          </SectionLink>
          <span className="text-line-strong">/</span>
          <span className="eyebrow">Case {c.index}</span>
          {c.status && (
            <span className="rounded-pill border border-brass/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-brass">
              {c.status}
            </span>
          )}
        </motion.div>

        <h1 className="display mt-8 max-w-[16ch] text-[clamp(2.5rem,6.4vw,5.6rem)] leading-[0.98]">
          <MaskLines lines={[c.title]} delay={0.1} />
        </h1>
        <motion.p
          className="mt-8 max-w-[40rem] text-[18px] leading-relaxed text-ink-2 sm:text-xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.35 }}
        >
          {c.outcome}
        </motion.p>

        <motion.dl
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.45 }}
        >
          {meta.map((m) => (
            <div key={m.k} className="bg-bg p-5">
              <dt className="eyebrow">{m.k}</dt>
              <dd className="mt-2 text-[15px] text-ink">{m.v}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.55 }}
        >
          <CaseVisual kind={c.visual} />
        </motion.div>

        <div className="mt-24 grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Stack</p>
              <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-start">
                {c.stack.map((s) => (
                  <li key={s} className="rounded-pill border border-line px-3 py-1.5 text-[13px] text-ink-2">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="space-y-20 lg:col-span-8 lg:col-start-5">
            <Reveal as="section">
              <h2 className="eyebrow text-brass">The problem</h2>
              {c.problem.map((p) => (
                <p key={p} className="display mt-5 text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.3] text-ink">
                  {p}
                </p>
              ))}
            </Reveal>

            <section>
              <Reveal>
                <h2 className="eyebrow text-brass">What I built</h2>
              </Reveal>
              <ol className="mt-6">
                {c.built.map((b, n) => (
                  <Reveal as="li" key={b.title} delay={n * 0.06} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-7">
                    <span className="font-mono text-[12px] text-muted">0{n + 1}</span>
                    <div>
                      <h3 className="text-[19px] font-medium text-ink">{b.title}</h3>
                      <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{b.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </section>

            <Reveal as="section" className="rounded-3xl border border-line bg-surface/60 p-8 sm:p-10">
              <h2 className="eyebrow text-brass">What changed</h2>
              <ul className="mt-6 space-y-5">
                {c.changed.map((x) => (
                  <li key={x} className="flex gap-4 text-[17px] leading-relaxed text-ink">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brass" />
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </article>

      <Link
        to={`/work/${next.slug}`}
        className="group mt-32 block border-t border-line transition-colors duration-500 hover:bg-surface/40"
      >
        <div className="mx-auto flex max-w-(--container) items-end justify-between gap-8 px-5 py-16 sm:px-8 sm:py-24">
          <div>
            <p className="eyebrow">Next case · {next.index}</p>
            <p className="display mt-4 text-[clamp(2rem,5vw,4rem)] leading-[1] transition-transform duration-700 ease-out-expo group-hover:translate-x-2">
              {next.title}
            </p>
          </div>
          <span
            aria-hidden
            className="grid size-14 shrink-0 place-items-center rounded-pill border border-line-strong text-xl transition-all duration-500 ease-out-expo group-hover:border-brass group-hover:bg-brass group-hover:text-brass-ink"
          >
            →
          </span>
        </div>
      </Link>
    </motion.main>
  )
}
