export interface InquiryEmailPayload {
  name?: string
  email: string
  phone?: string
  address?: string
  solution?: string
  requirements?: string
  ip_address?: string
  city?: string
  country?: string
  region?: string
  submittedAt?: string
  [key: string]: any
}

export interface EmailDispatchResult {
  success: boolean
  skipped?: boolean
  message?: string
  userMessageId?: string | null
  adminMessageId?: string | null
  errors?: Array<{ target: string; error: string }>
}

export interface SmtpConfig {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
  fromName: string
  fromEmail: string
  adminEmail: string
  isConfigured: boolean
}

export function getSmtpConfig(): SmtpConfig
export function renderUserConfirmationEmail(inquiry: InquiryEmailPayload): { html: string; text: string }
export function renderAdminNotificationEmail(inquiry: InquiryEmailPayload): { html: string; text: string }
export function sendInquiryEmails(inquiry: InquiryEmailPayload): Promise<EmailDispatchResult>
export default sendInquiryEmails
