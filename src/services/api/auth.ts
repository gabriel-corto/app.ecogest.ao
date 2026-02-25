import type { ApiAuthResponse } from '@/types/api'
import type { Entity } from '@/types/schemas'
import type { CreateNewEntityBody, LoginBody } from '@/types/forms'

export const createNewEntity = async (body: CreateNewEntityBody) => {
  const api = useApiClient()

  return await api('/entities/create', {
    method: 'POST',
    body,
  })
}

export const login = async (body: LoginBody) => {
  const api = useApiClient()

  return await api<ApiAuthResponse<Entity>>('/auth/login', {
    method: 'POST',
    body,
  })
}
