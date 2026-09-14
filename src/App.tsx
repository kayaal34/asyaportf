import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContentProvider } from './content/store'
import { Analytics } from './components/Analytics'
import { SitePage } from './pages/SitePage'

const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })))
const AiPage = lazy(() => import('./pages/AiPage').then((m) => ({ default: m.AiPage })))
const CasesPage = lazy(() => import('./pages/CasesPage').then((m) => ({ default: m.CasesPage })))
const AdminApp = lazy(() => import('./admin/AdminApp').then((m) => ({ default: m.AdminApp })))
const AdminReset = lazy(() => import('./admin/AdminReset').then((m) => ({ default: m.AdminReset })))

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Analytics />
        <Suspense fallback={<div className="min-h-screen bg-paper" />}>
          <Routes>
            <Route path="/" element={<SitePage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/ai" element={<AiPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminApp />} />
            <Route path="/admin/reset" element={<AdminReset />} />
            <Route path="*" element={<SitePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ContentProvider>
  )
}
