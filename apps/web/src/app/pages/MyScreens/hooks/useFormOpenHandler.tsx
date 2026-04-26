import { FormModeTypes } from '@/app/components/screen/form/FormMode'
import { Dispatch, SetStateAction, useCallback } from 'react'
import ReactGA from 'react-ga4'

export type FormOpenHandler = { onAction: (id: string) => void }

export const useFormOpenHandler = ({
  setIsEditorOpen,
  setEditMode,
  setEditId,
}: {
  setIsEditorOpen: Dispatch<SetStateAction<boolean>>
  setEditMode: Dispatch<SetStateAction<FormModeTypes>>
  setEditId: Dispatch<SetStateAction<string | undefined>>
}): FormOpenHandler => {
  const onAction = useCallback(
    (id: string) => {
      ReactGA.event({
        category: 'Button Click',
        action: 'Clicked edit',
        label: 'My Screens Page',
      })

      setIsEditorOpen(true)
      setEditMode(FormModeTypes.edit)
      setEditId(id)
    },
    [setIsEditorOpen, setEditMode, setEditId]
  )

  return { onAction }
}
