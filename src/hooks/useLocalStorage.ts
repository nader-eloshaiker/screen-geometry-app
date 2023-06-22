import { Dispatch, SetStateAction, useState } from "react"

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState(() => getLocalStorage(key, initialValue))

  const setValue = (value: T) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore = value instanceof Function ? value(state) : value
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setState(value)
    } catch (error) {
      console.log(error)
    }
  }

  return [state, setValue] as [T, Dispatch<SetStateAction<T>>]
}

export const getLocalStorage = <T>(key: string, initialValue: T): T => {
  try
  {
    const value = window.localStorage.getItem(key)
    // Check if the local storage already has any values,
    // otherwise initialize it with the passed initialValue
    return value ? (JSON.parse(value) as T) : initialValue
  } catch (error)
  {
    console.log(error)
    window.localStorage.setItem(key, JSON.stringify(initialValue))
    return initialValue
  }
}

export default useLocalStorage
