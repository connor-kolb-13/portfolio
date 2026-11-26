import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'

export const ease = [0.16, 1, 0.3, 1] as const

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'p' | 'span'
}) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </M>
  )
}

/** Headline that rises in line by line behind a mask. */
export function MaskLines({
  lines,
  className,
  delay = 0,
  emphasis,
}: {
  lines: string[]
  className?: string
  delay?: number
  emphasis?: string
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => {
        const emIndex = emphasis ? line.indexOf(emphasis) : -1
        return (
          <span key={i} className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease, delay: delay + i * 0.09 }}
            >
              {emIndex >= 0 ? (
                <>
                  {line.slice(0, emIndex)}
                  <em className="italic text-brass" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>
                    {emphasis}
                  </em>
                  {line.slice(emIndex + (emphasis?.length ?? 0))}
                </>
              ) : (
                line
              )}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}

export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString('en-US'))

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, { duration: 1.8, ease })
    return () => controls.stop()
  }, [inView, mv, value])

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  )
}

export function SectionHead({
  index,
  label,
  title,
  aside,
}: {
  index: string
  label: string
  title: ReactNode
  aside?: ReactNode
}) {
  return (
    <div className="grid gap-6 border-t border-line pt-6 md:grid-cols-12 md:gap-8">
      <Reveal className="flex items-center gap-3 md:col-span-3">
        <span className="eyebrow text-brass">{index}</span>
        <span className="eyebrow">{label}</span>
      </Reveal>
      <Reveal delay={0.05} className="md:col-span-6">
        <h2 className="display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.02]">{title}</h2>
      </Reveal>
      {aside && (
        <Reveal delay={0.1} className="text-[15px] leading-relaxed text-ink-2 md:col-span-3 md:pt-2">
          {aside}
        </Reveal>
      )}
    </div>
  )
}
