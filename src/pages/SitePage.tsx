import { Intro } from '../components/Intro'
import { ScrollProgress } from '../components/ScrollProgress'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/Hero'
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
      <div className="lg:pl-64">
        <main>
          <Hero />
          <About />
          <Marquee />
          <GrowthChart />
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
    </div>
  )
}
