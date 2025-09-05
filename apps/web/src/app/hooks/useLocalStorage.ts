import { useEffect, useState } from 'react'

export const getLocalStorage = <T = string>(key: string, initialValue?: T): T | null => {
  try {
    const value = window.localStorage.getItem(key)

    if (!value && initialValue) {
      window.localStorage.setItem(key, JSON.stringify(initialValue))
      return initialValue
    }

    return value ? (JSON.parse(value) as T) : null
  } catch (error) {
    console.log(error)
    return initialValue ?? null
  }
}

const useLocalStorage = <T = string>(key: string, initialValue?: T) => {
  const [state, setState] = useState(() => getLocalStorage<T>(key, initialValue))

  useEffect(() => {
    if (!state) return

    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.log(error)
    }
  }, [key, state])

  return [state, setState] as const
}

export default useLocalStorage
