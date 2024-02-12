import { ScreenButton } from '@components/screen/CreateButton'
import { ScreenFormDrawer } from '@components/screen/ScreenFormDrawer'
import { ScreenPanel } from '@components/screen/ScreenPanel'
import { ScreenTable } from '@components/screen/ScreenTable'
import { SkeletonImage } from '@components/skeleton/SkeletonImage'
import { Stacked } from '@components/stacked/Stacked'
import { defaultScreenInputList } from '@constants/defaultScreenList'
import { FormDrawerProvider } from '@contexts/FormDrawer/FormDrawerProvider'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { useCreateScreenListApi } from '@hooks/api/helpers/useCreateScreenListApi'
import { useGetScreensListApi } from '@hooks/api/helpers/useGetScreenListApi'
import { useElementSize } from '@hooks/useElementSize'
import { Dimensions } from '@models/Screen'
import { ScreenItem } from '@openapi/generated/models'
import { getMaxScreenSize } from '@utils/ScreenCalc'
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
    <>
      <Helmet>
        <title>Screens - Screen Geometry</title>
        <meta name='description' content='Visually compare screen sizes and resolutions' />
      </Helmet>

      <div className='flex flex-1 flex-col' ref={divSizeRef}>
        <FormDrawerProvider>
          <ScreenFormDrawer>
            <div className='flex w-full flex-row-reverse'>
              <ScreenButton />
            </div>
            <label className='label'>
              <span className='text-xl'>Screen Specs</span>
            </label>
            <ScreenTable
              screens={screens}
              isScreenListLoading={isScreenListLoading}
              highlighted={highlighted}
              setHighLighted={setHighlighted}
            />

            {screens.length === 0 && !isScreenListLoading && (
              <div className='flex h-full flex-col items-center'>
                <div className='label py-4'>
                  <span className='text-xl'>No List Found</span>
                </div>
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
              <div className='mx-2'>
                <label className='label py-6'>
                  <span className='text-xl'>Size and Pixel Density Comparison</span>
                </label>
                <Stacked height={maxPanelSize.height}>
                  {screens.length === 0 && isScreenListLoading ? (
                    <SkeletonImage data-testid='SkeletonImage' className='size-full' />
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
              </div>
            )}
          </ScreenFormDrawer>
        </FormDrawerProvider>
      </div>
    </>
  )
}
