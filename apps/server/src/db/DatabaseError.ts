import { type ErrorObject } from '../types/ErrorObject'

export class DatabaseError extends Error implements ErrorObject {
  public readonly name = 'DatabaseError'
  public readonly code: number
  public readonly message: string

  constructor(message: string, code: number, caughtError?: Error) {
    super(message, { cause: caughtError?.cause })
    this.code = code
    this.message = message
  }
}
