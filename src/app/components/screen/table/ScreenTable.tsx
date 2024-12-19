import { DarkMode, TThemeMode } from '@/app/contexts/theme/Theme.types'
import { useTheme } from '@/app/contexts/theme/useTheme'
import { useDeleteScreenApi } from '@/app/hooks/api/helpers/useDeleteScreenApi'
import { useShowScreenApi } from '@/app/hooks/api/helpers/useShowScreenApi'
import { ScreenItemRender } from '@/app/models/screenItemRender'
import { ScreenColor } from '@/lib/openapi/generated'
import { Button } from '@/lib/ui/components/button/Button'
import { Checkbox } from '@/lib/ui/components/checkbox/Checkbox'
import { Skeleton } from '@/lib/ui/components/skeleton/Skeleton'
import {
  Table,
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
} from '@/lib/ui/components/table/Table'
import { cn } from '@/lib/utils/class-name'
import { LoaderCircle, Pencil, X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import ReactGA from 'react-ga4'
import styled from 'styled-components'

const StyledCheckbox = styled(Checkbox)<{ $fgColor: string; $bgColor: string }>`
  border-color: ${(props) => props.$fgColor};
  color: ${(props) => props.$fgColor};

  [data-state='checked'] {
    background-color: ${(props) => props.$bgColor};
  }

  &:hover,
  &:focus-visible {
    opacity: 0.7;
  }

  &:focus-visible {
    outline-color: ${(props) => props.$fgColor};
  }
`

const StyledTableRow = styled(TableBodyRow)<{ $fgColor: string; $bgColor: string }>`
  &:hover,
  &:focus {
    background-color: ${({ $bgColor }) => $bgColor};
    border-color: ${({ $fgColor }) => $fgColor};
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
    tableCols.push(
      <TableBodyCell
        key={`table-col-${i}`}
        className={cn({
          'hidden sm:table-cell': i === 3,
          'hidden md:table-cell': i === 4,
        })}
      >
        <Skeleton key={`table-skeleton-${i}`} className='h-6 w-full' />
      </TableBodyCell>,
    )
  }

  const tableRows = []
  for (let i = 0; i < rows; i++) {
    tableRows.push(
      <TableBodyRow data-testid='SkeletonTableRow' key={`table-row-${i}`}>
        {tableCols}
      </TableBodyRow>,
    )
  }

  return <TableBody>{tableRows}</TableBody>
}

type Props = {
  screens: ScreenItemRender[]
  isScreenListLoading?: boolean
  className?: string
  highlighted?: ScreenItemRender
  setHighLighted?: Dispatch<SetStateAction<ScreenItemRender | undefined>>
  onEdit?: (id: string) => void
}

export const ScreenTable = ({
  screens,
  isScreenListLoading = false,
  className,
  highlighted = undefined,
  setHighLighted = () => {},
  onEdit = () => {},
}: Props) => {
  const { isPending: isDeletePending, mutate: deleteAction, variables: deleteParams } = useDeleteScreenApi()
  const { isPending: isShowPending, mutate: showAction, variables: showParams } = useShowScreenApi()
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

  return (
    <Table data-testid='ScreenTable' className={className}>
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell className='text-center'>Show</TableHeaderCell>
          <TableHeaderCell className='text-center'>Size</TableHeaderCell>
          <TableHeaderCell className='text-center'>Ratio</TableHeaderCell>
          <TableHeaderCell className='hidden text-center sm:table-cell'>Dimensions</TableHeaderCell>
          <TableHeaderCell className='hidden text-center md:table-cell'>Resolution</TableHeaderCell>
          <TableHeaderCell className='text-center'>
            <span className='md:hidden'>PPI</span>
            <span className='hidden text-nowrap md:block'>Pixels/Inch</span>
          </TableHeaderCell>
          <TableHeaderCell className='text-center'>Action</TableHeaderCell>
        </TableHeaderRow>
      </TableHeader>
      {screens.length === 0 && isScreenListLoading ? (
        <TableSkeleton cols={7} rows={6} />
      ) : (
        <TableBody>
          {screens.map((screen) => (
            <StyledTableRow
              className='transition-colors duration-200 ease-out'
              $fgColor={fgColor(themeMode, screen.color)}
              $bgColor={bgColor(themeMode, screen.color)}
              key={screen.id}
              // onClick={() => setHighLighted(screen.id === highlighted?.id ? undefined : screen)}
              onMouseEnter={() => setHighLighted(screen.id === highlighted?.id ? undefined : screen)}
              onMouseLeave={() => setHighLighted(undefined)}
            >
              <TableBodyCell>
                <div className='flex items-center justify-center'>
                  {isShowPending && screen.id === showParams?.id ? (
                    <LoaderCircle
                      className='ml-[5px] size-6 animate-spin'
                      style={{ color: themeMode === DarkMode ? screen.color.lightColor : screen.color.darkColor }}
                    />
                  ) : (
                    <StyledCheckbox
                      id={screen.id}
                      palette='none'
                      dimension='sm'
                      $fgColor={fgColor(themeMode, screen.color)}
                      $bgColor={bgColor(themeMode, screen.color)}
                      checked={screen.visible}
                      onCheckedChange={() => onShow(screen)}
                    />
                  )}
                </div>
              </TableBodyCell>
              <TableBodyCell className='text-center'>{screen.data.diagonalSize}&quot;</TableBodyCell>
              <TableBodyCell className='text-center'>{screen.data.aspectRatio}</TableBodyCell>
              <TableBodyCell className='hidden text-center sm:table-cell'>
                {Math.round((screen.specs.hSize * 100) / 100)}&quot; x {Math.round((screen.specs.vSize * 100) / 100)}
                &quot;
              </TableBodyCell>
              <TableBodyCell className='hidden text-center md:table-cell'>{`${screen.data.hRes} x ${screen.data.vRes}`}</TableBodyCell>
              <TableBodyCell className='text-center'>{`${Math.round((screen.specs.ppi * 100) / 100)}`}</TableBodyCell>
              <TableBodyCell>
                <div className='flex flex-row items-center justify-center gap-3'>
                  <Button mode='ghost' dimension='sm' onClick={() => onEdit(screen.id)}>
                    <Pencil id='edit-icon' />
                  </Button>
                  {isDeletePending && screen.id === deleteParams?.id ? (
                    <div className='loading loading-spinner loading-xs' />
                  ) : (
                    <button title='Delete' onClick={() => handleDelete(screen)}>
                      <X id='delete-icon' className='size-4' />
                    </button>
                  )}
                </div>
              </TableBodyCell>
            </StyledTableRow>
          ))}
        </TableBody>
      )}
    </Table>
  )
}
