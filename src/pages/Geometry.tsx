import { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { ScreenButton } from '../components/createscreen/CreateButton'
import { ScreenFormDrawer } from '../components/createscreen/drawer/ScreenFormDrawer'
import { ScreenPanel } from '../components/screen/ScreenPanel'
import { ScreenTable } from '../components/screen/ScreenTable'
import { SkeletonImage } from '../components/skeleton/SkeletonImage'
import { defaultScreenInputList } from '../constants/defaultScreenList'
import { InputReferenceProvider } from '../contexts/reference/InputReferenceProvider'
import { useScreenContext } from '../contexts/Screen/useScreenContext'
import { ScreenItem } from '../generated/openapi/models'
import { useCreateScreenList } from '../hooks/api/useCreateScreenList'
import { useListScreens } from '../hooks/api/useListScreens'
import { useElementSize } from '../hooks/useElementSize'
import { Dimensions } from '../models/Screen'
import { getMaxScreenSize } from '../utils/ScreenCalc'

const Stacked = styled.div<{ height: number }>`
  display: inline-grid;
  place-items: start;
  align-items: flex-end;
  width: 100%;
  height: ${(props) => props.height}px;
  * {
    grid-column-start: 1;
    grid-row-start: 1;
  }
`

export default function Geometry() {
  const divSizeRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(divSizeRef)
  const {
    state: { screens },
  } = useScreenContext()
  const [highlighted, setHighlighted] = useState<ScreenItem | undefined>()

  const maxScreenSize = screens.length > 0 ? getMaxScreenSize(screens) : { width: 47, height: 16 } // max possible screen size
  const maxPanelSize: Dimensions = { width, height: Math.round(maxScreenSize.height * (width / maxScreenSize.width)) }

  const { isScreenListLoading } = useListScreens()
  const { isCreateListLoading, createListAction } = useCreateScreenList()

  const onHighlightClick = useCallback(
    (screen: ScreenItem) => {
      if (screen.id === highlighted?.id) {
        setHighlighted(undefined)
      } else {
        setHighlighted(screen)
      }
    },
    [highlighted],
  )

  const onLoadDefault = useCallback(() => {
    createListAction(defaultScreenInputList)
  }, [createListAction])

  const isHighlighted = useCallback((screen: ScreenItem) => screen.id === highlighted?.id, [highlighted])

  return (
    <InputReferenceProvider>
      <div className='flex flex-1 flex-col' ref={divSizeRef}>
        <ScreenFormDrawer>
          <div className='flex w-full items-end justify-between pb-4'>
            <label className='label'>
              <span className='text-xl'>Table</span>
            </label>
            <ScreenButton />
          </div>
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
                  className='btn btn-accent btn-outline w-40'
                  onClick={onLoadDefault}
                  disabled={isCreateListLoading}
                >
                  {isCreateListLoading ? <span className='loading loading-spinner'></span> : 'Load Screens'}
                </button>
              </div>
            </div>
          )}

          {(screens.length > 0 || isScreenListLoading) && (
            <div>
              <label className='label py-6'>
                <span className='text-xl'>Physical Screens</span>
              </label>
              <Stacked height={maxPanelSize.height}>
                {!isScreenListLoading ? (
                  screens.map((screen, index) => (
                    <ScreenPanel
                      key={screen.id}
                      screen={screen}
                      index={screens.length - index}
                      isHighlighted={isHighlighted}
                      setHighLighted={setHighlighted}
                      onHighlightClick={onHighlightClick}
                    />
                  ))
                ) : (
                  <SkeletonImage className='h-full w-full' />
                )}
              </Stacked>
            </div>
          )}
        </ScreenFormDrawer>
      </div>
    </InputReferenceProvider>
  )
}
