import { useState } from 'react'
import { styled } from 'styled-components'
import useResizeObserver from 'use-resize-observer'
import CloseIcon from '../assets/icons/Close'
import EditIcon from '../assets/icons/Edit'
import StarOutlineIcon from '../assets/icons/StarOutline'
import StarSolidIcon from '../assets/icons/StarSolid'
import ApiError from '../components/apierror/ApiError'
import { ScreenPanel } from '../components/screen/ScreenPanel'
import { useAppContext } from '../contexts/App/useAppContext'
import { SkeletonImage } from '../contexts/skeleton/SkeletonImage'
import { SkeletonRect } from '../contexts/skeleton/SkeletonRect'
import { ScreenItem } from '../generated/openapi/models'
import { useDeleteScreen } from '../hooks/api/useDeleteScreen'
import { useFavoriteScreen } from '../hooks/api/useFavoriteScreen'
import { useListScreens } from '../hooks/api/useListScreens'
import { Dimensions } from '../models/Screen'
import { createCSSColor, getMaxScreenSize } from '../utils/ScreenCalc'

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

type TTableProps = { cols: number; rows: number }

const TableSkeleton = ({ cols, rows }: TTableProps) => {
  const tableCols = []
  for (let i = 0; i < cols; i++) {
    tableCols.push(
      <td key={i}>
        <SkeletonRect key={i} className='w-full h-6' />
      </td>,
    )
  }

  const tableRows = []
  for (let i = 0; i < rows; i++) {
    tableRows.push(<tr key={i}>{tableCols}</tr>)
  }

  return <tbody>{tableRows}</tbody>
}

export default function Geometry() {
  const { ref: divRef, width = 1 } = useResizeObserver<HTMLDivElement>()
  const [{ screens }] = useAppContext()
  const [highlighted, setHighlighted] = useState<ScreenItem>()
  const [selected, setSelected] = useState<ScreenItem>()
  const maxScreenSize = screens.length > 0 ? getMaxScreenSize(screens) : { width: 47, height: 16 } // max possible screen size
  const maxPanelSize: Dimensions = { width, height: Math.round(maxScreenSize.height * (width / maxScreenSize.width)) }

  const { isScreenListLoading, screenListError } = useListScreens()
  const { isFavoriteLoading, favouriteError, favoriteAction } = useFavoriteScreen()
  const { isDeleteLoading, deleteError, deleteAction } = useDeleteScreen()

  const onFavourite = (screen: ScreenItem) => {
    setSelected(screen)
    favoriteAction({ id: screen.id })
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

  const handleDelete = (screen: ScreenItem) => {
    setSelected(screen)
    deleteAction({ id: screen.id })
  }

  const isHighlighted = (screen: ScreenItem) => screen.id === highlighted?.id

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
            <th>Resolution</th>
            <th>Action</th>
          </tr>
        </thead>
        {!isScreenListLoading ? (
          <tbody>
            {screens.map((screen) => (
              <tr
                style={isHighlighted(screen) ? { backgroundColor: createCSSColor(screen.render?.color, 0.2) } : {}}
                key={screen.id}
                onMouseEnter={() => onHighlightActive(screen)}
                onMouseOut={() => onHighlightPassive()}
                onClick={() => onHighlightClick(screen)}
              >
                <td>
                  {isFavoriteLoading && screen.id === selected?.id ? (
                    <div
                      className='loading loading-spinner loading-xs'
                      style={{ color: createCSSColor(screen.render?.color) }}
                    />
                  ) : (
                    <button onClick={() => onFavourite(screen)}>
                      {screen.favorite ? (
                        <StarSolidIcon id='star-icon' className='w-4 h-4' fill={createCSSColor(screen.render?.color)} />
                      ) : (
                        <StarOutlineIcon
                          id='star-icon'
                          className='w-4 h-4'
                          fill={createCSSColor(screen.render?.color)}
                        />
                      )}
                    </button>
                  )}
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
                    {isDeleteLoading && screen.id === selected?.id ? (
                      <div className='loading loading-spinner loading-xs' />
                    ) : (
                      <button onClick={() => handleDelete(screen)}>
                        <CloseIcon id='delete-icon' className='w-4 h-4' fill='currentColor' />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <TableSkeleton cols={7} rows={5} />
        )}
      </table>

      <div className='py-6' />
      <Stacked id='geometry' width={maxPanelSize.width} height={maxPanelSize.height}>
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
          <SkeletonImage className='w-full h-full' />
        )}
      </Stacked>
      <div className='toast toast-center'>
        <ApiError errorResponse={screenListError} />
        <ApiError errorResponse={favouriteError} />
        <ApiError errorResponse={deleteError} />
      </div>
    </div>
  )
}
