import { useMemo, useRef } from 'react'
import { InputReferenceContext } from './InputReferenceContext'

export const InputReferenceProvider = ({ children }: TReactChildren) => {
  const reference = useRef<HTMLInputElement>(null)
  const contextValue = useMemo(() => reference, [reference])

  return <InputReferenceContext.Provider value={contextValue}>{children}</InputReferenceContext.Provider>
}
