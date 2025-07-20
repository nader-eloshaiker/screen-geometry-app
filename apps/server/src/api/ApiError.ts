import { ErrorObject } from '../types/ErrorObject'

export class ApiError extends Error implements ErrorObject {
  public readonly name = 'ApiError'
  constructor(
    message: string,
    public readonly code: number,
    caughtError?: Error
  ) {
    super(message, { cause: caughtError?.cause })
  }
}
