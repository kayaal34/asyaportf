import { useRef, type CSSProperties } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { ScrollWords } from './fx'
import { useContent } from '../content/store'

const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

/**
 * The dark chapter. It arrives as an inset rounded panel and widens to fill the
 * screen as you scroll into it; each row then draws its rule and slides its
 * figure and copy in from opposite sides.
 */
export function Edge() {
  const { edge: EDGE, edgeIntro: EDGE_INTRO } = useContent()
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.15'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const borderRadius = useTransform(scrollYProgress, [0, 1], [48, 0])

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { scale, borderRadius }}
      className="origin-top overflow-hidden bg-ink text-paper"
    >
      <Section id="edge">
        <SectionHeading kicker={EDGE_INTRO.kicker} title={EDGE_INTRO.title} invert />

        <div className="mt-14 lg:mt-20">
          {EDGE.map((item, index) => (
            <Reveal
              group
              key={`${item.title}-${index}`}
              className="relative grid grid-cols-1 gap-6 py-12 lg:grid-cols-4 lg:gap-8 lg:py-16"
            >
              <span aria-hidden className="sr-c absolute inset-x-0 top-0 h-px bg-paper/15" data-sr="line" />
              <div className="sr-c flex flex-col gap-3 lg:col-span-2" data-sr="left" style={d(0.15)}>
                <span className="font-display text-figure font-bold text-paper">
                  {item.figure}
                </span>
                <span className="font-mono text-[0.7rem] tracking-[0.08em] text-paper/50 uppercase">{item.figureLabel}</span>
              </div>

              <div className="sr-c max-w-xl lg:col-span-2 lg:pt-4" data-sr="right" style={d(0.28)}>
                <h3 className="text-2xl font-extrabold tracking-[-0.035em] text-paper sm:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-paper/65">{item.body}</p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-paper/15" />
        </div>

        <ScrollWords
          text="Итог всех пунктов — предсказуемость. Вы понимаете, за счёт чего растёт магазин, и можете это повторить."
          className="mt-16 max-w-4xl text-[clamp(1.5rem,3vw,2.8rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-paper lg:ml-[25%]"
          dim={0.18}
        />
      </Section>
    </motion.div>
  )
}
