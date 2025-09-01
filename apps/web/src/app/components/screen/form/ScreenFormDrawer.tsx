import { ScreenSelector } from '@/app/components/screen/screenselector/ScreenSelector'
import { useApiEffect } from '@/app/hooks/api/useApiEffect'
import { getTextDirection } from '@/app/hooks/translation/LocaleHelper'
import { toScreenInput } from '@screengeometry/lib-api/extended'
import {
  type ScreenItemResponse,
  type SearchItem,
  type SearchListResponse,
  useGetScreen,
  useGetSearch,
} from '@screengeometry/lib-api/spec'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@screengeometry/lib-ui/sheet'
import { keepPreviousData } from '@tanstack/react-query'
import { type Dispatch, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormModeTypes } from './FormMode'
import { ScreenForm } from './ScreenForm'
import { type FormSubmitType } from './ScreenFormSchema'

type Props = React.PropsWithChildren & {
  open?: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  mode: FormModeTypes
  id?: string
}

export const ScreenFormDrawer = ({ open, setOpen, mode, id: editId = '', children }: Props) => {
  const isEdit = mode === FormModeTypes.edit
  const {
    data: screenData,
    isFetching: isScreenLoading,
    error: screenError,
  } = useGetScreen(editId, {
    query: {
      enabled: isEdit && !!editId,
      placeholderData: keepPreviousData,
    },
  })
  useApiEffect<ScreenItemResponse>({
    data: screenData,
    error: screenError,
  })

  const [searchTerm, setSearchTerm] = useState<string>('')
  const {
    isFetching: isSearchLoading,
    data: searchData,
    error: searchError,
  } = useGetSearch(
    { term: searchTerm },
    {
      query: {
        staleTime: Infinity,
        placeholderData: keepPreviousData,
      },
    }
  )
  useApiEffect<SearchListResponse>({
    data: searchData,
    error: searchError,
  })

  const isEditLoading = isEdit && isScreenLoading
  const [editScreen, setEditScreen] = useState<FormSubmitType | undefined>()
  const [selectedItem, setSelectedItem] = useState<SearchItem>()

  const { formatMessage } = useIntl()
  const sheetDir = getTextDirection() === 'ltr' ? 'right' : 'left'

  useEffect(() => {
    if (screenData && editId && !isScreenLoading) {
      const inputScreen = toScreenInput(screenData.item)
      const resetInputValues = inputScreen as FormSubmitType
      setEditScreen(resetInputValues)
    } else if (!editId && !isScreenLoading) {
      setEditScreen(undefined)
    }
  }, [editId, isScreenLoading, screenData])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={sheetDir} className='flex flex-col overflow-auto p-6'>
        <SheetHeader>
          <SheetTitle className='text-start'>
            {editId ? (
              <FormattedMessage id='screens.form.titleEdit' defaultMessage='Edit Screen' />
            ) : (
              <FormattedMessage id='screens.form.titleCreate' defaultMessage='Create Screen' />
            )}
          </SheetTitle>
          <SheetDescription className='text-start'>
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
          isLoading={isSearchLoading}
          items={searchData?.list}
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
