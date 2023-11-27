import { useState } from 'react'
import styled from 'styled-components'
import CloseIcon from '../../assets/icons/Close'
import EditIcon from '../../assets/icons/Edit'
import { FormDrawerActionTypes } from '../../contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '../../contexts/FormDrawer/useFormDrawaerContext'
import { ScreenItem } from '../../generated/openapi/models'
import { useDeleteScreen } from '../../hooks/api/useDeleteScreen'
import { useShowScreen } from '../../hooks/api/useShowScreen'
import { useThemeMode } from '../../hooks/useThemeMode'
import { getRandomString } from '../../utils/RandomGenerator'
import { SkeletonRect } from '../skeleton/SkeletonRect'
import { DarkMode } from '../theme/ThemeConstants'

const StyledCheckbox = styled.input<{ $color: string }>`
  border-color: ${(props) => props.$color};
  color: ${(props) => props.$color};

  &:checked {
    /* border-color: ${(props) => props.$color};
    background-color: ${(props) => props.$color};
    color: ${(props) => props.$color}; */
    .checkbox[checked='true'],
    .checkbox[aria-checked='true'] {
      --tw-border-opacity: 1;
      border-color: ${(props) => props.$color};
      --tw-bg-opacity: 1;
      background-color: ${(props) => props.$color};
      --tw-text-opacity: 1;
      color: ${(props) => props.$color};
    }
  }
`

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
  setHighLighted: (screen: ScreenItem | undefined) => void
  onHighlightClick: (screen: ScreenItem) => void
}

export const ScreenTable = ({
  screens,
  isScreenListLoading,
  isHighlighted,
  setHighLighted,
  onHighlightClick,
}: Props) => {
  const { isDeleteLoading, deleteAction } = useDeleteScreen()
  const { isVisibleLoading, visibleAction } = useShowScreen()
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
    <table className='table'>
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
      {!isScreenListLoading ? (
        <tbody>
          {screens.map((screen) => (
            <tr
              style={
                isHighlighted(screen)
                  ? {
                      backgroundColor: `${
                        themeMode === DarkMode ? screen.color.lightColor : screen.color.darkColor
                      }${Math.round(0.2 * 255).toString(16)}`,
                    }
                  : {}
              }
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
                      $color={themeMode === DarkMode ? screen.color.lightColor : screen.color.darkColor}
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
            </tr>
          ))}
        </tbody>
      ) : (
        <TableSkeleton cols={7} rows={5} />
      )}
    </table>
  )
}
