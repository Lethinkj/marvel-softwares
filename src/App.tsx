import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const Faq = lazy(() => import('./pages/Faq'))

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
        <Route
          path="/faq"
          element={
            <Suspense fallback={<PageFallback />}>
              <Faq />
            </Suspense>
          }
        />
        {/* The site is intentionally a single-page experience. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
