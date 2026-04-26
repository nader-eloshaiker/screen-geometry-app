import { cn } from '@screengeometry/lib-ui/utils'
import { type Alignment, HAlignDefault } from '../screen/alignment/AlignmentSelector'

const justifyItemsMap: Record<Alignment, string> = {
  start: 'justify-items-start',
  center: 'justify-items-center',
  end: 'justify-items-end',
}

const alignItemsMap: Record<Alignment, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
}

export const Stacked = ({
  height,
  $hAlign,
  $vAlign,
  className,
  children,
  ...props
}: {
  height: number
  $hAlign?: Alignment
  $vAlign?: Alignment
} & Omit<React.ComponentProps<'div'>, 'height'>) => {
  return (
    <div
      className={cn(
        'inline-grid w-full p-2 [&>*]:col-start-1 [&>*]:row-start-1',
        justifyItemsMap[$hAlign ?? HAlignDefault],
        alignItemsMap[$vAlign ?? 'end'],
        className
      )}
      style={{ height: `${height}px` }}
      {...props}
    >
      {children}
    </div>
  )
}
