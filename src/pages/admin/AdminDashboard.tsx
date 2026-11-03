import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  MessageSquareText,
  Activity,
  Database,
  LogOut,
  Search,
  Download,
  Star,
  CheckCircle2,
  Clock,
  Shield,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  X,
  Menu,
  Copy,
  Check,
  History,
  ShieldAlert,
  Unlock,
  KeyRound,
  Eye,
  FileText,
  Save,
  Globe,
  ChevronRight,
  TrendingUp,
  UserCheck,
  Lock,
  Compass,
} from 'lucide-react'
import {
  getCurrentAdminSession,
  logoutAdmin,
  getAllInquiriesFromDB,
  updateInquiryStatus,
  toggleStarInquiry,
  deleteInquiry,
  updateInquiryNotes,
  getTelemetryRecordsFromDB,
  getVisitorsFromDB,
  getAdminsFromDB,
  createAdmin,
  deleteAdmin,
  getSessionsFromDB,
  revokeSession,
  getIpBlocksFromDB,
  clearIpBlock,
  manualBlockIp,
  getAuditLogsFromDB,
  purgeMockLocalStorageData,
  updateSessionActivity,
  INACTIVITY_TIMEOUT_MS,
  ROUTE_AUTH,
  type AdminInquiry,
  type TelemetryRecord,
  type VisitorRecord,
  type AdminUser,
  type AdminSession,
  type AuditLog,
  type IpBlockRecord,
} from '../../utils/adminAuth'

type TabType = 'overview' | 'inquiries' | 'telemetry' | 'admins' | 'audit' | 'security' | 'database'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [session] = useState<AdminSession | null>(() => getCurrentAdminSession())
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Live Database States (Supabase dev_ tables)
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([])
  const [telemetry, setTelemetry] = useState<TelemetryRecord[]>([])
  const [visitors, setVisitors] = useState<VisitorRecord[]>([])
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [sessionsList, setSessionsList] = useState<AdminSession[]>([])
  const [ipBlocks, setIpBlocks] = useState<IpBlockRecord[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  // Inactivity tracking state
  const [, setLastActiveTime] = useState<number>(() => Date.now())
  const [idleSecondsRemaining, setIdleSecondsRemaining] = useState<number>(
    Math.floor(INACTIVITY_TIMEOUT_MS / 1000)
  )

  const nowMs = useMemo(() => Date.now(), [refreshKey, idleSecondsRemaining])

  // Filters for Inquiries CRM
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [solutionFilter, setSolutionFilter] = useState<string>('all')
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(null)
  const [inquiryNotesInput, setInquiryNotesInput] = useState('')
  const [isSavingNotes, setIsSavingNotes] = useState(false)
  const [saveNotesSuccess, setSaveNotesSuccess] = useState(false)

  const handleSelectInquiry = useCallback((inq: AdminInquiry) => {
    setSelectedInquiry(inq)
    setInquiryNotesInput(inq.admin_notes || '')
    setSaveNotesSuccess(false)
  }, [])

  // Telemetry Sub-tabs
  const [telemetrySubTab, setTelemetrySubTab] = useState<'visitors' | 'events' | 'sections'>('visitors')
  const [telemetryFilter, setTelemetryFilter] = useState<string>('all')
  const [selectedEventPayload, setSelectedEventPayload] = useState<TelemetryRecord | null>(null)

  // Filters for Audit Logs Table
  const [auditSearch, setAuditSearch] = useState('')
  const [auditAdminFilter, setAuditAdminFilter] = useState('all')
  const [selectedAuditLog, setSelectedAuditLog] = useState<AuditLog | null>(null)

  // Form state for creating new admin
  const [showNewAdminModal, setShowNewAdminModal] = useState(false)
  const [newAdminUsername, setNewAdminUsername] = useState('')
  const [newAdminPassword, setNewAdminPassword] = useState('')
  const [newAdminFullName, setNewAdminFullName] = useState('')
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [newAdminRole, setNewAdminRole] = useState<'super_admin' | 'operations' | 'analyst' | 'editor'>('operations')
  const [newAdminError, setNewAdminError] = useState<string | null>(null)
  const [newAdminSuccess, setNewAdminSuccess] = useState(false)
  const [newAdminLoading, setNewAdminLoading] = useState(false)

  // Form state for manual IP ban
  const [showManualBlockModal, setShowManualBlockModal] = useState(false)
  const [manualBlockIpInput, setManualBlockIpInput] = useState('')
  const [manualBlockReasonInput, setManualBlockReasonInput] = useState('Suspicious administrative probing')
  const [manualBlockLoading, setManualBlockLoading] = useState(false)

  // Copy SQL feedback
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  // Load all live state directly from Supabase tables
  const loadAllData = useCallback(async () => {
    setIsLoadingData(true)
    purgeMockLocalStorageData()
    try {
      const [inqs, tels, vists, adms, sess, ips, logs] = await Promise.all([
        getAllInquiriesFromDB(),
        getTelemetryRecordsFromDB(),
        getVisitorsFromDB(),
        getAdminsFromDB(),
        getSessionsFromDB(),
        getIpBlocksFromDB(),
        getAuditLogsFromDB(),
      ])
      setInquiries(inqs)
      setTelemetry(tels)
      setVisitors(vists)
      setAdmins(adms)
      setSessionsList(sess)
      setIpBlocks(ips)
      setAuditLogs(logs)
    } catch (err) {
      console.error('Failed to load dashboard data from Supabase:', err)
    } finally {
      setIsLoadingData(false)
    }
  }, [])

  // Auto-logout trigger
  const handleAutoLogout = useCallback((reason: string = 'inactivity_timeout') => {
    logoutAdmin(reason)
    navigate(`${ROUTE_AUTH}?timeout=1`, { replace: true })
  }, [navigate])

  // Authentication check & initial load
  useEffect(() => {
    const currentSession = getCurrentAdminSession()
    if (!currentSession) {
      navigate(ROUTE_AUTH, { replace: true })
      return
    }
    loadAllData()
  }, [navigate, refreshKey, loadAllData])

  // Periodic session verification & inactivity monitor
  useEffect(() => {
    const onUserInteraction = () => {
      setLastActiveTime(Date.now())
      setIdleSecondsRemaining(Math.floor(INACTIVITY_TIMEOUT_MS / 1000))
    }

    window.addEventListener('mousemove', onUserInteraction, { passive: true })
    window.addEventListener('keydown', onUserInteraction, { passive: true })

    const interval = setInterval(() => {
      const active = getCurrentAdminSession()
      if (!active) {
        handleAutoLogout('session_expired')
        return
      }

      updateSessionActivity()

      setIdleSecondsRemaining((prev) => {
        if (prev <= 1) {
          handleAutoLogout('inactivity_timeout')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      window.removeEventListener('mousemove', onUserInteraction)
      window.removeEventListener('keydown', onUserInteraction)
      clearInterval(interval)
    }
  }, [handleAutoLogout])

  // Dynamic Statistics computed from live DB records
  const stats = useMemo(() => {
    const totalInquiries = inquiries.length
    const newCount = inquiries.filter((i) => i.status === 'new').length
    const wonCount = inquiries.filter((i) => i.status === 'won').length
    const starredCount = inquiries.filter((i) => i.is_starred).length
    const conversionRate = totalInquiries > 0 ? Math.round((wonCount / totalInquiries) * 100) : 0

    const uniqueVisitorCount = visitors.length > 0 ? visitors.length : new Set(telemetry.map((t) => t.visitor_id).filter(Boolean)).size
    const totalPageviews = telemetry.filter((t) => t.event_name === 'page_view').length

    const activeSessionsCount = sessionsList.filter((s) => !s.is_revoked && new Date(s.expires_at).getTime() > Date.now()).length
    const activeBlocksCount = ipBlocks.filter((b) => b.is_blocked && b.blocked_until > Date.now()).length

    // Device breakdown
    let desktop = 0
    let mobile = 0
    let tablet = 0

    if (visitors.length > 0) {
      visitors.forEach((v) => {
        if (v.device_type === 'mobile') mobile++
        else if (v.device_type === 'tablet') tablet++
        else desktop++
      })
    } else {
      telemetry.forEach((t) => {
        if (t.client_meta?.device_type === 'mobile') mobile++
        else if (t.client_meta?.device_type === 'tablet') tablet++
        else desktop++
      })
    }

    const totalDev = desktop + mobile + tablet || 1
    const deviceBreakdown = {
      desktop: Math.round((desktop / totalDev) * 100),
      mobile: Math.round((mobile / totalDev) * 100),
      tablet: Math.round((tablet / totalDev) * 100),
    }

    // Top explored sections
    const sectionCounts: Record<string, { count: number; totalDwell: number; name: string }> = {}
    telemetry.forEach((t) => {
      if (t.section_id) {
        if (!sectionCounts[t.section_id]) {
          sectionCounts[t.section_id] = {
            count: 0,
            totalDwell: 0,
            name: t.section_name || t.section_id,
          }
        }
        sectionCounts[t.section_id].count++
        sectionCounts[t.section_id].totalDwell += t.dwell_time_seconds || 0
      }
    })

    const topSections = Object.entries(sectionCounts)
      .map(([id, data]) => ({
        id,
        name: data.name,
        views: data.count,
        avgDwell: data.count > 0 ? Math.round(data.totalDwell / data.count) : 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)

    return {
      totalInquiries,
      newCount,
      wonCount,
      starredCount,
      conversionRate,
      uniqueVisitorCount,
      totalPageviews,
      activeSessionsCount,
      activeBlocksCount,
      deviceBreakdown,
      topSections,
    }
  }, [inquiries, telemetry, visitors, sessionsList, ipBlocks])

  // 7-day activity timeline computation
  const sevenDayChartData = useMemo(() => {
    const days: { dateStr: string; label: string; inquiries: number; pageviews: number }[] = []
    const now = new Date()

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const label = d.toLocaleDateString(undefined, { weekday: 'short', month: 'numeric', day: 'numeric' })

      const inqCount = inquiries.filter((inq) => inq.submittedAt && inq.submittedAt.startsWith(dateStr)).length
      const pvCount = telemetry.filter((t) => t.created_at && t.created_at.startsWith(dateStr) && t.event_name === 'page_view').length

      days.push({
        dateStr,
        label,
        inquiries: inqCount,
        pageviews: pvCount,
      })
    }
    return days
  }, [inquiries, telemetry])

  // Inquiries Filtered List
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      if (statusFilter === 'starred' && !item.is_starred) return false
      if (statusFilter !== 'all' && statusFilter !== 'starred' && item.status !== statusFilter) return false
      if (solutionFilter !== 'all' && item.solution !== solutionFilter) return false

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchName = item.name.toLowerCase().includes(q)
        const matchEmail = item.email.toLowerCase().includes(q)
        const matchPhone = item.phone.toLowerCase().includes(q)
        const matchCity = item.city?.toLowerCase().includes(q)
        const matchReq = item.requirements.toLowerCase().includes(q)
        if (!matchName && !matchEmail && !matchPhone && !matchCity && !matchReq) return false
      }

      return true
    })
  }, [inquiries, statusFilter, solutionFilter, searchQuery])

  // Telemetry Filtered List
  const filteredTelemetry = useMemo(() => {
    return telemetry.filter((item) => {
      if (telemetryFilter !== 'all' && item.event_name !== telemetryFilter) return false
      return true
    })
  }, [telemetry, telemetryFilter])

  // Audit Logs Filtered List
  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      if (auditAdminFilter !== 'all' && log.admin_username !== auditAdminFilter) return false
      if (auditSearch.trim()) {
        const q = auditSearch.toLowerCase()
        const matchUser = log.admin_username.toLowerCase().includes(q)
        const matchAction = log.action.toLowerCase().includes(q)
        const matchTarget = log.target_type.toLowerCase().includes(q)
        const matchIp = log.ip_address.toLowerCase().includes(q)
        if (!matchUser && !matchAction && !matchTarget && !matchIp) return false
      }
      return true
    })
  }, [auditLogs, auditAdminFilter, auditSearch])

  // Handlers for Inquiries CRM
  const handleStatusChange = async (inquiryId: string | number, newStatus: AdminInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (String(item.id) === String(inquiryId) ? { ...item, status: newStatus } : item))
    )
    if (selectedInquiry && String(selectedInquiry.id) === String(inquiryId)) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null))
    }
    await updateInquiryStatus(inquiryId, newStatus)
  }

  const handleToggleStar = async (inquiryId: string | number) => {
    setInquiries((prev) =>
      prev.map((item) => (String(item.id) === String(inquiryId) ? { ...item, is_starred: !item.is_starred } : item))
    )
    if (selectedInquiry && String(selectedInquiry.id) === String(inquiryId)) {
      setSelectedInquiry((prev) => (prev ? { ...prev, is_starred: !prev.is_starred } : null))
    }
    await toggleStarInquiry(inquiryId)
  }

  const handleDeleteInquiry = async (inquiryId: string | number) => {
    if (!window.confirm('Are you sure you want to delete this contact inquiry permanently from the database?')) {
      return
    }
    setInquiries((prev) => prev.filter((item) => String(item.id) !== String(inquiryId)))
    if (selectedInquiry && String(selectedInquiry.id) === String(inquiryId)) {
      setSelectedInquiry(null)
    }
    await deleteInquiry(inquiryId)
  }

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return
    setIsSavingNotes(true)
    setSaveNotesSuccess(false)
    try {
      await updateInquiryNotes(selectedInquiry.id, inquiryNotesInput)
      setInquiries((prev) =>
        prev.map((item) =>
          String(item.id) === String(selectedInquiry.id) ? { ...item, admin_notes: inquiryNotesInput } : item
        )
      )
      setSelectedInquiry((prev) => (prev ? { ...prev, admin_notes: inquiryNotesInput } : null))
      setSaveNotesSuccess(true)
      setTimeout(() => setSaveNotesSuccess(false), 2500)
    } catch (err) {
      console.error('Failed to save notes:', err)
    } finally {
      setIsSavingNotes(false)
    }
  }

  // Export filtered inquiries to CSV
  const handleExportCSV = () => {
    if (filteredInquiries.length === 0) return
    const headers = ['ID', 'Name', 'Email', 'Phone', 'City', 'Solution', 'Status', 'Submitted At', 'Requirements']
    const rows = filteredInquiries.map((i) => [
      `"${String(i.id).replace(/"/g, '""')}"`,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.email.replace(/"/g, '""')}"`,
      `"${(i.phone || '').replace(/"/g, '""')}"`,
      `"${(i.city || '').replace(/"/g, '""')}"`,
      `"${i.solution.replace(/"/g, '""')}"`,
      `"${i.status.replace(/"/g, '""')}"`,
      `"${new Date(i.submittedAt).toISOString()}"`,
      `"${(i.requirements || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `marvel-inquiries-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Handlers for Security: Revoke Session & Unlock IP
  const handleRevokeSession = async (sessionId: string) => {
    if (!window.confirm('Revoke this session token immediately? The user will be logged out on next request.')) return
    setSessionsList((prev) =>
      prev.map((s) => (s.session_id === sessionId ? { ...s, is_revoked: true, revoked_reason: 'admin_revoked' } : s))
    )
    await revokeSession(sessionId)
  }

  const handleClearIpBlock = async (ip: string) => {
    setIpBlocks((prev) =>
      prev.map((b) => (b.ip_address === ip ? { ...b, is_blocked: false, blocked_until: 0, failed_attempts: 0 } : b))
    )
    await clearIpBlock(ip)
  }

  const handleManualBlockIp = async (e: React.FormEvent) => {
    e.preventDefault()
    const ip = manualBlockIpInput.trim()
    if (!ip) return
    setManualBlockLoading(true)
    try {
      await manualBlockIp(ip, manualBlockReasonInput.trim() || 'Manual Admin Block')
      setShowManualBlockModal(false)
      setManualBlockIpInput('')
      setRefreshKey((k) => k + 1)
    } catch (err) {
      console.error('Failed to block IP:', err)
    } finally {
      setManualBlockLoading(false)
    }
  }

  // Handlers for Team / Admins
  const handleCreateAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewAdminError(null)
    setNewAdminLoading(true)
    try {
      const res = await createAdmin({
        username: newAdminUsername,
        password: newAdminPassword,
        full_name: newAdminFullName,
        email: newAdminEmail,
        role: newAdminRole,
      })
      if (!res.success) {
        setNewAdminError(res.error || 'Failed to create administrator account.')
        return
      }
      setNewAdminSuccess(true)
      setTimeout(() => {
        setShowNewAdminModal(false)
        setNewAdminSuccess(false)
        setNewAdminUsername('')
        setNewAdminPassword('')
        setNewAdminFullName('')
        setNewAdminEmail('')
        setRefreshKey((k) => k + 1)
      }, 1200)
    } catch {
      setNewAdminError('Unexpected error creating admin account.')
    } finally {
      setNewAdminLoading(false)
    }
  }

  const handleDeleteAdmin = async (adminId: string) => {
    if (!window.confirm('Permanently delete this administrator account from Supabase dev_admins?')) return
    const res = await deleteAdmin(adminId)
    if (!res.success) {
      alert(res.error)
      return
    }
    setAdmins((prev) => prev.filter((a) => a.admin_id !== adminId))
  }

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedSection(id)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  if (!session) return null

  const idleMins = Math.floor(idleSecondsRemaining / 60)
  const idleSecs = idleSecondsRemaining % 60

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ========================================================================= */}
      {/* SIDEBAR NAVIGATION */}
      {/* ========================================================================= */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0A0E17]/95 border-r border-slate-800/80 backdrop-blur-xl flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-600/25 ring-1 ring-white/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-white block">MARVEL CONSOLE</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase font-semibold">
                    Supabase Live (dev_)
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <div className="p-3 space-y-1">
            <div className="px-3 pt-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
              Platform Modules
            </div>

            <button
              onClick={() => {
                setActiveTab('overview')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Executive Overview</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'overview' ? 'rotate-90 text-white' : 'text-slate-600'}`} />
            </button>

            <button
              onClick={() => {
                setActiveTab('inquiries')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquareText className="w-4 h-4" />
                <span>Inquiries & Leads CRM</span>
              </div>
              {stats.newCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-emerald-500 text-slate-950 shadow-sm">
                  {stats.newCount} NEW
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab('telemetry')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'telemetry'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Eye className="w-4 h-4" />
                <span>Website Viewers Stream</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/50">
                {stats.uniqueVisitorCount}
              </span>
            </button>

            <div className="px-3 pt-5 pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
              Security & Administration
            </div>

            <button
              onClick={() => {
                setActiveTab('security')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'security'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4" />
                <span>Security & IP Lockouts</span>
              </div>
              {stats.activeBlocksCount > 0 ? (
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-rose-500 text-white shadow-sm">
                  {stats.activeBlocksCount} BLOCKED
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  SAFE
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab('audit')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'audit'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <History className="w-4 h-4" />
                <span>Audit Trail Logs</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{auditLogs.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('admins')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'admins'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Admin Accounts</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{admins.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('database')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'database'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Database className="w-4 h-4" />
                <span>Postgres Schema & SQL</span>
              </div>
              <span className="text-[10px] font-mono text-indigo-400">dev_*</span>
            </button>
          </div>
        </div>

        {/* Footer: User Profile & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                {session.username.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">{session.full_name || session.username}</div>
                <div className="text-[10px] font-mono text-indigo-400 truncate">{session.role.replace('_', ' ')}</div>
              </div>
            </div>
            <button
              onClick={() => handleAutoLogout('user_logout')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Executive Header */}
        <header className="sticky top-0 z-30 bg-[#07090E]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Marvel Softwares
                </span>
                <span className="text-slate-600">/</span>
                <span className="text-xs font-semibold text-white capitalize">
                  {activeTab === 'telemetry' ? 'Website Viewers Stream' : activeTab.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-300 font-medium">Supabase Production DB</span>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded border border-indigo-500/20">
                  dev_*
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Inactivity Security Badge */}
            <div
              className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors ${
                idleMins < 2
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-300 animate-pulse'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
              title="Zero-persistence auto logout triggers after 15m of inactivity"
            >
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                Auto-Logout: <strong className="text-white">{idleMins}:{idleSecs < 10 ? `0${idleSecs}` : idleSecs}</strong>
              </span>
            </div>

            {/* Refresh DB Button */}
            <button
              onClick={() => {
                setRefreshKey((k) => k + 1)
              }}
              disabled={isLoadingData}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center gap-2 text-xs font-medium transition-all shadow-sm"
              title="Refresh all data from Supabase"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isLoadingData ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh DB</span>
            </button>

            {/* Visit Live Website Link */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/25 flex items-center gap-1.5 text-xs font-medium transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live Site</span>
            </a>
          </div>
        </header>

        {/* Content Container */}
        <main className="p-4 sm:p-8 space-y-8 flex-1">
          {/* ========================================================================= */}
          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Top 4 KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Leads / Inquiries */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden group hover:border-indigo-500/50 transition-all shadow-lg shadow-black/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Total Inquiries
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                      <MessageSquareText className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-white tracking-tight">
                      {stats.totalInquiries}
                    </span>
                    {stats.newCount > 0 && (
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        +{stats.newCount} New
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Conversion Rate: <strong className="text-white font-mono">{stats.conversionRate}%</strong> won</span>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />
                </div>

                {/* Unique Viewers */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden group hover:border-cyan-500/50 transition-all shadow-lg shadow-black/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Website Viewers
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                      <Globe className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-white tracking-tight">
                      {stats.uniqueVisitorCount}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {stats.totalPageviews} Pageviews
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Live First-Party Telemetry</span>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />
                </div>

                {/* Starred / Priority Leads */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden group hover:border-amber-500/50 transition-all shadow-lg shadow-black/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Starred Inquiries
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                      <Star className="w-4 h-4 fill-amber-400/20" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-white tracking-tight">
                      {stats.starredCount}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Priority Follow-ups</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Direct CRM synchronization</span>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors pointer-events-none" />
                </div>

                {/* Security Threat Status */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden group hover:border-rose-500/50 transition-all shadow-lg shadow-black/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Security Status
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-white tracking-tight">
                      {stats.activeBlocksCount}
                    </span>
                    <span className="text-xs font-mono text-rose-300">
                      {stats.activeBlocksCount === 1 ? 'Blocked IP' : 'Blocked IPs'}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
                    {stats.activeBlocksCount > 0 ? (
                      <span className="text-rose-400 font-medium">Brute-Force Lockout Active</span>
                    ) : (
                      <span className="text-emerald-400 font-medium">Zero Hostile Lockouts</span>
                    )}
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-colors pointer-events-none" />
                </div>
              </div>

              {/* 7-Day Performance & Traffic Curve */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-400" />
                      7-Day Activity & Lead Generation Trend
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Daily incoming inquiries and pageviews from Supabase dev_contact_inquiries & dev_telemetry_events
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-cyan-400" />
                      <span className="text-slate-300">Pageviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-indigo-500" />
                      <span className="text-slate-300">Inquiries</span>
                    </div>
                  </div>
                </div>

                {/* SVG Area Chart */}
                <div className="w-full h-64 relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="inqGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    <line x1="0" y1="50" x2="700" y2="50" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="0" y1="100" x2="700" y2="100" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="0" y1="150" x2="700" y2="150" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />

                    {/* Generate SVG points for 7 days */}
                    {(() => {
                      const maxVal = Math.max(
                        ...sevenDayChartData.map((d) => Math.max(d.pageviews, d.inquiries)),
                        5
                      )
                      const pointsPv = sevenDayChartData.map((d, i) => {
                        const x = (i / 6) * 700
                        const y = 170 - (d.pageviews / maxVal) * 140
                        return `${x},${y}`
                      })
                      const pointsInq = sevenDayChartData.map((d, i) => {
                        const x = (i / 6) * 700
                        const y = 170 - (d.inquiries / maxVal) * 140
                        return `${x},${y}`
                      })

                      const pvPath = `M ${pointsPv.join(' L ')}`
                      const pvArea = `${pvPath} L 700,180 L 0,180 Z`

                      const inqPath = `M ${pointsInq.join(' L ')}`
                      const inqArea = `${inqPath} L 700,180 L 0,180 Z`

                      return (
                        <>
                          <path d={pvArea} fill="url(#pvGrad)" />
                          <path d={pvPath} fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" />

                          <path d={inqArea} fill="url(#inqGrad)" />
                          <path d={inqPath} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />

                          {sevenDayChartData.map((d, i) => {
                            const x = (i / 6) * 700
                            const yPv = 170 - (d.pageviews / maxVal) * 140
                            const yInq = 170 - (d.inquiries / maxVal) * 140
                            return (
                              <g key={i}>
                                <circle cx={x} cy={yPv} r="4" fill="#00e5ff" stroke="#07090E" strokeWidth="2" />
                                <circle cx={x} cy={yInq} r="4" fill="#6366f1" stroke="#07090E" strokeWidth="2" />
                              </g>
                            )
                          })}
                        </>
                      )
                    })()}
                  </svg>

                  {/* Date labels under chart */}
                  <div className="flex justify-between mt-3 text-[11px] font-mono text-slate-400">
                    {sevenDayChartData.map((d, idx) => (
                      <span key={idx} className="text-center">{d.label}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Recent Inquiries + Device & Section Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Inquiries Quick Table */}
                <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-400" />
                      Recent Inquiries
                    </h3>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                      View All Leads &rarr;
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs">
                      No customer inquiries recorded in Supabase yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-800/60 overflow-x-auto">
                      {inquiries.slice(0, 5).map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => {
                            handleSelectInquiry(inq)
                            setActiveTab('inquiries')
                          }}
                          className="py-3 px-2 flex items-center justify-between hover:bg-slate-800/30 rounded-xl cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                              {inq.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-white truncate flex items-center gap-2">
                                <span>{inq.name}</span>
                                {inq.is_starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                              </div>
                              <div className="text-[11px] text-slate-400 truncate">
                                {inq.solution} • {inq.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                                inq.status === 'won'
                                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                  : inq.status === 'new'
                                  ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                                  : inq.status === 'in_discussion'
                                  ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
                                  : 'bg-slate-800 text-slate-400 border-slate-700'
                              }`}
                            >
                              {inq.status.replace('_', ' ')}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                              {new Date(inq.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Device & Section Engagement Breakdown */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-6">
                  {/* Device breakdown */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-cyan-400" />
                      Audience Device Split
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span className="flex items-center gap-1.5"><Monitor className="w-3.5 h-3.5 text-indigo-400" /> Desktop</span>
                          <span className="font-mono">{stats.deviceBreakdown.desktop}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${stats.deviceBreakdown.desktop}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-cyan-400" /> Mobile</span>
                          <span className="font-mono">{stats.deviceBreakdown.mobile}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${stats.deviceBreakdown.mobile}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span className="flex items-center gap-1.5"><Tablet className="w-3.5 h-3.5 text-amber-400" /> Tablet</span>
                          <span className="font-mono">{stats.deviceBreakdown.tablet}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${stats.deviceBreakdown.tablet}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Sections */}
                  <div className="pt-4 border-t border-slate-800/80">
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-emerald-400" />
                      Top Engaged Sections
                    </h3>
                    {stats.topSections.length === 0 ? (
                      <div className="text-xs text-slate-500 py-2">Waiting for first telemetry events...</div>
                    ) : (
                      <div className="space-y-2.5">
                        {stats.topSections.map((sec) => (
                          <div key={sec.id} className="flex items-center justify-between text-xs">
                            <span className="text-slate-300 truncate max-w-[150px]">{sec.name}</span>
                            <div className="flex items-center gap-3 font-mono text-[11px]">
                              <span className="text-cyan-400">{sec.views} views</span>
                              <span className="text-slate-400">{sec.avgDwell}s avg</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: INQUIRIES & LEADS CRM */}
          {/* ========================================================================= */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              {/* Header Action Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-lg font-bold text-white tracking-tight">Project Inquiries & Leads CRM</h1>
                  <p className="text-xs text-slate-400">
                    Live customer requests synced with Supabase table <code className="text-indigo-400 font-mono">dev_contact_inquiries</code>
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleExportCSV}
                    disabled={filteredInquiries.length === 0}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center gap-2 text-xs font-medium transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-sm flex flex-col md:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search client by name, email, phone, city, or requirements..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Status filter pills */}
                <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                  {(['all', 'new', 'contacted', 'in_discussion', 'won', 'starred'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
                        statusFilter === s
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {s === 'starred' ? '⭐ Starred' : s.replace('_', ' ').toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Solution filter dropdown */}
                <div className="w-full md:w-48">
                  <select
                    value={solutionFilter}
                    onChange={(e) => setSolutionFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="all">All Solutions</option>
                    <option value="Enterprise Architecture & Web Platforms">Web Platforms</option>
                    <option value="Mobile Application Engineering">Mobile Apps</option>
                    <option value="Cloud Architecture & DevOps">Cloud & DevOps</option>
                    <option value="Custom Business CRM / ERP Systems">CRM / ERP</option>
                    <option value="API Integration & Microservices">API Services</option>
                    <option value="Other">Other Solutions</option>
                  </select>
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl shadow-black/20">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 border-b border-slate-800/80 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4 w-12 text-center">⭐</th>
                        <th className="py-3.5 px-4">Client / Prospect</th>
                        <th className="py-3.5 px-4">Requested Solution</th>
                        <th className="py-3.5 px-4">Requirements Preview</th>
                        <th className="py-3.5 px-4">Submitted</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-500">
                            No inquiries match the current search or filters.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => (
                          <tr
                            key={inq.id}
                            className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                            onClick={() => handleSelectInquiry(inq)}
                          >
                            {/* Star Toggle */}
                            <td
                              className="py-3.5 px-4 text-center"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleStar(inq.id)
                              }}
                            >
                              <button className="text-slate-600 hover:text-amber-400 transition-colors">
                                <Star
                                  className={`w-4 h-4 ${
                                    inq.is_starred ? 'text-amber-400 fill-amber-400' : ''
                                  }`}
                                />
                              </button>
                            </td>

                            {/* Client / Prospect */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                                  {inq.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-semibold text-white">{inq.name}</div>
                                  <div className="text-[11px] font-mono text-slate-400">{inq.email}</div>
                                  {inq.phone && (
                                    <div className="text-[10px] font-mono text-slate-400">{inq.phone}</div>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Requested Solution */}
                            <td className="py-3.5 px-4">
                              <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                {inq.solution}
                              </span>
                              {inq.city && (
                                <div className="text-[10px] text-slate-400 mt-0.5">{inq.city}</div>
                              )}
                            </td>

                            {/* Requirements Preview */}
                            <td className="py-3.5 px-4 max-w-xs truncate text-slate-300">
                              {inq.requirements}
                            </td>

                            {/* Submitted Date */}
                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                              {new Date(inq.submittedAt).toLocaleDateString()}
                              <span className="block text-[10px] text-slate-400">
                                {new Date(inq.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </td>

                            {/* CRM Status Dropdown */}
                            <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={inq.status}
                                onChange={(e) => handleStatusChange(inq.id, e.target.value as AdminInquiry['status'])}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold uppercase tracking-wider border focus:outline-none ${
                                  inq.status === 'won'
                                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                                    : inq.status === 'new'
                                    ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40'
                                    : inq.status === 'in_discussion'
                                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                                    : inq.status === 'contacted'
                                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                                    : inq.status === 'proposal_sent'
                                    ? 'bg-purple-500/15 text-purple-300 border-purple-500/40'
                                    : inq.status === 'lost'
                                    ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                                    : 'bg-slate-800 text-slate-400 border-slate-700'
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="in_discussion">In Discussion</option>
                                <option value="proposal_sent">Proposal Sent</option>
                                <option value="won">Won (Deal Closed)</option>
                                <option value="lost">Lost</option>
                                <option value="spam">Spam</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleSelectInquiry(inq)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                  title="View full details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                                  title="Delete inquiry"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Inquiry Detail Slide-Over / Modal */}
              {selectedInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-300 flex items-center justify-center font-bold text-sm">
                          {selectedInquiry.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h2 className="text-base font-bold text-white flex items-center gap-2">
                            <span>{selectedInquiry.name}</span>
                            {selectedInquiry.is_starred && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                          </h2>
                          <div className="text-xs text-slate-400">{selectedInquiry.email}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedInquiry(null)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">Phone</span>
                        <a href={`tel:${selectedInquiry.phone}`} className="text-slate-200 hover:text-indigo-400 font-mono mt-0.5 block truncate">
                          {selectedInquiry.phone || '—'}
                        </a>
                      </div>

                      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">City / Address</span>
                        <span className="text-slate-200 mt-0.5 block truncate">
                          {selectedInquiry.address || selectedInquiry.city || '—'}
                        </span>
                      </div>

                      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">Submitted At</span>
                        <span className="text-slate-200 font-mono mt-0.5 block">
                          {new Date(selectedInquiry.submittedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Solution Tag */}
                    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                        Requested Solution & Domain
                      </span>
                      <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                        {selectedInquiry.solution}
                      </span>
                    </div>

                    {/* Project Requirements Full Text */}
                    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Full Project Requirements & Message
                      </span>
                      <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                        {selectedInquiry.requirements}
                      </p>
                    </div>

                    {/* Attribution & Viewer Linkage */}
                    {(selectedInquiry.visitor_id || selectedInquiry.session_id) && (
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                        <span className="text-[10px] text-indigo-400 uppercase tracking-wider block font-semibold">
                          First-Party Visitor Attribution Link
                        </span>
                        {selectedInquiry.visitor_id && (
                          <div className="text-slate-400 truncate">
                            Visitor UUID: <span className="text-slate-300">{selectedInquiry.visitor_id}</span>
                          </div>
                        )}
                        {selectedInquiry.session_id && (
                          <div className="text-slate-400 truncate">
                            Session UUID: <span className="text-slate-300">{selectedInquiry.session_id}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Admin Consultation Notes Editor */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-indigo-400" />
                          Internal Admin Consultation Notes
                        </label>
                        {saveNotesSuccess && (
                          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Saved to Supabase
                          </span>
                        )}
                      </div>
                      <textarea
                        value={inquiryNotesInput}
                        onChange={(e) => setInquiryNotesInput(e.target.value)}
                        placeholder="Add internal notes about client meeting, pricing quotes, or tech stack requirements..."
                        rows={3}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={handleSaveNotes}
                          disabled={isSavingNotes}
                          className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{isSavingNotes ? 'Saving...' : 'Save Notes'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Current Status:</span>
                        <select
                          value={selectedInquiry.status}
                          onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as AdminInquiry['status'])}
                          className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs font-semibold text-white"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_discussion">In Discussion</option>
                          <option value="proposal_sent">Proposal Sent</option>
                          <option value="won">Won (Deal Closed)</option>
                          <option value="lost">Lost</option>
                          <option value="spam">Spam</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleStar(selectedInquiry.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium"
                        >
                          {selectedInquiry.is_starred ? 'Unstar Lead' : 'Star Lead'}
                        </button>
                        <button
                          onClick={() => setSelectedInquiry(null)}
                          className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: WEBSITE VIEWERS DATA COLLECTION STREAM */}
          {/* ========================================================================= */}
          {activeTab === 'telemetry' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <Eye className="w-5 h-5 text-cyan-400" />
                    Website Viewers & Telemetry Stream
                  </h1>
                  <p className="text-xs text-slate-400">
                    Real-time audience data collection populated in Supabase tables <code className="text-indigo-400 font-mono">dev_visitors</code>, <code className="text-indigo-400 font-mono">dev_sessions</code> & <code className="text-indigo-400 font-mono">dev_telemetry_events</code>
                  </p>
                </div>

                {/* Sub-tab switcher */}
                <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
                  <button
                    onClick={() => setTelemetrySubTab('visitors')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      telemetrySubTab === 'visitors'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Unique Visitors ({visitors.length})
                  </button>
                  <button
                    onClick={() => setTelemetrySubTab('events')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      telemetrySubTab === 'events'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Raw Events ({telemetry.length})
                  </button>
                </div>
              </div>

              {/* Sub-tab 1: Unique Visitors Table (dev_visitors) */}
              {telemetrySubTab === 'visitors' && (
                <div className="space-y-4">
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-950/80 border-b border-slate-800/80 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                          <tr>
                            <th className="py-3.5 px-4">Visitor Profile (UUID)</th>
                            <th className="py-3.5 px-4">Device & OS</th>
                            <th className="py-3.5 px-4">Browser & Screen</th>
                            <th className="py-3.5 px-4">First Seen</th>
                            <th className="py-3.5 px-4">Last Active</th>
                            <th className="py-3.5 px-4">Converted Lead</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {visitors.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="py-12 text-center text-slate-500">
                                No visitor records in dev_visitors table yet.
                              </td>
                            </tr>
                          ) : (
                            visitors.map((v) => (
                              <tr key={v.visitor_id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="py-3.5 px-4 font-mono">
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                                    <span className="text-white font-semibold truncate max-w-[140px] sm:max-w-[200px]" title={v.visitor_id}>
                                      {v.visitor_id}
                                    </span>
                                  </div>
                                </td>

                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-2">
                                    {v.device_type === 'mobile' ? (
                                      <Smartphone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                    ) : v.device_type === 'tablet' ? (
                                      <Tablet className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                    ) : (
                                      <Monitor className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                                    )}
                                    <span className="text-slate-200 capitalize">{v.device_type || 'Desktop'}</span>
                                    {v.os && <span className="text-[10px] font-mono text-slate-400">({v.os})</span>}
                                  </div>
                                </td>

                                <td className="py-3.5 px-4">
                                  <div className="text-slate-200">{v.browser || 'Unknown'}</div>
                                  {v.screen_resolution && (
                                    <div className="text-[10px] font-mono text-slate-400">{v.screen_resolution}</div>
                                  )}
                                </td>

                                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                                  {new Date(v.first_seen).toLocaleDateString()}
                                </td>

                                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-300 whitespace-nowrap">
                                  {new Date(v.last_seen).toLocaleDateString()}{' '}
                                  <span className="text-[10px] text-slate-400">
                                    {new Date(v.last_seen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4">
                                  {v.lead_name ? (
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold text-[11px]">
                                      <CheckCircle2 className="w-3 h-3" />
                                      <span>{v.lead_name}</span>
                                    </div>
                                  ) : (
                                    <span className="text-slate-600 text-[11px] font-mono">Unconverted</span>
                                  )}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-tab 2: Raw Events Stream (dev_telemetry_events) */}
              {telemetrySubTab === 'events' && (
                <div className="space-y-4">
                  {/* Event type filter */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {(['all', 'page_view', 'section_view', 'cta_click', 'contact_click', 'form_submit'] as const).map((ev) => (
                      <button
                        key={ev}
                        onClick={() => setTelemetryFilter(ev)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
                          telemetryFilter === ev
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        {ev.replace('_', ' ').toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-950/80 border-b border-slate-800/80 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                          <tr>
                            <th className="py-3.5 px-4">Event Type</th>
                            <th className="py-3.5 px-4">Page Path</th>
                            <th className="py-3.5 px-4">Section / Target</th>
                            <th className="py-3.5 px-4">Dwell Time</th>
                            <th className="py-3.5 px-4">Timestamp</th>
                            <th className="py-3.5 px-4 text-right">Payload</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {filteredTelemetry.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="py-12 text-center text-slate-500">
                                No telemetry events recorded.
                              </td>
                            </tr>
                          ) : (
                            filteredTelemetry.map((rec) => (
                              <tr key={rec.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="py-3.5 px-4">
                                  <span
                                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                                      rec.event_name === 'form_submit'
                                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                        : rec.event_name === 'cta_click' || rec.event_name === 'contact_click'
                                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                                        : rec.event_name === 'section_view'
                                        ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                                        : 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
                                    }`}
                                  >
                                    {rec.event_name}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4 font-mono text-slate-300">
                                  {rec.page_path}
                                </td>

                                <td className="py-3.5 px-4">
                                  <div className="text-slate-200">{rec.section_name || rec.section_id || '—'}</div>
                                  {rec.element_label && (
                                    <div className="text-[10px] font-mono text-slate-400">CTA: {rec.element_label}</div>
                                  )}
                                </td>

                                <td className="py-3.5 px-4 font-mono text-slate-300">
                                  {rec.dwell_time_seconds ? `${rec.dwell_time_seconds}s` : '—'}
                                </td>

                                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                                  {new Date(rec.created_at).toLocaleTimeString()}
                                </td>

                                <td className="py-3.5 px-4 text-right">
                                  <button
                                    onClick={() => setSelectedEventPayload(rec)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                                    title="View JSON metadata"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* JSON Event Payload Modal */}
              {selectedEventPayload && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                        <span>Event Payload #{selectedEventPayload.id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400">
                          {selectedEventPayload.event_name}
                        </span>
                      </h3>
                      <button onClick={() => setSelectedEventPayload(null)} className="text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-96">
                      {JSON.stringify(selectedEventPayload, null, 2)}
                    </pre>
                    <div className="flex justify-end">
                      <button
                        onClick={() => setSelectedEventPayload(null)}
                        className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: SECURITY & IP LOCKOUTS */}
          {/* ========================================================================= */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              {/* Top Banner */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="text-base font-bold text-white tracking-tight">Security Gateway & IP Lockout Registry</h1>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Zero persistent session policy with brute-force IP rate limiting: 3 failed password attempts blocks client IP for 15 minutes (Tier 1), escalating to 30 minutes (Tier 2+).
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowManualBlockModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-rose-600/20 border border-rose-500/30 hover:bg-rose-600/30 text-rose-300 flex items-center gap-2 text-xs font-medium transition-all"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Manual IP Block</span>
                  </button>
                </div>
              </div>

              {/* IP Lockout Table (dev_admin_ip_blocks) */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-rose-400" />
                      IP Block & Lockout Registry (dev_admin_ip_blocks)
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      IPs currently restricted or tracked for failed administrative authorization
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 border-b border-slate-800/80 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Client IP Address</th>
                        <th className="py-3.5 px-4">Failed Attempts</th>
                        <th className="py-3.5 px-4">Lockout Status</th>
                        <th className="py-3.5 px-4">Lockout Tier</th>
                        <th className="py-3.5 px-4">Last Attempted</th>
                        <th className="py-3.5 px-4 text-right">Admin Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {ipBlocks.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-500">
                            No failed attempts or IP lockouts registered. System operating normally.
                          </td>
                        </tr>
                      ) : (
                        ipBlocks.map((blk) => {
                          const isBlockedNow = blk.is_blocked && blk.blocked_until > nowMs
                          const remainingMin = isBlockedNow ? Math.ceil((blk.blocked_until - nowMs) / (60 * 1000)) : 0

                          return (
                            <tr key={blk.id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="py-3.5 px-4 font-mono font-semibold text-white">
                                {blk.ip_address}
                              </td>

                              <td className="py-3.5 px-4 font-mono text-slate-300">
                                {blk.failed_attempts} strikes
                              </td>

                              <td className="py-3.5 px-4">
                                {isBlockedNow ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                                    Blocked ({remainingMin}m left)
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                    Cleared
                                  </span>
                                )}
                              </td>

                              <td className="py-3.5 px-4 font-mono text-slate-300">
                                Tier {blk.block_tier || 1}
                              </td>

                              <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                                {new Date(blk.last_attempt_at).toLocaleString()}
                              </td>

                              <td className="py-3.5 px-4 text-right">
                                {isBlockedNow ? (
                                  <button
                                    onClick={() => handleClearIpBlock(blk.ip_address)}
                                    className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 text-xs font-medium flex items-center gap-1.5 ml-auto transition-colors"
                                  >
                                    <Unlock className="w-3.5 h-3.5" />
                                    <span>Unlock IP</span>
                                  </button>
                                ) : (
                                  <span className="text-slate-600 text-xs">—</span>
                                )}
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Active Admin Sessions Table (dev_admin_sessions) */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-4">
                <div>
                  <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-indigo-400" />
                    Active Admin Sessions (dev_admin_sessions)
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Zero persistent sessions policy: tokens are verified against Supabase and automatically expire
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 border-b border-slate-800/80 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Admin</th>
                        <th className="py-3.5 px-4">Token Preview</th>
                        <th className="py-3.5 px-4">Client IP</th>
                        <th className="py-3.5 px-4">Last Activity</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {sessionsList.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-500">
                            No active sessions found.
                          </td>
                        </tr>
                      ) : (
                        sessionsList.map((sess) => {
                          const isActive = !sess.is_revoked && new Date(sess.expires_at).getTime() > nowMs

                          return (
                            <tr key={sess.session_id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="py-3.5 px-4 font-semibold text-white">
                                {sess.username}
                                <span className="block text-[10px] font-mono text-slate-400">{sess.role}</span>
                              </td>

                              <td className="py-3.5 px-4 font-mono text-slate-400">
                                {sess.token ? `${sess.token.slice(0, 10)}...` : '—'}
                              </td>

                              <td className="py-3.5 px-4 font-mono text-slate-300">
                                {sess.ip_address || '—'}
                              </td>

                              <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                                {new Date(sess.last_activity_at).toLocaleTimeString()}
                              </td>

                              <td className="py-3.5 px-4">
                                {isActive ? (
                                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Active
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                    {sess.revoked_reason || 'Revoked'}
                                  </span>
                                )}
                              </td>

                              <td className="py-3.5 px-4 text-right">
                                {isActive ? (
                                  <button
                                    onClick={() => handleRevokeSession(sess.session_id)}
                                    className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-medium transition-colors"
                                  >
                                    Revoke
                                  </button>
                                ) : (
                                  <span className="text-slate-600 text-xs">—</span>
                                )}
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Manual IP Block Modal */}
              {showManualBlockModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-rose-400" />
                        Manual IP Blacklist
                      </h3>
                      <button onClick={() => setShowManualBlockModal(false)} className="text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleManualBlockIp} className="space-y-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">IP Address to Lock Out</label>
                        <input
                          type="text"
                          required
                          value={manualBlockIpInput}
                          onChange={(e) => setManualBlockIpInput(e.target.value)}
                          placeholder="e.g. 192.168.1.100"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Reason / Notes</label>
                        <input
                          type="text"
                          value={manualBlockReasonInput}
                          onChange={(e) => setManualBlockReasonInput(e.target.value)}
                          placeholder="Reason for block..."
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => setShowManualBlockModal(false)}
                          className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={manualBlockLoading}
                          className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium"
                        >
                          {manualBlockLoading ? 'Locking...' : 'Lock IP'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: AUDIT TRAIL LOGS */}
          {/* ========================================================================= */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <History className="w-5 h-5 text-indigo-400" />
                    Immutable Audit Trail Logs
                  </h1>
                  <p className="text-xs text-slate-400">
                    Full historical log of administrative actions recorded in Supabase table <code className="text-indigo-400 font-mono">dev_admin_audit_logs</code>
                  </p>
                </div>
              </div>

              {/* Search & Filter */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-sm flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={auditSearch}
                    onChange={(e) => setAuditSearch(e.target.value)}
                    placeholder="Search audit trail by user, action, target, or IP..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="w-full sm:w-48">
                  <select
                    value={auditAdminFilter}
                    onChange={(e) => setAuditAdminFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">All Administrators</option>
                    {admins.map((a) => (
                      <option key={a.admin_id} value={a.username}>
                        {a.username}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Audit Table */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 border-b border-slate-800/80 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Action</th>
                        <th className="py-3.5 px-4">Administrator</th>
                        <th className="py-3.5 px-4">Target Entity</th>
                        <th className="py-3.5 px-4">IP Address</th>
                        <th className="py-3.5 px-4">Timestamp</th>
                        <th className="py-3.5 px-4 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredAuditLogs.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-500">
                            No audit trail logs found matching query.
                          </td>
                        </tr>
                      ) : (
                        filteredAuditLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-semibold text-white">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider border ${
                                  log.action.includes('delete') || log.action.includes('revoke')
                                    ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                                    : log.action.includes('create') || log.action.includes('won')
                                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                    : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                                }`}
                              >
                                {log.action.replace(/_/g, ' ')}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-white">{log.admin_username}</div>
                              <div className="text-[10px] font-mono text-slate-400">{log.admin_role}</div>
                            </td>

                            <td className="py-3.5 px-4 font-mono text-slate-300">
                              {log.target_type}
                              {log.target_id && (
                                <span className="text-[10px] text-slate-500 block truncate max-w-[120px]">
                                  #{log.target_id}
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-4 font-mono text-slate-300">
                              {log.ip_address || '—'}
                            </td>

                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                              {new Date(log.created_at).toLocaleString()}
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              {log.details ? (
                                <button
                                  onClick={() => setSelectedAuditLog(log)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                                  title="View before/after payload diff"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              ) : (
                                <span className="text-slate-600 text-xs">—</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* JSON Audit Diff Modal */}
              {selectedAuditLog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                        <span>Audit Log Diff #{selectedAuditLog.id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400">
                          {selectedAuditLog.action}
                        </span>
                      </h3>
                      <button onClick={() => setSelectedAuditLog(null)} className="text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-slate-400">
                      Modified by <strong className="text-white font-mono">{selectedAuditLog.admin_username}</strong> on target table <code className="text-indigo-300 font-mono">{selectedAuditLog.target_type}</code>
                    </div>

                    <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-96">
                      {JSON.stringify(selectedAuditLog.details, null, 2)}
                    </pre>

                    <div className="flex justify-end">
                      <button
                        onClick={() => setSelectedAuditLog(null)}
                        className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: TEAM & ADMINISTRATORS */}
          {/* ========================================================================= */}
          {activeTab === 'admins' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-400" />
                    Administrative Accounts
                  </h1>
                  <p className="text-xs text-slate-400">
                    Platform operators managed in Supabase table <code className="text-indigo-400 font-mono">dev_admins</code>
                  </p>
                </div>

                <button
                  onClick={() => setShowNewAdminModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 text-xs font-medium transition-all shadow-lg shadow-indigo-600/25"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Administrator</span>
                </button>
              </div>

              {/* Admins Table */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 border-b border-slate-800/80 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Username</th>
                        <th className="py-3.5 px-4">Full Name & Email</th>
                        <th className="py-3.5 px-4">Role</th>
                        <th className="py-3.5 px-4">Account Status</th>
                        <th className="py-3.5 px-4">Created At</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {admins.map((adm) => (
                        <tr key={adm.admin_id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-semibold text-white">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs">
                                {adm.username.slice(0, 2).toUpperCase()}
                              </div>
                              <span>{adm.username}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-medium text-white">{adm.full_name || '—'}</div>
                            <div className="text-[11px] font-mono text-slate-400">{adm.email || '—'}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                              {adm.role.replace('_', ' ')}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              Active
                            </span>
                          </td>

                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                            {new Date(adm.created_at).toLocaleDateString()}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            {adm.admin_id === session.admin_id ? (
                              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">
                                (Current Session)
                              </span>
                            ) : (
                              <button
                                onClick={() => handleDeleteAdmin(adm.admin_id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                                title="Delete admin"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Create Admin Modal */}
              {showNewAdminModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-indigo-400" />
                        Create New Administrator
                      </h3>
                      <button onClick={() => setShowNewAdminModal(false)} className="text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {newAdminError && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
                        {newAdminError}
                      </div>
                    )}

                    {newAdminSuccess && (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                        <Check className="w-4 h-4" /> Administrator created and synced with Supabase!
                      </div>
                    )}

                    <form onSubmit={handleCreateAdminSubmit} className="space-y-3">
                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Username (Login ID)</label>
                        <input
                          type="text"
                          required
                          value={newAdminUsername}
                          onChange={(e) => setNewAdminUsername(e.target.value)}
                          placeholder="e.g. marvel_alex"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Password</label>
                        <input
                          type="password"
                          required
                          value={newAdminPassword}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Full Name</label>
                        <input
                          type="text"
                          value={newAdminFullName}
                          onChange={(e) => setNewAdminFullName(e.target.value)}
                          placeholder="e.g. Alex Henderson"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Work Email</label>
                        <input
                          type="email"
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                          placeholder="alex@marvelsoftwares.in"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Role & Permissions</label>
                        <select
                          value={newAdminRole}
                          onChange={(e) => setNewAdminRole(e.target.value as AdminUser['role'])}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                        >
                          <option value="super_admin">Super Admin (Full Root Permissions)</option>
                          <option value="operations">Operations (Leads CRM & Inquiries)</option>
                          <option value="analyst">Analyst (Telemetry & Reporting)</option>
                          <option value="editor">Editor (Read-only)</option>
                        </select>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => setShowNewAdminModal(false)}
                          className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={newAdminLoading}
                          className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium"
                        >
                          {newAdminLoading ? 'Creating...' : 'Create Admin'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: POSTGRESQL SCHEMA & SQL DEFINITIONS */}
          {/* ========================================================================= */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm flex items-start gap-3">
                <Database className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-white">PostgreSQL dev_ Schema Definitions</p>
                  <p className="text-slate-400 leading-relaxed">
                    Use these production queries to verify or bootstrap PostgreSQL tables, triggers, and views in Supabase, Neon, AWS RDS, or Docker. All objects use the required <code className="text-indigo-300 font-mono">dev_</code> prefix to prevent collisions.
                  </p>
                </div>
              </div>

              {/* SQL Query 1: dev_admins & dev_admin_sessions */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">1. dev_admins & dev_admin_sessions</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300">
                      Security & Zero Persistence
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      handleCopyCode(
                        `CREATE TABLE IF NOT EXISTS dev_admins (
    admin_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(60) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64),
    full_name VARCHAR(120),
    email VARCHAR(255) UNIQUE,
    role VARCHAR(30) NOT NULL DEFAULT 'super_admin',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dev_admin_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES dev_admins(admin_id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    ip_address INET,
    user_agent TEXT,
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
    revoked_reason VARCHAR(100),
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`,
                        'sql_admin'
                      )
                    }
                    className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {copiedSection === 'sql_admin' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Query</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                  <pre>{`CREATE TABLE IF NOT EXISTS dev_admins (
    admin_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(60) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64),
    full_name VARCHAR(120),
    email VARCHAR(255) UNIQUE,
    role VARCHAR(30) NOT NULL DEFAULT 'super_admin',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dev_admin_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES dev_admins(admin_id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    ip_address INET,
    user_agent TEXT,
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
    revoked_reason VARCHAR(100),
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`}</pre>
                </div>
              </div>

              {/* SQL Query 2: dev_admin_ip_blocks */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">2. dev_admin_ip_blocks</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/15 text-rose-300">
                      Brute-Force Lockout
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      handleCopyCode(
                        `CREATE TABLE IF NOT EXISTS dev_admin_ip_blocks (
    id BIGSERIAL PRIMARY KEY,
    ip_address INET NOT NULL UNIQUE,
    failed_attempts INT NOT NULL DEFAULT 0,
    is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
    blocked_until TIMESTAMPTZ,
    block_tier INT NOT NULL DEFAULT 0,
    first_failed_at TIMESTAMPTZ,
    last_attempt_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_attempt_username VARCHAR(60),
    total_lifetime_blocks INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`,
                        'sql_ip'
                      )
                    }
                    className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {copiedSection === 'sql_ip' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Query</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                  <pre>{`CREATE TABLE IF NOT EXISTS dev_admin_ip_blocks (
    id BIGSERIAL PRIMARY KEY,
    ip_address INET NOT NULL UNIQUE,
    failed_attempts INT NOT NULL DEFAULT 0,
    is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
    blocked_until TIMESTAMPTZ,
    block_tier INT NOT NULL DEFAULT 0,
    first_failed_at TIMESTAMPTZ,
    last_attempt_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_attempt_username VARCHAR(60),
    total_lifetime_blocks INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`}</pre>
                </div>
              </div>

              {/* SQL Query 3: dev_admin_audit_logs */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">3. dev_admin_audit_logs</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300">
                      Immutable Audit Trail
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      handleCopyCode(
                        `CREATE TABLE IF NOT EXISTS dev_admin_audit_logs (
    id BIGSERIAL PRIMARY KEY,
    admin_id UUID REFERENCES dev_admins(admin_id) ON DELETE SET NULL,
    admin_username VARCHAR(60) NOT NULL,
    admin_role VARCHAR(30) DEFAULT 'super_admin',
    action VARCHAR(80) NOT NULL,
    target_type VARCHAR(60),
    target_id VARCHAR(100),
    details JSONB,
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`,
                        'sql_audit'
                      )
                    }
                    className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {copiedSection === 'sql_audit' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Query</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                  <pre>{`CREATE TABLE IF NOT EXISTS dev_admin_audit_logs (
    id BIGSERIAL PRIMARY KEY,
    admin_id UUID REFERENCES dev_admins(admin_id) ON DELETE SET NULL,
    admin_username VARCHAR(60) NOT NULL,
    admin_role VARCHAR(30) DEFAULT 'super_admin',
    action VARCHAR(80) NOT NULL,
    target_type VARCHAR(60),
    target_id VARCHAR(100),
    details JSONB,
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`}</pre>
                </div>
              </div>

              {/* SQL Query 4: dev_contact_inquiries, dev_visitors, dev_sessions, dev_telemetry_events */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">4. dev_visitors, dev_sessions, dev_telemetry_events & dev_contact_inquiries</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300">
                      CRM & Viewers Tracking
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      handleCopyCode(
                        `CREATE TABLE IF NOT EXISTS dev_visitors (
    visitor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    device_type VARCHAR(20) DEFAULT 'desktop',
    browser VARCHAR(50),
    os VARCHAR(50),
    screen_resolution VARCHAR(30),
    language VARCHAR(20),
    referrer TEXT,
    consent_status VARCHAR(20) NOT NULL DEFAULT 'accepted',
    lead_name VARCHAR(150),
    lead_email VARCHAR(255),
    lead_phone VARCHAR(50),
    lead_address TEXT,
    converted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS dev_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID NOT NULL REFERENCES dev_visitors(visitor_id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    landing_page VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS dev_telemetry_events (
    id BIGSERIAL PRIMARY KEY,
    visitor_id UUID NOT NULL REFERENCES dev_visitors(visitor_id) ON DELETE CASCADE,
    session_id UUID REFERENCES dev_sessions(session_id) ON DELETE CASCADE,
    event_name VARCHAR(60) NOT NULL,
    page_path VARCHAR(255) NOT NULL,
    section_id VARCHAR(60),
    section_name VARCHAR(120),
    dwell_time_seconds INT DEFAULT 0,
    element_label VARCHAR(150),
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dev_contact_inquiries (
    id BIGSERIAL PRIMARY KEY,
    visitor_id UUID REFERENCES dev_visitors(visitor_id) ON DELETE SET NULL,
    session_id UUID REFERENCES dev_sessions(session_id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    solution VARCHAR(100) DEFAULT 'Other',
    requirements TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'new',
    admin_notes TEXT,
    is_starred BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`,
                        'sql_telemetry_crm'
                      )
                    }
                    className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {copiedSection === 'sql_telemetry_crm' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Query</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                  <pre>{`CREATE TABLE IF NOT EXISTS dev_visitors (
    visitor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    device_type VARCHAR(20) DEFAULT 'desktop',
    browser VARCHAR(50),
    os VARCHAR(50),
    screen_resolution VARCHAR(30),
    language VARCHAR(20),
    referrer TEXT,
    consent_status VARCHAR(20) NOT NULL DEFAULT 'accepted',
    lead_name VARCHAR(150),
    lead_email VARCHAR(255),
    lead_phone VARCHAR(50),
    lead_address TEXT,
    converted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS dev_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID NOT NULL REFERENCES dev_visitors(visitor_id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    landing_page VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS dev_telemetry_events (
    id BIGSERIAL PRIMARY KEY,
    visitor_id UUID NOT NULL REFERENCES dev_visitors(visitor_id) ON DELETE CASCADE,
    session_id UUID REFERENCES dev_sessions(session_id) ON DELETE CASCADE,
    event_name VARCHAR(60) NOT NULL,
    page_path VARCHAR(255) NOT NULL,
    section_id VARCHAR(60),
    section_name VARCHAR(120),
    dwell_time_seconds INT DEFAULT 0,
    element_label VARCHAR(150),
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dev_contact_inquiries (
    id BIGSERIAL PRIMARY KEY,
    visitor_id UUID REFERENCES dev_visitors(visitor_id) ON DELETE SET NULL,
    session_id UUID REFERENCES dev_sessions(session_id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    solution VARCHAR(100) DEFAULT 'Other',
    requirements TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'new',
    admin_notes TEXT,
    is_starred BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`}</pre>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
