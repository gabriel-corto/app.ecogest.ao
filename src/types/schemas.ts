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
