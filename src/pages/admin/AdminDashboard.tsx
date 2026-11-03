import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  MessageSquareText,
  Eye,
  ShieldAlert,
  History,
  Users,
  Database,
  LogOut,
  RefreshCw,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  Globe,
  Activity,
  Star,
  CheckCircle2,
  Shield,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  Compass,
  Download,
  Search,
  Trash2,
  FileText,
  Check,
  Save,
  Plus,
  Copy,
  Lock,
  Filter,
  Laptop,
} from 'lucide-react'
import {
  getCurrentAdminSession,
  logoutAdmin,
  getAllInquiriesFromDB,
  updateInquiryStatus,
  updateInquiryNotes,
  toggleStarInquiry,
  deleteInquiry,
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

    const activeSessionsCount = sessionsList.filter((s) => !s.is_revoked && new Date(s.expires_at).getTime() > nowMs).length
    const activeBlocksCount = ipBlocks.filter((b) => b.is_blocked && b.blocked_until > nowMs).length

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
  }, [inquiries, telemetry, visitors, sessionsList, ipBlocks, nowMs])

  // 7-day activity timeline computation
  const sevenDayChartData = useMemo(() => {
    const days: { dateStr: string; label: string; inquiries: number; pageviews: number }[] = []
    const now = new Date(nowMs)

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
  }, [inquiries, telemetry, nowMs])

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
    <div className="min-h-screen bg-[#F5F7FB] text-[#111827] flex font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ========================================================================= */}
      {/* SIDEBAR NAVIGATION (Modern White & Blue Sidebar) */}
      {/* ========================================================================= */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-[#E5E7EB] shadow-sm flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-[#172554] block">
                  MARVEL CONSOLE
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-700 tracking-wider uppercase font-semibold">
                    Supabase Live (dev_)
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links Group */}
          <div className="p-3.5 space-y-1">
            <div className="px-3 pt-2 pb-2 text-[10px] font-mono uppercase tracking-widest text-[#64748B] font-semibold">
              Platform Modules
            </div>

            {/* Tab: Overview */}
            <button
              onClick={() => {
                setActiveTab('overview')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Executive Overview</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform ${
                  activeTab === 'overview' ? 'rotate-90 text-white' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Tab: Inquiries CRM */}
            <button
              onClick={() => {
                setActiveTab('inquiries')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquareText className="w-4 h-4" />
                <span>Inquiries & Leads CRM</span>
              </div>
              {stats.newCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-[#F97316] text-white shadow-sm">
                  {stats.newCount} NEW
                </span>
              )}
            </button>

            {/* Tab: Telemetry Stream */}
            <button
              onClick={() => {
                setActiveTab('telemetry')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'telemetry'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Eye className="w-4 h-4" />
                <span>Website Viewers Stream</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                {stats.uniqueVisitorCount}
              </span>
            </button>

            <div className="px-3 pt-5 pb-2 text-[10px] font-mono uppercase tracking-widest text-[#64748B] font-semibold">
              Security & Administration
            </div>

            {/* Tab: Security */}
            <button
              onClick={() => {
                setActiveTab('security')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4" />
                <span>Security & IP Lockouts</span>
              </div>
              {stats.activeBlocksCount > 0 ? (
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-[#F97316] text-white shadow-sm">
                  {stats.activeBlocksCount} BLOCKED
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  SAFE
                </span>
              )}
            </button>

            {/* Tab: Audit Logs */}
            <button
              onClick={() => {
                setActiveTab('audit')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <History className="w-4 h-4" />
                <span>Audit Trail Logs</span>
              </div>
              <span className="text-[10px] font-mono text-[#64748B]">{auditLogs.length}</span>
            </button>

            {/* Tab: Admins */}
            <button
              onClick={() => {
                setActiveTab('admins')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'admins'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Admin Accounts</span>
              </div>
              <span className="text-[10px] font-mono text-[#64748B]">{admins.length}</span>
            </button>

            {/* Tab: Database */}
            <button
              onClick={() => {
                setActiveTab('database')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'database'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Database className="w-4 h-4" />
                <span>Postgres Schema & SQL</span>
              </div>
              <span className="text-[10px] font-mono text-[#2563EB] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                dev_*
              </span>
            </button>
          </div>
        </div>

        {/* Footer: User Profile & Logout */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#F8FAFC]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0">
                {session.username.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#111827] truncate">
                  {session.full_name || session.username}
                </div>
                <div className="text-[10px] font-mono text-[#64748B] truncate">
                  {session.role.replace('_', ' ')}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleAutoLogout('user_logout')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Navigation */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono uppercase tracking-wider text-[#64748B] text-[11px]">
                  Marvel Softwares
                </span>
                <span className="text-slate-300">/</span>
                <span className="font-semibold text-[#172554] capitalize truncate">
                  {activeTab === 'telemetry' ? 'Website Viewers Stream' : activeTab.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-[#64748B] font-medium hidden sm:inline">
                  Supabase Production DB
                </span>
                <span className="text-[10px] font-mono text-[#2563EB] bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                  dev_*
                </span>
              </div>
            </div>
          </div>

          {/* Right Header Action Items */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Auto Logout Countdown Badge */}
            <div
              className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors ${
                idleMins < 2
                  ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] text-slate-700'
              }`}
              title="Zero-persistence auto logout triggers after 15m of inactivity"
            >
              <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>
                Auto-Logout: <strong className="text-[#111827]">{idleMins}:{idleSecs < 10 ? `0${idleSecs}` : idleSecs}</strong>
              </span>
            </div>

            {/* Refresh DB Button */}
            <button
              onClick={() => {
                setRefreshKey((k) => k + 1)
              }}
              disabled={isLoadingData}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#1E293B] flex items-center gap-2 text-xs font-medium transition-all shadow-xs cursor-pointer disabled:opacity-50"
              title="Refresh all data from Supabase"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#2563EB] ${isLoadingData ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh DB</span>
            </button>

            {/* Visit Live Website Link */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-[#2563EB] hover:bg-blue-100 flex items-center gap-1.5 text-xs font-medium transition-all"
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
              {/* Welcome Section */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-1">
                    <span>ADMINISTRATIVE OVERVIEW</span>
                    <span>•</span>
                    <span className="text-[#2563EB] font-bold">
                      {new Date(nowMs).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#172554] tracking-tight">
                    Welcome back, {session.full_name || session.username}
                  </h1>
                  <p className="text-xs text-[#64748B] mt-1 max-w-2xl leading-relaxed">
                    Here is what's happening across Marvel Softwares today. All metrics and CRM inquiries are synchronized live with PostgreSQL dev_ tables.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <MessageSquareText className="w-4 h-4" />
                    <span>View Inquiries</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('telemetry')}
                    className="px-4 py-2 bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#111827] rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-[#2563EB]" />
                    <span>View Stream</span>
                  </button>
                </div>
              </div>

              {/* Top 4 KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* Total Leads / Inquiries */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold">
                      Total Inquiries
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100">
                      <MessageSquareText className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-[#111827] tracking-tight">
                      {stats.totalInquiries}
                    </span>
                    {stats.newCount > 0 && (
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200">
                        +{stats.newCount} New
                      </span>
                    )}
                  </div>
                  <div className="mt-2.5 text-xs text-[#64748B] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Conversion Rate: <strong className="text-[#111827] font-mono">{stats.conversionRate}%</strong> won</span>
                  </div>
                </div>

                {/* Unique Viewers */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold">
                      Website Viewers
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center border border-sky-100">
                      <Globe className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-[#111827] tracking-tight">
                      {stats.uniqueVisitorCount}
                    </span>
                    <span className="text-xs font-mono text-[#64748B]">
                      {stats.totalPageviews} Views
                    </span>
                  </div>
                  <div className="mt-2.5 text-xs text-[#64748B] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-sky-600" />
                    <span>First-Party Live Telemetry</span>
                  </div>
                </div>

                {/* Starred / Priority Leads */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold">
                      Starred Inquiries
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                      <Star className="w-5 h-5 fill-amber-500/20" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-[#111827] tracking-tight">
                      {stats.starredCount}
                    </span>
                    <span className="text-xs font-mono text-[#64748B]">Priority Leads</span>
                  </div>
                  <div className="mt-2.5 text-xs text-[#64748B] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>High Priority Follow-ups</span>
                  </div>
                </div>

                {/* Security Threat Status */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold">
                      Security Status
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center border border-orange-100">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-[#111827] tracking-tight">
                      {stats.activeBlocksCount}
                    </span>
                    <span className="text-xs font-mono text-[#F97316] font-semibold">
                      {stats.activeBlocksCount === 1 ? 'Blocked IP' : 'Blocked IPs'}
                    </span>
                  </div>
                  <div className="mt-2.5 text-xs text-[#64748B] flex items-center gap-1.5">
                    {stats.activeBlocksCount > 0 ? (
                      <span className="text-[#F97316] font-semibold">Brute-Force Lockout Active</span>
                    ) : (
                      <span className="text-emerald-700 font-medium">Zero Hostile Lockouts</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 7-Day Performance & Traffic Curve */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-base font-bold text-[#172554] tracking-tight flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#2563EB]" />
                      7-Day Activity & Lead Generation Trend
                    </h2>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Daily incoming inquiries and pageviews from Supabase dev_contact_inquiries & dev_telemetry_events
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#0284C7]" />
                      <span className="text-slate-700 font-medium">Pageviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#2563EB]" />
                      <span className="text-slate-700 font-medium">Inquiries</span>
                    </div>
                  </div>
                </div>

                {/* SVG Area Chart */}
                <div className="w-full h-64 relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0284C7" stopOpacity="0.20" />
                        <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="inqGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    <line x1="0" y1="50" x2="700" y2="50" stroke="#F1F5F9" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="0" y1="100" x2="700" y2="100" stroke="#F1F5F9" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="0" y1="150" x2="700" y2="150" stroke="#F1F5F9" strokeDasharray="4 4" strokeWidth="1" />

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
                          <path d={pvPath} fill="none" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />

                          <path d={inqArea} fill="url(#inqGrad)" />
                          <path d={inqPath} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />

                          {sevenDayChartData.map((d, i) => {
                            const x = (i / 6) * 700
                            const yPv = 170 - (d.pageviews / maxVal) * 140
                            const yInq = 170 - (d.inquiries / maxVal) * 140
                            return (
                              <g key={i}>
                                <circle cx={x} cy={yPv} r="4" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                                <circle cx={x} cy={yInq} r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                              </g>
                            )
                          })}
                        </>
                      )
                    })()}
                  </svg>

                  {/* Date labels under chart */}
                  <div className="flex justify-between mt-3 text-[11px] font-mono text-[#64748B]">
                    {sevenDayChartData.map((d, idx) => (
                      <span key={idx} className="text-center">{d.label}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Recent Inquiries + Device & Section Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Inquiries Quick Table */}
                <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-[#172554] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#2563EB]" />
                      Recent Inquiries
                    </h3>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs text-[#2563EB] hover:text-blue-800 font-semibold cursor-pointer"
                    >
                      View All Leads &rarr;
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="text-center py-12 text-[#64748B] text-xs">
                      No customer inquiries recorded in Supabase yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-[#E5E7EB] overflow-x-auto">
                      {inquiries.slice(0, 5).map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => {
                            handleSelectInquiry(inq)
                            setActiveTab('inquiries')
                          }}
                          className="py-3 px-2 flex items-center justify-between hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-100 flex items-center justify-center font-bold text-xs shrink-0">
                              {inq.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-[#111827] truncate flex items-center gap-2">
                                <span>{inq.name}</span>
                                {inq.is_starred && <Star className="w-3 h-3 text-amber-500 fill-amber-500" />}
                              </div>
                              <div className="text-[11px] text-[#64748B] truncate">
                                {inq.solution} • {inq.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                                inq.status === 'won'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : inq.status === 'new'
                                  ? 'bg-orange-50 text-orange-700 border-orange-200'
                                  : inq.status === 'in_discussion'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : inq.status === 'contacted'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              {inq.status.replace('_', ' ')}
                            </span>
                            <span className="text-[11px] font-mono text-[#64748B] hidden sm:inline">
                              {new Date(inq.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Device & Section Engagement Breakdown */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-6">
                  {/* Device breakdown */}
                  <div>
                    <h3 className="text-sm font-bold text-[#172554] mb-3 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#2563EB]" />
                      Audience Device Split
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-700 mb-1 font-medium">
                          <span className="flex items-center gap-1.5"><Monitor className="w-3.5 h-3.5 text-[#2563EB]" /> Desktop</span>
                          <span className="font-mono text-[#111827] font-bold">{stats.deviceBreakdown.desktop}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${stats.deviceBreakdown.desktop}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-700 mb-1 font-medium">
                          <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-sky-600" /> Mobile</span>
                          <span className="font-mono text-[#111827] font-bold">{stats.deviceBreakdown.mobile}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-sky-500 rounded-full" style={{ width: `${stats.deviceBreakdown.mobile}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-700 mb-1 font-medium">
                          <span className="flex items-center gap-1.5"><Tablet className="w-3.5 h-3.5 text-amber-600" /> Tablet</span>
                          <span className="font-mono text-[#111827] font-bold">{stats.deviceBreakdown.tablet}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${stats.deviceBreakdown.tablet}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Sections */}
                  <div className="pt-4 border-t border-[#E5E7EB]">
                    <h3 className="text-sm font-bold text-[#172554] mb-3 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-emerald-600" />
                      Top Engaged Sections
                    </h3>
                    {stats.topSections.length === 0 ? (
                      <div className="text-xs text-[#64748B] py-2">Waiting for first telemetry events...</div>
                    ) : (
                      <div className="space-y-2.5">
                        {stats.topSections.map((sec) => (
                          <div key={sec.id} className="flex items-center justify-between text-xs">
                            <span className="text-[#334155] font-medium truncate max-w-[150px]">{sec.name}</span>
                            <div className="flex items-center gap-3 font-mono text-[11px]">
                              <span className="text-[#2563EB] font-bold">{sec.views} views</span>
                              <span className="text-[#64748B]">{sec.avgDwell}s avg</span>
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
                  <h1 className="text-lg font-bold text-[#172554] tracking-tight">Project Inquiries & Leads CRM</h1>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Live customer requests synced with Supabase table <code className="text-[#2563EB] font-mono font-semibold">dev_contact_inquiries</code>
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleExportCSV}
                    disabled={filteredInquiries.length === 0}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#111827] flex items-center gap-2 text-xs font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search client by name, email, phone, city, or requirements..."
                    className="w-full pl-9 pr-8 py-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
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
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        statusFilter === s
                          ? 'bg-[#2563EB] text-white shadow-xs'
                          : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#111827] border border-[#E5E7EB]'
                      }`}
                    >
                      {s === 'starred' ? '⭐ Starred' : s.replace('_', ' ').toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Solution filter dropdown */}
                <div className="w-full md:w-52">
                  <select
                    value={solutionFilter}
                    onChange={(e) => setSolutionFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-colors"
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
              <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-mono uppercase tracking-wider text-[11px]">
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
                    <tbody className="divide-y divide-[#E5E7EB]">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-[#64748B]">
                            No inquiries match the current search or filters.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => (
                          <tr
                            key={inq.id}
                            className="hover:bg-slate-50 transition-colors group cursor-pointer"
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
                              <button className="text-slate-300 hover:text-amber-500 transition-colors cursor-pointer">
                                <Star
                                  className={`w-4 h-4 ${
                                    inq.is_starred ? 'text-amber-500 fill-amber-500' : ''
                                  }`}
                                />
                              </button>
                            </td>

                            {/* Client / Prospect */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-100 flex items-center justify-center font-bold text-xs shrink-0">
                                  {inq.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-semibold text-[#111827]">{inq.name}</div>
                                  <div className="text-[11px] font-mono text-[#64748B]">{inq.email}</div>
                                  {inq.phone && (
                                    <div className="text-[10px] font-mono text-[#64748B]">{inq.phone}</div>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Requested Solution */}
                            <td className="py-3.5 px-4">
                              <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-medium bg-blue-50 text-[#2563EB] border border-blue-100">
                                {inq.solution}
                              </span>
                              {inq.city && (
                                <div className="text-[10px] text-[#64748B] mt-0.5">{inq.city}</div>
                              )}
                            </td>

                            {/* Requirements Preview */}
                            <td className="py-3.5 px-4 max-w-xs truncate text-[#334155]">
                              {inq.requirements}
                            </td>

                            {/* Submitted Date */}
                            <td className="py-3.5 px-4 font-mono text-[11px] text-[#64748B] whitespace-nowrap">
                              {new Date(inq.submittedAt).toLocaleDateString()}
                              <span className="block text-[10px] text-[#94A3B8]">
                                {new Date(inq.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </td>

                            {/* CRM Status Dropdown */}
                            <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={inq.status}
                                onChange={(e) => handleStatusChange(inq.id, e.target.value as AdminInquiry['status'])}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold uppercase tracking-wider border focus:outline-none cursor-pointer ${
                                  inq.status === 'won'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : inq.status === 'new'
                                    ? 'bg-orange-50 text-orange-700 border-orange-200'
                                    : inq.status === 'in_discussion'
                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                    : inq.status === 'contacted'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : inq.status === 'proposal_sent'
                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                    : inq.status === 'lost'
                                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                                    : 'bg-slate-100 text-slate-700 border-slate-200'
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="in_discussion">In Discussion</option>
                                <option value="proposal_sent">Proposal Sent</option>
                                <option value="won">Won (Closed)</option>
                                <option value="lost">Lost</option>
                                <option value="spam">Spam</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleSelectInquiry(inq)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 transition-colors cursor-pointer"
                                  title="View full details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 space-y-6 shadow-2xl text-[#111827]">
                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-[#E5E7EB] pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-sm">
                          {selectedInquiry.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h2 className="text-base font-bold text-[#172554] flex items-center gap-2">
                            <span>{selectedInquiry.name}</span>
                            {selectedInquiry.is_starred && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                          </h2>
                          <div className="text-xs text-[#64748B]">{selectedInquiry.email}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedInquiry(null)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E5E7EB]">
                        <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">Phone</span>
                        <a href={`tel:${selectedInquiry.phone}`} className="text-[#2563EB] font-bold font-mono mt-0.5 block truncate hover:underline">
                          {selectedInquiry.phone || '—'}
                        </a>
                      </div>

                      <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E5E7EB]">
                        <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">City / Address</span>
                        <span className="text-[#111827] mt-0.5 block truncate font-medium">
                          {selectedInquiry.address || selectedInquiry.city || '—'}
                        </span>
                      </div>

                      <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E5E7EB]">
                        <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">Submitted At</span>
                        <span className="text-[#111827] font-mono mt-0.5 block">
                          {new Date(selectedInquiry.submittedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Solution Tag */}
                    <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB]">
                      <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1 font-semibold">
                        Requested Solution & Domain
                      </span>
                      <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">
                        {selectedInquiry.solution}
                      </span>
                    </div>

                    {/* Project Requirements Full Text */}
                    <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB] space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">
                        Full Project Requirements & Message
                      </span>
                      <p className="text-xs text-[#334155] whitespace-pre-wrap leading-relaxed">
                        {selectedInquiry.requirements}
                      </p>
                    </div>

                    {/* Attribution & Viewer Linkage */}
                    {(selectedInquiry.visitor_id || selectedInquiry.session_id) && (
                      <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB] space-y-2 text-xs font-mono">
                        <span className="text-[10px] text-[#2563EB] uppercase tracking-wider block font-semibold">
                          First-Party Visitor Attribution Link
                        </span>
                        {selectedInquiry.visitor_id && (
                          <div className="text-[#64748B] truncate">
                            Visitor UUID: <span className="text-[#111827] font-semibold">{selectedInquiry.visitor_id}</span>
                          </div>
                        )}
                        {selectedInquiry.session_id && (
                          <div className="text-[#64748B] truncate">
                            Session UUID: <span className="text-[#111827] font-semibold">{selectedInquiry.session_id}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Admin Consultation Notes Editor */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#172554] flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
                          Internal Admin Consultation Notes
                        </label>
                        {saveNotesSuccess && (
                          <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
                            <Check className="w-3.5 h-3.5 text-emerald-600" /> Saved to Supabase
                          </span>
                        )}
                      </div>
                      <textarea
                        value={inquiryNotesInput}
                        onChange={(e) => setInquiryNotesInput(e.target.value)}
                        placeholder="Add internal notes about client meeting, pricing quotes, or tech stack requirements..."
                        rows={3}
                        className="w-full p-3 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={handleSaveNotes}
                          disabled={isSavingNotes}
                          className="px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{isSavingNotes ? 'Saving...' : 'Save Notes'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E5E7EB]">
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-xs text-[#64748B] font-medium">Status:</span>
                        <select
                          value={selectedInquiry.status}
                          onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as AdminInquiry['status'])}
                          className="px-2.5 py-1 bg-white border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#111827] focus:border-[#2563EB]"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_discussion">In Discussion</option>
                          <option value="proposal_sent">Proposal Sent</option>
                          <option value="won">Won (Closed)</option>
                          <option value="lost">Lost</option>
                          <option value="spam">Spam</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => handleToggleStar(selectedInquiry.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E5E7EB] hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                        >
                          {selectedInquiry.is_starred ? 'Unstar Lead' : 'Star Lead'}
                        </button>
                        <button
                          onClick={() => setSelectedInquiry(null)}
                          className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
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
                  <h1 className="text-lg font-bold text-[#172554] tracking-tight flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[#2563EB]" />
                    Website Viewers & Telemetry Stream
                  </h1>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Real-time audience data collection populated in Supabase tables <code className="text-[#2563EB] font-mono font-semibold">dev_visitors</code>, <code className="text-[#2563EB] font-mono font-semibold">dev_sessions</code> & <code className="text-[#2563EB] font-mono font-semibold">dev_telemetry_events</code>
                  </p>
                </div>

                {/* Sub-tab switcher */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E5E7EB] self-start sm:self-auto shadow-xs">
                  <button
                    onClick={() => setTelemetrySubTab('visitors')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      telemetrySubTab === 'visitors'
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'text-[#64748B] hover:text-[#111827]'
                    }`}
                  >
                    Unique Visitors ({visitors.length})
                  </button>
                  <button
                    onClick={() => setTelemetrySubTab('events')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      telemetrySubTab === 'events'
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'text-[#64748B] hover:text-[#111827]'
                    }`}
                  >
                    Raw Events ({telemetry.length})
                  </button>
                </div>
              </div>

              {/* Sub-tab 1: Unique Visitors Table (dev_visitors) */}
              {telemetrySubTab === 'visitors' && (
                <div className="space-y-4">
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-mono uppercase tracking-wider text-[11px]">
                          <tr>
                            <th className="py-3.5 px-4">Visitor Profile (UUID)</th>
                            <th className="py-3.5 px-4">Device & OS</th>
                            <th className="py-3.5 px-4">Browser & Screen</th>
                            <th className="py-3.5 px-4">First Seen</th>
                            <th className="py-3.5 px-4">Last Active</th>
                            <th className="py-3.5 px-4">Converted Lead</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E7EB]">
                          {visitors.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="py-12 text-center text-[#64748B]">
                                No visitor records in dev_visitors table yet.
                              </td>
                            </tr>
                          ) : (
                            visitors.map((v) => (
                              <tr key={v.visitor_id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-3.5 px-4 font-mono">
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
                                    <span className="text-[#111827] font-semibold truncate max-w-[140px] sm:max-w-[200px]" title={v.visitor_id}>
                                      {v.visitor_id}
                                    </span>
                                  </div>
                                </td>

                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-1.5 text-slate-700 font-medium capitalize">
                                    {v.device_type === 'mobile' ? (
                                      <Smartphone className="w-3.5 h-3.5 text-sky-600" />
                                    ) : v.device_type === 'tablet' ? (
                                      <Tablet className="w-3.5 h-3.5 text-amber-600" />
                                    ) : (
                                      <Monitor className="w-3.5 h-3.5 text-[#2563EB]" />
                                    )}
                                    <span>{v.device_type || 'desktop'}</span>
                                  </div>
                                  <span className="text-[10px] text-[#64748B] block mt-0.5">{v.os || 'Unknown OS'}</span>
                                </td>

                                <td className="py-3.5 px-4 text-[#334155]">
                                  <div className="font-medium">{v.browser || '—'}</div>
                                  <div className="text-[10px] font-mono text-[#64748B]">{v.screen_resolution || '—'}</div>
                                </td>

                                <td className="py-3.5 px-4 font-mono text-[11px] text-[#64748B] whitespace-nowrap">
                                  {new Date(v.first_seen).toLocaleDateString()}
                                  <span className="block text-[10px] text-[#94A3B8]">
                                    {new Date(v.first_seen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4 font-mono text-[11px] text-[#64748B] whitespace-nowrap">
                                  {new Date(v.last_seen).toLocaleDateString()}
                                  <span className="block text-[10px] text-[#94A3B8]">
                                    {new Date(v.last_seen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4">
                                  {v.converted_at ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                      <Check className="w-3 h-3" /> Converted
                                    </span>
                                  ) : (
                                    <span className="text-[11px] text-[#94A3B8] font-mono">Exploring</span>
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

              {/* Sub-tab 2: Raw Telemetry Events Table (dev_telemetry_events) */}
              {telemetrySubTab === 'events' && (
                <div className="space-y-4">
                  {/* Event Filter */}
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-[#64748B]" />
                      <span className="text-xs font-bold text-[#172554]">Filter Event Type:</span>
                    </div>
                    <select
                      value={telemetryFilter}
                      onChange={(e) => setTelemetryFilter(e.target.value)}
                      className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="all">All Events ({telemetry.length})</option>
                      <option value="page_view">page_view</option>
                      <option value="section_dwell">section_dwell</option>
                      <option value="cta_click">cta_click</option>
                      <option value="form_submit">form_submit</option>
                    </select>
                  </div>

                  <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-mono uppercase tracking-wider text-[11px]">
                          <tr>
                            <th className="py-3.5 px-4">Event Name</th>
                            <th className="py-3.5 px-4">Page Path</th>
                            <th className="py-3.5 px-4">Section / Target</th>
                            <th className="py-3.5 px-4">Dwell Time</th>
                            <th className="py-3.5 px-4">Timestamp</th>
                            <th className="py-3.5 px-4 text-right">Payload</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E7EB]">
                          {filteredTelemetry.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="py-12 text-center text-[#64748B]">
                                No telemetry events match the selected filter.
                              </td>
                            </tr>
                          ) : (
                            filteredTelemetry.slice(0, 100).map((t) => (
                              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-3.5 px-4">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                                      t.event_name === 'form_submit'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : t.event_name === 'page_view'
                                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                                        : t.event_name === 'section_dwell'
                                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                                        : 'bg-slate-100 text-slate-700 border-slate-200'
                                    }`}
                                  >
                                    {t.event_name}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4 font-mono text-[#111827] font-medium">
                                  {t.page_path}
                                </td>

                                <td className="py-3.5 px-4 text-slate-700">
                                  <div className="font-medium text-[#111827]">{t.section_name || t.section_id || '—'}</div>
                                  {t.element_label && (
                                    <div className="text-[10px] text-[#64748B]">{t.element_label}</div>
                                  )}
                                </td>

                                <td className="py-3.5 px-4 font-mono text-[#111827]">
                                  {t.dwell_time_seconds ? `${t.dwell_time_seconds}s` : '—'}
                                </td>

                                <td className="py-3.5 px-4 font-mono text-[11px] text-[#64748B] whitespace-nowrap">
                                  {new Date(t.created_at).toLocaleDateString()}
                                  <span className="block text-[10px] text-[#94A3B8]">
                                    {new Date(t.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4 text-right">
                                  {t.client_meta ? (
                                    <button
                                      onClick={() => setSelectedEventPayload(t)}
                                      className="text-xs font-mono text-[#2563EB] hover:underline cursor-pointer"
                                    >
                                      Inspect Client Meta
                                    </button>
                                  ) : (
                                    <span className="text-[#94A3B8]">—</span>
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

              {/* JSON Payload Inspector Modal */}
              {selectedEventPayload && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-[#111827]">
                    <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                      <h3 className="text-sm font-bold text-[#172554] font-mono">
                        Event Metadata ({selectedEventPayload.event_name})
                      </h3>
                      <button
                        onClick={() => setSelectedEventPayload(null)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E5E7EB] font-mono text-xs overflow-x-auto max-h-80 leading-relaxed text-[#334155]">
                      <pre>{JSON.stringify(selectedEventPayload.client_meta, null, 2)}</pre>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => setSelectedEventPayload(null)}
                        className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
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
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 text-[#F97316] border border-orange-100 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-base font-bold text-[#172554] tracking-tight">
                      Security Gateway & IP Lockout Registry
                    </h1>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed max-w-3xl">
                      Zero persistent session policy with brute-force IP rate limiting: 3 failed password attempts blocks client IP for 15 minutes (Tier 1), escalating to 30 minutes (Tier 2+).
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setShowManualBlockModal(true)}
                    className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Manual IP Block</span>
                  </button>
                </div>
              </div>

              {/* IP Lockout Table (dev_admin_ip_blocks) */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-[#172554] flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#F97316]" />
                      IP Block & Lockout Registry (dev_admin_ip_blocks)
                    </h2>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      IP addresses currently restricted or tracked for failed administrative authorization
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-mono uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Client IP Address</th>
                        <th className="py-3.5 px-4">Failed Attempts</th>
                        <th className="py-3.5 px-4">Lockout Status</th>
                        <th className="py-3.5 px-4">Lockout Tier</th>
                        <th className="py-3.5 px-4">Last Attempted</th>
                        <th className="py-3.5 px-4 text-right">Admin Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      {ipBlocks.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-[#64748B]">
                            No failed attempts or IP lockouts registered. System operating normally.
                          </td>
                        </tr>
                      ) : (
                        ipBlocks.map((blk) => {
                          const isBlockedNow = blk.is_blocked && blk.blocked_until > nowMs
                          const remainingMin = isBlockedNow ? Math.ceil((blk.blocked_until - nowMs) / (60 * 1000)) : 0

                          return (
                            <tr key={blk.id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-3.5 px-4 font-mono font-bold text-[#111827]">
                                {blk.ip_address}
                              </td>

                              <td className="py-3.5 px-4 font-mono text-slate-700">
                                {blk.failed_attempts} strikes
                              </td>

                              <td className="py-3.5 px-4">
                                {isBlockedNow ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-orange-50 text-[#F97316] border border-orange-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-ping" />
                                    Blocked ({remainingMin}m left)
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <Check className="w-3 h-3" /> Clean
                                  </span>
                                )}
                              </td>

                              <td className="py-3.5 px-4 font-mono text-[#64748B]">
                                Tier {blk.block_tier} ({blk.block_tier === 1 ? '15m' : '30m'})
                              </td>

                              <td className="py-3.5 px-4 font-mono text-[11px] text-[#64748B]">
                                {blk.last_attempt_at ? new Date(blk.last_attempt_at).toLocaleString() : '—'}
                              </td>

                              <td className="py-3.5 px-4 text-right">
                                {isBlockedNow && (
                                  <button
                                    onClick={() => handleClearIpBlock(blk.ip_address)}
                                    className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold cursor-pointer"
                                  >
                                    Unblock IP
                                  </button>
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
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
                <div>
                  <h2 className="text-sm font-bold text-[#172554] flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-[#2563EB]" />
                    Active Admin Sessions (dev_admin_sessions)
                  </h2>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Currently authorized tokens in PostgreSQL database with auto-revocation on logout
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-mono uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Admin User</th>
                        <th className="py-3.5 px-4">IP Address</th>
                        <th className="py-3.5 px-4">Device / User Agent</th>
                        <th className="py-3.5 px-4">Logged In</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      {sessionsList.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-[#64748B]">
                            No active administrative sessions registered.
                          </td>
                        </tr>
                      ) : (
                        sessionsList.map((s) => {
                          const isExpired = new Date(s.expires_at).getTime() <= nowMs
                          const isActive = !s.is_revoked && !isExpired

                          return (
                            <tr key={s.session_id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-3.5 px-4 font-semibold text-[#111827]">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-md bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-[10px]">
                                    {s.username.slice(0, 2).toUpperCase()}
                                  </div>
                                  <span>{s.username}</span>
                                </div>
                              </td>

                              <td className="py-3.5 px-4 font-mono text-[#2563EB] font-bold">
                                {s.ip_address}
                              </td>

                              <td className="py-3.5 px-4 max-w-xs truncate text-[#64748B]" title={s.user_agent}>
                                {s.user_agent}
                              </td>

                              <td className="py-3.5 px-4 font-mono text-[11px] text-[#64748B]">
                                {new Date(s.created_at).toLocaleString()}
                              </td>

                              <td className="py-3.5 px-4">
                                {isActive ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Active
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                    {s.revoked_reason || 'Expired'}
                                  </span>
                                )}
                              </td>

                              <td className="py-3.5 px-4 text-right">
                                {isActive && (
                                  <button
                                    onClick={() => handleRevokeSession(s.session_id)}
                                    className="px-3 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold cursor-pointer"
                                  >
                                    Revoke
                                  </button>
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

              {/* Manual IP Ban Modal */}
              {showManualBlockModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-[#111827]">
                    <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                      <h3 className="text-sm font-bold text-[#172554] flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-[#F97316]" />
                        Manual IP Lockout Enforcement
                      </h3>
                      <button
                        onClick={() => setShowManualBlockModal(false)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleManualBlockIp} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#172554] mb-1">
                          IP Address to Lockout
                        </label>
                        <input
                          type="text"
                          required
                          value={manualBlockIpInput}
                          onChange={(e) => setManualBlockIpInput(e.target.value)}
                          placeholder="e.g. 192.168.1.100"
                          className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-mono text-[#111827] focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#172554] mb-1">
                          Reason / Threat Vector
                        </label>
                        <input
                          type="text"
                          required
                          value={manualBlockReasonInput}
                          onChange={(e) => setManualBlockReasonInput(e.target.value)}
                          className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowManualBlockModal(false)}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={manualBlockLoading}
                          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
                        >
                          {manualBlockLoading ? 'Enforcing...' : 'Enforce Lockout'}
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
                  <h1 className="text-lg font-bold text-[#172554] tracking-tight flex items-center gap-2">
                    <History className="w-5 h-5 text-[#2563EB]" />
                    Immutable Audit Trail Logs
                  </h1>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Full historical log of administrative actions recorded in Supabase table <code className="text-[#2563EB] font-mono font-semibold">dev_admin_audit_logs</code>
                  </p>
                </div>
              </div>

              {/* Search & Filter */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={auditSearch}
                    onChange={(e) => setAuditSearch(e.target.value)}
                    placeholder="Search audit trail by user, action, target, or IP..."
                    className="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="w-full sm:w-52">
                  <select
                    value={auditAdminFilter}
                    onChange={(e) => setAuditAdminFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
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
              <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-mono uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Timestamp</th>
                        <th className="py-3.5 px-4">Admin Operator</th>
                        <th className="py-3.5 px-4">Action</th>
                        <th className="py-3.5 px-4">Target Entity</th>
                        <th className="py-3.5 px-4">Client IP</th>
                        <th className="py-3.5 px-4 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      {filteredAuditLogs.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-[#64748B]">
                            No audit trail entries recorded yet.
                          </td>
                        </tr>
                      ) : (
                        filteredAuditLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-4 font-mono text-[11px] text-[#64748B] whitespace-nowrap">
                              {new Date(log.created_at).toLocaleDateString()}
                              <span className="block text-[10px] text-[#94A3B8]">
                                {new Date(log.created_at).toLocaleTimeString()}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 font-semibold text-[#111827]">
                              {log.admin_username}
                            </td>

                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border ${
                                  log.action.includes('delete') || log.action.includes('block')
                                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                                    : log.action.includes('create')
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-blue-50 text-blue-700 border-blue-200'
                                }`}
                              >
                                {log.action}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 font-mono text-[#334155]">
                              {log.target_type}
                              {log.target_id && (
                                <span className="block text-[10px] text-[#94A3B8]">ID: {log.target_id}</span>
                              )}
                            </td>

                            <td className="py-3.5 px-4 font-mono text-[#2563EB]">
                              {log.ip_address || '—'}
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              {log.details ? (
                                <button
                                  onClick={() => setSelectedAuditLog(log)}
                                  className="text-xs font-mono text-[#2563EB] hover:underline cursor-pointer"
                                >
                                  Inspect State
                                </button>
                              ) : (
                                <span className="text-[#94A3B8]">—</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Audit Log Details Modal */}
              {selectedAuditLog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-[#111827]">
                    <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                      <h3 className="text-sm font-bold text-[#172554] font-mono">
                        Audit Log Details ({selectedAuditLog.action})
                      </h3>
                      <button
                        onClick={() => setSelectedAuditLog(null)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E5E7EB] font-mono text-xs overflow-x-auto max-h-80 leading-relaxed text-[#334155]">
                      <pre>{JSON.stringify(selectedAuditLog.details, null, 2)}</pre>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => setSelectedAuditLog(null)}
                        className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
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
          {/* TAB 6: ADMIN ACCOUNTS */}
          {/* ========================================================================= */}
          {activeTab === 'admins' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-lg font-bold text-[#172554] tracking-tight flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#2563EB]" />
                    Administrative Accounts
                  </h1>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Platform operators managed in Supabase table <code className="text-[#2563EB] font-mono font-semibold">dev_admins</code>
                  </p>
                </div>

                <button
                  onClick={() => setShowNewAdminModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white flex items-center gap-2 text-xs font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Administrator</span>
                </button>
              </div>

              {/* Admins Table */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-mono uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Username</th>
                        <th className="py-3.5 px-4">Full Name & Email</th>
                        <th className="py-3.5 px-4">Role</th>
                        <th className="py-3.5 px-4">Account Status</th>
                        <th className="py-3.5 px-4">Created At</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      {admins.map((adm) => (
                        <tr key={adm.admin_id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#111827]">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-xs">
                                {adm.username.slice(0, 2).toUpperCase()}
                              </div>
                              <span>{adm.username}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-[#111827]">{adm.full_name || '—'}</div>
                            <div className="text-[11px] font-mono text-[#64748B]">{adm.email || '—'}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-blue-50 text-[#2563EB] border border-blue-200">
                              {adm.role.replace('_', ' ')}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            {adm.is_active ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                                Suspended
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 font-mono text-[11px] text-[#64748B]">
                            {new Date(adm.created_at).toLocaleDateString()}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            {session.role === 'super_admin' && adm.admin_id !== session.admin_id && (
                              <button
                                onClick={() => handleDeleteAdmin(adm.admin_id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Delete Administrator"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-[#111827]">
                    <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                      <h3 className="text-sm font-bold text-[#172554] flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#2563EB]" />
                        Create New Administrator
                      </h3>
                      <button
                        onClick={() => setShowNewAdminModal(false)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {newAdminError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                        {newAdminError}
                      </div>
                    )}

                    {newAdminSuccess && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-semibold">
                        <Check className="w-4 h-4 text-emerald-600" />
                        Administrator created successfully in Supabase!
                      </div>
                    )}

                    <form onSubmit={handleCreateAdminSubmit} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#172554] mb-1">Username</label>
                        <input
                          type="text"
                          required
                          value={newAdminUsername}
                          onChange={(e) => setNewAdminUsername(e.target.value)}
                          placeholder="e.g. dev_analyst"
                          className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-mono text-[#111827] focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#172554] mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={newAdminFullName}
                          onChange={(e) => setNewAdminFullName(e.target.value)}
                          placeholder="e.g. Alex Henderson"
                          className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#172554] mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                          placeholder="alex@marvelsoftwares.in"
                          className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#172554] mb-1">Initial Password</label>
                        <input
                          type="password"
                          required
                          value={newAdminPassword}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-mono text-[#111827] focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#172554] mb-1">Role & Permissions</label>
                        <select
                          value={newAdminRole}
                          onChange={(e) => setNewAdminRole(e.target.value as any)}
                          className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:border-[#2563EB]"
                        >
                          <option value="super_admin">Super Admin (Full Access)</option>
                          <option value="operations">Operations (CRM & Leads)</option>
                          <option value="analyst">Analyst (Telemetry & Reports)</option>
                          <option value="editor">Editor (Read & Notes)</option>
                        </select>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t border-[#E5E7EB]">
                        <button
                          type="button"
                          onClick={() => setShowNewAdminModal(false)}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={newAdminLoading}
                          className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
                        >
                          {newAdminLoading ? 'Creating...' : 'Create Account'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: POSTGRES SCHEMA & SQL */}
          {/* ========================================================================= */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex items-start gap-3.5">
                <Database className="w-6 h-6 text-[#2563EB] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-sm text-[#172554]">PostgreSQL dev_ Schema Definitions</p>
                  <p className="text-[#64748B] leading-relaxed">
                    Use these production queries to verify or bootstrap PostgreSQL tables, triggers, and views in Supabase, Neon, AWS RDS, or Docker. All objects use the required <code className="text-[#2563EB] font-mono font-semibold">dev_</code> prefix to prevent collisions.
                  </p>
                </div>
              </div>

              {/* SQL Query 1: dev_admins & dev_admin_sessions */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#111827] font-mono">1. dev_admins & dev_admin_sessions</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200 font-semibold">
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
                    className="flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer font-semibold"
                  >
                    {copiedSection === 'sql_admin' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Query</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB] font-mono text-[11px] text-[#334155] overflow-x-auto leading-relaxed">
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
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#111827] font-mono">2. dev_admin_ip_blocks</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-50 text-[#F97316] border border-orange-200 font-semibold">
                      Brute-Force Rate Limiting
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
                    className="flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer font-semibold"
                  >
                    {copiedSection === 'sql_ip' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Query</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB] font-mono text-[11px] text-[#334155] overflow-x-auto leading-relaxed">
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
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#111827] font-mono">3. dev_admin_audit_logs</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
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
                    className="flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer font-semibold"
                  >
                    {copiedSection === 'sql_audit' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Query</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB] font-mono text-[11px] text-[#334155] overflow-x-auto leading-relaxed">
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
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#111827] font-mono">4. dev_visitors, dev_sessions, dev_telemetry_events & dev_contact_inquiries</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
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
                    className="flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer font-semibold"
                  >
                    {copiedSection === 'sql_telemetry_crm' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Query</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB] font-mono text-[11px] text-[#334155] overflow-x-auto leading-relaxed">
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
