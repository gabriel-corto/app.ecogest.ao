import type { ApiResponse } from '@/types/api'
import type { Project } from '@/types/schemas'

const PREFIX = '/licenses'

export interface QueryParams {
  query?: string
}

export const request = async (body: FormData) => {
  const api = useApiClient()

  const response = await api<ApiResponse<Project>>(`${PREFIX}/request`, {
    method: 'POST',
    credentials: 'include',
    body,
  })

  return response
}
