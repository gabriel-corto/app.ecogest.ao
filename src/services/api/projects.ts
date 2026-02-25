import type { ApiNoContent, ApiResponse, PaginationResponse } from '@/types/api'
import type { Project } from '@/types/schemas'
import type { CreateProjectBody } from '~/types/forms'

const PREFIX = '/entities/projects'

export const getProjects = async () => {
  const api = useApiClient()

  const response = await api<PaginationResponse<Project>>(`${PREFIX}`, {
    method: 'GET',
    credentials: 'include',
  })

  return response.data
}

export const create = async (body: CreateProjectBody) => {
  const api = useApiClient()
  await new Promise(r => setTimeout(r, 2000))

  const response = await api<ApiResponse<Project>>(`${PREFIX}`, {
    method: 'POST',
    credentials: 'include',
    body,
  })

  return response
}

export const deleteProject = async (id: string) => {
  const api = useApiClient()

  const response = await api<ApiNoContent>(`${PREFIX}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  return response
}
