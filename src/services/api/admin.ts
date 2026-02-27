import type { ApiPageDataResponse, ApiResponse } from '@/types/api'
import type { Entity, License } from '@/types/schemas'

const PREFIX = '/admin'

export interface QueryParams {
  query?: string
}

export const getAllCompanyEntities = async (params?: QueryParams) => {
  const api = useApiClient()

  const response = await api<ApiPageDataResponse<Entity>>(
    `${PREFIX}/entities/company`,
    {
      method: 'GET',
      credentials: 'include',
      query: {
        ...params,
      },
    },
  )

  return response
}

export const getAllAdministrators = async (params?: QueryParams) => {
  const api = useApiClient()

  const response = await api<ApiPageDataResponse<Entity>>(
    `${PREFIX}/entities/admin`,
    {
      method: 'GET',
      credentials: 'include',
      query: {
        ...params,
      },
    },
  )

  return response
}

export const getEntityDetails = async (id: string) => {
  const api = useApiClient()
  await new Promise(resolve => setTimeout(resolve, 2000))

  const response = await api<ApiResponse<Entity>>(`${PREFIX}/entities/${id}`, {
    method: 'GET',
    credentials: 'include',
  })

  return response.data
}

export const activateEntity = async (id: string) => {
  const api = useApiClient()

  const response = await api<ApiResponse<Entity>>(
    `${PREFIX}/entities/${id}/activate`,
    {
      method: 'PATCH',
      credentials: 'include',
    },
  )

  return response.data
}

export const blockEntity = async (id: string) => {
  const api = useApiClient()

  const response = await api<ApiResponse<Entity>>(
    `${PREFIX}/entities/${id}/block`,
    {
      method: 'PATCH',
      credentials: 'include',
    },
  )

  return response.data
}

export const getLicenses = async (params?: QueryParams) => {
  const api = useApiClient()

  const response = await api<ApiPageDataResponse<License>>(
    `${PREFIX}/licenses`,
    {
      method: 'GET',
      credentials: 'include',
      params,
    },
  )

  return response
}

export const approveLicense = async (id: string) => {
  const api = useApiClient()
  await new Promise(resolve => setTimeout(resolve, 2000))

  const response = await api<ApiResponse<License>>(
    `${PREFIX}/licenses/${id}/approve`,
    {
      method: 'PATCH',
      credentials: 'include',
    },
  )

  return response
}

export const rejectLicense = async (id: string, body: { reason: string }) => {
  const api = useApiClient()
  await new Promise(resolve => setTimeout(resolve, 2000))

  const response = await api<ApiResponse<License>>(
    `${PREFIX}/licenses/${id}/reject`,
    {
      method: 'PATCH',
      credentials: 'include',
      body,
    },
  )

  return response
}
