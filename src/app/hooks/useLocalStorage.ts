import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const getLocalStorage = <T>(key: string, initialValue: T): T => {
  try {
    const value = window.localStorage.getItem(key)
    // Check if the local storage already has any values,
    // otherwise initialize it with the passed initialValue
    return value ? (JSON.parse(value) as T) : initialValue
  } catch (error) {
    console.log(error)
    window.localStorage.setItem(key, JSON.stringify(initialValue))
    return initialValue
  }
}

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState(() => getLocalStorage<T>(key, initialValue))

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.log(error)
    }
  }, [key, state])

  return [state, setState] as [T, Dispatch<SetStateAction<T>>]
}

export default useLocalStorage
