import { FormDrawerActionTypes, FormDrawerMode } from '@app/contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '@app/contexts/FormDrawer/useFormDrawerContext'
import { useGetScreenApi } from '@app/hooks/api/helpers/useGetScreenApi'
import { ScreenInput } from '@packages/openapi/generated'
import { transformScreenItem } from '@packages/utils/DataTransformation'

import { useEffect, useState } from 'react'
import { ScreenForm } from './form/ScreenForm'

type Props = TReactChildren

export const ScreenFormDrawer = ({ children }: Props) => {
  const { formDrawerState, dispatchFormDrawer } = useFormDrawerContext()
  const [defaultValues, setDefaultValues] = useState<ScreenInput | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)

  const { data: screenItemResponse, isFetching: isScreenItemLoading } = useGetScreenApi(
    formDrawerState.id ?? '',
    formDrawerState.mode === FormDrawerMode.Edit && !!formDrawerState.id,
  )
  const closeHandler = () => {
    dispatchFormDrawer({ type: FormDrawerActionTypes.Close })
    setDefaultValues(null)
  }

  useEffect(() => {
    if (formDrawerState.mode === FormDrawerMode.Create || formDrawerState.mode === FormDrawerMode.Close) {
      setEditMode(false)
    } else if (formDrawerState.mode === FormDrawerMode.Edit) {
      setEditMode(true)
    }
  }, [formDrawerState.mode])

  useEffect(() => {
    if (screenItemResponse && formDrawerState.mode === FormDrawerMode.Edit && !isScreenItemLoading) {
      const inputScreen = transformScreenItem(screenItemResponse.item)
      setDefaultValues(inputScreen)
    }
  }, [formDrawerState.mode, isScreenItemLoading, screenItemResponse])

  return (
    <div className='drawer h-full grow'>
      <div id='drawer-content' className='drawer-content'>
        {children}
      </div>
      <input
        id='screenFormDrawer'
        type='checkbox'
        className='drawer-toggle'
        checked={formDrawerState.open}
        onChange={(_e) => {}}
      />
      <div className='drawer-side absolute h-fit w-auto duration-100 ease-in'>
        <div className='sidebar rounded-xl p-2 md:w-96'>
          <div className='p-2'>
            <ScreenForm
              defaultValues={defaultValues}
              editId={formDrawerState.id}
              isLoading={editMode && isScreenItemLoading}
              onClose={closeHandler}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
