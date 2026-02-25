import type { Role, SectorEnum, StatusEnum } from './enums'

export interface BaseSchema {
  id: string
  createdAt: string
  updateAt: string | null
}

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

export interface Project extends BaseSchema {
  name: string
  locale: string
  slug: string
  sector: SectorEnum
}

export interface SectorItem {
  value: SectorEnum
  label: string
}
