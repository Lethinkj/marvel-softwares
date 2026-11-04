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
    <div className="admin-login-page min-h-screen w-full bg-[#F5F7FB] text-[#111827] flex flex-col justify-between font-sans relative overflow-hidden">
      {/* Subtle modern geometric background accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-50/80 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-orange-50/60 rounded-full blur-3xl" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-[#E5E7EB] bg-white/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold font-mono tracking-wider text-[#172554] block">
              MARVEL SOFTWARES
            </span>
            <span className="text-[10px] text-[#64748B] font-mono tracking-wide">
              ADMINISTRATIVE OPS CONSOLE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-[11px] font-mono text-[#64748B]">
            <span>IP: <code className="text-[#2563EB] font-bold">{clientIp}</code></span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-medium text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">Gateway Active</span>
          </div>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="relative z-10 max-w-md mx-auto w-full px-4 py-10 flex-1 flex flex-col justify-center">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-7 sm:p-9 shadow-xl shadow-slate-200/60">
          {/* Card Branding & Header */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#2563EB] mb-4 shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold text-[#172554] tracking-tight">Admin Console Access</h1>
            <p className="text-xs text-[#64748B] mt-1.5">
              Authenticate using your authorized administrator credentials
            </p>
          </div>

          {/* IP Blockout Warning Banner */}
          {isIpBlocked && (
            <div className="mb-6 p-4 rounded-xl bg-orange-50 border border-[#F97316]/40 text-orange-950 text-xs shadow-sm space-y-2.5 animate-pulse">
              <div className="flex items-center gap-2 font-bold text-[#F97316]">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>BRUTE-FORCE LOCKOUT: IP BLOCKED</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Your IP address (<code className="text-[#F97316] font-mono font-semibold">{clientIp}</code>) has been temporarily locked out after 3 failed login attempts.
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-orange-200 flex items-center justify-between font-mono text-xs">
                <span className="text-[#64748B] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#F97316]" />
                  Remaining Lockout:
                </span>
                <span className="text-[#F97316] font-bold text-sm">
                  {formatCountdown(blockSecondsRemaining)}
                </span>
              </div>
              <p className="text-[10px] text-[#64748B] font-mono">
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
                  <p className="text-[11px] font-mono text-amber-700 font-semibold mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {attemptsRemaining} more wrong attempt will lock your IP for 15 minutes!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5">
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
                  placeholder="e.g. admin or admin@marvelsoftwares.in"
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#111827] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#172554]">
                  Password
                </label>
                <span className="text-[11px] text-[#64748B] font-mono">
                  Encrypted SHA-256
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
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#111827] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  disabled={isIpBlocked}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors disabled:opacity-50 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isIpBlocked}
              className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs py-3 px-4 rounded-xl shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer active:scale-[0.99]"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isIpBlocked ? (
                <span>IP Locked ({formatCountdown(blockSecondsRemaining)})</span>
              ) : (
                <>
                  <span>Sign In & Open Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Features Checkpoints */}
          <div className="mt-6 pt-5 border-t border-[#E5E7EB] space-y-1.5 text-[11px] text-[#64748B]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Strict 15-minute inactivity auto-logout protection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Zero client credential persistence & SHA-256 salted hashes</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-4 text-center text-[11px] font-mono text-[#64748B] border-t border-[#E5E7EB] bg-white/80">
        MARVEL SOFTWARES • PRODUCTION SECURITY GATEWAY • BRUTE-FORCE SHIELD ACTIVE
      </footer>
    </div>
  )
}
