import type { Role, StatusEnum } from '~/types/enums'

export const useStatusTranslation = (status: StatusEnum | null) => {
  switch (status) {
    case 'APPROVED':
      return 'Aprovado'
    case 'PENDING':
      return 'Pendente'
    case 'REJECTED':
      return 'Rejeitado'
    default:
      return String(status)
  }
}

export const useStatusColor = (status: StatusEnum | null) => {
  switch (status) {
    case 'APPROVED':
      return 'success'
    case 'PENDING':
      return 'primary'
    case 'REJECTED':
      return 'error'
  }
}

export const useIdentificationStatusTranslation = (
  status: StatusEnum | null,
) => {
  switch (status) {
    case 'APPROVED':
      return 'Identificação Aprovada'
    case 'PENDING':
      return 'Identificação Pendente'
    case 'REJECTED':
      return 'Identificação Rejeitada'
    default:
      return String(status)
  }
}

export const useRoleIcon = (role: Role) => {
  switch (role) {
    case 'ADMIN':
      return 'i-hugeicons-settings-01'
    case 'COMPANY':
      return 'i-hugeicons-house-01'
  }
}

export const useRoleTranslation = (role: Role) => {
  switch (role) {
    case 'ADMIN':
      return 'Administrador Ecogest'
  }
}
