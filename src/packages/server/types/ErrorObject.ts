export interface ErrorObject {
  code: number
  message: string
  name: ErrorObjectTypes
}

export type ErrorObjectTypes = 'DatabaseError' | 'ApiError'
