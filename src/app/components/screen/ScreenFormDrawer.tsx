import { useGetScreenApi } from '@/app/hooks/api/helpers/useGetScreenApi'
import { ScreenInput } from '@/lib/openapi/generated'
import { Button } from '@/lib/ui/components/button/Button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/lib/ui/components/sheet/Sheet'
import { transformScreenItem } from '@/lib/utils/DataTransformation'
import { Dispatch, useEffect, useState } from 'react'
import { ScreenForm } from './form/ScreenForm'

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

const ScreenFormDrawer = ({ open, setOpen, mode, id = '', children }: Props) => {
  const [defaultValues, setDefaultValues] = useState<ScreenInput | undefined>()
  const isEdit = mode === FormModeTypes.Edit

  const { data: screenItemResponse, isFetching: isScreenItemLoading } = useGetScreenApi(id, isEdit && !!id)
  const closeHandler = () => {
    setOpen(false)
    setDefaultValues(undefined)
  }

  useEffect(() => {
    if (screenItemResponse && id && !isScreenItemLoading) {
      const inputScreen = transformScreenItem(screenItemResponse.item)
      setDefaultValues(inputScreen)
    } else if (!id && !isScreenItemLoading) {
      setDefaultValues(undefined)
    }
  }, [isScreenItemLoading, screenItemResponse, isEdit, id])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when you&lsquo;re done.</SheetDescription>
        </SheetHeader>
        <ScreenForm
          defaultValues={defaultValues}
          editId={id}
          isLoading={isEdit && isScreenItemLoading}
          onClose={closeHandler}
        />
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit'>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export { FormModeTypes, ScreenFormDrawer }
