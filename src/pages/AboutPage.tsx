import { Page, PageHead } from '../components/layout/Page'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { useContent } from '../content/store'

export function AboutPage() {
  const { aboutPage: a, certs } = useContent()

  return (
    <Page>
      <PageHead kicker={a.kicker} title={a.title} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-line bg-paper-raised">
              <img
                src={a.photo}
                alt="Анастасия Тюшева"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-lead text-ink-soft text-balance">{a.lead}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <ul className="mt-8 flex flex-col gap-3 border-t border-line pt-8">
                {a.closes.map((c) => (
                  <li key={c} className="flex gap-3 text-[1rem] text-ink">
                    <span aria-hidden className="mt-1 text-accent">
                      ✓
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="bg-ink text-paper">
        <SectionHeading kicker="В цифрах" title="Немного статистики обо мне" invert />
        <div className="mt-12 grid grid-cols-2 gap-8 lg:mt-16 lg:grid-cols-4">
          {a.numbers.map((n, i) => (
            <Reveal as="div" key={n.label} delay={i * 0.06}>
              <p className="font-display text-figure font-extrabold tracking-[-0.04em] text-paper">
                {n.value}
              </p>
              <p className="mt-2 text-sm text-paper/55">{n.label}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading kicker="Образование" title="База, а не набор курсов" />
        <div className="mt-12 border-t border-line lg:mt-16">
          {certs.map((c) => (
            <div
              key={c.title}
              className="grid gap-4 border-b border-line py-8 md:grid-cols-[1fr_1.4fr_1fr] md:gap-10"
            >
              <div>
                <p className="font-display text-lg font-bold tracking-[-0.02em]">{c.org}</p>
                <p className="text-sm text-ink-faint">{c.year}</p>
              </div>
              <div>
                <p className="font-semibold text-ink">{c.title}</p>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{c.note}</p>
              </div>
              {c.image && (
                <a
                  href={c.image}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block max-w-[16rem] overflow-hidden rounded-lg border border-line"
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                  />
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading kicker="Философия" title="Почему я работаю на результат" />
        <ul className="mt-12 flex flex-col gap-6 lg:mt-16">
          {a.philosophy.map((p, i) => (
            <Reveal as="li" key={p} delay={i * 0.06} className="flex gap-5 border-t border-line pt-6">
              <span className="font-display text-lg font-bold text-ink-faint tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="max-w-2xl text-[1.05rem] leading-relaxed text-ink">{p}</span>
            </Reveal>
          ))}
        </ul>
      </Section>
    </Page>
  )
}
