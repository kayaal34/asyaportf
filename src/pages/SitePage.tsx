import { Intro } from '../components/Intro'
import { ScrollProgress } from '../components/ScrollProgress'
import { Header } from '../components/layout/Header'
import { Hero } from '../components/Hero'
import { Colossal } from '../components/Colossal'
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
        <About />
        <Marquee />
        <GrowthChart />
        <Colossal word="×3" sub="Рост магазина за 38 дней" />
        <MinimalGrid />
        <WorkList />
        <Services />
        <Edge />
        <Toolbox />
        <CaseStudies />
      </main>
      <ContactCTA />
    </div>
  )
}
