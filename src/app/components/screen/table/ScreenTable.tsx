import { DarkMode, TThemeMode } from '@/app/contexts/theme/Theme.types'
import { useTheme } from '@/app/contexts/theme/useTheme'
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
import { cn } from '@/lib/utils'
import { Loader2, LoaderCircle, Pencil, X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
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

const StyledTableRow = styled(TableBodyRow)<{ $fgColor: string; $bgColor: string; $selected: boolean }>`
  ${({ $selected, $bgColor, $fgColor }) =>
    $selected &&
    `
    background-color: ${$bgColor};
    border-color: ${$fgColor};
  `}
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
  editAction: {
    handler: (id: string) => void
  }
  deleteAction: {
    id?: string
    isPending: boolean
    handler: (id: string) => void
  }
  showActon: {
    id?: string
    isPending: boolean
    handler: (id: string) => void
  }
}

export const ScreenTable = ({
  screens,
  isScreenListLoading = false,
  className,
  highlighted = undefined,
  setHighLighted = () => {},
  editAction,
  deleteAction,
  showActon,
}: Props) => {
  const [themeMode] = useTheme()

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
              $selected={screen.id === highlighted?.id}
              key={screen.id}
              // onClick={() => setHighLighted(screen.id === highlighted?.id ? undefined : screen)}
              onMouseEnter={() => setHighLighted(screen.id === highlighted?.id ? undefined : screen)}
              onMouseLeave={() => setHighLighted(undefined)}
            >
              <TableBodyCell>
                <div className='flex items-center justify-center'>
                  {showActon.isPending && screen.id === showActon.id ? (
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
                      onCheckedChange={() => showActon.handler(screen.id)}
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
                  <Button mode='ghost' dimension='sm' onClick={() => editAction.handler(screen.id)}>
                    <Pencil id='edit-icon' />
                  </Button>
                  {deleteAction.isPending && screen.id === deleteAction.id ? (
                    <Loader2 className='size-4 animate-spin' />
                  ) : (
                    <button title='Delete' onClick={() => deleteAction.handler(screen.id)}>
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
