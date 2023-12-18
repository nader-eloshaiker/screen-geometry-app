import CloseIcon from '@assets/icons/Close'
import EditIcon from '@assets/icons/Edit'
import { SkeletonRect } from '@components/skeleton/SkeletonRect'
import { DarkMode, TThemeMode } from '@components/theme/ThemeConstants'
import { FormDrawerActionTypes } from '@contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '@contexts/FormDrawer/useFormDrawerContext'
import { useDeleteScreen } from '@hooks/api/helpers/useDeleteScreen'
import { useShowScreen } from '@hooks/api/helpers/useShowScreen'
import { useThemeMode } from '@hooks/useThemeMode'
import { ScreenColor, ScreenItem } from '@openapi/generated/models'
import { getRandomString } from '@utils/RandomGenerator'
import { useState } from 'react'
import styled from 'styled-components'
import { twMerge } from 'tailwind-merge'

const StyledCheckbox = styled.input<{ $color: string }>`
  border-color: ${(props) => props.$color};

  &:checked {
    --chkbg: ${(props) => props.$color};
  }
`

const StyledTableRow = styled.tr<{ $color: string; $highlighted: boolean }>`
  background-color: ${(props) => (props.$highlighted ? props.$color : 'transparent')};
  &:hover {
    background-color: ${(props) => props.$color};
  }
`
const bgColor = (themeMode: TThemeMode, color: ScreenColor) =>
  `${themeMode === DarkMode ? color.lightColor : color.darkColor}${Math.round(0.2 * 255).toString(16)}`
const fgColor = (themeMode: TThemeMode, color: ScreenColor) =>
  themeMode === DarkMode ? color.lightColor : color.darkColor

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
  isScreenListLoading?: boolean
  className?: string
  isHighlighted?: (screen: ScreenItem) => boolean
  setHighLighted?: (screen: ScreenItem | undefined) => void
  onHighlightClick?: (screen: ScreenItem) => void
}

export const ScreenTable = ({
  screens,
  isScreenListLoading = false,
  className,
  isHighlighted = () => false,
  setHighLighted = () => {},
  onHighlightClick = () => {},
}: Props) => {
  const { isPending: isDeleteLoading, useMutation: deleteAction } = useDeleteScreen()
  const { isPending: isVisibleLoading, useMutation: visibleAction } = useShowScreen()
  const { dispatchFormDrawer } = useFormDrawerContext()
  const [selected, setSelected] = useState<ScreenItem>()
  const [themeMode] = useThemeMode()

  const onShow = (screen: ScreenItem) => {
    setSelected(screen)
    visibleAction({ id: screen.id })
  }

  const handleDelete = (screen: ScreenItem) => {
    setSelected(screen)
    deleteAction({ id: screen.id })
  }

  const handleEdit = (screen: ScreenItem) => {
    setSelected(screen)

    dispatchFormDrawer({ type: FormDrawerActionTypes.Edit, payload: { id: screen.id } })
  }

  return (
    <table className={twMerge('table', className)}>
      <thead>
        <tr>
          <th className='text-center'>Show</th>
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
      {screens.length === 0 && isScreenListLoading ? (
        <TableSkeleton cols={7} rows={5} />
      ) : (
        <tbody>
          {screens.map((screen) => (
            <StyledTableRow
              className='cursor-pointer'
              $highlighted={isHighlighted(screen)}
              $color={bgColor(themeMode, screen.color)}
              key={screen.id}
              onMouseEnter={() => setHighLighted(screen)}
              onMouseOut={() => setHighLighted(undefined)}
              onBlur={() => setHighLighted(undefined)}
              onClick={() => onHighlightClick(screen)}
            >
              <td>
                <div className='flex items-center justify-center'>
                  {isVisibleLoading && screen.id === selected?.id ? (
                    <div
                      className='loading loading-spinner loading-xs'
                      style={{ color: themeMode === DarkMode ? screen.color.lightColor : screen.color.darkColor }}
                    />
                  ) : (
                    <StyledCheckbox
                      type='checkbox'
                      id={screen.id}
                      $color={fgColor(themeMode, screen.color)}
                      checked={screen.visible}
                      className='checkbox checkbox-sm'
                      onChange={() => onShow(screen)}
                    />
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
                  <button onClick={() => handleEdit(screen)}>
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
            </StyledTableRow>
          ))}
        </tbody>
      )}
    </table>
  )
}
