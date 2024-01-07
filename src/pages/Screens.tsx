import { SkeletonImage } from '@components/Skeleton/SkeletonImage'
import { Stacked } from '@components/Stacked/Stacked'
import { ScreenPanel } from '@components/screen/ScreenPanel'
import { ScreenTable } from '@components/screen/ScreenTable'
import { ScreenButton } from '@components/screen/create-edit/CreateButton'
import { ScreenFormDrawer } from '@components/screen/create-edit/ScreenFormDrawer'
import { defaultScreenInputList } from '@constants/defaultScreenList'
import { FormDrawerProvider } from '@contexts/FormDrawer/FormDrawerProvider'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { useCreateScreenListApi } from '@hooks/api/helpers/useCreateScreenListApi'
import { useGetScreensListApi } from '@hooks/api/helpers/useGetScreenListApi'
import { useElementSize } from '@hooks/useElementSize'
import { Dimensions } from '@models/Screen'
import { ScreenItem } from '@openapi/generated/models'
import { getMaxScreenSize } from '@utils/ScreenCalc'
import { useRef, useState } from 'react'

export const Screens = () => {
  const divSizeRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(divSizeRef)
  const {
    state: { screens },
  } = useScreenContext()
  const [highlighted, setHighlighted] = useState<ScreenItem | undefined>()

  const maxScreenSize = screens.length > 0 ? getMaxScreenSize(screens) : { width: 47, height: 16 } // max possible screen size
  const maxPanelSize: Dimensions = { width, height: Math.round(maxScreenSize.height * (width / maxScreenSize.width)) }

  const { isFetching: isScreenListLoading } = useGetScreensListApi()
  const { isPending: isCreateListLoading, useMutation: createListAction } = useCreateScreenListApi()

  const onHighlightClick = (screen: ScreenItem) => {
    if (screen.id === highlighted?.id) {
      setHighlighted(undefined)
    } else {
      setHighlighted(screen)
    }
  }

  const onLoadDefault = () => {
    createListAction({ data: defaultScreenInputList })
  }

  const isHighlighted = (screen: ScreenItem) => screen.id === highlighted?.id

  return (
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
            isHighlighted={isHighlighted}
            setHighLighted={setHighlighted}
            onHighlightClick={onHighlightClick}
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
                  {isCreateListLoading ? <span className='loading loading-spinner'></span> : 'Load Screens'}
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
                  <SkeletonImage className='h-full w-full' />
                ) : (
                  screens
                    .filter((screen) => screen.visible)
                    .map((screen) => (
                      <ScreenPanel
                        key={screen.id}
                        screen={screen}
                        isHighlighted={isHighlighted}
                        setHighLighted={setHighlighted}
                        onHighlightClick={onHighlightClick}
                      />
                    ))
                )}
              </Stacked>
            </div>
          )}
        </ScreenFormDrawer>
      </FormDrawerProvider>
    </div>
  )
}
