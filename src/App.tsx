import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContentProvider } from './content/store'
import { SitePage } from './pages/SitePage'
import { ContactPage } from './pages/ContactPage'
import { AboutPage } from './pages/AboutPage'
import { ServicesPage } from './pages/ServicesPage'
import { AiPage } from './pages/AiPage'
import { CasesPage } from './pages/CasesPage'

const AdminApp = lazy(() => import('./admin/AdminApp').then((m) => ({ default: m.AdminApp })))
const AdminSetup = lazy(() => import('./admin/AdminSetup').then((m) => ({ default: m.AdminSetup })))

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-paper" />}>
          <Routes>
            <Route path="/" element={<SitePage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/ai" element={<AiPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminApp />} />
            <Route path="/admin/setup" element={<AdminSetup />} />
            <Route path="*" element={<SitePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ContentProvider>
  )
}
