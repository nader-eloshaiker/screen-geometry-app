import ApiError from '../api/ApiError'

export const ErrorToaster = () => {
  return (
    <div className='toast toast-end'>
      <ApiError errorResponse={screenListError} />
      <ApiError errorResponse={favouriteError} />
      <ApiError errorResponse={deleteError} />
    </div>
  )
}
