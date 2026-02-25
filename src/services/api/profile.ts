import type { ApiResponse } from '@/types/api'
import type { Entity } from '@/types/schemas'

export const getProfile = async () => {
  const api = useApiClient()

  const response = await api<ApiResponse<Entity>>('/entities/profile', {
    method: 'GET',
  })

  return response.data
}
