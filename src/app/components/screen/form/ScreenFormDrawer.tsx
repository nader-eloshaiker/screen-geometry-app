import { useGetScreenApi } from '@/app/hooks/api/helpers/useGetScreenApi'
import { Sheet, SheetContent, SheetTrigger } from '@/lib/ui/components/sheet/Sheet'
import { transformScreenItem } from '@/lib/utils'
import { Dispatch, useEffect, useState } from 'react'
import { ScreenForm } from './ScreenForm'
import { FormSubmitType } from './ScreenFormSchema'

enum FormModeTypes {
  Create = 'create',
  Edit = 'edit',
}

type Props = TReactChildren & {
  open?: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  mode: FormModeTypes
  id?: string
}

const ScreenFormDrawer = ({ open, setOpen, mode, id: editId = '', children }: Props) => {
  const isEdit = mode === FormModeTypes.Edit
  const { data: screenItemResponse, isFetching: isScreenItemLoading } = useGetScreenApi(editId, isEdit && !!editId)

  const isEditLoading = isEdit && isScreenItemLoading
  const [editScreen, setEditScreen] = useState<FormSubmitType | undefined>()

  useEffect(() => {
    if (screenItemResponse && editId && !isScreenItemLoading) {
      const inputScreen = transformScreenItem(screenItemResponse.item)
      const resetInputValues = inputScreen as FormSubmitType
      setEditScreen(resetInputValues)
    } else if (!editId && !isScreenItemLoading) {
      setEditScreen(undefined)
    }
  }, [editId, isScreenItemLoading, screenItemResponse])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side='right' className='flex flex-col overflow-auto'>
        <ScreenForm isEditLoading={isEditLoading} editId={editId} editScreen={editScreen} setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  )
}

export { FormModeTypes, ScreenFormDrawer }
