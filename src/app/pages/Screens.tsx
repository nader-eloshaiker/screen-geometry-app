import {
  Alignment,
  HorizontalAlignmentSelector,
  VerticalAlignmentSelector,
} from '@app/components/screen/AlignmentSelector'
import { CreateScreenButton } from '@app/components/screen/CreateButton'
import { ScreenFormDrawer } from '@app/components/screen/ScreenFormDrawer'
import { ScreenPanel } from '@app/components/screen/ScreenPanel'
import { ScreenTable } from '@app/components/screen/ScreenTable'
import { Stacked } from '@app/components/stacked/Stacked'
import { defaultScreenInputList } from '@app/constants/defaultScreenList'
import { FormDrawerProvider } from '@app/contexts/FormDrawer/FormDrawerProvider'
import { useScreenContext } from '@app/contexts/Screen/useScreenContext'
import { useCreateScreenListApi } from '@app/hooks/api/helpers/useCreateScreenListApi'
import { useGetScreensListApi } from '@app/hooks/api/helpers/useGetScreenListApi'
import { ScreenItem } from '@packages/openapi/generated'
import { Dimensions } from '@packages/openapi/models'
import { useElementSize } from '@packages/ui/hooks/useElementSize'
import { ImageIcon } from '@packages/ui/skeleton'
import { SkeletonImage } from '@packages/ui/skeleton/SkeletonImage'
import { getMaxScreenSize } from '@packages/utils/ScreenCalc'
import { useEffect, useRef, useState } from 'react'
import ReactGA from 'react-ga4'
import { Helmet } from 'react-helmet-async'

export const Screens = () => {
  const divSizeRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(divSizeRef)
  const {
    state: { screens },
  } = useScreenContext()
  const [highlighted, setHighlighted] = useState<ScreenItem | undefined>()
  const [maxPanelSize, setMaxPanelSize] = useState<Dimensions>({ width, height: 0 })
  const [hAlignment, setHAlignment] = useState<Alignment>('center')
  const [vAlignment, setVAlignment] = useState<Alignment>('end')

  const { isFetching: isScreenListLoading } = useGetScreensListApi()
  const { isPending: isCreateListLoading, mutate: createListAction } = useCreateScreenListApi()

  const onLoadDefault = () => {
    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked load default list',
      label: 'Screens Page',
    })
    createListAction({ data: defaultScreenInputList })
  }

  useEffect(() => {
    const widestScreen = screens.length > 0 ? getMaxScreenSize(screens) : { width: 47, height: 16 }
    setMaxPanelSize({ width, height: Math.round(widestScreen.height * (width / widestScreen.width)) })
  }, [screens, width])

  return (
    <FormDrawerProvider>
      <ScreenFormDrawer>
        <Helmet>
          <title>Screens - Screen Geometry</title>
          <meta name='description' content='Visually compare screen sizes and resolutions' />
        </Helmet>

        <div className='flex flex-1 flex-col gap-10'>
          <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between' ref={divSizeRef}>
            <div className='label text-xl'>Screen Specs</div>
            <CreateScreenButton />
          </div>
          <ScreenTable
            screens={screens}
            isScreenListLoading={isScreenListLoading}
            highlighted={highlighted}
            setHighLighted={setHighlighted}
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
                <div className='label text-xl'>Size and Pixel Density Comparison</div>
                <div className='flex flex-wrap gap-4'>
                  <HorizontalAlignmentSelector onChange={setHAlignment} />
                  <VerticalAlignmentSelector onChange={setVAlignment} />
                </div>
              </div>
              <Stacked height={maxPanelSize.height} $hAlign={hAlignment} $vAlign={vAlignment}>
                {screens.length === 0 && isScreenListLoading ? (
                  <SkeletonImage
                    data-testid='SkeletonImage'
                    className='size-full'
                    image={<ImageIcon fill='rgb(107 114 128)' className='size-1/4' />}
                  />
                ) : (
                  screens
                    .filter((screen) => screen.visible)
                    .map((screen) => (
                      <ScreenPanel
                        data-testid={`ScreenPanel-${screen.tag.diagonalSize}`}
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
      </ScreenFormDrawer>
    </FormDrawerProvider>
  )
}
