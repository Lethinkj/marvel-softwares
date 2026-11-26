import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Layers,
  Clock,
  ShieldAlert,
  CheckCircle2,
  Activity,
} from 'lucide-react'
import {
  verifyAdminCredentials,
  createAdminSession,
  ROUTE_CONSOLE,
  getCurrentAdminSession,
  getIpSecurityStatus,
  getClientIp,
} from '../../utils/adminAuth'
import './admin.css'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // IP Block & Rate limit state
  const clientIp = useMemo(() => getClientIp(), [])
  const initialSec = useMemo(() => getIpSecurityStatus(clientIp), [clientIp])

  const [isIpBlocked, setIsIpBlocked] = useState(() => initialSec.isBlocked)
  const [blockSecondsRemaining, setBlockSecondsRemaining] = useState(() => initialSec.remainingSeconds)
  const [blockTier, setBlockTier] = useState(() => initialSec.blockTier)
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null)

  // Auto-route to dashboard if already authenticated
  useEffect(() => {
    const active = getCurrentAdminSession()
    if (active) {
      navigate(ROUTE_CONSOLE, { replace: true })
    }
  }, [navigate])

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
      const res = await verifyAdminCredentials(identifier, password)
      if (!res.success || !res.admin) {
        if (res.isBlocked) {
          setIsIpBlocked(true)
          setBlockSecondsRemaining(res.remainingSeconds || 900)
          setError(res.error || 'IP blocked due to excessive failed attempts.')
        } else {
          setAttemptsRemaining(res.attemptsLeft ?? null)
          setError(res.error || 'Invalid credentials. Please verify your username or email and password.')
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

  return (
    <div className="admin-login-page min-h-screen w-full text-[#3c4b81] flex flex-col justify-between font-sans relative overflow-hidden">
      {/* Subtle architectural grid background */}
      <div className="fixed inset-0 admin-login-grid-bg pointer-events-none" aria-hidden="true" />

      {/* Top Bar */}
      <header className="relative z-10 px-4 sm:px-8 py-4 flex items-center justify-between border-b border-[#566dab]/20 bg-white/85 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3c4b81] to-[#566dab] flex items-center justify-center shadow-md shadow-[#3c4b81]/25 text-[#b3fdff]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-wider text-[#3c4b81] block">
              MARVEL SOFTWARES
            </span>
            <span className="text-[10px] text-[#566dab] font-mono tracking-wide uppercase">
              Administrative Operations
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#b3fdff]/25 border border-[#566dab]/20 text-[11px] font-mono text-[#566dab]">
            <span>IP</span>
            <code className="text-[#3c4b81] font-semibold">{clientIp}</code>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#b3fdff]/35 border border-[#00dfff]/40 text-[11px] font-semibold text-[#3c4b81]">
            <span className="w-2 h-2 rounded-full bg-[#00dfff] animate-pulse" />
            <span>Gateway Active</span>
          </div>
        </div>
      </header>

      {/* Main Split Card */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 flex items-center justify-center">
        <div className="w-full rounded-3xl overflow-hidden bg-white border border-[#566dab]/25 shadow-2xl shadow-[#3c4b81]/15 grid grid-cols-1 lg:grid-cols-[44%_56%]">
          {/* Left Indigo-Navy Security Panel */}
          <div className="bg-gradient-to-br from-[#3c4b81] via-[#3c4b81] to-[#566dab] text-white p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
            <div
              className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#00dfff]/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#b3fdff]/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dfff]/15 border border-[#b3fdff]/35 text-[#b3fdff] text-[10px] font-mono uppercase tracking-widest mb-6">
                <Activity className="w-3 h-3 text-[#00dfff]" />
                <span>Secure Console</span>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-[#b3fdff]/30 text-[#00dfff] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white">
                Marvel Ops Console
              </h1>
              <p className="text-xs sm:text-sm text-[#b3fdff]/85 mt-2 leading-relaxed">
                Centralized workspace for managing client inquiries, live visitor telemetry, security lockouts, and audit logs.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/15 space-y-3 text-xs text-[#b3fdff]/90">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00dfff] shrink-0 mt-0.5" />
                <span>SHA-256 salted credential verification with zero client persistence</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00dfff] shrink-0 mt-0.5" />
                <span>Automatic 15-minute inactivity session lock</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00dfff] shrink-0 mt-0.5" />
                <span>Progressive brute-force IP shield active</span>
              </div>
            </div>
          </div>

          {/* Right Sign-In Form Panel */}
          <div className="p-7 sm:p-10 flex flex-col justify-center bg-white">
            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#566dab] font-semibold">
                Administrator Sign In
              </span>
              <h2 className="text-xl font-bold text-[#3c4b81] tracking-tight mt-1">
                Welcome back
              </h2>
              <p className="text-xs text-[#566dab] mt-1">
                Enter your authorized credentials to continue to the console.
              </p>
            </div>

            {/* IP Blockout Warning Banner */}
            {isIpBlocked && (
              <div className="mb-6 p-4 rounded-xl bg-orange-50 border border-orange-300/70 text-orange-950 text-xs space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-orange-600">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>BRUTE-FORCE LOCKOUT: IP BLOCKED</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  Your IP address (<code className="text-orange-700 font-mono font-semibold">{clientIp}</code>) has been temporarily locked out after 3 failed login attempts.
                </p>
                <div className="p-2.5 rounded-lg bg-white border border-orange-200 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    Remaining Lockout
                  </span>
                  <span className="text-orange-600 font-bold text-sm tabular-nums">
                    {formatCountdown(blockSecondsRemaining)}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">
                  Security Policy: Tier {blockTier} lockout ({blockTier === 1 ? '15 minutes' : '30 minutes'}).
                </p>
              </div>
            )}

            {/* Standard Error Banner */}
            {error && !isIpBlocked && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{error}</p>
                  {attemptsRemaining !== null && attemptsRemaining > 0 && (
                    <p className="text-[11px] font-mono text-amber-700 font-semibold mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {attemptsRemaining} more wrong attempt will lock your IP for 15 minutes.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Admin Username or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    disabled={isIpBlocked}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="admin or admin@marvelsoftwares.in"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                    Encrypted
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    disabled={isIpBlocked}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    disabled={isIpBlocked}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors disabled:opacity-50 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || isIpBlocked}
                className="w-full text-white font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isIpBlocked ? (
                  <span>IP Locked ({formatCountdown(blockSecondsRemaining)})</span>
                ) : (
                  <>
                    <span>Sign In to Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-3.5 text-center text-[11px] font-mono text-[#566dab] border-t border-[#566dab]/20 bg-white/80 backdrop-blur-sm">
        MARVEL SOFTWARES • PRODUCTION SECURITY GATEWAY • BRUTE-FORCE SHIELD ACTIVE
      </footer>
    </div>
  )
}
