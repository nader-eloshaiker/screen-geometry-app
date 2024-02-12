import CloseIcon from '@assets/icons/Close'
import EditIcon from '@assets/icons/Edit'
import { SkeletonRect } from '@components/skeleton/SkeletonRect'
import { DarkMode, TThemeMode } from '@components/theme/ThemeConstants'
import { FormDrawerActionTypes } from '@contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '@contexts/FormDrawer/useFormDrawerContext'
import { useDeleteScreenApi } from '@hooks/api/helpers/useDeleteScreenApi'
import { useShowScreenApi } from '@hooks/api/helpers/useShowScreenApi'
import { useThemeMode } from '@hooks/useThemeMode'
import { ScreenColor, ScreenItem } from '@openapi/generated/models'
import { getRandomString } from '@utils/RandomGenerator'
import { Dispatch, SetStateAction } from 'react'
import ReactGA from 'react-ga4'
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

    tableRows.push(
      <tr data-testid='SkeletonTableRow' key={key}>
        {tableCols}
      </tr>,
    )
  }

  return <tbody>{tableRows}</tbody>
}

type Props = {
  screens: ScreenItem[]
  isScreenListLoading?: boolean
  className?: string
  highlighted?: ScreenItem
  setHighLighted?: Dispatch<SetStateAction<ScreenItem | undefined>>
}

export const ScreenTable = ({
  screens,
  isScreenListLoading = false,
  className,
  highlighted = undefined,
  setHighLighted = () => {},
}: Props) => {
  const { isPending: isDeletePending, mutate: deleteAction, variables: deleteParams } = useDeleteScreenApi()
  const { isPending: isShowPending, mutate: showAction, variables: showParams } = useShowScreenApi()
  const { dispatchFormDrawer } = useFormDrawerContext()
  const [themeMode] = useThemeMode()

  const onShow = (screen: ScreenItem) => {
    ReactGA.event({
      category: 'Checkbox Click',
      action: 'Clicked show',
      label: 'Screens Page',
    })
    showAction({ id: screen.id })
  }

  const handleDelete = (screen: ScreenItem) => {
    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked delete',
      label: 'Screens Page',
    })
    deleteAction({ id: screen.id })
  }

  const handleEdit = (screen: ScreenItem) => {
    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked edit',
      label: 'Screens Page',
    })
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
              $highlighted={screen.id === highlighted?.id}
              $color={bgColor(themeMode, screen.color)}
              key={screen.id}
              onClick={() => setHighLighted(screen.id === highlighted?.id ? undefined : screen)}
              onMouseOver={() => setHighLighted(screen.id === highlighted?.id ? undefined : screen)}
              onMouseOut={() => setHighLighted(undefined)}
            >
              <td>
                <div className='flex items-center justify-center'>
                  {isShowPending && screen.id === showParams?.id ? (
                    <div
                      className='loading loading-spinner loading-xs'
                      style={{ color: themeMode === DarkMode ? screen.color.lightColor : screen.color.darkColor }}
                    />
                  ) : (
                    <StyledCheckbox
                      type='checkbox'
                      aria-label='show checkbox'
                      id={screen.id}
                      $color={fgColor(themeMode, screen.color)}
                      checked={screen.visible}
                      className='checkbox checkbox-sm'
                      onChange={() => onShow(screen)}
                    />
                  )}
                </div>
              </td>
              <td role='cell' className='text-center'>
                {screen.tag.diagonalSize}&quot;
              </td>
              <td role='cell' className='text-center'>
                {screen.tag.aspectRatio}
              </td>
              <td role='cell' className='hidden text-center sm:table-cell'>
                {Math.round((screen.data.hSize * 100) / 100)}&quot; x {Math.round((screen.data.vSize * 100) / 100)}
                &quot;
              </td>
              <td className='hidden text-center md:table-cell'>
                {screen.spec && `${screen.spec.hRes} x ${screen.spec.vRes}`}
              </td>
              <td role='cell' className='text-center'>
                {screen.spec && `${Math.round((screen.spec.ppi * 100) / 100)}`}
              </td>
              <td role='cell'>
                <div className='flex flex-row items-center justify-center gap-3'>
                  <button aria-label='edit button' onClick={() => handleEdit(screen)}>
                    <EditIcon id='edit-icon' className='size-4' fill='currentColor' />
                  </button>
                  {isDeletePending && screen.id === deleteParams?.id ? (
                    <div className='loading loading-spinner loading-xs' />
                  ) : (
                    <button aria-label='delete button' onClick={() => handleDelete(screen)}>
                      <CloseIcon id='delete-icon' className='size-4' fill='currentColor' />
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
