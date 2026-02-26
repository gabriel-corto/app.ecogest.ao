import type { MaybeRef } from 'vue'
import type { Role, SectorEnum, StatusEnum } from '~/types/enums'

type RoleColor = 'primary' | 'secondary' | 'neutral'
type StatusColor = 'primary' | 'secondary' | 'success' | 'error' | 'neutral'
type SectorColor = 'primary' | 'secondary' | 'success' | 'error' | 'neutral'

const ROLE_COLOR_MAP: Record<Role, RoleColor> = {
  ADMIN: 'primary',
  COMPANY: 'neutral',
}

const STATUS_COLOR_MAP: Record<StatusEnum, StatusColor> = {
  PENDING: 'primary',
  APPROVED: 'success',
  REJECTED: 'error',
  ACTIVE: 'success',
  BLOCKED: 'error',
  INACTIVE: 'error',
}

const SECTOR_COLOR_MAP: Record<SectorEnum, SectorColor> = {
  AGRICULTURE: 'neutral',
  EDUCATION: 'secondary',
  ENGINEERING: 'neutral',
  INDUSTRIAL: 'secondary',
}

export function sectorColors(sector: MaybeRef<SectorEnum | undefined>) {
  const sectorColor = computed<SectorColor>(() => {
    const value = toValue(sector)
    if (!value) return 'primary'
    return SECTOR_COLOR_MAP[value]
  })

  return { sectorColor }
}

export function roleColors(role: MaybeRef<Role | undefined>) {
  const roleColor = computed<RoleColor>(() => {
    const value = toValue(role)
    if (!value) return 'primary'
    return ROLE_COLOR_MAP[value]
  })

  return { roleColor }
}

export function statusColors(status: MaybeRef<StatusEnum | undefined>) {
  const statusColor = computed<StatusColor>(() => {
    const value = toValue(status)
    if (!value) return 'primary'
    return STATUS_COLOR_MAP[value]
  })

  return { statusColor }
}
