import { useEffect, useState } from 'react'
import { FormDrawerMode } from '../../../../contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '../../../../contexts/FormDrawer/useFormDrawaerContext'
import { ScreenInput } from '../../../../generated/openapi/models'
import { FindScreenOptions, useFindScreen } from '../../../../hooks/api/useFindScreens'
import { transformScreenItem } from '../../../../utils/ScreenTransformation'
import { DefaultValues } from '../form/DefaultValues'
import { ScreenForm } from '../form/ScreenForm'
import './ScreenFormDrawer.css'

type Props = TReactChildren

export const ScreenFormDrawer = ({ children }: Props) => {
  const { formDrawerState } = useFormDrawerContext()
  const [defaultValues, setDefaultValues] = useState<ScreenInput>(DefaultValues())
  const [editMode, setEditMode] = useState<boolean>(false)

  useEffect(() => {
    if (formDrawerState.mode === FormDrawerMode.Create || formDrawerState.mode === FormDrawerMode.Close) {
      setDefaultValues(DefaultValues())
      setEditMode(false)
    } else if (formDrawerState.mode === FormDrawerMode.Edit) {
      setEditMode(true)
    }
  }, [formDrawerState.mode])

  const queryOptions: FindScreenOptions = {
    enabled: formDrawerState.mode === FormDrawerMode.Edit && !!formDrawerState.id,
    keepPreviousData: true,
  }
  const { screenItemResponse } = useFindScreen(formDrawerState.id ?? '', queryOptions)

  useEffect(() => {
    if (screenItemResponse && formDrawerState.mode === FormDrawerMode.Edit) {
      const inputScreen = transformScreenItem(screenItemResponse.item)
      setDefaultValues(inputScreen)
    }
  }, [formDrawerState.mode, screenItemResponse])

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
            <ScreenForm defaultValues={defaultValues} editMode={editMode} />
          </div>
        </div>
      </div>
    </div>
  )
}
