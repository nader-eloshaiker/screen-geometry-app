import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useCallback, useEffect, useState } from 'react'

export const axiosInstance = axios.create({
  timeout: 2000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

const UseAxiosOptionsDefaults = {
  manualExecution: false,
  skip: false,
}

type UseAxiosOptions = Partial<typeof UseAxiosOptionsDefaults>
type TProps = { params?: AxiosRequestConfig; options?: UseAxiosOptions }

// Must provide axiosParams when manualExecution is false (default)
export const useAxios = <T>({ params: axiosParams = {}, options }: TProps) => {
  const hookOptions = { ...UseAxiosOptionsDefaults, ...options }
  const [response, setResponse] = useState<AxiosResponse<T>>()
  const [error, setError] = useState<AxiosError>()
  const [loading, setLoading] = useState<boolean>(!hookOptions.manualExecution)

  const cancel = useCallback(
    (controller: AbortController, reason?: string) => {
      controller.abort(reason)
      controller.signal.reason &&
        console.debug(`axios abort:${axiosParams.method ?? ''} ${axiosParams.url} ${controller.signal.reason}`)
    },
    [axiosParams.method, axiosParams.url],
  )

  const fetchData = useCallback(
    async (params: AxiosRequestConfig, controller: AbortController) => {
      try {
        setLoading(true)
        const result = await axiosInstance.request<T>({ ...params, signal: controller.signal })
        setResponse(result)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // only set error if not aborted
          !axios.isCancel(error) && setError(error)
        } else {
          throw new Error('different error than axios')
        }
      } finally {
        setLoading(false)
      }
    },
    [setResponse, setError, setLoading],
  )

  const execute = useCallback(
    (params: AxiosRequestConfig) => {
      const controller = new AbortController()
      const terminate = (msg: string) => {
        cancel(controller, msg)
      }

      fetchData(params, controller)

      return terminate
    },
    [cancel, fetchData],
  )

  const reset = useCallback(() => {
    setResponse(undefined)
    setError(undefined)
    setLoading(false)
  }, [setResponse])

  useEffect(() => {
    if (hookOptions.manualExecution || hookOptions.skip) return

    const controller = new AbortController()

    fetchData(axiosParams, controller)

    return () => cancel(controller, 'React effect unmount')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { loading, response, error, execute, reset }
}
