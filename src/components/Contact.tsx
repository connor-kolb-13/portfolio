import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { profile } from '../content'
import { MaskLines, Reveal } from './motion'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const links = [
    profile.linkedin && { label: 'LinkedIn', href: profile.linkedin },
    { label: 'GitHub', href: profile.github },
    { label: profile.studio.name, href: profile.studio.url },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-40" aria-labelledby="contact-title">
      <div aria-hidden className="aurora pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-(--container) px-5 sm:px-8">
        <Reveal className="flex items-center gap-3">
          <span className="eyebrow text-brass">05</span>
          <span className="eyebrow">Contact</span>
        </Reveal>
        <h2 id="contact-title" className="display mt-8 text-[clamp(2.6rem,8vw,7rem)] leading-[0.95]">
          <InViewLines />
        </h2>
        <Reveal delay={0.15} className="mt-10 max-w-[36rem] text-[17px] leading-relaxed text-ink-2">
          Running a business or a community group in South Florida and wondering where AI could actually help? I’m glad to sit down
          and look at it with you.
        </Reveal>

        <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex h-14 items-center gap-3 rounded-pill bg-brass px-7 text-[16px] font-medium text-brass-ink transition-transform duration-500 ease-out-expo hover:-translate-y-0.5"
          >
            {profile.email}
            <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </a>
          <button
            type="button"
            onClick={copy}
            className="relative inline-flex h-14 min-w-[9.5rem] items-center justify-center overflow-hidden rounded-pill border border-line-strong px-6 text-[15px] text-ink transition-colors duration-300 hover:bg-surface-2/60"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? 'done' : 'idle'}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {copied ? 'Copied ✓' : 'Copy email'}
              </motion.span>
            </AnimatePresence>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Email address copied' : ''}
            </span>
          </button>
        </Reveal>

        <Reveal delay={0.25} className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="link-u text-[15px] text-ink-2 hover:text-ink">
              {l.label} <span aria-hidden>↗</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function InViewLines() {
  const [show, setShow] = useState(false)
  return (
    <motion.span className="block" onViewportEnter={() => setShow(true)} viewport={{ once: true, margin: '0px 0px -15% 0px' }}>
      {show ? (
        <MaskLines lines={['Let’s put AI to work', 'on Main Street.']} emphasis="Main Street." />
      ) : (
        <span className="invisible">
          Let’s put AI to work
          <br />
          on Main Street.
        </span>
      )}
    </motion.span>
  )
}
