import { useAppContext } from '../../../contexts/App/useAppContext'
import { ApiError } from '../api/ApiError'

export const ErrorToaster = () => {
  const [{ errorTags }] = useAppContext()

  return (
    <div className='toast toast-end'>
      {errorTags.map((errorTag, index) => (
        <ApiError key={index} errorTag={errorTag} />
      ))}
    </div>
  )
}
