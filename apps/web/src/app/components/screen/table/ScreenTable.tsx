import { type ScreenItemRender } from '@/app/models/screenItemRender'
import { DeleteHandler } from '@/app/pages/MyScreens/hooks/useDeleteHandler'
import { FormOpenHandler } from '@/app/pages/MyScreens/hooks/useFormOpenHandler'
import { ShowHandler } from '@/app/pages/MyScreens/hooks/useShowHandler'
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
import { match, P } from 'ts-pattern'

const StyledCheckbox = ({
  $fgColor,
  $bgColor,
  className,
  style,
  ...props
}: React.ComponentProps<typeof Checkbox> & { $fgColor: string; $bgColor: string }) => {
  return (
    <Checkbox
      className={cn(
        'hover:opacity-70 focus-visible:opacity-70 focus-visible:[outline-color:var(--checkbox-fg)] [&_[data-state=checked]]:bg-[var(--checkbox-bg)]',
        className
      )}
      style={
        {
          borderColor: $fgColor,
          color: $fgColor,
          '--checkbox-bg': $bgColor,
          '--checkbox-fg': $fgColor,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

const StyledTableRow = ({
  $fgColor,
  $bgColor,
  $selected,
  className,
  style,
  ...props
}: React.ComponentProps<typeof TableRow> & { $fgColor: string; $bgColor: string; $selected: boolean }) => {
  return (
    <TableRow
      className={cn(
        'hover:border-[var(--row-fg)] hover:bg-[var(--row-bg)] focus:border-[var(--row-fg)] focus:bg-[var(--row-bg)]',
        className
      )}
      style={
        {
          '--row-bg': $bgColor,
          '--row-fg': $fgColor,
          ...($selected && { backgroundColor: $bgColor, borderColor: $fgColor }),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

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
  formOpenHandler?: FormOpenHandler
  deleteHandler?: DeleteHandler
  showHandler?: ShowHandler
}

export const ScreenTable = ({
  screens,
  isScreenListLoading = false,
  className,
  highlighted = undefined,
  setHighLighted = () => {},
  formOpenHandler,
  deleteHandler,
  showHandler,
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
              {showHandler && (
                <TableCell>
                  <div className='flex items-center justify-center'>
                    {showHandler.isPending && screen.id === showHandler.variables?.id ? (
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
                        onCheckedChange={() => showHandler.onAction(screen.id)}
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
                  {match(formOpenHandler)
                    .with(P.nonNullable, (item) => (
                      <Button
                        title='Edit'
                        mode='ghost'
                        dimension='icon-sm'
                        palette='mono'
                        onClick={() => item.onAction(screen.id)}
                      >
                        <Pencil id='edit-icon' />
                      </Button>
                    ))
                    .otherwise(() => null)}
                  {match(deleteHandler)
                    .with({ isPending: true, id: screen.id }, () => <Loader2 className='size-4 animate-spin' />)
                    .with(P.nonNullable, (item) => (
                      <Button
                        title='Delete'
                        mode='ghost'
                        dimension='icon-sm'
                        palette='mono'
                        onClick={() => item.onAction(screen.id)}
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
