import { useEffect, useMemo, useRef, useState } from 'react'
import { FormDrawerContext } from './FormDrawerContext'

export const FormDrawerProvider = ({ children }: TReactChildren) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const reference = useRef<HTMLInputElement>(null)
  const contextValue = useMemo(() => ({ isOpen, setOpen, reference }), [isOpen, setOpen, reference])

  useEffect(() => {
    if (reference.current?.checked && !isOpen) {
      reference.current?.click()
    } else if (!reference.current?.checked && isOpen) {
      reference.current?.click()
    }
  }, [isOpen])

  return <FormDrawerContext.Provider value={contextValue}>{children}</FormDrawerContext.Provider>
}
