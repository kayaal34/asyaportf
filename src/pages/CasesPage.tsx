import { Page, PageHead } from '../components/layout/Page'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { GrowthChart } from '../components/GrowthChart'
import { useContent } from '../content/store'

export function CasesPage() {
  const { cases } = useContent()
  const [main, ...rest] = cases

  return (
    <Page>
      <PageHead
        kicker="Кейсы"
        title="Кратный рост вблизи"
        lead="Реальные проекты с цифрами до и после. Метрики — из кабинетов клиентов."
      />

      {/* Main case — full width */}
      {main && (
        <Section>
          <Reveal>
            <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
              Главный кейс · {main.period}
            </p>
            <h2 className="mt-4 text-headline text-balance">{main.label}</h2>
          </Reveal>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="max-w-xl text-lead text-ink-soft">{main.summary}</p>
              <ol className="mt-8 flex flex-col gap-4">
                {main.steps.map((step, i) => (
                  <li key={step} className="flex gap-4 border-t border-line pt-4">
                    <span className="font-display text-sm font-bold text-ink-faint tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[0.95rem] leading-relaxed text-ink-soft">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <dl className="grid grid-cols-2 gap-6">
                {main.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs tracking-[0.12em] text-ink-faint uppercase">{s.label}</dt>
                    <dd className="mt-1 font-display text-xl font-extrabold tracking-[-0.03em]">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {main.table && (
                <div className="mt-8 overflow-x-auto">
                  <table className="w-full min-w-[26rem] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-line text-left text-xs tracking-[0.1em] text-ink-faint uppercase">
                        <th className="py-3 pr-4 font-medium">Метрика</th>
                        <th className="py-3 pr-4 font-medium">До</th>
                        <th className="py-3 pr-4 font-medium">После</th>
                        <th className="py-3 font-medium">Δ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {main.table.map((r) => (
                        <tr key={r.metric} className="border-b border-line/60">
                          <td className="py-3 pr-4 font-medium">{r.metric}</td>
                          <td className="py-3 pr-4 text-ink-soft tabular-nums">{r.before}</td>
                          <td className="py-3 pr-4 font-semibold tabular-nums">{r.after}</td>
                          <td className="py-3 font-semibold text-accent tabular-nums">{r.delta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {main.insight && (
            <p className="mt-10 max-w-3xl border-l-2 border-accent pl-5 text-[0.975rem] leading-relaxed text-ink-soft">
              {main.insight}
            </p>
          )}

          {main.proofImage && (
            <figure className="mt-12">
              <div className="overflow-hidden rounded-2xl border border-line bg-paper-raised">
                <img
                  src={main.proofImage}
                  alt="Скриншот аналитики кабинета"
                  loading="lazy"
                  className="w-full"
                />
              </div>
              {main.proofCaption && (
                <figcaption className="mt-3 text-xs text-ink-faint">{main.proofCaption}</figcaption>
              )}
            </figure>
          )}
        </Section>
      )}

      <GrowthChart />

      {/* Other cases */}
      {rest.length > 0 && (
        <Section>
          <p className="text-xs font-medium tracking-[0.2em] text-ink-faint uppercase">
            Другие проекты
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {rest.map((c, i) => (
              <Reveal as="article" key={c.id} delay={(i % 2) * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-paper-raised p-8">
                  <span className="text-xs tracking-[0.14em] text-ink-faint uppercase">
                    {c.period}
                  </span>
                  <h3 className="mt-3 text-xl font-extrabold tracking-[-0.02em] sm:text-2xl">
                    {c.label}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                    {c.summary}
                  </p>
                  <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5">
                    {c.stats.map((s) => (
                      <div key={s.label}>
                        <dt className="text-xs text-ink-faint">{s.label}</dt>
                        <dd className="font-display text-sm font-bold tracking-[-0.02em]">
                          {s.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </Page>
  )
}
