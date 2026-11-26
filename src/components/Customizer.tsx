import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ease } from './motion'

// Preview-only panel for comparing fonts and overall styles. The live site ships one choice.
const fonts = [
  { id: 'geist', label: 'Geist', family: '"Geist"' },
  { id: 'inter-tight', label: 'Inter Tight', family: '"Inter Tight"' },
  { id: 'manrope', label: 'Manrope', family: '"Manrope"' },
  { id: 'jakarta', label: 'Plus Jakarta', family: '"Plus Jakarta Sans"' },
  { id: 'sora', label: 'Sora', family: '"Sora"' },
  { id: 'hanken', label: 'Hanken Grotesk', family: '"Hanken Grotesk"' },
] as const

const styles = [
  { id: 'editorial', label: 'Editorial', note: 'Balanced spacing, soft corners, navy glow' },
  { id: 'enterprise', label: 'Enterprise', note: 'Tighter, small corners, wider, no grain' },
  { id: 'studio', label: 'Studio', note: 'Airy spacing, big soft corners, more glow' },
  { id: 'swiss', label: 'Swiss', note: 'Square corners, strong grid, no glow' },
  { id: 'compact', label: 'Compact', note: 'Dense and wide, more on screen at once' },
] as const

type FontId = (typeof fonts)[number]['id']
type StyleId = (typeof styles)[number]['id']

function readAttr<T extends string>(name: string, allowed: readonly { id: T }[], fallback: T): T {
  const v = document.documentElement.getAttribute(name)
  return (allowed.find((o) => o.id === v)?.id ?? fallback) as T
}

function apply(name: string, value: string, fallback: string, key: string) {
  const root = document.documentElement
  if (value === fallback) root.removeAttribute(name)
  else root.setAttribute(name, value)
  try {
    localStorage.setItem(key, value)
  } catch {
    /* storage can be blocked; the choice still applies for this visit */
  }
}

function Chip({ active, onClick, children, id }: { active: boolean; onClick: () => void; children: React.ReactNode; id: string }) {
  return (
    <button
      id={id}
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`rounded-pill border px-3 py-1.5 text-left text-[13px] transition-colors duration-300 ${
        active ? 'border-brass bg-brass text-brass-ink' : 'border-line text-ink-2 hover:border-line-strong hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

export default function Customizer() {
  const [open, setOpen] = useState(false)
  const [font, setFont] = useState<FontId>(() => readAttr('data-font', fonts, 'geist'))
  const [style, setStyle] = useState<StyleId>(() => readAttr('data-style', styles, 'editorial'))

  useEffect(() => apply('data-font', font, 'geist', 'ck-font'), [font])
  useEffect(() => apply('data-style', style, 'editorial', 'ck-style'), [style])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const currentStyle = styles.find((s) => s.id === style)!

  return (
    <div className="fixed bottom-[calc(16px+env(safe-area-inset-bottom,0px))] right-[max(16px,env(safe-area-inset-right,0px))] z-[70] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            id="customizer-panel"
            role="dialog"
            aria-label="Customize the preview"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.35, ease }}
            className="w-[min(22rem,calc(100vw-32px))] rounded-2xl border border-line-strong bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] p-5 shadow-[var(--shadow)] backdrop-blur-xl"
          >
            <div className="flex items-baseline justify-between">
              <p className="text-[15px] font-medium text-ink">Customize</p>
              <p className="eyebrow">Preview only</p>
            </div>

            <p className="eyebrow mt-5">Font</p>
            <div role="radiogroup" aria-label="Font" className="mt-2.5 flex flex-wrap gap-1.5">
              {fonts.map((f) => (
                <Chip key={f.id} id={`font-${f.id}`} active={font === f.id} onClick={() => setFont(f.id)}>
                  <span style={{ fontFamily: `${f.family}, ui-sans-serif, system-ui, sans-serif` }}>{f.label}</span>
                </Chip>
              ))}
            </div>

            <p className="eyebrow mt-5">Style</p>
            <div role="radiogroup" aria-label="Style" className="mt-2.5 flex flex-wrap gap-1.5">
              {styles.map((s) => (
                <Chip key={s.id} id={`style-${s.id}`} active={style === s.id} onClick={() => setStyle(s.id)}>
                  {s.label}
                </Chip>
              ))}
            </div>
            <p className="mt-3 text-[13px] leading-snug text-muted" aria-live="polite">
              {currentStyle.note}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-expanded={open}
        aria-controls="customizer-panel"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-11 items-center gap-2 rounded-pill border border-line-strong bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] px-4 text-[14px] text-ink shadow-[var(--shadow)] backdrop-blur-xl transition-colors duration-300 hover:border-brass"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M4 7h10M18 7h2M4 17h4M12 17h8" strokeLinecap="round" />
          <circle cx="16" cy="7" r="2" />
          <circle cx="10" cy="17" r="2" />
        </svg>
        {open ? 'Close' : 'Customize'}
      </button>
    </div>
  )
}
