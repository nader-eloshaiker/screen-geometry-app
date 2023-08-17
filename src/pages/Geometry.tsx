import { styled } from 'styled-components'
import useResizeObserver from 'use-resize-observer'
import { ScreenPanel } from '../components/screen/ScreenPanel'
import { useAppContext } from '../contexts/App/useAppContext'
import { IDimension } from '../models/Screen'
import { getMaxScreenSize } from '../utils/ScreenCalc'

const Stacked = styled.div<{ $width: number; $height: number }>`
  display: inline-grid;
  place-items: start;
  align-items: flex-end;
  width: 100%;
  height: ${(props) => props.$height}px;
  * {
    grid-column-start: 1;
    grid-row-start: 1;
  }
`

export default function Geometry() {
  const { ref: divRef, width = 1 } = useResizeObserver<HTMLDivElement>()
  const [{ screens }] = useAppContext()
  const maxScreenSize = getMaxScreenSize(screens)
  const maxPanelSize: IDimension = { width, height: Math.round(maxScreenSize.height * (width / maxScreenSize.width)) }

  return (
    <div className='w-full h-full px-6 lg:px-0' ref={divRef}>
      <Stacked id='geometry' $width={maxPanelSize.width} $height={maxPanelSize.height}>
        {screens.map((screen, index) => (
          <ScreenPanel key={screen.id} screen={screen} index={screens.length - index} maxIndex={screens.length + 1} />
        ))}
      </Stacked>
    </div>
  )
}
