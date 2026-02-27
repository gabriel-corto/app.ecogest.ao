import type { ApiPageDataResponse, ApiResponse } from '@/types/api'
import type { Project, ProjectDetails } from '@/types/schemas'
import type { CreateProjectBody } from '~/types/forms'

const PREFIX = '/projects'

export interface QueryParams {
  query?: string
}

export const createProject = async (body: CreateProjectBody) => {
  const api = useApiClient()

  const response = await api<ApiResponse<Project>>(`${PREFIX}/create`, {
    method: 'POST',
    credentials: 'include',
    body,
  })

  return response
}

export const getAllByEntity = async (params?: QueryParams) => {
  const api = useApiClient()

  const response = await api<ApiPageDataResponse<Project>>(
    `${PREFIX}/get-by-entity`,
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

export const getProjectDetails = async (id: string) => {
  const api = useApiClient()
  await new Promise(resolve => setTimeout(resolve, 500))

  const response = await api<ApiResponse<ProjectDetails>>(`${PREFIX}/${id}`, {
    method: 'GET',
    credentials: 'include',
  })

  return response.data
}

export const activateProject = async (id: string) => {
  const api = useApiClient()

  const response = await api<ApiResponse<Project>>(`${PREFIX}/activate/${id}`, {
    method: 'PATCH',
    credentials: 'include',
  })

  return response.data
}

export const inactiveProject = async (id: string) => {
  const api = useApiClient()

  const response = await api<ApiResponse<Project>>(`${PREFIX}/inactive/${id}`, {
    method: 'PATCH',
    credentials: 'include',
  })

  return response.data
}
export const deleteProject = async (id: string) => {
  const api = useApiClient()

  const response = await api<ApiResponse>(`${PREFIX}/delete/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  return response
}
