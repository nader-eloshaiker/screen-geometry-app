import { FormDrawerActionTypes, FormDrawerMode } from '@app/contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '@app/contexts/FormDrawer/useFormDrawerContext'
import { useGetScreenApi } from '@app/hooks/api/helpers/useGetScreenApi'
import { ScreenInput } from '@packages/openapi/generated'
import { transformScreenItem } from '@packages/utils/DataTransformation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ScreenForm } from './form/ScreenForm'

const variants = {
  opened: { translateX: '0' },
  closed: { translateX: '-100%', transition: { ease: 'easeInOut' } },
}

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
    <div className='relative h-full grow overflow-x-clip'>
      <div id='drawer-content' className='size-full'>
        {children}
      </div>
      <input
        id='screenFormDrawer'
        type='checkbox'
        className='peer sr-only relative'
        checked={formDrawerState.open}
        onChange={(_e) => {}}
      />
      <motion.div
        initial='closed'
        animate={formDrawerState.open ? 'opened' : 'closed'}
        variants={variants}
        className='absolute left-0 top-0'
      >
        <div className='w-[22rem] rounded-md bg-accent p-6 text-accent-content'>
          <ScreenForm
            defaultValues={defaultValues}
            editId={formDrawerState.id}
            isLoading={editMode && isScreenItemLoading}
            onClose={closeHandler}
          />
        </div>
      </motion.div>
    </div>
  )
}
