import {
  Alignment,
  HorizontalAlignmentSelector,
  VerticalAlignmentSelector,
} from '@/app/components/screen/alignment/AlignmentSelector'
import { ScreenPanel } from '@/app/components/screen/panel/ScreenPanel'
import { ScreenTable } from '@/app/components/screen/table/ScreenTable'
import { Stacked } from '@/app/components/stacked/Stacked'
import { defaultScreenInputList } from '@/app/constants/defaultScreenList'
import { useScreenContext } from '@/app/contexts/Screen/useScreenContext'
import { useCreateScreenListApi } from '@/app/hooks/api/helpers/useCreateScreenListApi'
import { useGetScreensListApi } from '@/app/hooks/api/helpers/useGetScreenListApi'
import { ScreenItemRender } from '@/app/models/screenItemRender'
import { Dimensions } from '@/lib/openapi/models'
import { Label } from '@/lib/ui/components/label/Label'
import { Skeleton } from '@/lib/ui/components/skeleton/Skeleton'
import { useElementSize } from '@/lib/ui/hooks/useElementSize'
import { getMaxScreenSize } from '@/lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactGA from 'react-ga4'
import { Helmet } from 'react-helmet-async'
import { CreateScreenButton } from '../components/screen/createbutton/CreateButton'
import { FormModeTypes, ScreenFormDrawer } from '../components/screen/form/ScreenFormDrawer'
import { useDeleteScreenApi } from '../hooks/api/helpers/useDeleteScreenApi'
import { useShowScreenApi } from '../hooks/api/helpers/useShowScreenApi'

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

  const { isFetching: isScreenListLoading } = useGetScreensListApi()
  const { isPending: isCreateListLoading, mutate: createListAction } = useCreateScreenListApi()
  const { isPending: isDeletePending, mutate: deleteAction, variables: deleteParams } = useDeleteScreenApi()
  const { isPending: isShowPending, mutate: showAction, variables: showParams } = useShowScreenApi()

  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editMode, setEditMode] = useState<FormModeTypes>(FormModeTypes.Create)
  const [editId, setEditId] = useState<string | undefined>()

  const onLoadDefault = () => {
    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked load default list',
      label: 'Screens Page',
    })
    createListAction({ data: defaultScreenInputList })
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
    [showAction],
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
    [deleteAction],
  )

  useEffect(() => {
    const widestScreen = screens.length > 0 ? getMaxScreenSize(screens) : { width: 47, height: 16 }
    setMaxPanelSize({ width, height: Math.round(widestScreen.height * (width / widestScreen.width)) })
  }, [screens, width])

  return (
    <>
      <Helmet>
        <title>Screens - Screen Geometry</title>
        <meta name='description' content='Visually compare screen sizes and resolutions' />
      </Helmet>

      <div className='flex flex-1 flex-col gap-10'>
        <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between' ref={divSizeRef}>
          <Label palette='primary' className='text-xl'>
            Screen Specs
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
          isScreenListLoading={isScreenListLoading}
          highlighted={highlighted}
          setHighLighted={setHighlighted}
          editAction={{ handler: onEdit }}
          deleteAction={{ handler: onDelete, isPending: isDeletePending, id: deleteParams?.id }}
          showActon={{ handler: onShow, isPending: isShowPending, id: showParams?.id }}
        />

        {screens.length === 0 && !isScreenListLoading && (
          <div className='flex h-full flex-col items-center'>
            <div className='label py-4 text-xl'>No List Found</div>
            <div className='flex flex-col items-center gap-2 py-6'>
              <div>Click here to populate default list</div>
              <button
                className='btn btn-outline btn-primary w-40'
                onClick={onLoadDefault}
                disabled={isCreateListLoading}
              >
                {isCreateListLoading ? (
                  <span data-testid='ButtonSpinner' className='loading loading-spinner'></span>
                ) : (
                  'Load Screens'
                )}
              </button>
            </div>
          </div>
        )}
        {(screens.length > 0 || isScreenListLoading) && (
          <>
            <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between'>
              <Label palette='primary' className='text-xl'>
                Size and Pixel Density Comparison
              </Label>
              <div className='flex flex-wrap gap-4'>
                <HorizontalAlignmentSelector onChange={setHAlignment} />
                <VerticalAlignmentSelector onChange={setVAlignment} />
              </div>
            </div>
            <Stacked height={maxPanelSize.height} $hAlign={hAlignment} $vAlign={vAlignment}>
              {screens.length === 0 && isScreenListLoading ? (
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
