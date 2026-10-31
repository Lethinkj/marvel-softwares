import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))

function PageFallback() {
  return (
    <div className="w-full min-h-[50vh] flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#0057E7]/20 border-t-[#0057E7] animate-spin" />
        <span className="text-xs text-[#0033A0] font-mono font-medium">Loading Marvel Softwares...</span>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageFallback />}>
              <Home />
            </Suspense>
          }
        />
        {/* All previous subpages now smoothly redirect to their respective sections on the one-page homepage */}
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route path="/services" element={<Navigate to="/#services" replace />} />
        <Route path="/team" element={<Navigate to="/#team" replace />} />
        <Route path="/projects" element={<Navigate to="/#projects" replace />} />
        <Route path="/work" element={<Navigate to="/#projects" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route path="/process" element={<Navigate to="/#services" replace />} />
        <Route path="/privacy" element={<Navigate to="/#contact" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
