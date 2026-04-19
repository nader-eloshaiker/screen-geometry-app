import { type ScreenItemRender } from '@/app/models/screenItemRender'
import { DarkMode, type TThemeMode } from '@/app/stores/theme/Theme.types'
import { useTheme } from '@/app/stores/theme/useTheme'
import { TranslateMessage } from '@/app/stores/translation'
import { type ScreenColor } from '@screengeometry/lib-api/spec'
import { Button } from '@screengeometry/lib-ui/button'
import { Checkbox } from '@screengeometry/lib-ui/checkbox'
import { Skeleton } from '@screengeometry/lib-ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@screengeometry/lib-ui/table'
import { cn } from '@screengeometry/lib-ui/utils'
import { Loader2, LoaderCircle, Pencil, X } from 'lucide-react'
import { type Dispatch, type SetStateAction } from 'react'
import { FormattedNumber } from 'react-intl'
import styled from 'styled-components'
import { match, P } from 'ts-pattern'

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

const StyledTableRow = styled(TableRow)<{ $fgColor: string; $bgColor: string; $selected: boolean }>`
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
      <TableCell
        key={`table-col-${i}`}
        className={cn({
          'hidden sm:table-cell': i === 3,
          'hidden md:table-cell': i === 4,
        })}
      >
        <Skeleton key={`table-skeleton-${i}`} className='h-6 w-full' />
      </TableCell>
    )
  }

  const tableRows = []
  for (let i = 0; i < rows; i++) {
    tableRows.push(
      <TableRow data-testid='SkeletonTableRow' key={`table-row-${i}`}>
        {tableCols}
      </TableRow>
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
  editAction?: {
    handler: (id: string) => void
  }
  deleteAction?: {
    id?: string
    isPending: boolean
    handler: (id: string) => void
  }
  showAction?: {
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
  showAction,
}: Props) => {
  const [themeMode] = useTheme()

  return (
    <Table data-testid='ScreenTable' className={className}>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>
            <TranslateMessage id='screens.table.select' />
          </TableHead>
          <TableHead className='text-center'>
            <TranslateMessage id='screens.table.size' />
          </TableHead>
          <TableHead className='text-center'>
            <TranslateMessage id='screens.table.ratio' />
          </TableHead>
          <TableHead className='hidden text-center sm:table-cell'>
            <TranslateMessage id='screens.table.dimension' />
          </TableHead>
          <TableHead className='hidden text-center md:table-cell'>
            <TranslateMessage id='screens.table.resolution' />
          </TableHead>
          <TableHead className='text-center'>
            <span className='md:hidden'>PPI</span>
            <span className='hidden text-nowrap md:block'>
              <TranslateMessage id='screens.table.pixelsInch' />
            </span>
          </TableHead>
          <TableHead className='text-center'>
            <TranslateMessage id='screens.table.action' />
          </TableHead>
        </TableRow>
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
              {showAction && (
                <TableCell>
                  <div className='flex items-center justify-center'>
                    {showAction.isPending && screen.id === showAction.id ? (
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
                        onCheckedChange={() => showAction.handler(screen.id)}
                        title='Show'
                      />
                    )}
                  </div>
                </TableCell>
              )}
              <TableCell className='text-center'>
                <FormattedNumber value={screen.data.diagonalSize} style='unit' unit='inch' unitDisplay='narrow' />
              </TableCell>
              <TableCell className='text-center'>
                <FormattedNumber value={screen.specs.hAspectRatio} />:
                <FormattedNumber value={screen.specs.vAspectRatio} />
              </TableCell>
              <TableCell className='hidden text-center sm:table-cell'>
                <FormattedNumber
                  value={Math.round((screen.specs.hSize * 100) / 100)}
                  style='unit'
                  unit='inch'
                  unitDisplay='narrow'
                />{' '}
                x{' '}
                <FormattedNumber
                  value={Math.round((screen.specs.vSize * 100) / 100)}
                  style='unit'
                  unit='inch'
                  unitDisplay='narrow'
                />
              </TableCell>
              <TableCell className='hidden text-center md:table-cell'>
                <FormattedNumber value={screen.data.hRes} /> x <FormattedNumber value={screen.data.vRes} />
              </TableCell>
              <TableCell className='text-center'>
                <FormattedNumber value={Math.round((screen.specs.ppi * 100) / 100)} />
              </TableCell>
              <TableCell>
                <div className='flex flex-row items-center justify-center gap-0'>
                  {match(editAction)
                    .with(P.nonNullable, (action) => (
                      <Button
                        title='Edit'
                        mode='ghost'
                        dimension='icon-sm'
                        palette='mono'
                        onClick={() => action.handler(screen.id)}
                      >
                        <Pencil id='edit-icon' />
                      </Button>
                    ))
                    .otherwise(() => null)}
                  {match(deleteAction)
                    .with({ isPending: true, id: screen.id }, () => <Loader2 className='size-4 animate-spin' />)
                    .with(P.nonNullable, (action) => (
                      <Button
                        title='Delete'
                        mode='ghost'
                        dimension='icon-sm'
                        palette='mono'
                        onClick={() => action.handler(screen.id)}
                      >
                        <X id='delete-icon' />
                      </Button>
                    ))
                    .otherwise(() => null)}
                </div>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      )}
    </Table>
  )
}
