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

export interface SectorItem {
  label: string
  value: SectorEnum
}
