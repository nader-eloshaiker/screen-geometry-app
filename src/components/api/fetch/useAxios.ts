import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { axiosInstance } from './axios'

const UseAxiosOptionsDefaults = {
  manualExecution: false,
}

type UseAxiosOptions = Partial<typeof UseAxiosOptionsDefaults>

const useAxios = <T>(axiosParams: AxiosRequestConfig, hooksOptions: UseAxiosOptions = UseAxiosOptionsDefaults) => {
  const options = { ...UseAxiosOptionsDefaults, ...hooksOptions }
  const [response, setResponse] = useState<AxiosResponse<T>>()
  const [error, setError] = useState<AxiosError>()
  const [loading, setLoading] = useState(!options.manualExecution)

  const cancel = (controller: AbortController, reason?: string) => {
    controller.abort(reason)
    controller.signal.reason &&
      console.debug(
        `axios abort: [${axiosParams.method}] ${axiosParams.url} status: [${controller.signal.aborted}] ${controller.signal.reason}`,
      )
  }

  const fetchData = async (params: AxiosRequestConfig, controller: AbortController) => {
    try {
      setLoading(true)
      const result = await axiosInstance.request({ ...params, signal: controller.signal })
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
  }

  const execute = (data?: unknown) => {
    const controller = new AbortController()

    fetchData({ ...axiosParams, data: data || axiosParams.data }, controller)
  }

  useEffect(() => {
    if (!options.manualExecution) {
      const controller = new AbortController()
      fetchData(axiosParams, controller)

      // cleanup for unmount
      return () => cancel(controller, 'React effect unmount')
    }
  }, [])

  return [{ response, error, loading }, { execute }] as const
}

export default useAxios
