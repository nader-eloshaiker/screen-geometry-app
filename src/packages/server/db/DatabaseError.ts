import { ErrorObject } from '../types/ErrorObject'

export class DatabaseError extends Error implements ErrorObject {
  public readonly name = 'DatabaseError'
  constructor(
    message: string,
    public readonly code: number,
    caughtError?: Error,
  ) {
    super(message, { cause: caughtError?.cause })
  }
}
