import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { capabilities, hero, profile, stats } from '../content'
import { CountUp, MaskLines, Reveal, ease } from './motion'
import SectionLink from './SectionLink'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 sm:pt-36" aria-labelledby="hero-title">
      <motion.div aria-hidden style={{ y: glowY }} className="aurora pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <motion.div
          className="flex flex-wrap items-center gap-x-4 gap-y-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-3 py-1.5 backdrop-blur">
            <span className="pulse-dot size-1.5 rounded-full bg-brass" />
            <span className="eyebrow !text-ink-2">{profile.location}</span>
          </span>
          <span className="eyebrow">{hero.kicker}</span>
        </motion.div>

        <div className="mt-10 grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h1 id="hero-title" className="display text-[clamp(2.7rem,7.4vw,6.4rem)] leading-[0.95]">
              <MaskLines lines={hero.headline} emphasis={hero.emphasis} delay={0.15} />
            </h1>
            <motion.p
              className="mt-8 max-w-[38rem] text-[17px] leading-relaxed text-ink-2 sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.55 }}
            >
              {hero.lede}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.68 }}
            >
              <SectionLink
                to="work"
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-brass px-6 text-[15px] font-medium text-brass-ink transition-transform duration-500 ease-out-expo hover:-translate-y-0.5"
              >
                See the work
                <span className="transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5" aria-hidden>
                  ↓
                </span>
              </SectionLink>
              <SectionLink
                to="contact"
                className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-[15px] text-ink transition-colors duration-300 hover:bg-surface-2/60"
              >
                Start a conversation
              </SectionLink>
            </motion.div>
          </div>

          <motion.figure
            className="relative mx-auto w-full max-w-[340px] lg:col-span-4 lg:mx-0 lg:ml-auto"
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 0.96, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface shadow-[var(--shadow)]">
              <img
                src={`${import.meta.env.BASE_URL}portrait.jpg`}
                alt={`Portrait of ${profile.name}`}
                width={800}
                height={800}
                className="aspect-[4/5] w-full object-cover object-[50%_20%] saturate-[0.9]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b17]/85 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-[#ecf0f8]">
                <div>
                  <p className="font-display text-xl leading-tight">{profile.name}</p>
                  <p className="mt-1 text-[13px] text-[#b7c2d9]">{profile.role}</p>
                </div>
                <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] backdrop-blur">
                  WPB · FL
                </span>
              </figcaption>
            </div>
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-[34px] border border-line"
              style={{ maskImage: 'linear-gradient(135deg, #000 30%, transparent 70%)' }}
            />
          </motion.figure>
        </div>

        <dl className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-bg p-6 sm:p-8">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="display block text-5xl text-ink sm:text-6xl">
                  <CountUp value={s.value} />
                  {s.suffix}
                </span>
                <span className="mt-3 block max-w-[18rem] text-[14px] leading-snug text-muted">{s.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="marquee mt-16 overflow-hidden border-y border-line py-5" aria-label="What I work on">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...capabilities, ...capabilities].map((c, i) => (
            <span key={i} className="flex items-center gap-10 text-[15px] text-ink-2" aria-hidden={i >= capabilities.length}>
              {c}
              <span className="text-brass" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
