import { CreateScreenButton } from '@/app/components/buttons/CreateButton'
import { ShareButton } from '@/app/components/buttons/ShareButton'
import {
  HorizontalAlignmentSelector,
  VerticalAlignmentSelector,
  type Alignment,
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
import { useUpdateScreenListEffect } from '@/app/hooks/api/useUpdateScreenListEffect'
import { useElementSize } from '@/app/hooks/useElementSize'
import type { ScreenItemRender } from '@/app/models/screenItemRender'
import type { MyScreensLocationState } from '@/app/routes/myscreens'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import { getMaxScreenSize } from '@/app/utils'
import { isScreenDataEqual, toShareScreenItem, type Dimensions } from '@screengeometry/lib-api/extended'
import {
  getGetScreenListQueryKey,
  useCreateScreenList,
  useDeleteScreen,
  useGetScreenList,
  useShowScreen,
  useUpdateScreenList,
} from '@screengeometry/lib-api/spec'
import { Button } from '@screengeometry/lib-ui/button'
import { usePageLoader } from '@screengeometry/lib-ui/pageloader'
import { Skeleton } from '@screengeometry/lib-ui/skeleton'
import { useToast } from '@screengeometry/lib-ui/toaster'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useRouter, useRouterState } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import { FormattedMessage, useIntl } from 'react-intl'

export const MyScreensPage = () => {
  const [setRef, { width }] = useElementSize()
  const {
    state: { screens },
  } = useScreenContext()
  const router = useRouter()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { formatMessage } = useIntl()
  const queryClient = useQueryClient()
  const { screens: incomingScreens } = useRouterState({
    select: (s) => (s.location.state as MyScreensLocationState) ?? {},
  })

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
    },
  })
  useGetScreensListEffect(listData, listError)

  const {
    isPending: isCreateLoading,
    mutate: createAction,
    data: createData,
    error: createError,
  } = useCreateScreenList({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetScreenListQueryKey() }),
    },
  })
  useCreateScreenListEffect(createData, createError)

  const {
    isPending: isUpdateListLoading,
    mutate: updateListAction,
    data: updateListData,
    error: updateListError,
  } = useUpdateScreenList({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetScreenListQueryKey() }),
    },
  })
  useUpdateScreenListEffect(updateListData, updateListError)

  const {
    isPending: isDeletePending,
    mutate: deleteAction,
    variables: deleteParams,
    data: deleteData,
    error: deleteError,
  } = useDeleteScreen({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetScreenListQueryKey() }),
    },
  })
  useDeleteScreenEffect(deleteData, deleteError)

  const {
    isPending: isShowPending,
    mutate: showAction,
    variables: showParams,
    data: showData,
    error: showError,
  } = useShowScreen({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetScreenListQueryKey() }),
    },
  })
  useShowScreenEffect(showData, showError)

  const { isPageLoading } = usePageLoader()
  const isLoading = isListLoading || isPageLoading || isUpdateListLoading

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

  const onUpdateList = useCallback(
    (newScreens: NonNullable<MyScreensLocationState['screens']>) => {
      ReactGA.event({
        category: 'Button Click',
        action: 'Clicked update list with shared screens',
        label: 'My Screens Page',
      })

      const newScreenInputs = newScreens.map((screen) => ({
        diagonalSize: screen.data.diagonalSize,
        aspectRatio: screen.data.aspectRatio,
        hRes: screen.data.hRes,
        vRes: screen.data.vRes,
        lightColor: screen.color.lightColor,
        darkColor: screen.color.darkColor,
      }))

      updateListAction({
        data: newScreenInputs,
      })
    },
    [updateListAction]
  )

  const onEdit = useCallback((id: string) => {
    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked edit',
      label: 'My Screens Page',
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
        label: 'My Screens Page',
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
        label: 'My Screens Page',
      })
      deleteAction({ id })
    },
    [deleteAction]
  )

  const onShare = useCallback(async () => {
    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked share',
      label: 'My Screens Page',
    })

    const selectedScreensToShare = screens.filter((screen) => screen.visible).map((screen) => toShareScreenItem(screen))

    const shareLocation = router.buildLocation({ to: '/share', search: { screens: selectedScreensToShare } })
    const shareUrl = `${window.location.origin}${shareLocation.href}`
    await navigator.clipboard.writeText(shareUrl)
    toast({
      palette: 'info',
      title: formatMessage({ id: 'share.shareNotification.title', defaultMessage: 'Share Link Copied' }),
      description: formatMessage({
        id: 'share.shareNotification.description',
        defaultMessage: 'The share link has been copied to the clipboard.',
      }),
    })
  }, [formatMessage, router, screens, toast])

  useEffect(() => {
    if (!incomingScreens?.length || isLoading || isUpdateListLoading) return

    const missingScreens = incomingScreens.filter(
      (incoming) => !screens.some((existing) => isScreenDataEqual(existing.data, incoming))
    )

    if (missingScreens.length > 0) {
      // Clear router state immediately to prevent re-processing on refresh
      navigate({ to: '/myscreens', state: {}, replace: true })
      onUpdateList(missingScreens)
    }
  }, [incomingScreens, screens, isLoading, isUpdateListLoading, onUpdateList, navigate])

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
          <h2 className='text-primary-label text-xl'>
            <FormattedMessage id='screens.specs.title' defaultMessage='Specs Table' />
          </h2>
          <div className='flex gap-4 max-[375px]:flex-col max-[375px]:justify-center'>
            <ShareButton onClick={onShare} />
            <ScreenFormDrawer mode={editMode} open={isEditorOpen} setOpen={setIsEditorOpen} id={editId}>
              <CreateScreenButton
                onClick={() => {
                  setEditId(undefined)
                  setEditMode(FormModeTypes.create)
                }}
              />
            </ScreenFormDrawer>
          </div>
        </div>

        <ScreenTable
          screens={screens}
          isScreenListLoading={isLoading}
          highlighted={highlighted}
          setHighLighted={setHighlighted}
          editAction={{ handler: onEdit }}
          deleteAction={{ handler: onDelete, isPending: isDeletePending, id: deleteParams?.id }}
          showAction={{ handler: onShow, isPending: isShowPending, id: showParams?.id }}
        />

        {screens.length === 0 && !isLoading && (
          <div className='flex h-full flex-col items-center'>
            <div className='text-primary-label py-4 text-xl'>
              <FormattedMessage id='screens.emptytable.nolist' defaultMessage='No List Found' />
            </div>
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
              <h2 className='text-primary-label text-xl'>
                <FormattedMessage id='screens.size.title' defaultMessage='Size and Pixel Density' />
              </h2>
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
