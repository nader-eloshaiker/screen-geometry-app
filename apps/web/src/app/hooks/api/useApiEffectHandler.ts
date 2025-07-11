import { ErrorResponse } from '@screengeometry/lib-api/spec'
import { useToast } from '@screengeometry/lib-ui/toaster'

import { useEffect } from 'react'

export const useApiEffectHandler = <TData>({
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
    if (!responseHandler || !data || !toast) {
      return
    }
    responseHandler(data)

    if (successNotification) {
      const { title, message } = successNotification
      toast({
        palette: 'success',
        title,
        description: message,
        duration: 3000,
      })
    }
  }, [data, responseHandler, successNotification, toast])

  useEffect(() => {
    if (error) {
      toast({
        title: 'Server Error',
        description: error.error.details?.reason ?? error.error.message,
        palette: 'danger',
      })
    }
  }, [error, toast])
}
