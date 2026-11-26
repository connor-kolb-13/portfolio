import { approach } from '../content'
import { Reveal, SectionHead } from './motion'

export default function Approach() {
  return (
    <section id="approach" className="scroll-mt-24 bg-bg-2 py-28 sm:py-36" aria-labelledby="approach-title">
      <div className="mx-auto max-w-(--container) px-5 sm:px-8">
        <SectionHead
          index="02"
          label="Approach"
          title={
            <span id="approach-title">
              Useful beats <em className="text-brass">impressive.</em>
            </span>
          }
          aside="Most businesses don’t need an AI strategy. They need one hour a day back, and someone who will sit beside them until it sticks."
        />
        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {approach.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.08} className="group relative bg-bg-2 p-8 sm:p-10">
              <span className="display block text-[5.5rem] leading-none text-line-strong transition-colors duration-700 group-hover:text-brass/60">
                {i + 1}
              </span>
              <h3 className="display mt-6 text-[1.7rem] leading-tight">{a.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{a.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
