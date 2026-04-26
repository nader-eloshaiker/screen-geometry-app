import { Button } from '@screengeometry/lib-ui/button'
import { cn } from '@screengeometry/lib-ui/utils'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

const WrappedContent = ({ children }: React.PropsWithChildren) => {
  return typeof children === 'string' ? <div>{children}</div> : children
}

export const FormButton = ({
  loadingContent,
  loading,
  showSpinner,
  className,
  children,
  ...props
}: {
  loadingContent?: React.ReactElement | string
  loading?: boolean
  showSpinner?: boolean
} & React.PropsWithChildren &
  React.ComponentProps<typeof Button>) => {
  const status = useFormStatus()

  return (
    <Button
      {...props}
      className={cn(className, 'flex items-center gap-2', {
        'pointer-events-none opacity-80': status.pending || loading,
      })}
    >
      <WrappedContent>{loadingContent && (loading || status.pending) ? loadingContent : children}</WrappedContent>
      {showSpinner && (status.pending || loading) && <Loader2 role='img' className='animate-spin' />}
    </Button>
  )
}
