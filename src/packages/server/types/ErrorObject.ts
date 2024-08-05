export interface ErrorObject {
  code: number
  message: string
  type: ErrorObjectTypes
}

export type ErrorObjectTypes = 'DatabaseError'
