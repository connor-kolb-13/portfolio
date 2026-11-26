import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Diagram from '../components/Diagram'
import { MaskLines, Reveal, ease } from '../components/motion'
import SectionLink from '../components/SectionLink'
import { cases, profile } from '../content'
import NotFound from './NotFound'

function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3">
      <span className="font-mono text-[11px] text-brass">{n}</span>
      <span className="eyebrow">{children}</span>
    </h2>
  )
}

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
    { k: 'For', v: c.context },
    { k: 'My role', v: c.role },
    { k: 'Timeline', v: c.timeline },
  ]

  let section = 0
  const num = () => String(++section).padStart(2, '0')

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

        <h1 className="display mt-8 max-w-[18ch] text-[clamp(2.4rem,5.8vw,5rem)] leading-[1]">
          <MaskLines lines={[c.title]} delay={0.1} />
        </h1>
        <motion.p
          className="mt-8 max-w-[46rem] text-[18px] leading-relaxed text-ink-2 sm:text-[20px]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.35 }}
        >
          {c.summary}
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
              <dd className="mt-2 text-[15px] leading-snug text-ink">{m.v}</dd>
            </div>
          ))}
        </motion.dl>

        {c.results.length > 0 && (
          <motion.dl
            className={`mt-4 grid gap-px overflow-hidden rounded-2xl border border-line bg-line ${
              c.results.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'
            }`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.55 }}
          >
            {c.results.map((r) => (
              <div key={r.label} className="bg-surface/50 p-6 sm:p-7">
                <dt className="sr-only">{r.label}</dt>
                <dd>
                  <span className="display block text-[clamp(2.2rem,4vw,3.25rem)] leading-none text-ink">{r.value}</span>
                  <span className="mt-3 block max-w-[22rem] text-[14px] leading-snug text-ink-2">{r.label}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
        )}

        <div className="mt-28 grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="space-y-10 lg:sticky lg:top-28">
              <div>
                <p className="eyebrow">Stack</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.stack.map((s) => (
                    <li key={s} className="rounded-pill border border-line px-3 py-1.5 text-[13px] text-ink-2">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              {c.myPart && (
                <div>
                  <p className="eyebrow">What I owned</p>
                  <ul className="mt-4 space-y-2.5">
                    {c.myPart.map((p) => (
                      <li key={p} className="flex gap-3 text-[14px] leading-snug text-ink-2">
                        <span aria-hidden className="mt-[7px] h-px w-3 shrink-0 bg-brass" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>

          <div className="space-y-24 lg:col-span-8 lg:col-start-5">
            <Reveal as="section">
              <Label n={num()}>The problem</Label>
              {c.problem.map((p, k) => (
                <p
                  key={p}
                  className={
                    k === 0
                      ? 'display mt-6 text-[clamp(1.4rem,2.3vw,1.95rem)] leading-[1.3] text-ink'
                      : 'mt-5 text-[17px] leading-relaxed text-ink-2'
                  }
                >
                  {p}
                </p>
              ))}
            </Reveal>

            {c.constraints.length > 0 && (
              <Reveal as="section">
                <Label n={num()}>What made it hard</Label>
                <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                  {c.constraints.map((x) => (
                    <li key={x.title} className="bg-bg p-6">
                      <p className="text-[16px] font-medium text-ink">{x.title}</p>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{x.body}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <section>
              <Reveal>
                <Label n={num()}>{c.builtLabel ?? 'What I built'}</Label>
              </Reveal>
              <ol className="mt-6">
                {c.built.map((b, n) => (
                  <Reveal as="li" key={b.title} delay={n * 0.05} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-8">
                    <span className="font-mono text-[12px] text-muted">0{n + 1}</span>
                    <div>
                      <h3 className="text-[19px] font-medium text-ink">{b.title}</h3>
                      <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{b.body}</p>
                      {b.decision && (
                        <p className="mt-4 rounded-xl border-l-2 border-brass bg-surface/50 py-3 pl-4 pr-4 text-[14.5px] leading-relaxed text-ink-2">
                          <span className="font-medium text-ink">Why: </span>
                          {b.decision}
                        </p>
                      )}
                    </div>
                  </Reveal>
                ))}
              </ol>
            </section>
          </div>
        </div>

        {c.diagram && (
          <Reveal as="section" className="mt-24">
            <div className="mb-6 lg:ml-[calc((100%+2.5rem)/12*4)]">
              <Label n={num()}>How it works</Label>
            </div>
            <Diagram spec={c.diagram} index={c.index} />
          </Reveal>
        )}

        <div className="mt-24 grid gap-16 lg:grid-cols-12">
          <div className="space-y-24 lg:col-span-8 lg:col-start-5">
            <Reveal as="section" className="rounded-3xl border border-line bg-surface/60 p-8 sm:p-10">
              <Label n={num()}>{c.changedLabel ?? 'What changed'}</Label>
              <ul className="mt-6 space-y-5">
                {c.changed.map((x) => (
                  <li key={x} className="flex gap-4 text-[17px] leading-relaxed text-ink">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brass" />
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>

            {c.lesson && (
              <Reveal as="section">
                <Label n={num()}>{c.status ? 'What comes next' : 'What I took from it'}</Label>
                <p className="mt-6 text-[17px] leading-relaxed text-ink-2">{c.lesson}</p>
              </Reveal>
            )}
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
            <p className="display mt-4 max-w-[20ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.02] transition-transform duration-700 ease-out-expo group-hover:translate-x-2">
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
