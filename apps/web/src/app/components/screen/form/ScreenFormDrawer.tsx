import { ScreenSelector } from '@/app/components/screen/screenselector/ScreenSelector'
import { useApiEffect } from '@/app/hooks/api/useApiEffect'
import { getTextDirection, TranslateMessage, useTranslation } from '@/app/stores/translation'
import { toScreenInput } from '@screengeometry/lib-api/extended'
import {
  getGetScreenQueryKey,
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
import { keepPreviousData, useQueryClient } from '@tanstack/react-query'
import { type Dispatch, useCallback, useEffect, useState } from 'react'
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
  const queryClient = useQueryClient()
  const {
    data: screenData,
    isFetching: isScreenLoading,
    error: screenError,
  } = useGetScreen(editId, {
    query: {
      enabled: isEdit && !!editId,
    },
  })

  useEffect(() => {
    if (open && isEdit && editId) {
      queryClient.invalidateQueries({ queryKey: getGetScreenQueryKey(editId) })
    }
  }, [open, isEdit, editId, queryClient])

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
  const [selectedScreen, setSelectedScreen] = useState<SearchItem>()

  const { formatMessage } = useTranslation()
  const sheetDir = getTextDirection() === 'ltr' ? 'right' : 'left'

  useEffect(() => {
    if (screenData && editId && !isScreenLoading) {
      const inputScreen = toScreenInput(screenData.item)
      setEditScreen(inputScreen as FormSubmitType)
    } else if (!editId && !isScreenLoading) {
      setEditScreen(undefined)
    }
  }, [editId, isScreenLoading, screenData])

  const handleCloseWindow = useCallback(() => {
    setOpen(false)
    setSelectedScreen(undefined)
    setEditScreen(undefined)
  }, [setOpen])

  const handleClearPredefinedSelection = useCallback(() => {
    setSelectedScreen(undefined)
  }, [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={sheetDir} className='flex flex-col gap-10 overflow-auto p-6'>
        <SheetHeader className='p-0 pt-6'>
          <SheetTitle className='text-start'>
            {editId ? (
              <TranslateMessage id='screens.form.titleEdit' />
            ) : (
              <TranslateMessage id='screens.form.titleCreate' />
            )}
          </SheetTitle>
          <SheetDescription className='text-start'>
            {editId ? (
              <TranslateMessage id='screens.form.updateDescripton' />
            ) : (
              <TranslateMessage id='screens.form.createDescripton' />
            )}
          </SheetDescription>
        </SheetHeader>
        <ScreenSelector
          selection={selectedScreen}
          onSelection={setSelectedScreen}
          isLoading={isSearchLoading}
          items={searchData?.list}
          commandPlaceholder={formatMessage('screens.form.searchPlaceholder')}
          selectPlaceholder={formatMessage('screens.form.selectPlaceholder')}
          onSearch={setSearchTerm}
        />

        <ScreenForm
          isFormLoading={isEditLoading}
          editId={editId}
          editValue={editScreen}
          predefinedValue={selectedScreen}
          onClose={handleCloseWindow}
          onClearPredefinedSelection={handleClearPredefinedSelection}
        />
      </SheetContent>
    </Sheet>
  )
}
