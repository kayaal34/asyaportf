import { Header } from './components/layout/Header'
import { Hero } from './components/Hero'
import { MinimalGrid } from './components/MinimalGrid'
import { Edge } from './components/Edge'
import { CaseStudies } from './components/CaseStudies'
import { ContactCTA } from './components/ContactCTA'

export default function App() {
  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <Hero />
        <MinimalGrid />
        <Edge />
        <CaseStudies />
      </main>
      <ContactCTA />
    </div>
  )
}
