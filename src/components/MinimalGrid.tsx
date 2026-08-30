import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useContent } from '../content/store'
import { cn } from '../lib/cn'

/** Asymmetrical placement on lg+, honest flow on smaller screens. */
const PLACEMENT: Record<string, string> = {
  '01': 'sm:col-span-2 lg:col-span-7 lg:col-start-1',
  '02': 'lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:-translate-y-2',
  '03': 'lg:col-span-4 lg:col-start-1 lg:translate-y-6',
  '04': 'lg:col-span-3 lg:col-start-6 lg:translate-y-20',
  '05': 'sm:col-span-2 lg:col-span-8 lg:col-start-1 lg:translate-y-10',
}

export function MinimalGrid() {
  const { expertise: EXPERTISE, expertiseIntro: EXPERTISE_INTRO } = useContent()

  return (
    <Section id="expertise">
      <SectionHeading kicker={EXPERTISE_INTRO.kicker} title={EXPERTISE_INTRO.title} />

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-24 lg:grid-cols-12 lg:items-start lg:gap-6">
        {EXPERTISE.map((item, i) => (
          <Reveal
            as="div"
            key={item.index}
            delay={i * 0.06}
            className={cn(PLACEMENT[item.index])}
          >
            <article
              className={cn(
                'group flex h-full flex-col justify-between rounded-3xl border border-line bg-paper-raised p-8 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-line-strong sm:p-10',
                item.scale === 'tall' && 'lg:min-h-[32rem]',
                item.scale === 'wide' && 'lg:min-h-[15rem]',
              )}
            >
              <span className="font-display text-sm font-bold tracking-[0.1em] text-ink-faint">
                {item.index}
              </span>
              <div className="mt-16 sm:mt-24">
                <h3 className="text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-md text-[0.975rem] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
