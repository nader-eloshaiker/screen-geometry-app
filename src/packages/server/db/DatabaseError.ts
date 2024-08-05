import { ErrorObject } from '../types/ErrorObject'

export class DatabaseError extends Error implements ErrorObject {
  public readonly type = 'DatabaseError'
  constructor(
    message: string,
    public readonly code: number,
  ) {
    super(message)
  }
}
