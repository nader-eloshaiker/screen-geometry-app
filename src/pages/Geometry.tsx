import { useState } from 'react'
import { styled } from 'styled-components'
import useResizeObserver from 'use-resize-observer'
import { ScreenPanel } from '../components/screen/ScreenPanel'
import { useAppContext } from '../contexts/App/useAppContext'
import { IDimension, IScreen } from '../models/Screen'
import { createCSSColor, getMaxScreenSize } from '../utils/ScreenCalc'

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
  const [selected, setSelected] = useState<IScreen>()
  const [highlighted, setHighlighted] = useState<IScreen>()

  const onSelect = (screen: IScreen) => {
    setSelected(screen.id === selected?.id ? undefined : screen)
  }

  const onHighlight = (screen: IScreen) => {
    setHighlighted(screen.id === highlighted?.id ? undefined : screen)
  }

  const isSelected = (screen: IScreen) => screen.id === selected?.id
  const isHighlighted = (screen: IScreen) => screen.id === highlighted?.id

  return (
    <div className='w-full h-full px-6 lg:px-0' ref={divRef}>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='pr-6'>Size</th>
            <th className='pr-6'>Aspect</th>
            <th className='pr-6'>Width</th>
            <th className='pr-6'>Height</th>
          </tr>
        </thead>
        <tbody>
          {screens.map((screen) => (
            <tr
              key={screen.id}
              onMouseEnter={() => onHighlight(screen)}
              onMouseOut={() => onHighlight(screen)}
              onClick={() => onSelect(screen)}
              style={{
                color: createCSSColor(screen.render?.color),
                backgroundColor:
                  isSelected(screen) || isHighlighted(screen)
                    ? createCSSColor(screen.render?.color, 0.3)
                    : 'transparent',
              }}
            >
              <td>{screen.tag.diagonalSize}&quot;</td>
              <td>{screen.tag.aspectRatio}</td>
              <td>{Math.round(screen.data.hSize * 100) / 100}&quot;</td>
              <td>{Math.round(screen.data.vSize * 100) / 100}&quot;</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='py-6' />
      <Stacked id='geometry' $width={maxPanelSize.width} $height={maxPanelSize.height}>
        {screens.map((screen, index) => (
          <ScreenPanel
            key={screen.id}
            screen={screen}
            index={screens.length - index}
            selected={isSelected(screen) || isHighlighted(screen)}
          />
        ))}
      </Stacked>
    </div>
  )
}
