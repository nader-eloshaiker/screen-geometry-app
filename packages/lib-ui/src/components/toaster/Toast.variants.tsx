import { cva } from 'class-variance-authority'

const ToastVariants = cva(
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full data-[swipe=end]:translate-x-(--radix-toast-swipe-end-x) data-[swipe=end]:animate-out data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) sm:data-[state=open]:slide-in-from-bottom-full group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=move]:transition-none',
  {
    defaultVariants: {
      palette: 'info',
    },
    variants: {
      palette: {
        danger: 'danger border-danger bg-danger-700 text-danger-foreground group',
        info: 'bg-secondary text-secondary-foreground border',
        success: 'success border-success bg-success-700 text-success-foreground group',
        warning: 'warning border-warning bg-warning-700 text-warning-foreground group',
      },
    },
  }
)

const ToastActionVariants = cva(
  'outline-hidden inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      palette: 'info',
    },
    variants: {
      palette: {
        danger:
          'border-danger-border bg-danger text-danger-foreground focus-visible:outline-danger-ring hocus:bg-danger-hover hocus:text-danger-foreground-hover',
        info: 'border-primary-border bg-primary text-primary-foreground focus-visible:outline-primary-ring hocus:bg-primary-hover hocus:text-primary-foreground-hover',
        success:
          'border-success-border bg-success text-success-foreground focus-visible:outline-success-ring hocus:bg-success-hover hocus:text-success-foreground-hover',
        warning:
          'border-warning-border bg-warning text-warning-foreground focus-visible:outline-warning-ring hocus:bg-warning-hover hocus:text-warning-foreground-hover',
      },
    },
  }
)

const ToastCloseVariants = cva(
  'outline-hidden absolute right-1 top-1 rounded-full p-1 opacity-0 transition-opacity focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 group-hover:opacity-100',
  {
    defaultVariants: {
      palette: 'info',
    },
    variants: {
      palette: {
        danger: 'text-danger-foreground focus-visible:outline-danger-ring hocus:text-danger-foreground-active',
        info: 'text-secondary-foreground focus-visible:outline-primary-ring hocus:text-secondary-foreground-active',
        success: 'text-success-foreground focus-visible:outline-success-ring hocus:text-success-foreground-active',
        warning: 'text-warning-foreground focus-visible:outline-warning-ring hocus:text-warning-foreground-active',
      },
    },
  }
)

export { ToastActionVariants, ToastCloseVariants, ToastVariants }
