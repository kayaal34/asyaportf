import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useContent } from '../content/store'

export function Edge() {
  const { edge: EDGE, edgeIntro: EDGE_INTRO } = useContent()

  return (
    <Section id="edge" className="bg-ink text-paper">
      <SectionHeading kicker={EDGE_INTRO.kicker} title={EDGE_INTRO.title} invert />

      <div className="mt-14 lg:mt-20">
        {EDGE.map((item, index) => (
          <Reveal
            as="div"
            key={`${item.title}-${index}`}
            delay={index * 0.05}
            className="grid grid-cols-1 gap-6 border-t border-paper/15 py-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12 lg:py-16"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-display text-figure font-extrabold tracking-[-0.04em] text-paper">
                {item.figure}
              </span>
              <span className="text-sm text-paper/50">{item.figureLabel}</span>
            </div>

            <div className="max-w-xl">
              <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-paper sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-paper/65">{item.body}</p>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-paper/15" />
      </div>

      <Reveal className="mt-14">
        <p className="max-w-2xl text-lead text-paper/70">
          Итог всех пунктов — предсказуемость. Вы понимаете, за счёт чего растёт магазин, и можете
          это повторить.
        </p>
      </Reveal>
    </Section>
  )
}
