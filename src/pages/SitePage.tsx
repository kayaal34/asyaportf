import { Intro } from '../components/Intro'
import { ScrollProgress } from '../components/ScrollProgress'
import { Header } from '../components/layout/Header'
import { Hero } from '../components/Hero'
import { Colossal } from '../components/Colossal'
import { ScrollScene } from '../components/ScrollScene'
import { About } from '../components/About'
import { Marquee } from '../components/Marquee'
import { GrowthChart } from '../components/GrowthChart'
import { MinimalGrid } from '../components/MinimalGrid'
import { WorkList } from '../components/WorkList'
import { Services } from '../components/Services'
import { Edge } from '../components/Edge'
import { Toolbox } from '../components/Toolbox'
import { CaseStudies } from '../components/CaseStudies'
import { ContactCTA } from '../components/ContactCTA'

export function SitePage() {
  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <Intro />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />

        <Colossal word="×3" sub="Рост магазина за 38 дней" />

        <About />
        <Marquee />
        <GrowthChart />
        <MinimalGrid />

        <ScrollScene image="/asya/case-infographic.png" align="end" dim={0.5}>
          <p className="text-xs font-medium tracking-[0.28em] text-ink-soft uppercase">
            Визуальная упаковка
          </p>
          <h2 className="mt-5 max-w-4xl text-headline text-balance">
            Карточки, которые невозможно пролистать мимо
          </h2>
        </ScrollScene>

        <WorkList />

        <ScrollScene image="/asya/case-product-photo.jpg" align="end" dim={0.55}>
          <p className="text-xs font-medium tracking-[0.28em] text-ink-soft uppercase">
            Форматы работы
          </p>
          <h2 className="mt-5 max-w-4xl text-headline text-balance">
            От разового аудита до ведения магазина под ключ
          </h2>
        </ScrollScene>

        <Services />
        <Edge />
        <Toolbox />
        <CaseStudies />
      </main>
      <ContactCTA />
    </div>
  )
}
