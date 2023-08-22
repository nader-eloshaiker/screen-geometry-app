import { useState } from 'react'
import { styled } from 'styled-components'
import useResizeObserver from 'use-resize-observer'
import CloseIcon from '../assets/icons/Close'
import EditIcon from '../assets/icons/Edit'
import StarOutlineIcon from '../assets/icons/StarOutline'
import StarSolidIcon from '../assets/icons/StarSolid'
import { ScreenPanel } from '../components/screen/ScreenPanel'
import { useAppContext } from '../contexts/App/useAppContext'
import { useDeleteScreenAction } from '../hooks/api/useDeleteScreenAction'
import { useFavoriteScreenAction } from '../hooks/api/useFavoriteScreenAction'
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
  const [highlighted, setHighlighted] = useState<IScreen>()
  const { executeFavorite } = useFavoriteScreenAction()
  const { executeDelete } = useDeleteScreenAction()
  const maxScreenSize = getMaxScreenSize(screens)
  const maxPanelSize: IDimension = { width, height: Math.round(maxScreenSize.height * (width / maxScreenSize.width)) }

  const onFavourite = (screen: IScreen) => {
    executeFavorite(screen.id)
  }

  const onHighlightActive = (screen: IScreen) => {
    setHighlighted(screen)
  }

  const onHighlightPassive = () => {
    setHighlighted(undefined)
  }

  const onHighlightClick = (screen: IScreen) => {
    if (screen.id === highlighted?.id) {
      setHighlighted(undefined)
    } else {
      setHighlighted(screen)
    }
  }

  const handleDelete = (id: string) => {
    executeDelete(id)
  }

  const isHighlighted = (screen: IScreen) => screen.id === highlighted?.id

  return (
    <div className='w-full h-full' ref={divRef}>
      <table className='table'>
        <thead>
          <tr>
            <th>Pin</th>
            <th>Size</th>
            <th>Aspect</th>
            <th>Width</th>
            <th>Height</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {screens.map((screen) => (
            <tr
              style={
                isHighlighted(screen) || screen.favorite
                  ? { backgroundColor: createCSSColor(screen.render?.color, 0.2) }
                  : {}
              }
              key={screen.id}
              onMouseEnter={() => onHighlightActive(screen)}
              onMouseOut={() => onHighlightPassive()}
              onClick={() => onHighlightClick(screen)}
            >
              <td>
                <button onClick={() => onFavourite(screen)}>
                  {screen.favorite ? (
                    <StarSolidIcon id='star-icon' className='w-4 h-4' fill={createCSSColor(screen.render?.color)} />
                  ) : (
                    <StarOutlineIcon id='star-icon' className='w-4 h-4' fill={createCSSColor(screen.render?.color)} />
                  )}
                </button>
              </td>
              <td>{screen.tag.diagonalSize}&quot;</td>
              <td>{screen.tag.aspectRatio}</td>
              <td>{Math.round(screen.data.hSize * 100) / 100}&quot;</td>
              <td>{Math.round(screen.data.vSize * 100) / 100}&quot;</td>
              <td>
                <div className='flex flex-row items-center gap-3'>
                  <button>
                    <EditIcon id='edit-icon' className='w-4 h-4' fill='currentColor' />
                  </button>
                  <button onClick={() => handleDelete(screen.id)}>
                    <CloseIcon id='delete-icon' className='w-4 h-4' fill='currentColor' />
                  </button>
                </div>
              </td>
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
            selected={screen.favorite || isHighlighted(screen)}
            onMouseEnter={() => onHighlightActive(screen)}
            onMouseOut={() => onHighlightPassive()}
            onClick={() => onHighlightClick(screen)}
          />
        ))}
      </Stacked>
    </div>
  )
}
