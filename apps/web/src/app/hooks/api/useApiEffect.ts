import { type ErrorResponse } from '@screengeometry/lib-api/spec'
import { useToast } from '@screengeometry/lib-ui/toaster'

import { useEffect } from 'react'

export const useApiEffect = <TData>({
  data,
  error,
  responseHandler,
  successNotification,
}: {
  data?: TData
  error?: ErrorResponse | null
  responseHandler?(data: TData | undefined): void
  successNotification?: { title: string; message: string }
}) => {
  const { toast } = useToast()

  useEffect(() => {
    if (!data) {
      return
    }

    if (responseHandler) {
      responseHandler(data)
    }

    if (successNotification && toast) {
      const { title, message } = successNotification
      toast({
        palette: 'info',
        title,
        description: message,
      })
    }
  }, [data, responseHandler, successNotification, toast])

  useEffect(() => {
    if (!error || !toast) {
      return
    }

    toast({
      title: 'Server Error',
      description: error.error.details?.reason ?? error.error.message,
      palette: 'danger',
    })
  }, [error, toast])
}
