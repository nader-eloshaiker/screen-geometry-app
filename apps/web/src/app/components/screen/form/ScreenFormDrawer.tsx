import { useGetScreenApi } from '@/app/hooks/api/helpers/useGetScreenApi'
import { useSearchApi } from '@/app/hooks/api/helpers/useSearchApi'
import { transformScreenItem } from '@/lib/utils'
import { SearchItem } from '@screengeometry/lib-api/spec'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@screengeometry/lib-ui/sheet'
import { Dispatch, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { ScreenSelector } from '../screenselector/ScreenSelector'
import { ScreenForm } from './ScreenForm'
import { FormSubmitType } from './ScreenFormSchema'

enum FormModeTypes {
  Create = 'create',
  Edit = 'edit',
}

type Props = React.PropsWithChildren & {
  open?: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  mode: FormModeTypes
  id?: string
}

const ScreenFormDrawer = ({ open, setOpen, mode, id: editId = '', children }: Props) => {
  const isEdit = mode === FormModeTypes.Edit
  const { data: screenItemResponse, isFetching: isScreenItemLoading } = useGetScreenApi(editId, isEdit && !!editId)

  const [searchTerm, setSearchTerm] = useState<string>('')
  const { isFetching: isSearchListLoading, data: searchListResponse } = useSearchApi({ term: searchTerm })

  const isEditLoading = isEdit && isScreenItemLoading
  const [editScreen, setEditScreen] = useState<FormSubmitType | undefined>()
  const [selectedItem, setSelectedItem] = useState<SearchItem>()

  const { formatMessage } = useIntl()

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
      <SheetContent side='right' showCloseButton={false} className='flex flex-col overflow-auto'>
        <SheetHeader>
          <SheetTitle>
            {editId ? (
              <FormattedMessage id='screens.form.titleEdit' defaultMessage='Edit Screen' />
            ) : (
              <FormattedMessage id='screens.form.titleCreate' defaultMessage='Create Screen' />
            )}
          </SheetTitle>
          <SheetDescription>
            {editId ? (
              <FormattedMessage id='screens.form.updateDescripton' defaultMessage='Make changes to your Screen here.' />
            ) : (
              <FormattedMessage
                id='screens.form.createDescripton'
                defaultMessage='Create a new Screen by entering in the specs.'
              />
            )}
          </SheetDescription>
        </SheetHeader>
        <ScreenSelector
          selectedItem={selectedItem}
          onSelectItem={setSelectedItem}
          isLoading={isSearchListLoading}
          items={searchListResponse?.list}
          commandPlaceholder={formatMessage({
            id: 'screens.form.searchPlaceholder',
            defaultMessage: 'Search Screen list...',
          })}
          selectPlaceholder={formatMessage({
            id: 'screens.form.selectPlaceholder',
            defaultMessage: 'Select Screen...',
          })}
          onSearch={setSearchTerm}
        />

        <ScreenForm
          isEditLoading={isEditLoading}
          editId={editId}
          editScreen={editScreen}
          setOpen={setOpen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </SheetContent>
    </Sheet>
  )
}

export { FormModeTypes, ScreenFormDrawer }
