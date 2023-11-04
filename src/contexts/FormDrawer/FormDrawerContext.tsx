import { createContext, Dispatch, RefObject, SetStateAction } from 'react'

export const FormDrawerContext = createContext<{
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  reference: RefObject<HTMLInputElement> | null
}>({ isOpen: false, setOpen: () => {}, reference: null })
