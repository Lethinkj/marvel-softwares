import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ShieldCheck,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  Clock,
  ShieldAlert,
} from 'lucide-react'
import {
  verifyAdminCredentials,
  createAdminSession,
  hasAnyAdmin,
  seedSampleDataIfEmpty,
  createAdmin,
  clearIpBlock,
  ROUTE_BOOTSTRAP,
  ROUTE_CONSOLE,
  getCurrentAdminSession,
  getIpSecurityStatus,
  getClientIp,
} from '../../utils/adminAuth'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasAdmins, setHasAdmins] = useState(true)

  // IP Block & Rate limit state
  const [isIpBlocked, setIsIpBlocked] = useState(false)
  const [blockSecondsRemaining, setBlockSecondsRemaining] = useState(0)
  const [blockTier, setBlockTier] = useState(0)
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null)
  const clientIp = getClientIp()

  // Auto-route to dashboard if already authenticated
  useEffect(() => {
    const active = getCurrentAdminSession()
    if (active) {
      navigate(ROUTE_CONSOLE, { replace: true })
      return
    }

    hasAnyAdmin().then((adminExists) => {
      setHasAdmins(adminExists)
    })
    seedSampleDataIfEmpty()
    checkIpSecurity()
  }, [navigate])

  const checkIpSecurity = () => {
    const sec = getIpSecurityStatus(clientIp)
    setIsIpBlocked(sec.isBlocked)
    setBlockSecondsRemaining(sec.remainingSeconds)
    setBlockTier(sec.blockTier)
  }

  // Live countdown timer for IP block
  useEffect(() => {
    if (!isIpBlocked || blockSecondsRemaining <= 0) return

    const interval = setInterval(() => {
      setBlockSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsIpBlocked(false)
          setError(null)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isIpBlocked, blockSecondsRemaining])

  const formatCountdown = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Check IP block
    const sec = getIpSecurityStatus(clientIp)
    if (sec.isBlocked) {
      setIsIpBlocked(true)
      setBlockSecondsRemaining(sec.remainingSeconds)
      setBlockTier(sec.blockTier)
      setError(`IP ${clientIp} is blocked. Try again in ${formatCountdown(sec.remainingSeconds)}.`)
      return
    }

    setLoading(true)

    try {
      const res = await verifyAdminCredentials(username, password)
      if (!res.success || !res.admin) {
        if (res.isBlocked) {
          setIsIpBlocked(true)
          setBlockSecondsRemaining(res.remainingSeconds || 900)
          setError(res.error || 'IP blocked due to excessive failed attempts.')
        } else {
          setAttemptsRemaining(res.attemptsLeft ?? null)
          setError(res.error || 'Invalid credentials. Please verify your username and password.')
        }
        setLoading(false)
        return
      }

      // Auto route to dashboard immediately
      createAdminSession(res.admin)
      navigate(ROUTE_CONSOLE, { replace: true })
    } catch {
      setError('An error occurred during authentication. Please retry.')
      setLoading(false)
    }
  }

  // Quick seed and immediate auto-route to dashboard
  const handleQuickSeedLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      clearIpBlock(clientIp)
      setIsIpBlocked(false)
      seedSampleDataIfEmpty()
      const adminExists = hasAnyAdmin()
      if (!adminExists) {
        await createAdmin({
          username: 'marvel_root',
          password: 'MarvelAdmin#2026',
          full_name: 'Lead Systems Architect',
          email: 'admin@marvelsoftwares.in',
          role: 'super_admin',
        })
      }
      const authRes = await verifyAdminCredentials('marvel_root', 'MarvelAdmin#2026')
      if (authRes.success && authRes.admin) {
        createAdminSession(authRes.admin)
        // Auto route to dashboard immediately
        navigate(ROUTE_CONSOLE, { replace: true })
      } else {
        setError('Default master credentials could not be verified.')
      }
    } catch {
      setError('Quick sign-in encountered an error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#080B11] text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
      {/* Background ambient gradient spheres */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-indigo-600/15 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[350px] bg-cyan-600/10 blur-[130px] rounded-full" />
      </div>

      {/* Top micro bar */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-slate-900 bg-slate-950/40 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-bold font-mono tracking-wider text-slate-200">
            MARVEL SOFTWARES // INTERNAL OPS GATEWAY
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <span>IP: <code className="text-indigo-300 font-mono">{clientIp}</code></span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </header>

      {/* Login Card Container */}
      <main className="relative z-10 max-w-md mx-auto w-full px-4 py-8 flex-1 flex flex-col justify-center">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl">
          {/* Card Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-4 shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Admin Console Access</h1>
            <p className="text-xs text-slate-400 mt-1">Authenticate to access site analytics, leads, and systems</p>
          </div>

          {/* IP Blockout Warning Banner */}
          {isIpBlocked && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-500/60 text-rose-200 text-xs shadow-xl shadow-rose-950/30 space-y-2 animate-pulse">
              <div className="flex items-center gap-2 font-bold text-rose-300">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                <span>BRUTE-FORCE PROTECTION: IP BLOCKED</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Your IP address (<code className="text-rose-300 font-mono">{clientIp}</code>) has been temporarily locked out due to 3 consecutive failed login attempts.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-rose-500/30 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-rose-400" />
                  Lockout Penalty:
                </span>
                <span className="text-rose-400 font-bold text-sm">
                  {formatCountdown(blockSecondsRemaining)}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Security rule: Tier {blockTier} lockout ({blockTier === 1 ? '15 min' : '30 min'}). Resets after 24h.
              </p>
            </div>
          )}

          {!hasAdmins && !isIpBlocked && (
            <div className="mb-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <div>
                <p className="font-semibold text-amber-200">No Administrator Account Detected</p>
                <p className="text-slate-300 mt-0.5 leading-relaxed">
                  Please initialize your master credentials using the bootstrap page first.
                </p>
                <Link
                  to={ROUTE_BOOTSTRAP}
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 underline underline-offset-2"
                >
                  <span>Go to Bootstrap Admin Setup</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {error && !isIpBlocked && (
            <div className="mb-5 p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <div className="flex-1">
                <span>{error}</span>
                {attemptsRemaining !== null && attemptsRemaining > 0 && (
                  <p className="text-[10px] font-mono text-amber-400 mt-0.5">
                    {attemptsRemaining} more wrong try will block your IP for 15 minutes!
                  </p>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  disabled={isIpBlocked}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isIpBlocked}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  disabled={isIpBlocked}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-50"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || isIpBlocked}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isIpBlocked ? (
                <span>IP Locked ({formatCountdown(blockSecondsRemaining)})</span>
              ) : (
                <>
                  <span>Sign In & Route to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <button
              type="button"
              onClick={handleQuickSeedLogin}
              disabled={loading}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>One-Click Root Demo Login</span>
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-2 font-mono">
              Auto-provisions <code className="text-slate-400">marvel_root</code> & routes straight to console
            </p>
          </div>

          <div className="mt-5 text-center">
            <Link
              to={ROUTE_BOOTSTRAP}
              className="text-[11px] text-slate-400 hover:text-indigo-300 transition-colors"
            >
              Need to bootstrap a fresh admin account? <span className="underline">Click here</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-4 text-center text-[11px] font-mono text-slate-500 border-t border-slate-900">
        MARVEL SOFTWARES INTERNAL NETWORK • SESSION TOKENS STRICTLY ENCRYPTED • BRUTE FORCE SHIELD ACTIVE
      </footer>
    </div>
  )
}
