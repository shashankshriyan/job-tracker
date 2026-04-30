export type ApplicationStatus = 'applied' | 'interview' | 'offer' | 'rejected'

export type Application = {
  id: string
  company: string
  role: string
  status: ApplicationStatus
  jobUrl?: string
  source?: string
  salary?: string
  notes?: string
  appliedAt: string
}

export type User = {
  id: string
  email: string
}

export type ApplicationInput = {
  company: string
  role: string
  status: ApplicationStatus
  jobUrl?: string
  source?: string
  salary?: string
  notes?: string
}