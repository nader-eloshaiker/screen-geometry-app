import { FormDrawerEventTypes } from '@/app/contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '@/app/contexts/FormDrawer/useFormDrawerContext'
import { DarkMode, TThemeMode } from '@/app/contexts/theme/Theme.types'
import { useTheme } from '@/app/contexts/theme/useTheme'
import { useDeleteScreenApi } from '@/app/hooks/api/helpers/useDeleteScreenApi'
import { useShowScreenApi } from '@/app/hooks/api/helpers/useShowScreenApi'
import { ScreenItemRender } from '@/app/models/screenItemRender'
import { ScreenColor } from '@/lib/openapi/generated'
import { SkeletonRect } from '@/lib/ui/skeleton/SkeletonRect'
import { Pencil, X } from 'lucide-react'
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

const StyledTableRow = styled.tr<{ $color: string; $isHighlighted: boolean }>`
  background-color: ${(props) => (props.$isHighlighted ? props.$color : 'transparent')};
  ${(props) => props.$isHighlighted && `border-color: ${props.$color};`}
`

const bgColor = (themeMode: TThemeMode, color: ScreenColor) =>
  `${themeMode === DarkMode ? color.lightColor : color.darkColor}${Math.round(0.2 * 255).toString(16)}`
const fgColor = (themeMode: TThemeMode, color: ScreenColor) =>
  themeMode === DarkMode ? color.lightColor : color.darkColor

type TTableProps = { cols: number; rows: number }

const TableSkeleton = ({ cols, rows }: TTableProps) => {
  const tableCols = []
  for (let i = 0; i < cols; i++) {
    tableCols.push(
      <td key={`table-col-${i}`}>
        <SkeletonRect key={`table-skeleton-${i}`} className='h-6 w-full' />
      </td>,
    )
  }

  const tableRows = []
  for (let i = 0; i < rows; i++) {
    tableRows.push(
      <tr data-testid='SkeletonTableRow' key={`table-row-${i}`}>
        {tableCols}
      </tr>,
    )
  }

  return <tbody>{tableRows}</tbody>
}

type Props = {
  screens: ScreenItemRender[]
  isScreenListLoading?: boolean
  className?: string
  highlighted?: ScreenItemRender
  setHighLighted?: Dispatch<SetStateAction<ScreenItemRender | undefined>>
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
  const [themeMode] = useTheme()

  const onShow = (screen: ScreenItemRender) => {
    ReactGA.event({
      category: 'Checkbox Click',
      action: 'Clicked show',
      label: 'Screens Page',
    })
    showAction({ id: screen.id })
  }

  const handleDelete = (screen: ScreenItemRender) => {
    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked delete',
      label: 'Screens Page',
    })
    deleteAction({ id: screen.id })
  }

  const handleEdit = (screen: ScreenItemRender) => {
    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked edit',
      label: 'Screens Page',
    })
    dispatchFormDrawer({ type: FormDrawerEventTypes.Edit, payload: { id: screen.id } })
  }

  return (
    <table data-testid='ScreenTable' className={twMerge('table', className)}>
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
              className='cursor-pointer transition-[background-color] duration-200 ease-out'
              $isHighlighted={screen.id === highlighted?.id}
              $color={bgColor(themeMode, screen.color)}
              key={screen.id}
              // onClick={() => setHighLighted(screen.id === highlighted?.id ? undefined : screen)}
              onMouseEnter={() => setHighLighted(screen.id === highlighted?.id ? undefined : screen)}
              onMouseLeave={() => setHighLighted(undefined)}
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
              <td className='text-center'>{screen.data.diagonalSize}&quot;</td>
              <td className='text-center'>{screen.data.aspectRatio}</td>
              <td className='hidden text-center sm:table-cell'>
                {Math.round((screen.specs.hSize * 100) / 100)}&quot; x {Math.round((screen.specs.vSize * 100) / 100)}
                &quot;
              </td>
              <td className='hidden text-center md:table-cell'>{`${screen.data.hRes} x ${screen.data.vRes}`}</td>
              <td className='text-center'>{`${Math.round((screen.specs.ppi * 100) / 100)}`}</td>
              <td>
                <div className='flex flex-row items-center justify-center gap-3'>
                  <button title='Edit' onClick={() => handleEdit(screen)}>
                    <Pencil id='edit-icon' className='size-4' />
                  </button>
                  {isDeletePending && screen.id === deleteParams?.id ? (
                    <div className='loading loading-spinner loading-xs' />
                  ) : (
                    <button title='Delete' onClick={() => handleDelete(screen)}>
                      <X id='delete-icon' className='size-4' />
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
