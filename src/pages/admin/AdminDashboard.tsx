import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  MessageSquareText,
  Activity,
  Database,
  LogOut,
  Search,
  Filter,
  Download,
  Star,
  CheckCircle2,
  Clock,
  Shield,
  Smartphone,
  Monitor,
  Tablet,
  ChevronRight,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  X,
  Menu,
  Copy,
  Check,
  AlertCircle,
} from 'lucide-react'
import {
  getCurrentAdminSession,
  logoutAdmin,
  getAllInquiries,
  updateInquiryStatus,
  toggleStarInquiry,
  deleteInquiry,
  getTelemetryRecords,
  getAdmins,
  createAdmin,
  deleteAdmin,
  seedSampleDataIfEmpty,
  ROUTE_AUTH,
  type AdminInquiry,
  type TelemetryRecord,
  type AdminUser,
  type AdminSession,
} from '../../utils/adminAuth'

type TabType = 'overview' | 'inquiries' | 'telemetry' | 'admins' | 'database'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [session, setSession] = useState<AdminSession | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([])
  const [telemetry, setTelemetry] = useState<TelemetryRecord[]>([])
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [refreshKey, setRefreshKey] = useState(0)

  // Filters for Inquiries Table
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [solutionFilter, setSolutionFilter] = useState<string>('all')
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(null)

  // Form state for creating new admin inside dashboard
  const [showNewAdminModal, setShowNewAdminModal] = useState(false)
  const [newAdminUsername, setNewAdminUsername] = useState('')
  const [newAdminPassword, setNewAdminPassword] = useState('')
  const [newAdminFullName, setNewAdminFullName] = useState('')
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [newAdminRole, setNewAdminRole] = useState<'super_admin' | 'operations' | 'analyst' | 'editor'>('operations')
  const [newAdminError, setNewAdminError] = useState<string | null>(null)
  const [newAdminSuccess, setNewAdminSuccess] = useState(false)
  const [newAdminLoading, setNewAdminLoading] = useState(false)

  // Copy SQL feedback
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  // Authentication check
  useEffect(() => {
    const currentSession = getCurrentAdminSession()
    if (!currentSession) {
      navigate(ROUTE_AUTH, { replace: true })
      return
    }
    setSession(currentSession)
    seedSampleDataIfEmpty()
    loadAllData()
  }, [navigate, refreshKey])

  const loadAllData = () => {
    setInquiries(getAllInquiries())
    setTelemetry(getTelemetryRecords())
    setAdmins(getAdmins())
  }

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const handleLogout = () => {
    logoutAdmin()
    navigate(ROUTE_AUTH)
  }

  // Handle status update
  const handleStatusChange = (inquiryId: string | number, newStatus: AdminInquiry['status']) => {
    updateInquiryStatus(inquiryId, newStatus)
    setInquiries(getAllInquiries())
    if (selectedInquiry && selectedInquiry.id === inquiryId) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null))
    }
  }

  // Handle star toggle
  const handleToggleStar = (inquiryId: string | number) => {
    toggleStarInquiry(inquiryId)
    setInquiries(getAllInquiries())
    if (selectedInquiry && selectedInquiry.id === inquiryId) {
      setSelectedInquiry((prev) => (prev ? { ...prev, is_starred: !prev.is_starred } : null))
    }
  }

  // Handle delete inquiry
  const handleDeleteInquiry = (inquiryId: string | number) => {
    if (window.confirm('Are you sure you want to delete this inquiry record?')) {
      deleteInquiry(inquiryId)
      setInquiries(getAllInquiries())
      if (selectedInquiry && selectedInquiry.id === inquiryId) {
        setSelectedInquiry(null)
      }
    }
  }

  // Handle new admin creation inside dashboard
  const handleCreateNewAdmin = async (e: React.FormEvent) => {
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
        setNewAdminError(res.error || 'Failed to create new administrator.')
        setNewAdminLoading(false)
        return
      }

      setNewAdminSuccess(true)
      setAdmins(getAdmins())

      setTimeout(() => {
        setNewAdminSuccess(false)
        setShowNewAdminModal(false)
        setNewAdminUsername('')
        setNewAdminPassword('')
        setNewAdminFullName('')
        setNewAdminEmail('')
        setNewAdminRole('operations')
      }, 1500)
    } catch {
      setNewAdminError('Unexpected error creating administrator account.')
    } finally {
      setNewAdminLoading(false)
    }
  }

  // Handle delete admin
  const handleDeleteAdmin = (adminId: string) => {
    if (window.confirm('Are you sure you want to remove this administrator?')) {
      const res = deleteAdmin(adminId)
      if (!res.success) {
        alert(res.error || 'Cannot remove admin.')
      } else {
        setAdmins(getAdmins())
      }
    }
  }

  // CSV Export for inquiries
  const exportInquiriesCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Address', 'Solution', 'Requirements', 'Status', 'SubmittedAt']
    const rows = inquiries.map((i) => [
      i.id,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.email || '').replace(/"/g, '""')}"`,
      `"${(i.phone || '').replace(/"/g, '""')}"`,
      `"${(i.address || '').replace(/"/g, '""')}"`,
      `"${(i.solution || '').replace(/"/g, '""')}"`,
      `"${(i.requirements || '').replace(/"/g, '""')}"`,
      i.status,
      i.submittedAt,
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `marvel_inquiries_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const matchSearch =
        searchQuery === '' ||
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.phone && item.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.solution && item.solution.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.requirements && item.requirements.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchStatus = statusFilter === 'all' || item.status === statusFilter
      const matchSolution = solutionFilter === 'all' || item.solution === solutionFilter

      return matchSearch && matchStatus && matchSolution
    })
  }, [inquiries, searchQuery, statusFilter, solutionFilter])

  // Analytics Computed
  const stats = useMemo(() => {
    const total = inquiries.length
    const newCount = inquiries.filter((i) => i.status === 'new').length
    const inDiscussion = inquiries.filter((i) => i.status === 'in_discussion' || i.status === 'proposal_sent').length
    const wonCount = inquiries.filter((i) => i.status === 'won').length
    const starredCount = inquiries.filter((i) => i.is_starred).length

    // Group inquiries by solution
    const solutionCounts: Record<string, number> = {}
    inquiries.forEach((i) => {
      const key = i.solution || 'Other'
      solutionCounts[key] = (solutionCounts[key] || 0) + 1
    })

    // Group telemetry by device
    const deviceCounts = { desktop: 0, mobile: 0, tablet: 0 }
    telemetry.forEach((t) => {
      const dt = t.client_meta?.device_type || 'desktop'
      if (dt in deviceCounts) {
        deviceCounts[dt]++
      } else {
        deviceCounts.desktop++
      }
    })

    // Group telemetry by section
    const sectionViews: Record<string, number> = {}
    telemetry.forEach((t) => {
      if (t.section_id) {
        sectionViews[t.section_id] = (sectionViews[t.section_id] || 0) + 1
      }
    })

    return {
      total,
      newCount,
      inDiscussion,
      wonCount,
      starredCount,
      solutionCounts,
      deviceCounts,
      sectionViews,
      totalTelemetry: telemetry.length,
    }
  }, [inquiries, telemetry])

  // Status Badge Colors
  const getStatusBadge = (status: AdminInquiry['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30'
      case 'in_discussion':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30'
      case 'proposal_sent':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30'
      case 'won':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
      case 'contacted':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
      case 'lost':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
      case 'spam':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30'
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30'
    }
  }

  // Copy SQL Snippets Helper
  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(id)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#070A10] text-slate-100 flex font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Modern Collapsible Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B0F19] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo / Brand Header */}
          <div className="px-5 py-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-white block">MARVEL CONSOLE</span>
                <span className="text-[10px] font-mono text-indigo-400">PREFIX: dev_ • PROD</span>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Menus */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Control Center
            </div>

            <button
              onClick={() => {
                setActiveTab('overview')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Analytics</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('inquiries')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquareText className="w-4 h-4" />
                <span>Inquiries & Leads</span>
              </div>
              {stats.newCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-emerald-500 text-slate-950">
                  {stats.newCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab('telemetry')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'telemetry'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4" />
                <span>Site Telemetry</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{stats.totalTelemetry}</span>
            </button>

            <div className="pt-4 px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Administration
            </div>

            <button
              onClick={() => {
                setActiveTab('admins')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'admins'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
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
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'database'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>DB SQL Schema</span>
            </button>
          </div>
        </div>

        {/* User Card & Logout in Footer */}
        <div className="p-3 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-xs shrink-0 font-mono">
                {session.username.slice(0, 2).toUpperCase()}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{session.full_name || session.username}</p>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {session.role}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-[#070A10]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white capitalize flex items-center gap-2">
                <span>
                  {activeTab === 'overview' && 'Executive Overview & Real-Time Analytics'}
                  {activeTab === 'inquiries' && 'Client Inquiries & CRM Pipeline'}
                  {activeTab === 'telemetry' && 'First-Party Site Telemetry Logs'}
                  {activeTab === 'admins' && 'System Administrators Management'}
                  {activeTab === 'database' && 'PostgreSQL dev_ Schema Definition'}
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Connected to live telemetry stream • Prefix isolation: <code className="text-indigo-400 font-mono">dev_*</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleRefresh}
              title="Reload live metrics"
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {activeTab === 'inquiries' && (
              <button
                onClick={exportInquiriesCSV}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            )}

            {activeTab === 'admins' && (
              <button
                onClick={() => setShowNewAdminModal(true)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Admin</span>
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* ========================================================================= */}
          {/* TAB 1: OVERVIEW & GRAPHS */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* KPI Cards Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-medium">Total Inquiries</span>
                    <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                      <MessageSquareText className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white">{stats.total}</div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="text-emerald-400 font-medium font-mono">+{stats.newCount} new</span>
                    <span>awaiting contact</span>
                  </div>
                </div>

                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-medium">Active Pipeline</span>
                    <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                      <Clock className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white">{stats.inDiscussion}</div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span>In discussion & proposals</span>
                  </div>
                </div>

                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-medium">Won Deals</span>
                    <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white">{stats.wonCount}</div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="text-emerald-400 font-mono font-medium">
                      {stats.total > 0 ? Math.round((stats.wonCount / stats.total) * 100) : 0}%
                    </span>
                    <span>conversion rate</span>
                  </div>
                </div>

                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-medium">Site Telemetry Events</span>
                    <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                      <Activity className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white">{stats.totalTelemetry}</div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span>Events collected</span>
                  </div>
                </div>
              </div>

              {/* Graphical Visualizations Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Visual Chart 1: Daily Volume Trends Area SVG */}
                <div className="lg:col-span-8 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-semibold text-white">Daily Traffic & Inquiry Activity</h2>
                      <p className="text-[11px] text-slate-400">Aggregated telemetry activity over the last 7 days</p>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                        <span className="text-slate-300">Site Events</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <span className="text-slate-300">Leads Generated</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Chart */}
                  <div className="w-full h-56 relative pt-4">
                    <svg viewBox="0 0 600 180" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="gradIndigo" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="gradEmerald" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid Lines */}
                      <line x1="0" y1="30" x2="600" y2="30" stroke="#1e293b" strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="600" y2="80" stroke="#1e293b" strokeDasharray="3 3" />
                      <line x1="0" y1="130" x2="600" y2="130" stroke="#1e293b" strokeDasharray="3 3" />

                      {/* Site Events Area */}
                      <path
                        d="M 20 120 Q 100 80 180 95 T 340 50 T 480 70 T 580 40 L 580 160 L 20 160 Z"
                        fill="url(#gradIndigo)"
                      />
                      <path
                        d="M 20 120 Q 100 80 180 95 T 340 50 T 480 70 T 580 40"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2.5"
                      />

                      {/* Leads Trend Line */}
                      <path
                        d="M 20 150 Q 100 140 180 130 T 340 110 T 480 100 T 580 85"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />

                      {/* Points */}
                      {[
                        { cx: 20, cy: 120 },
                        { cx: 180, cy: 95 },
                        { cx: 340, cy: 50 },
                        { cx: 480, cy: 70 },
                        { cx: 580, cy: 40 },
                      ].map((p, i) => (
                        <circle key={i} cx={p.cx} cy={p.cy} r="4" fill="#6366f1" stroke="#0f172a" strokeWidth="2" />
                      ))}

                      {[
                        { cx: 20, cy: 150 },
                        { cx: 180, cy: 130 },
                        { cx: 340, cy: 110 },
                        { cx: 480, cy: 100 },
                        { cx: 580, cy: 85 },
                      ].map((p, i) => (
                        <circle key={i} cx={p.cx} cy={p.cy} r="4" fill="#10b981" stroke="#0f172a" strokeWidth="2" />
                      ))}
                    </svg>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2 px-2">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Today</span>
                    </div>
                  </div>
                </div>

                {/* Device Distribution Donut/Bar */}
                <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm flex flex-col justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-white mb-1">Visitor Device Breakdown</h2>
                    <p className="text-[11px] text-slate-400 mb-4">Hardware profiles recorded via telemetry</p>

                    <div className="space-y-3.5">
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <Monitor className="w-3.5 h-3.5 text-indigo-400" />
                            Desktop
                          </span>
                          <span className="font-mono text-slate-300 font-medium">
                            {stats.deviceCounts.desktop} visits
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{
                              width: `${
                                stats.totalTelemetry > 0
                                  ? (stats.deviceCounts.desktop / stats.totalTelemetry) * 100
                                  : 60
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                            Mobile
                          </span>
                          <span className="font-mono text-slate-300 font-medium">
                            {stats.deviceCounts.mobile} visits
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full"
                            style={{
                              width: `${
                                stats.totalTelemetry > 0
                                  ? (stats.deviceCounts.mobile / stats.totalTelemetry) * 100
                                  : 35
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <Tablet className="w-3.5 h-3.5 text-amber-400" />
                            Tablet
                          </span>
                          <span className="font-mono text-slate-300 font-medium">
                            {stats.deviceCounts.tablet} visits
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{
                              width: `${
                                stats.totalTelemetry > 0
                                  ? (stats.deviceCounts.tablet / stats.totalTelemetry) * 100
                                  : 5
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                    <span>Privacy Mode</span>
                    <span className="text-emerald-400 font-semibold">First-Party Only</span>
                  </div>
                </div>
              </div>

              {/* Breakdown 2: Requested Solutions Distribution */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-semibold text-white">Client Demands by Solution Category</h2>
                    <p className="text-[11px] text-slate-400">Distribution of services selected in the contact form</p>
                  </div>
                  <span className="text-xs font-mono text-indigo-400">{Object.keys(stats.solutionCounts).length} Services Requested</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(stats.solutionCounts).map(([solution, count]) => (
                    <div
                      key={solution}
                      className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-medium text-slate-200 truncate max-w-[200px]">{solution}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {stats.total > 0 ? Math.round((count / stats.total) * 100) : 0}% of inquiries
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 font-mono font-bold text-xs">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Inquiries Quick Preview */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-semibold text-white">Latest Submissions</h2>
                    <p className="text-[11px] text-slate-400">Quick view of the most recent leads received</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                  >
                    <span>View All Inquiries</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                        <th className="pb-2">Client Name</th>
                        <th className="pb-2">Contact Details</th>
                        <th className="pb-2">Requested Solution</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Submitted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {inquiries.slice(0, 5).map((inquiry) => (
                        <tr
                          key={inquiry.id}
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                        >
                          <td className="py-3 font-medium text-white">{inquiry.name}</td>
                          <td className="py-3 text-slate-300 font-mono text-[11px]">
                            {inquiry.email || inquiry.phone}
                          </td>
                          <td className="py-3 text-indigo-300">{inquiry.solution}</td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${getStatusBadge(
                                inquiry.status
                              )}`}
                            >
                              {inquiry.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3 text-slate-400 font-mono text-[11px]">
                            {new Date(inquiry.submittedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: INQUIRIES & LEADS TABLE */}
          {/* ========================================================================= */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              {/* Controls bar */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by client name, email, phone, solution, keywords..."
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Filter className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Status:</span>
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">All Statuses ({inquiries.length})</option>
                    <option value="new">New ({inquiries.filter((i) => i.status === 'new').length})</option>
                    <option value="in_discussion">In Discussion</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="won">Won Deals</option>
                    <option value="contacted">Contacted</option>
                    <option value="lost">Lost</option>
                  </select>

                  <select
                    value={solutionFilter}
                    onChange={(e) => setSolutionFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">All Solutions</option>
                    {Array.from(new Set(inquiries.map((i) => i.solution))).map((sol) => (
                      <option key={sol} value={sol}>
                        {sol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3 w-10 text-center">⭐</th>
                        <th className="py-3 px-3">Client Information</th>
                        <th className="py-3 px-3">Requested Solution</th>
                        <th className="py-3 px-3">Location / Address</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Submitted At</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-slate-500 font-mono">
                            No inquiries matched your search and filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inquiry) => (
                          <tr
                            key={inquiry.id}
                            className="hover:bg-slate-800/40 transition-colors group"
                          >
                            <td className="py-3 px-3 text-center">
                              <button
                                onClick={() => handleToggleStar(inquiry.id)}
                                className={`transition-colors ${
                                  inquiry.is_starred ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                                }`}
                              >
                                <Star className="w-4 h-4 fill-current" />
                              </button>
                            </td>

                            <td className="py-3 px-3">
                              <div className="font-semibold text-white">{inquiry.name}</div>
                              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                                <a
                                  href={`mailto:${inquiry.email}`}
                                  className="hover:text-indigo-300 transition-colors"
                                >
                                  {inquiry.email}
                                </a>
                                {inquiry.phone && (
                                  <>
                                    <span className="mx-1 text-slate-600">•</span>
                                    <a
                                      href={`tel:${inquiry.phone}`}
                                      className="hover:text-indigo-300 transition-colors"
                                    >
                                      {inquiry.phone}
                                    </a>
                                  </>
                                )}
                              </div>
                            </td>

                            <td className="py-3 px-3">
                              <span className="px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-300 font-medium">
                                {inquiry.solution}
                              </span>
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 max-w-xs">
                                {inquiry.requirements}
                              </p>
                            </td>

                            <td className="py-3 px-3 text-slate-300 text-[11px] max-w-xs truncate">
                              {inquiry.address || '—'}
                            </td>

                            <td className="py-3 px-3">
                              <select
                                value={inquiry.status}
                                onChange={(e) =>
                                  handleStatusChange(inquiry.id, e.target.value as AdminInquiry['status'])
                                }
                                className={`px-2 py-1 rounded-lg text-[10px] font-mono border focus:outline-none ${getStatusBadge(
                                  inquiry.status
                                )} bg-slate-950 cursor-pointer`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="in_discussion">In Discussion</option>
                                <option value="proposal_sent">Proposal Sent</option>
                                <option value="won">Won</option>
                                <option value="lost">Lost</option>
                                <option value="spam">Spam</option>
                              </select>
                            </td>

                            <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                              {new Date(inquiry.submittedAt).toLocaleString(undefined, {
                                dateStyle: 'short',
                                timeStyle: 'short',
                              })}
                            </td>

                            <td className="py-3 px-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => setSelectedInquiry(inquiry)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
                                  title="View full requirement details"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteInquiry(inquiry.id)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-950/90 border-t border-slate-800 px-4 py-2.5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>
                    Showing {filteredInquiries.length} of {inquiries.length} inquiries
                  </span>
                  <span>PostgreSQL Table: <code className="text-indigo-400 font-mono">dev_contact_inquiries</code></span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: SITE TELEMETRY */}
          {/* ========================================================================= */}
          {activeTab === 'telemetry' && (
            <div className="space-y-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm flex items-start gap-3">
                <Activity className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-white">First-Party Telemetry & Visitor Activity Feed</p>
                  <p className="text-slate-400 leading-relaxed">
                    Tracks client section dwell time, navigation paths, and device metadata strictly within your first-party domain. No third-party ad networks or invasive trackers are loaded.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">Event Type</th>
                        <th className="py-3 px-3">Section / Page</th>
                        <th className="py-3 px-3">Dwell Time</th>
                        <th className="py-3 px-3">Device & Browser</th>
                        <th className="py-3 px-3">OS & Screen</th>
                        <th className="py-3 px-3">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {telemetry.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-slate-500">
                            No telemetry events recorded yet. Browse the public website to generate live telemetry.
                          </td>
                        </tr>
                      ) : (
                        telemetry.map((event) => (
                          <tr key={event.id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="py-2.5 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  event.event_name === 'form_submit'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : event.event_name === 'cta_click'
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    : 'bg-indigo-500/15 text-indigo-300'
                                }`}
                              >
                                {event.event_name}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-200">
                              <span className="text-slate-400">{event.page_path}</span>
                              {event.section_id && (
                                <span className="text-indigo-400 ml-1.5 font-sans font-medium">
                                  #{event.section_id}
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-slate-300">
                              {event.dwell_time_seconds ? `${event.dwell_time_seconds}s` : '—'}
                            </td>
                            <td className="py-2.5 px-3 text-slate-300">
                              {event.client_meta?.device_type || 'desktop'} • {event.client_meta?.browser || 'Unknown'}
                            </td>
                            <td className="py-2.5 px-3 text-slate-400">
                              {event.client_meta?.os || 'Unknown'} ({event.client_meta?.screen_resolution || '—'})
                            </td>
                            <td className="py-2.5 px-3 text-slate-400">
                              {new Date(event.created_at).toLocaleTimeString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="bg-slate-950/90 border-t border-slate-800 px-4 py-2.5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Total events tracked: {telemetry.length}</span>
                  <span>PostgreSQL Table: <code className="text-indigo-400 font-mono">dev_telemetry_events</code></span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: ADMIN MANAGEMENT */}
          {/* ========================================================================= */}
          {activeTab === 'admins' && (
            <div className="space-y-6">
              {/* Header card with action */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-white">Administrative Access Accounts</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage team permissions and create additional administrative users for this dashboard
                  </p>
                </div>
                <button
                  onClick={() => setShowNewAdminModal(true)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/25"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Administrator</span>
                </button>
              </div>

              {/* Admins Table */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
                      <th className="py-3.5 px-4">Admin Username</th>
                      <th className="py-3.5 px-4">Full Name & Email</th>
                      <th className="py-3.5 px-4">Assigned Role</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Created At</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {admins.map((adm) => (
                      <tr key={adm.admin_id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-semibold text-white flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-bold">
                            {adm.username.slice(0, 2).toUpperCase()}
                          </div>
                          <span>{adm.username}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-slate-200 font-medium">{adm.full_name || '—'}</div>
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
                          {adm.admin_id !== session.admin_id ? (
                            <button
                              onClick={() => handleDeleteAdmin(adm.admin_id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                              title="Delete admin"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-[10px] font-mono text-slate-500">(Current Session)</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: DATABASE SQL DEFINITIONS */}
          {/* ========================================================================= */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm flex items-start gap-3">
                <Database className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-white">PostgreSQL dev_ Schema Definitions</p>
                  <p className="text-slate-400 leading-relaxed">
                    Use these production queries to set up PostgreSQL tables, triggers, and analytical views in your database (Neon, Supabase, AWS RDS, Docker). All objects use the required <code className="text-indigo-300 font-mono">dev_</code> prefix.
                  </p>
                </div>
              </div>

              {/* SQL Query 1: dev_admins */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">1. dev_admins & dev_admin_sessions</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300">
                      Security & Auth
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
);`}</pre>
                </div>
              </div>

              {/* SQL Query 2: dev_contact_inquiries */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">2. dev_contact_inquiries</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300">
                      CRM & Leads
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      handleCopyCode(
                        `CREATE TABLE IF NOT EXISTS dev_contact_inquiries (
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
    is_starred BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`,
                        'sql_inq'
                      )
                    }
                    className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {copiedSection === 'sql_inq' ? (
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
                  <pre>{`CREATE TABLE IF NOT EXISTS dev_contact_inquiries (
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
    is_starred BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`}</pre>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: CREATE NEW ADMIN FORM (Requested by user) */}
      {/* ========================================================================= */}
      {showNewAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowNewAdminModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Provision New Administrator</h3>
                <p className="text-[11px] text-slate-400">Add an administrator account to the system</p>
              </div>
            </div>

            {newAdminError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{newAdminError}</span>
              </div>
            )}

            {newAdminSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Administrator created successfully!</span>
              </div>
            )}

            <form onSubmit={handleCreateNewAdmin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Username <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newAdminUsername}
                  onChange={(e) => setNewAdminUsername(e.target.value)}
                  placeholder="e.g. ops_manager"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Temporary Password <span className="text-rose-400">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newAdminFullName}
                    onChange={(e) => setNewAdminFullName(e.target.value)}
                    placeholder="Operations Staff"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Role</label>
                  <select
                    value={newAdminRole}
                    onChange={(e) =>
                      setNewAdminRole(e.target.value as 'super_admin' | 'operations' | 'analyst' | 'editor')
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="operations">Operations</option>
                    <option value="analyst">Analyst</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="staff@marvelsoftwares.in"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={newAdminLoading || newAdminSuccess}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-2.5 rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {newAdminLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Save & Authorize Admin</span>
                      <Plus className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: INQUIRY FULL DETAIL INSPECTION */}
      {/* ========================================================================= */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <MessageSquareText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Inquiry Details • #{selectedInquiry.id}</h3>
                <p className="text-[11px] text-slate-400">
                  Received on {new Date(selectedInquiry.submittedAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Prospect Name</span>
                  <p className="font-semibold text-white text-sm mt-0.5">{selectedInquiry.name}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Requested Solution</span>
                  <p className="text-indigo-300 font-medium mt-0.5">{selectedInquiry.solution}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Email Address</span>
                  <p className="font-mono text-slate-200 mt-0.5">
                    <a href={`mailto:${selectedInquiry.email}`} className="hover:text-indigo-300">
                      {selectedInquiry.email}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Contact Phone</span>
                  <p className="font-mono text-slate-200 mt-0.5">
                    <a href={`tel:${selectedInquiry.phone}`} className="hover:text-indigo-300">
                      {selectedInquiry.phone}
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1">Company / Location Address</span>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300">
                  {selectedInquiry.address || 'Not specified'}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1">Full Project Scope & Requirements</span>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                  {selectedInquiry.requirements || 'No specific requirements mentioned.'}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Update Status:</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) =>
                      handleStatusChange(selectedInquiry.id, e.target.value as AdminInquiry['status'])
                    }
                    className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_discussion">In Discussion</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                    <option value="spam">Spam</option>
                  </select>
                </div>

                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
