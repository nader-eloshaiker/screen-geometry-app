import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function ErrorManager() {
  const error = useRouteError()

  let errorMessage: string

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data?.message || error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
    errorMessage = 'Unknown error'
  }

  return (
    <div id='error-page' className='h-full'>
      <h1 className='mb-4 text-3xl font-bold'>How to get hold of me</h1>
      <p className='mb-4'>Sorry, an unexpected error has occurred.</p>
      <p className='mb-4'>
        <i>{errorMessage}</i>
      </p>
    </div>
  )
}
