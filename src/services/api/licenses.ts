import type { ApiPageDataResponse, ApiResponse } from '@/types/api'
import type { License, Project } from '@/types/schemas'

const PREFIX = '/licenses'

export interface QueryParams {
  query?: string
}

export const request = async (body: FormData) => {
  const api = useApiClient()
  await new Promise(resolve => setTimeout(resolve, 2000))

  const response = await api<ApiResponse<Project>>(`${PREFIX}/request`, {
    method: 'POST',
    credentials: 'include',
    body,
  })

  return response
}

export const getLicenses = async (params?: QueryParams) => {
  const api = useApiClient()

  const response = await api<ApiPageDataResponse<License>>(`${PREFIX}`, {
    method: 'GET',
    credentials: 'include',
    params,
  })

  return response
}

export const getLicense = async (id: string) => {
  const api = useApiClient()
  await new Promise(resolve => setTimeout(resolve, 2000))

  const response = await api<ApiResponse<License>>(`${PREFIX}/${id}`, {
    method: 'GET',
    credentials: 'include',
  })

  return response.data
}

export const reRequest = async (id: string, body: FormData) => {
  const api = useApiClient()
  await new Promise(resolve => setTimeout(resolve, 2000))

  const response = await api<ApiResponse<License>>(
    `${PREFIX}/${id}/re-request`,
    {
      method: 'PATCH',
      credentials: 'include',
      body,
    },
  )

  return response
}
