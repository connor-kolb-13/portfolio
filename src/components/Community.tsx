import { community } from '../content'
import { Reveal, SectionHead } from './motion'

export default function Community() {
  return (
    <section id="community" className="scroll-mt-24 bg-bg-2 py-28 sm:py-36" aria-labelledby="community-title">
      <div className="mx-auto max-w-(--container) px-5 sm:px-8">
        <SectionHead
          index="04"
          label="Community"
          title={
            <span id="community-title">
              Built for the people <em className="text-brass">next door.</em>
            </span>
          }
        />
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <blockquote className="display relative text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.18] text-ink">
              <span aria-hidden className="absolute -left-1 -top-9 font-display text-7xl text-brass/50">
                “
              </span>
              {community.quote}
            </blockquote>
          </Reveal>
          <ul className="flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line lg:col-span-5">
            {community.items.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 0.07} className="bg-bg-2 p-6">
                <p className="text-[15px] font-medium text-ink">{c.label}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">{c.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
