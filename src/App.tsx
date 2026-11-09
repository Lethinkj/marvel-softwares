import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { ROUTE_AUTH, ROUTE_CONSOLE, GATEWAY_PREFIX } from './utils/adminAuth'

const Faq = lazy(() => import('./pages/Faq'))
const Build = lazy(() => import('./pages/Build'))
const Plans = lazy(() => import('./pages/Plans'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))

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

function AdminFallback() {
  return (
    <div className="w-full min-h-screen bg-[#080B11] flex items-center justify-center p-8 text-slate-100">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <span className="text-xs text-slate-400 font-mono">Initializing Marvel Gateway Console...</span>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      {/* Obfuscated Isolated Gateway & Console Routes (Outside of public layout) */}
      <Route
        path={ROUTE_AUTH}
        element={
          <Suspense fallback={<AdminFallback />}>
            <AdminLogin />
          </Suspense>
        }
      />
      <Route
        path={ROUTE_CONSOLE}
        element={
          <Suspense fallback={<AdminFallback />}>
            <AdminDashboard />
          </Suspense>
        }
      />
      <Route
        path={`${ROUTE_CONSOLE}/*`}
        element={
          <Suspense fallback={<AdminFallback />}>
            <AdminDashboard />
          </Suspense>
        }
      />
      <Route
        path={GATEWAY_PREFIX}
        element={<Navigate to={ROUTE_AUTH} replace />}
      />

      {/* Trap common scanner routes so nobody can guess or find admin urls */}
      <Route path="/admin" element={<Navigate to="/" replace />} />
      <Route path="/admin/*" element={<Navigate to="/" replace />} />
      <Route path="/administrator" element={<Navigate to="/" replace />} />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/dashboard" element={<Navigate to="/" replace />} />

      {/* Public Marketing Website Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/faq"
          element={
            <Suspense fallback={<PageFallback />}>
              <Faq />
            </Suspense>
          }
        />
        <Route
          path="/build"
          element={
            <Suspense fallback={<PageFallback />}>
              <Build />
            </Suspense>
          }
        />
        {/* Unlinked /plans — intentionally NOT added to navLinks/Navbar/Footer */}
        <Route
          path="/plans"
          element={
            <Suspense fallback={<PageFallback />}>
              <Plans />
            </Suspense>
          }
        />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
