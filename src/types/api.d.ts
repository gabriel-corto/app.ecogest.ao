export interface ApiResponse<T = unknown> {
  data: T
  message?: string
}

export interface ApiPageDataResponse<T> {
  data: T[]
}

export interface ApiAuthResponse<T = unknown> {
  data: T
  accessToken: string
}
