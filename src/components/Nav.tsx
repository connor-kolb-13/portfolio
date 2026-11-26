import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../content'
import SectionLink from './SectionLink'
import { useTheme } from '../theme'

const links = [
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'experience', label: 'Experience' },
  { id: 'community', label: 'Community' },
]

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="group relative grid size-10 place-items-center rounded-pill border border-line text-ink-2 transition-colors duration-300 hover:border-line-strong hover:text-ink"
    >
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
        <motion.circle
          cx="12"
          cy="12"
          animate={{ r: dark ? 8 : 4.5 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          fill={dark ? 'currentColor' : 'none'}
          fillOpacity={dark ? 0.12 : 0}
        />
        <motion.circle
          cx="12"
          cy="12"
          r="8"
          fill="var(--bg)"
          stroke="none"
          animate={{ cx: dark ? 16.5 : 30, cy: dark ? 8 : -6 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        />
        <motion.g
          animate={{ opacity: dark ? 0 : 1, rotate: dark ? -45 : 0, scale: dark ? 0.6 : 1 }}
          style={{ originX: '12px', originY: '12px' }}
          transition={{ duration: 0.4 }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="12" y1="2.5" x2="12" y2="4.5" transform={`rotate(${a} 12 12)`} strokeLinecap="round" />
          ))}
        </motion.g>
      </svg>
    </button>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? 'border-b border-line bg-[color-mix(in_oklab,var(--bg)_78%,transparent)] backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-(--container) items-center justify-between gap-6 px-5 sm:h-[72px] sm:px-8">
          <Link to="/" className="group flex items-center gap-3" aria-label={`${profile.name}, home`}>
            <span className="grid size-9 place-items-center rounded-pill bg-navy font-display text-[15px] font-semibold tracking-tight text-[#f3e6c4] ring-1 ring-white/10 transition-transform duration-500 ease-out-expo group-hover:-rotate-12">
              ck
            </span>
            <span className="hidden font-display text-[17px] tracking-tight text-ink sm:block">{profile.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <SectionLink
                key={l.id}
                to={l.id}
                className="rounded-pill px-3.5 py-2 text-[14px] text-ink-2 transition-colors duration-300 hover:bg-surface-2/60 hover:text-ink"
              >
                {l.label}
              </SectionLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SectionLink
              to="contact"
              className="hidden h-10 items-center gap-2 rounded-pill bg-ink px-4 text-[14px] font-medium text-bg transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 sm:inline-flex"
            >
              Get in touch
              <span aria-hidden>→</span>
            </SectionLink>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-pill border border-line md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 top-0 h-px w-4 bg-ink transition-transform duration-500 ease-out-expo ${
                    open ? 'translate-y-1.5 rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-4 bg-ink transition-transform duration-500 ease-out-expo ${
                    open ? '-translate-y-1.5 -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
        <motion.div
          aria-hidden
          className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-brass"
          style={{ scaleX: progress }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-bg px-5 pt-24 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {[...links, { id: 'contact', label: 'Contact' }].map((l, i) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLink
                    to={l.id}
                    onNavigate={() => setOpen(false)}
                    className="display flex items-baseline justify-between border-b border-line py-5 text-4xl"
                  >
                    {l.label}
                    <span className="eyebrow">0{i + 1}</span>
                  </SectionLink>
                </motion.div>
              ))}
            </nav>
            <p className="eyebrow mt-10">{profile.location}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
