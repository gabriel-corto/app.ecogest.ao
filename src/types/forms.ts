import type { SectorEnum } from './enums'

export interface CreateNewEntityBody {
  nif: string
  name: string
  email: string
  password: string
}

export interface LoginBody {
  email: string
  password: string
}

export interface CreateProjectBody {
  name: string
  sector: SectorEnum
  location: string
}
