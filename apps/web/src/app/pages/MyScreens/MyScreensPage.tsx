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
import { useGetScreensListEffect } from '@/app/hooks/api/useGetScreensListEffect'
import { useElementSize } from '@/app/hooks/useElementSize'
import type { ScreenItemRender } from '@/app/models/screenItemRender'
import type { MyScreensLocationState } from '@/app/routes/myscreens'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import { TranslateMessage } from '@/app/stores/translation'
import { getMaxScreenSize } from '@/app/utils'
import { type Dimensions } from '@screengeometry/lib-api/extended'
import { useGetScreenList } from '@screengeometry/lib-api/spec'
import { Button } from '@screengeometry/lib-ui/button'
import { usePageLoader } from '@screengeometry/lib-ui/pageloader'
import { Skeleton } from '@screengeometry/lib-ui/skeleton'
import { useRouterState } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useCreateListhandler } from './hooks/useCreateListHandler'
import { useDeleteHandler } from './hooks/useDeleteHandler'
import { useFormOpenHandler } from './hooks/useFormOpenHandler'
import { useShareHandler } from './hooks/useShareHandler'
import { useShowHandler } from './hooks/useShowHandler'
import { useUpdateListHandler } from './hooks/useUpdateListHandler'

export const MyScreensPage = () => {
  const [setRef, { width }] = useElementSize()
  const {
    state: { screens },
  } = useScreenContext()
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

  const { isPageLoading } = usePageLoader()

  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editMode, setEditMode] = useState<FormModeTypes>(FormModeTypes.create)
  const [editId, setEditId] = useState<string | undefined>()

  const createListHandler = useCreateListhandler()
  const updateListHandler = useUpdateListHandler({
    screens,
    incomingScreens,
    isLoading: isListLoading || isPageLoading,
  })
  const deleteHandler = useDeleteHandler()
  const showHandler = useShowHandler()
  const formOpenHandler = useFormOpenHandler({ setIsEditorOpen, setEditMode, setEditId })
  const shareHandler = useShareHandler({
    screens,
  })

  const isLoading = isListLoading || isPageLoading || updateListHandler.isPending

  const onCreateList = useCallback(() => {
    createListHandler.mutate({ data: defaultScreenInputList })
  }, [createListHandler])

  useEffect(() => {
    const widestScreen = screens.length > 0 ? getMaxScreenSize(screens) : { width: 47, height: 16 }
    setMaxPanelSize({ width, height: Math.round(widestScreen.height * (width / widestScreen.width)) })
  }, [screens, width])

  return (
    <>
      <h1 className='mb-4 text-3xl'>
        <TranslateMessage id='screens.content.heading' />
      </h1>
      <div className='flex flex-1 flex-col gap-10'>
        <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between' ref={setRef}>
          <h2 className='text-primary-label text-xl'>
            <TranslateMessage id='screens.specs.title' />
          </h2>
          <div className='flex gap-4 max-[375px]:flex-col max-[375px]:justify-center'>
            <ShareButton onClick={shareHandler.onAction} />
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
          formOpenHandler={formOpenHandler}
          deleteHandler={deleteHandler}
          showHandler={showHandler}
        />

        {screens.length === 0 && !isLoading && (
          <div className='flex h-full flex-col items-center'>
            <div className='text-primary-label py-4 text-xl'>
              <TranslateMessage id='screens.emptytable.nolist' />
            </div>
            <div className='flex flex-col items-center gap-2 py-6'>
              <div>
                <TranslateMessage id='screens.emptytable.populatelist' />
              </div>
              <Button className='w-40' mode='outline' onClick={onCreateList} disabled={createListHandler.isPending}>
                {createListHandler.isPending ? (
                  <Loader2 data-testid='ButtonSpinner' className='animate-spin' />
                ) : (
                  <TranslateMessage id='screens.specs.loadscreens' />
                )}
              </Button>
            </div>
          </div>
        )}
        {(screens.length > 0 || isLoading) && (
          <>
            <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between'>
              <h2 className='text-primary-label text-xl'>
                <TranslateMessage id='screens.size.title' />
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
