import type { Role, SectorEnum, StatusEnum } from './enums'

export interface LoginOptions {
  to: string
}

export interface Entity {
  id: string
  name: string
  nif: string
  email: string
  role: Role
  status: StatusEnum
  licenses: License[]
}

export interface Project {
  id: string
  name: string
  sector: SectorEnum
  hasLicense: boolean
  location: string
  status: StatusEnum
  entityId: string
  createdAt: string
}
export interface License {
  id: string
  number: string
  requestFile: string
  createdAt: string
  status: StatusEnum
  entityId: string
  projectId: string
  licenseNumber: string
  licenseFileUrl: string
  qrHash: string
  issuedAt: string
  licenseExpiresAt: string
  project: Project
  entity: Entity
  rejectReason?: string
}

export interface ProjectDetails extends Project {
  licenses: License[]
}

export interface SectorItem {
  label: string
  value: SectorEnum
}

export interface Metrics {
  totalEntities: number
  totalPending: number
  totalApproved: number
  totalRejected: number
}

export interface MetricsByYear {
  total2023: number
  total2024: number
  total2025: number
  total2026: number
  total2027: number
}

export interface EntityDashboardSummary {
  totalProjects: number
  totalPendingProcesses: number
  totalApprovedLicenses: number
  totalRejectedLicenses: number
}

export interface EntityDashboardAnalysis {
  month: string
  total: number
}
