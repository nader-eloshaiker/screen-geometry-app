import { keepPreviousData } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FormDrawerActionTypes, FormDrawerMode } from '../../../../contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '../../../../contexts/FormDrawer/useFormDrawaerContext'
import { ScreenInput } from '../../../../generated/openapi/models'
import { FindScreenOptions, useFindScreen } from '../../../../hooks/api/useFindScreens'
import { transformScreenItem } from '../../../../utils/ScreenTransformation'
import { ScreenForm } from '../form/ScreenForm'

type Props = TReactChildren

export const ScreenFormDrawer = ({ children }: Props) => {
  const { formDrawerState, dispatchFormDrawer } = useFormDrawerContext()
  const [defaultValues, setDefaultValues] = useState<ScreenInput>()
  const [editMode, setEditMode] = useState<boolean>(false)

  const queryOptions: FindScreenOptions = {
    queryKey: ['ScreenFormDrawer', 'useFindScreen'],
    enabled: formDrawerState.mode === FormDrawerMode.Edit && !!formDrawerState.id,
    placeholderData: keepPreviousData,
  }
  const { screenItemResponse, isScreenItemLoading } = useFindScreen(formDrawerState.id ?? '', queryOptions)
  const onCloseAction = () => {
    dispatchFormDrawer({ type: FormDrawerActionTypes.Toggle, payload: { open: false } })
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
        <div className='sidebar flex-1 rounded-xl p-2 md:w-96'>
          <div className='p-2'>
            <ScreenForm
              defaultValues={defaultValues}
              editId={formDrawerState.id}
              isLoading={editMode && isScreenItemLoading}
              onCloseAction={onCloseAction}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
