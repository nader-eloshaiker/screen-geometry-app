import { ErrorResponse } from '../../generated/openapi/models'

type TProps = {
  errorResponse: ErrorResponse | null
}

export default function ApiError({ errorResponse }: TProps) {
  const error = errorResponse?.error

  return (
    error && (
      <div className='alert alert-error'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-6 h-6 stroke-current shrink-0'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>

        <span>Error: {JSON.stringify(error, null, 2)}</span>
      </div>
    )
  )
}
