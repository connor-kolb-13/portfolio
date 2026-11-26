import { useEffect, useState } from 'react'

// Preview-only control for comparing headline fonts. The live site ships one choice.
const options = [
  { id: 'sans', label: 'Sans' },
  { id: 'serif', label: 'Serif' },
  { id: 'grotesk', label: 'Grotesk' },
] as const

type FontId = (typeof options)[number]['id']

function read(): FontId {
  const f = document.documentElement.getAttribute('data-font')
  return f === 'serif' || f === 'grotesk' ? f : 'sans'
}

export default function FontSwitcher() {
  const [font, setFont] = useState<FontId>(read)

  useEffect(() => {
    const root = document.documentElement
    if (font === 'sans') root.removeAttribute('data-font')
    else root.setAttribute('data-font', font)
    try {
      localStorage.setItem('ck-font', font)
    } catch {
      /* storage can be blocked; the choice still applies for this visit */
    }
  }, [font])

  return (
    <div
      role="radiogroup"
      aria-label="Headline font"
      className="fixed bottom-[calc(16px+env(safe-area-inset-bottom,0px))] left-1/2 z-[70] flex -translate-x-1/2 items-center gap-1 rounded-full border border-line-strong bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] p-1 shadow-[var(--shadow)] backdrop-blur-xl"
    >
      <span className="eyebrow px-3">Font</span>
      {options.map((o) => (
        <button
          key={o.id}
          id={`font-${o.id}`}
          type="button"
          role="radio"
          aria-checked={font === o.id}
          onClick={() => setFont(o.id)}
          className={`h-8 rounded-full px-3.5 text-[13px] transition-colors duration-300 ${
            font === o.id ? 'bg-brass text-brass-ink' : 'text-ink-2 hover:bg-surface-2/60 hover:text-ink'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
