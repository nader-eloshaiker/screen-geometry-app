import { useRef, useState } from 'react'
import { styled } from 'styled-components'
import CloseIcon from '../assets/icons/Close'
import EditIcon from '../assets/icons/Edit'
import StarOutlineIcon from '../assets/icons/StarOutline'
import StarSolidIcon from '../assets/icons/StarSolid'
import { ScreenButton } from '../components/createscreen/CreateButton'
import { ScreenFormDrawer } from '../components/createscreen/drawer/ScreenFormDrawer'
import { ScreenPanel } from '../components/screen/ScreenPanel'
import { SkeletonImage } from '../components/skeleton/SkeletonImage'
import { SkeletonRect } from '../components/skeleton/SkeletonRect'
import { useScreenContext } from '../contexts/Screen/useScreenContext'
import { ScreenItem } from '../generated/openapi/models'
import { useDeleteScreen } from '../hooks/api/useDeleteScreen'
import { useFavoriteScreen } from '../hooks/api/useFavoriteScreen'
import { useListScreens } from '../hooks/api/useListScreens'
import { useElementSize } from '../hooks/useElementSize'
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
        <SkeletonRect key={i} className='h-6 w-full' />
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
  const divSizeRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLInputElement>(null)
  const { width } = useElementSize(divSizeRef)
  const [{ screens }] = useScreenContext()
  const [highlighted, setHighlighted] = useState<ScreenItem>()
  const [selected, setSelected] = useState<ScreenItem>()

  const maxScreenSize = screens.length > 0 ? getMaxScreenSize(screens) : { width: 47, height: 16 } // max possible screen size
  const maxPanelSize: Dimensions = { width, height: Math.round(maxScreenSize.height * (width / maxScreenSize.width)) }

  const { isScreenListLoading } = useListScreens()
  const { isFavoriteLoading, favoriteAction } = useFavoriteScreen()
  const { isDeleteLoading, deleteAction } = useDeleteScreen()

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
    <div className='my-6 h-full w-full' ref={divSizeRef}>
      <ScreenFormDrawer drawerRef={drawerRef}>
        <div className='flex w-full justify-end pb-4'>
          <ScreenButton drawerRef={drawerRef} />
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th className='text-center'>Pin</th>
              <th className='text-center'>Size</th>
              <th className='text-center'>Ratio</th>
              <th className='hidden text-center sm:table-cell'>Dimensions</th>
              <th className='hidden text-center md:table-cell'>Resolution</th>
              <th className='flex justify-center'>
                <span className='table-cell md:hidden'>PPI</span>
                <span className='hidden md:table-cell'>Pixels/Inch</span>
              </th>
              <th className='text-center'>Action</th>
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
                    <div className='flex items-center justify-center'>
                      {isFavoriteLoading && screen.id === selected?.id ? (
                        <div
                          className='loading loading-spinner loading-xs'
                          style={{ color: createCSSColor(screen.render?.color) }}
                        />
                      ) : (
                        <button onClick={() => onFavourite(screen)}>
                          {screen.favorite ? (
                            <StarSolidIcon
                              id='star-icon'
                              className='h-4 w-4'
                              fill={createCSSColor(screen.render?.color)}
                            />
                          ) : (
                            <StarOutlineIcon
                              id='star-icon'
                              className='h-4 w-4'
                              fill={createCSSColor(screen.render?.color)}
                            />
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className='text-center'>{screen.tag.diagonalSize}&quot;</td>
                  <td className='text-center'>{screen.tag.aspectRatio}</td>
                  <td className='hidden text-center sm:table-cell'>
                    {Math.round((screen.data.hSize * 100) / 100)}&quot; x {Math.round((screen.data.vSize * 100) / 100)}
                    &quot;
                  </td>
                  <td className='hidden text-center md:table-cell'>
                    {screen.spec && `${screen.spec.hRes} x ${screen.spec.vRes}`}
                  </td>
                  <td className='text-center'>{screen.spec && `${Math.round((screen.spec.ppi * 100) / 100)}`}</td>
                  <td>
                    <div className='flex flex-col items-center justify-center gap-3 2xs:flex-row'>
                      <button>
                        <EditIcon id='edit-icon' className='h-4 w-4' fill='currentColor' />
                      </button>
                      {isDeleteLoading && screen.id === selected?.id ? (
                        <div className='loading loading-spinner loading-xs' />
                      ) : (
                        <button onClick={() => handleDelete(screen)}>
                          <CloseIcon id='delete-icon' className='h-4 w-4' fill='currentColor' />
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

        <div className='py-4' />
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
            <SkeletonImage className='h-full w-full' />
          )}
        </Stacked>
      </ScreenFormDrawer>
    </div>
  )
}
