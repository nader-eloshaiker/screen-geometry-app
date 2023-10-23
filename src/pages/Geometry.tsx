import { useRef, useState } from 'react'
import styled from 'styled-components'
import { ScreenButton } from '../components/createscreen/CreateButton'
import { ScreenFormDrawer } from '../components/createscreen/drawer/ScreenFormDrawer'
import { ScreenPanel } from '../components/screen/ScreenPanel'
import { ScreenTable } from '../components/screen/ScreenTable'
import { SkeletonImage } from '../components/skeleton/SkeletonImage'
import { InputReferenceProvider } from '../contexts/reference/InputReferenceProvider'
import { useScreenContext } from '../contexts/Screen/useScreenContext'
import { ScreenItem } from '../generated/openapi/models'
import { useListScreens } from '../hooks/api/useListScreens'
import { useElementSize } from '../hooks/useElementSize'
import { Dimensions } from '../models/Screen'
import { getMaxScreenSize } from '../utils/ScreenCalc'

const Stacked = styled.div<{ width: number; height: number }>`
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
  const [highlighted, setHighlighted] = useState<ScreenItem>()

  const maxScreenSize = screens.length > 0 ? getMaxScreenSize(screens) : { width: 47, height: 16 } // max possible screen size
  const maxPanelSize: Dimensions = { width, height: Math.round(maxScreenSize.height * (width / maxScreenSize.width)) }

  const { isScreenListLoading } = useListScreens()

  const onHighlightActive = (screen: ScreenItem) => {
    setHighlighted(screen)
  }

  const onHighlightPassive = () => {
    setHighlighted(undefined)
  }

  const onHighlightClick = (screen: ScreenItem) => {
    if (screen.id === highlighted?.id) {
      setHighlighted(undefined)
    } else {
      setHighlighted(screen)
    }
  }

  const isHighlighted = (screen: ScreenItem) => screen.id === highlighted?.id

  return (
    <InputReferenceProvider>
      <div className='my-6 h-full' ref={divSizeRef}>
        <ScreenFormDrawer>
          <div className='flex w-full items-end justify-between pb-4'>
            <label className='label'>
              <span className='text-xl'>Comparison Table</span>
            </label>
            <ScreenButton />
          </div>
          <ScreenTable
            screens={screens}
            isScreenListLoading={isScreenListLoading}
            isHighlighted={isHighlighted}
            onHighlightActive={onHighlightActive}
            onHighlightPassive={onHighlightPassive}
            onHighlightClick={onHighlightClick}
          />

          <label className='label py-4'>
            <span className='text-xl'>Visual Comparison</span>
          </label>
          <Stacked width={maxPanelSize.width} height={maxPanelSize.height}>
            {!isScreenListLoading ? (
              screens.map((screen, index) => (
                <ScreenPanel
                  key={screen.id}
                  screen={screen}
                  index={screens.length - index}
                  selected={screen.favorite || isHighlighted(screen)}
                  onMouseEnter={() => onHighlightActive(screen)}
                  onMouseOut={() => onHighlightPassive()}
                  onClick={() => onHighlightClick(screen)}
                />
              ))
            ) : (
              <SkeletonImage className='h-full w-full' />
            )}
          </Stacked>
        </ScreenFormDrawer>
      </div>
    </InputReferenceProvider>
  )
}
