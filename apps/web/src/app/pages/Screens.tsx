import {
  Alignment,
  HorizontalAlignmentSelector,
  VerticalAlignmentSelector,
} from '@/app/components/screen/alignment/AlignmentSelector'
import { ScreenPanel } from '@/app/components/screen/panel/ScreenPanel'
import { ScreenTable } from '@/app/components/screen/table/ScreenTable'
import { Stacked } from '@/app/components/stacked/Stacked'
import { defaultScreenInputList } from '@/app/constants/defaultScreenList'
import { useCreateScreenListEffect } from '@/app/hooks/api/useCreateScreenListEffect'
import { useGetScreensListEffect } from '@/app/hooks/api/useGetScreensListEffect'
import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import { ScreenItemRender } from '@/app/models/screenItemRender'
import { useElementSize } from '@/lib/ui/hooks/useElementSize'
import { getMaxScreenSize } from '@/lib/utils'
import { useCreateScreenList, useDeleteScreen, useGetScreenList, useShowScreen } from '@screengeometry/lib-api/spec'
import { Button } from '@screengeometry/lib-ui/button'
import { usePageLoader } from '@screengeometry/lib-ui/hooks/pageloader'
import { Label } from '@screengeometry/lib-ui/label'
import { Skeleton } from '@screengeometry/lib-ui/skeleton'
import { keepPreviousData } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactGA from 'react-ga4'
import { Helmet } from 'react-helmet-async'
import { FormattedMessage } from 'react-intl'
import { Dimensions } from '../../../../../packages/lib-api/src/internal'
import { CreateScreenButton } from '../components/screen/createbutton/CreateButton'
import { FormModeTypes, ScreenFormDrawer } from '../components/screen/form/ScreenFormDrawer'
import { useDeleteScreenEffect } from '../hooks/api/useDeleteScreenEffect'
import { useShowScreenEffect } from '../hooks/api/useShowScreenEffect'

export const Screens = () => {
  const divSizeRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(divSizeRef)
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
  const [editMode, setEditMode] = useState<FormModeTypes>(FormModeTypes.Create)
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
    setEditMode(FormModeTypes.Edit)
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
      <Helmet>
        <title>Screen Geometry: Screens</title>
        <meta
          name='description'
          content='Compare multiple monitor sizes and resolutions simultaneously. Get clear insights into size, resolution, and aspect ratio differences. Perfect for tech enthusiasts and professionals!'
        />
      </Helmet>

      <div className='flex flex-1 flex-col gap-10'>
        <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between' ref={divSizeRef}>
          <Label palette='primary' className='text-xl'>
            <FormattedMessage id='screens.specs.title' defaultMessage='Screen Specs' />
          </Label>
          <ScreenFormDrawer mode={editMode} open={isEditorOpen} setOpen={setIsEditorOpen} id={editId}>
            <CreateScreenButton
              onClick={() => {
                setEditId(undefined)
                setEditMode(FormModeTypes.Create)
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
            <div className='py-4 text-xl text-primary-label'>No List Found</div>
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
