import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import useResizeObserver from 'use-resize-observer'
import CloseIcon from '../assets/icons/Close'
import EditIcon from '../assets/icons/Edit'
import ImageIcon from '../assets/icons/Image'
import StarOutlineIcon from '../assets/icons/StarOutline'
import StarSolidIcon from '../assets/icons/StarSolid'
import ApiError from '../components/apierror/ApiError'
import { ScreenPanel } from '../components/screen/ScreenPanel'
import { ActionTypes } from '../contexts/App/AppManager'
import { useAppContext } from '../contexts/App/useAppContext'
import { ScreenItem } from '../generated/openapi/models'
import { useListScreensAction } from '../generated/openapi/services/screen-list-service'
import { useDeleteScreenAction } from '../hooks/api/useDeleteScreenAction'
import { useFavoriteScreenAction } from '../hooks/api/useFavoriteScreenAction'
import { IDimension } from '../models/Screen'
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

const TableSkeleton = (cols: number, rows: number) => {
  const tableCols = []
  for (let i = 0; i < cols; i++) {
    tableCols.push(
      <td>
        <div key={i} className='w-full h-6 bg-gray-300 border-2 rounded-md animate-pulse' />
      </td>,
    )
  }
  const tableRows = []
  for (let i = 0; i < rows; i++) {
    tableRows.push(<tr key={i}>{tableCols}</tr>)
  }

  return tableRows
}

export default function Geometry() {
  const { ref: divRef, width = 1 } = useResizeObserver<HTMLDivElement>()
  const [{ screens }, dispatch] = useAppContext()
  const [highlighted, setHighlighted] = useState<ScreenItem>()
  const { executeFavorite } = useFavoriteScreenAction()
  const { executeDelete } = useDeleteScreenAction()
  const maxScreenSize = screens.length > 0 ? getMaxScreenSize(screens) : { width: 47, height: 16 } // max possible screen size
  const maxPanelSize: IDimension = { width, height: Math.round(maxScreenSize.height * (width / maxScreenSize.width)) }

  const { isLoading: isScreenListLoading, error: screenListError, data: screenListResponse } = useListScreensAction()

  useEffect(() => {
    if (screenListResponse && screenListResponse.list.length > 0) {
      dispatch({ type: ActionTypes.LIST, payload: screenListResponse.list })
    }
  }, [screenListResponse])

  const onFavourite = (screen: ScreenItem) => {
    executeFavorite(screen.id)
  }

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

  const handleDelete = (id: string) => {
    executeDelete(id)
  }

  const isHighlighted = (screen: ScreenItem) => screen.id === highlighted?.id

  return (
    <div className='w-full h-full' ref={divRef}>
      <ApiError errorResponse={screenListError} />

      <table className='table'>
        <thead>
          <tr>
            <th>Pin</th>
            <th>Size</th>
            <th>Aspect</th>
            <th>Width</th>
            <th>Height</th>
            <th>Resolution</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!isScreenListLoading ? (
            screens.map((screen) => (
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
                <td>{screen.spec && `${screen.spec.hRes} x ${screen.spec.vRes}`}</td>
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
            ))
          ) : (
            <>{TableSkeleton(7, 5)}</>
          )}
        </tbody>
      </table>

      <div className='py-6' />
      <Stacked id='geometry' $width={maxPanelSize.width} $height={maxPanelSize.height}>
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
          <div className='flex items-center justify-center w-full h-full bg-gray-300 border-2 rounded-md animate-pulse'>
            <ImageIcon className='w-10 h-10' />
          </div>
        )}
      </Stacked>
    </div>
  )
}
