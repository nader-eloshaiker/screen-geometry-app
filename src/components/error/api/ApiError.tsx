import axios, { AxiosError } from 'axios'
import { AppActionTypes, ErrorTag } from '../../../contexts/App/AppManager'
import { useAppContext } from '../../../contexts/App/useAppContext'
import { ErrorResponseError } from '../../../generated/openapi/models'

type TProps = {
  errorTag: ErrorTag
}

export const ApiError = ({ errorTag }: TProps) => {
  const axiosError = axios.isAxiosError(errorTag.error) ? (errorTag.error as AxiosError) : undefined
  const errorResponse = !axios.isAxiosError(errorTag.error) ? (errorTag.error.error as ErrorResponseError) : undefined
  const code = axiosError ? axiosError.code : errorResponse?.code
  const name = axiosError ? axiosError.name : errorResponse?.status
  const message = axiosError ? axiosError.message : errorResponse?.message

  const [_, dispatch] = useAppContext()

  const onClose = () => {
    dispatch({ type: AppActionTypes.REMOVE_ERROR, payload: errorTag.tag })
  }

  return (
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

      <div className='flex flex-col'>
        <div>Error: {code}</div>
        <div>
          {name}: {message}
        </div>
      </div>
      <button className='btn btn-ghost btn-sm' onClick={onClose}>
        DISMISS
      </button>
    </div>
  )
}
