import { Intro } from '../components/Intro'
import { ScrollProgress } from '../components/ScrollProgress'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/Hero'
import { Colossal } from '../components/Colossal'
import { About } from '../components/About'
import { Marquee } from '../components/Marquee'
import { GrowthChart } from '../components/GrowthChart'
import { MinimalGrid } from '../components/MinimalGrid'
import { Services } from '../components/Services'
import { WorkList } from '../components/WorkList'
import { Testimonials } from '../components/Testimonials'
import { Edge } from '../components/Edge'
import { Toolbox } from '../components/Toolbox'
import { CaseStudies } from '../components/CaseStudies'
import { Faq } from '../components/Faq'

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
        <Services />
        <WorkList />
        <Testimonials />
        <Edge />
        <Toolbox />
        <CaseStudies />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
