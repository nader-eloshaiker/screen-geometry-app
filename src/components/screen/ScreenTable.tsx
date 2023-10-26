import { useState } from 'react'
import CloseIcon from '../../assets/icons/Close'
import EditIcon from '../../assets/icons/Edit'
import StarOutlineIcon from '../../assets/icons/StarOutline'
import StarSolidIcon from '../../assets/icons/StarSolid'
import { ScreenItem } from '../../generated/openapi/models'
import { useDeleteScreen } from '../../hooks/api/useDeleteScreen'
import { useFavoriteScreen } from '../../hooks/api/useFavoriteScreen'
import { getRandomString } from '../../utils/RandomGenerator'
import { createCSSColor } from '../../utils/ScreenCalc'
import { SkeletonRect } from '../skeleton/SkeletonRect'

type TTableProps = { cols: number; rows: number }

const TableSkeleton = ({ cols, rows }: TTableProps) => {
  const tableCols = []
  for (let i = 0; i < cols; i++) {
    const key = getRandomString(4)
    tableCols.push(
      <td key={key}>
        <SkeletonRect key={key} className='h-6 w-full' />
      </td>,
    )
  }

  const tableRows = []
  for (let i = 0; i < rows; i++) {
    const key = getRandomString(4)

    tableRows.push(<tr key={key}>{tableCols}</tr>)
  }

  return <tbody>{tableRows}</tbody>
}

type Props = {
  screens: ScreenItem[]
  isScreenListLoading: boolean
  isHighlighted: (screen: ScreenItem) => boolean
  onHighlightActive: (screen: ScreenItem) => void
  onHighlightPassive: () => void
  onHighlightClick: (screen: ScreenItem) => void
}

export const ScreenTable = ({
  screens,
  isScreenListLoading,
  isHighlighted,
  onHighlightActive,
  onHighlightPassive,
  onHighlightClick,
}: Props) => {
  const { isDeleteLoading, deleteAction } = useDeleteScreen()
  const { isFavoriteLoading, favoriteAction } = useFavoriteScreen()
  const [selected, setSelected] = useState<ScreenItem>()

  const onFavourite = (screen: ScreenItem) => {
    setSelected(screen)
    favoriteAction({ id: screen.id })
  }

  const handleDelete = (screen: ScreenItem) => {
    setSelected(screen)
    deleteAction({ id: screen.id })
  }

  return (
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
                        <StarSolidIcon id='star-icon' className='h-4 w-4' fill={createCSSColor(screen.render?.color)} />
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
                <div className='flex flex-row items-center justify-center gap-3'>
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
  )
}