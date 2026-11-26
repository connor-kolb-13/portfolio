import { experience } from '../content'
import { Reveal, SectionHead } from './motion'

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-28 sm:py-36" aria-labelledby="experience-title">
      <div className="mx-auto max-w-(--container) px-5 sm:px-8">
        <SectionHead
          index="03"
          label="Experience"
          title={
            <span id="experience-title">
              Enterprise rigor, <em className="text-brass">small-shop</em> speed.
            </span>
          }
          aside="I learned delivery inside a professional services firm and apply it everywhere else: design first, document everything, hand over cleanly."
        />
        <ol className="mt-16">
          {experience.map((e, i) => (
            <Reveal
              as="li"
              key={e.org}
              delay={i * 0.05}
              className="group grid gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-8"
            >
              <span className="font-mono text-[12px] text-muted md:col-span-3 md:pt-2">{e.when}</span>
              <div className="md:col-span-4">
                <h3 className="display text-[1.85rem] leading-tight transition-colors duration-500 group-hover:text-brass">{e.org}</h3>
                <p className="mt-1 text-[14px] text-ink-2">{e.role}</p>
              </div>
              <p className="text-[15px] leading-relaxed text-ink-2 md:col-span-5 md:pt-2">{e.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
