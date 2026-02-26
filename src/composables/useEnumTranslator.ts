import type { MaybeRef } from 'vue'
import type { Role, SectorEnum, StatusEnum } from '~/types/enums'

type EnumTypeMap = {
  role: Role
  status: StatusEnum
  sector: SectorEnum
}

type EnumType = keyof EnumTypeMap

const TRANSLATIONS: {
  [K in EnumType]: Record<EnumTypeMap[K], string>
} = {
  role: {
    ADMIN: 'ADMIN',
    COMPANY: 'EMPRESA',
  },
  status: {
    PENDING: 'PENDENTE',
    APPROVED: 'APROVADO',
    REJECTED: 'REJEITADO',
    ACTIVE: 'ACTIVO',
    BLOCKED: 'BLOQUEADO',
    INACTIVE: 'INACTIVO',
  },
  sector: {
    AGRICULTURE: 'AGRICULTURA',
    ENGINEERING: 'ENGENHARIA',
    EDUCATION: 'EDUCAÇÃO',
    INDUSTRIAL: 'INDUSTRIAL',
  },
}

export function useEnumTranslator() {
  function translate<K extends EnumType>(
    type: K,
    value: MaybeRef<EnumTypeMap[K] | undefined>,
  ): string {
    const resolved = toValue(value)
    if (!resolved) return '—'
    return (TRANSLATIONS[type] as Record<string, string>)[resolved] ?? '—'
  }

  return { translate }
}
