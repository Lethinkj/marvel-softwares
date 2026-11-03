import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ShieldAlert,
  UserPlus,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Database,
  ArrowRight,
  Copy,
  Check,
  Eye,
  EyeOff,
  Terminal,
} from 'lucide-react'
import {
  createAdmin,
  createAdminSession,
  getCurrentAdminSession,
  ROUTE_AUTH,
  ROUTE_CONSOLE,
  seedSampleDataIfEmpty,
} from '../../utils/adminAuth'

export default function AdminBootstrap() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [copiedSql, setCopiedSql] = useState(false)

  // Auto-route to dashboard if already authenticated
  useEffect(() => {
    const active = getCurrentAdminSession()
    if (active) {
      navigate(ROUTE_CONSOLE, { replace: true })
    }
  }, [navigate])

  const sqlSnippet = `-- Direct PostgreSQL Bootstrap Query (Prefix: dev_)
INSERT INTO dev_admins (username, password_hash, full_name, email, role)
VALUES (
    '${username.trim() || 'master_admin'}',
    crypt('${password || 'YourSecretPassword#2026'}', gen_salt('bf', 10)),
    '${fullName.trim() || 'System Administrator'}',
    '${email.trim() || 'admin@marvelsoftwares.in'}',
    'super_admin'
)
ON CONFLICT (username) DO NOTHING;`

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSnippet)
    setCopiedSql(true)
    setTimeout(() => setCopiedSql(false), 2500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const result = await createAdmin({
        username,
        password,
        full_name: fullName,
        email,
        role: 'super_admin',
      })

      if (!result.success) {
        setError(result.error || 'Failed to initialize administrator.')
        setLoading(false)
        return
      }

      // Seed realistic sample data and auto-route to dashboard
      seedSampleDataIfEmpty()
      if (result.admin) {
        createAdminSession(result.admin)
      }
      setSuccess(true)

      setTimeout(() => {
        navigate(ROUTE_CONSOLE, { replace: true })
      }, 1200)
    } catch {
      setError('An unexpected error occurred during bootstrap initialization.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#090D16] text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/10 blur-[130px] rounded-full" />
        <div className="absolute -bottom-40 right-10 w-[500px] h-[400px] bg-cyan-600/10 blur-[140px] rounded-full" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <KeyRound className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 tracking-tight text-sm">MARVEL SYSTEM GATEWAY</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  BOOTSTRAP INIT
                </span>
              </div>
              <p className="text-xs text-slate-400">One-Time Administrator Provisioning Terminal</p>
            </div>
          </div>
          <Link
            to={ROUTE_AUTH}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 font-medium"
          >
            <span>Proceed to Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto w-full px-4 py-8 flex-1 flex flex-col justify-center">
        {/* Notice alert */}
        <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 backdrop-blur-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-semibold text-amber-300">Temporary Admin Initialization Route</p>
            <p className="text-slate-300 leading-relaxed">
              Use this isolated setup page to register your initial root administrator. Once initialized, all subsequent administrators can be managed securely directly from inside the dashboard console. This page can be deleted or removed at any time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Card */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-800/80">
              <UserPlus className="w-5 h-5 text-indigo-400" />
              <div>
                <h1 className="text-base font-semibold text-white">Create Root Administrator</h1>
                <p className="text-xs text-slate-400">Set username and password credentials for master access</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Administrator account provisioned successfully! Redirecting to sign in...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Admin Username <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. marvel_root"
                  className="w-full bg-slate-950/70 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="System Administrator"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@marvelsoftwares.in"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Master Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-lg pl-3.5 pr-10 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Confirm Master Password <span className="text-rose-400">*</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type password"
                  className="w-full bg-slate-950/70 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || success}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs py-3 px-4 rounded-lg shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Initialize & Save Admin Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Database Query & Instructions Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
                  <Database className="w-4 h-4" />
                  <span>PostgreSQL SQL Query</span>
                </div>
                <button
                  onClick={handleCopySql}
                  type="button"
                  className="flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SQL</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                If executing directly in your database terminal or hosted Postgres (Neon, Supabase, RDS), you can execute the matching query:
              </p>
              <div className="relative rounded-lg bg-slate-950 p-3 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed max-h-56">
                <pre>{sqlSnippet}</pre>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-slate-200 font-medium">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Security Guidelines</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
                <li>Tables use the <code className="text-indigo-300 font-mono">dev_</code> prefix.</li>
                <li>Passcodes are hashed with SHA-256 + cryptographic salt.</li>
                <li>Audit logging tracks all session and inquiry modifications.</li>
                <li>Access to the console is gated by active tokens with 12-hour expiration.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 px-6 py-3 text-center text-[11px] text-slate-500">
        MARVEL SOFTWARES SYSTEM INFRASTRUCTURE • STRICTLY CONFIDENTIAL GATEWAY
      </footer>
    </div>
  )
}
