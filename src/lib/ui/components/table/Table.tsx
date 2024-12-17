import * as React from 'react'

import { cn } from '@/lib/utils/class-name'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className='relative w-full overflow-auto'>
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  ),
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b [&_tr]:border-mono-border', className)} {...props} />
  ),
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    // <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
    <tbody ref={ref} className={cn(className)} {...props} />
  ),
)
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t bg-muted/25 font-medium [&>tr]:last:border-b-0 border-mono-border', className)}
      {...props}
    />
  ),
)
TableFooter.displayName = 'TableFooter'

const TableBodyRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('border-b transition-colors hover:bg-muted data-[state=selected]:bg-muted border-muted', className)}
      {...props}
    />
  ),
)
TableBodyRow.displayName = 'TableBodyRow'

const TableHeaderRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn('border-b data-[state=selected]:bg-muted border-muted', className)} {...props} />
  ),
)
TableHeaderRow.displayName = 'TableHeaderRow'

const TableFooterRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn('border-b data-[state=selected]:bg-muted border-muted', className)} {...props} />
  ),
)
TableFooterRow.displayName = 'TableFooterRow'

const TableHeaderCell = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-10 px-2 text-left align-middle font-medium text-foreground-muted [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  ),
)
TableHeaderCell.displayName = 'TableHeaderCell'

const TableBodyCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)}
      {...props}
    />
  ),
)
TableBodyCell.displayName = 'TableBodyCell'

const TableFooterCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => <td ref={ref} className={cn('p-2 align-middle', className)} {...props} />,
)
TableFooterCell.displayName = 'TableFooterCell'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-foreground-muted', className)} {...props} />
  ),
)
TableCaption.displayName = 'TableCaption'

export {
  Table,
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableCaption,
  TableFooter,
  TableFooterCell,
  TableFooterRow,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
}
