import type { JSX } from 'react'
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
import { useContent } from '../content/store'
import type { HomeSectionKey } from '../content/site'

const SECTION_COMPONENTS: Record<HomeSectionKey, () => JSX.Element | null> = {
  about: About,
  marquee: Marquee,
  growthChart: GrowthChart,
  minimalGrid: MinimalGrid,
  services: Services,
  workList: WorkList,
  testimonials: Testimonials,
  edge: Edge,
  toolbox: Toolbox,
  caseStudies: CaseStudies,
  faq: Faq,
}

export function SitePage() {
  const { homeSections } = useContent()

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <Intro />
      <ScrollProgress />
      <Header />
      <div className="lg:pl-64">
        <main>
          <Hero />
          {homeSections.map((key) => {
            const Section = SECTION_COMPONENTS[key]
            return Section ? <Section key={key} /> : null
          })}
        </main>
        <Footer />
      </div>
    </div>
  )
}
