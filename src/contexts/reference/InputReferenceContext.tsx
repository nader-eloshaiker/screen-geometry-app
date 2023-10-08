import { createContext, RefObject } from 'react'

export const InputReferenceContext = createContext<RefObject<HTMLInputElement> | null>(null)
