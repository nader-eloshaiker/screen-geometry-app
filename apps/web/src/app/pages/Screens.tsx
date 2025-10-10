import { CreateScreenButton } from '@/app/components/createbutton/CreateButton'
import {
  type Alignment,
  HorizontalAlignmentSelector,
  VerticalAlignmentSelector,
} from '@/app/components/screen/alignment/AlignmentSelector'
import { FormModeTypes } from '@/app/components/screen/form/FormMode'
import { ScreenFormDrawer } from '@/app/components/screen/form/ScreenFormDrawer'
import { ScreenPanel } from '@/app/components/screen/panel/ScreenPanel'
import { ScreenTable } from '@/app/components/screen/table/ScreenTable'
import { Stacked } from '@/app/components/stacked/Stacked'
import { defaultScreenInputList } from '@/app/constants/defaultScreenList'
import { useCreateScreenListEffect } from '@/app/hooks/api/useCreateScreenListEffect'
import { useDeleteScreenEffect } from '@/app/hooks/api/useDeleteScreenEffect'
import { useGetScreensListEffect } from '@/app/hooks/api/useGetScreensListEffect'
import { useShowScreenEffect } from '@/app/hooks/api/useShowScreenEffect'
import { useElementSize } from '@/app/hooks/useElementSize'
import type { ScreenItemRender } from '@/app/models/screenItemRender'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import { getMaxScreenSize } from '@/app/utils'
import type { Dimensions } from '@screengeometry/lib-api/extended'
import { useCreateScreenList, useDeleteScreen, useGetScreenList, useShowScreen } from '@screengeometry/lib-api/spec'
import { Button } from '@screengeometry/lib-ui/button'
import { Label } from '@screengeometry/lib-ui/label'
import { usePageLoader } from '@screengeometry/lib-ui/pageloader'
import { Skeleton } from '@screengeometry/lib-ui/skeleton'
import { keepPreviousData } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import { FormattedMessage } from 'react-intl'

export const Screens = () => {
  const [setRef, { width }] = useElementSize()
  const {
    state: { screens },
  } = useScreenContext()
  const [highlighted, setHighlighted] = useState<ScreenItemRender | undefined>()
  const [maxPanelSize, setMaxPanelSize] = useState<Dimensions>({ width, height: 0 })
  const [hAlignment, setHAlignment] = useState<Alignment>('center')
  const [vAlignment, setVAlignment] = useState<Alignment>('end')

  const {
    isFetching: isListLoading,
    data: listData,
    error: listError,
  } = useGetScreenList({
    query: {
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
    },
  })
  useGetScreensListEffect(listData, listError)

  const {
    isPending: isCreateLoading,
    mutate: createAction,
    data: createData,
    error: createError,
  } = useCreateScreenList()
  useCreateScreenListEffect(createData, createError)

  const {
    isPending: isDeletePending,
    mutate: deleteAction,
    variables: deleteParams,
    data: deleteData,
    error: deleteError,
  } = useDeleteScreen()
  useDeleteScreenEffect(deleteData, deleteError)

  const {
    isPending: isShowPending,
    mutate: showAction,
    variables: showParams,
    data: showData,
    error: showError,
  } = useShowScreen()
  useShowScreenEffect(showData, showError)

  const { isPageLoading } = usePageLoader()
  const isLoading = isListLoading || isPageLoading

  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editMode, setEditMode] = useState<FormModeTypes>(FormModeTypes.create)
  const [editId, setEditId] = useState<string | undefined>()

  const onLoadDefault = () => {
    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked load default list',
      label: 'Screens Page',
    })
    createAction({ data: defaultScreenInputList })
  }

  const onEdit = useCallback((id: string) => {
    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked edit',
      label: 'Screens Page',
    })
    setIsEditorOpen(true)
    setEditMode(FormModeTypes.edit)
    setEditId(id)
  }, [])

  const onShow = useCallback(
    (id: string) => {
      ReactGA.event({
        category: 'Checkbox Click',
        action: 'Clicked show',
        label: 'Screens Page',
      })
      showAction({ id })
    },
    [showAction]
  )

  const onDelete = useCallback(
    (id: string) => {
      ReactGA.event({
        category: 'Button Click',
        action: 'Clicked delete',
        label: 'Screens Page',
      })
      deleteAction({ id })
    },
    [deleteAction]
  )

  useEffect(() => {
    const widestScreen = screens.length > 0 ? getMaxScreenSize(screens) : { width: 47, height: 16 }
    setMaxPanelSize({ width, height: Math.round(widestScreen.height * (width / widestScreen.width)) })
  }, [screens, width])

  return (
    <>
      <h1 className='mb-4 text-3xl'>
        <FormattedMessage id='screens.content.heading' defaultMessage='Screen Comparisons' />
      </h1>
      <div className='flex flex-1 flex-col gap-10'>
        <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between' ref={setRef}>
          <Label palette='primary' className='text-xl'>
            <FormattedMessage id='screens.specs.title' defaultMessage='Screen Specs' />
          </Label>
          <ScreenFormDrawer mode={editMode} open={isEditorOpen} setOpen={setIsEditorOpen} id={editId}>
            <CreateScreenButton
              onClick={() => {
                setEditId(undefined)
                setEditMode(FormModeTypes.create)
              }}
            />
          </ScreenFormDrawer>
        </div>

        <ScreenTable
          screens={screens}
          isScreenListLoading={isLoading}
          highlighted={highlighted}
          setHighLighted={setHighlighted}
          editAction={{ handler: onEdit }}
          deleteAction={{ handler: onDelete, isPending: isDeletePending, id: deleteParams?.id }}
          showActon={{ handler: onShow, isPending: isShowPending, id: showParams?.id }}
        />

        {screens.length === 0 && !isLoading && (
          <div className='flex h-full flex-col items-center'>
            <div className='text-primary-label py-4 text-xl'>No List Found</div>
            <div className='flex flex-col items-center gap-2 py-6'>
              <div>
                <FormattedMessage
                  id='screens.emptytable.populatelist'
                  defaultMessage='Click here to populate default list'
                />
              </div>
              <Button className='w-40' mode='outline' onClick={onLoadDefault} disabled={isCreateLoading}>
                {isCreateLoading ? (
                  <Loader2 data-testid='ButtonSpinner' className='animate-spin' />
                ) : (
                  <FormattedMessage id='screens.specs.loadscreens' defaultMessage='Load Screens' />
                )}
              </Button>
            </div>
          </div>
        )}
        {(screens.length > 0 || isLoading) && (
          <>
            <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between'>
              <Label palette='primary' className='text-xl'>
                <FormattedMessage id='screens.size.title' defaultMessage='Size and Pixel Density Comparison' />
              </Label>
              <div className='flex flex-wrap gap-4'>
                <HorizontalAlignmentSelector onChange={setHAlignment} />
                <VerticalAlignmentSelector onChange={setVAlignment} />
              </div>
            </div>
            <Stacked height={maxPanelSize.height} $hAlign={hAlignment} $vAlign={vAlignment}>
              {screens.length === 0 && isListLoading ? (
                <Skeleton data-testid='SkeletonImage' mode='image' className='size-full' />
              ) : (
                screens
                  .filter((screen) => screen.visible)
                  .map((screen) => (
                    <ScreenPanel
                      data-testid={`ScreenPanel-${screen.data.diagonalSize}`}
                      key={screen.id}
                      screen={screen}
                      highlighted={highlighted}
                      setHighLighted={setHighlighted}
                    />
                  ))
              )}
            </Stacked>
          </>
        )}
      </div>
    </>
  )
}
