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
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  * {
    grid-column-start: 1;
    grid-row-start: 1;
    z-index: 1;
  }
  *:nth-child(2) {
    z-index: 2;
  }
  *:nth-child(1) {
    z-index: 3;
  }
`

export default function Geometry() {
  const [app] = useAppContext()
  const screens = app.selections
  const maxScreenSize = getMaxScreenSize(screens)
  const { ref: divRef, width = 1 } = useResizeObserver<HTMLDivElement>()
  const maxPanelSize: IDimension = { width, height: (width * maxScreenSize.height) / maxScreenSize.width }

  return (
    <div className='w-full h-full' ref={divRef}>
      <Stacked id='geometry' $width={maxPanelSize.width} $height={maxPanelSize.height}>
        {screens.map((screen) => (
          <ScreenPanel key={screen.id} screen={screen} size={maxPanelSize} />
        ))}
      </Stacked>
    </div>
  )
}
