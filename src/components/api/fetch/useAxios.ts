import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { axiosInstance } from './axios'

const UseAxiosOptionsDefaults = {
  manual: false,
  cancelable: false,
}

type UseAxiosOptions = Partial<typeof UseAxiosOptionsDefaults>

const useAxios = <T>(axiosParams: AxiosRequestConfig, hooksOptions: UseAxiosOptions = UseAxiosOptionsDefaults) => {
  const options = { ...UseAxiosOptionsDefaults, ...hooksOptions }
  const [response, setResponse] = useState<AxiosResponse<T>>()
  const [error, setError] = useState<AxiosError>()
  const [loading, setLoading] = useState(!options.manual)
  const controllerRef = useRef(new AbortController())
  const cancel = () => {
    controllerRef.current.abort()
  }

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const result = await axiosInstance.request({ ...params, signal: controllerRef.current.signal })
      setResponse(result)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error)
      } else {
        throw new Error('different error than axios')
      }
    } finally {
      setLoading(false)
    }
  }

  const execute = (data?: unknown) => {
    fetchData({ ...axiosParams, data: data || axiosParams.data })
  }

  useEffect(() => {
    if (!options.manual) {
      fetchData(axiosParams)
    }
  }, [])

  return [
    { response, error, loading },
    { execute, cancel },
  ] as const
}

export default useAxios
