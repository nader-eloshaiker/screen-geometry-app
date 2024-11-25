import { cva } from 'class-variance-authority'

// eslint-disable-next-line tailwindcss/no-custom-classname
const ToastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',

  {
    variants: {
      intent: {
        default: 'border bg-background text-foreground',
        destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground',
        warning: 'warning text-warning-foreground group border-warning bg-warning',
        success: 'success text-success-foreground group border-success bg-success',
        info: 'info text-info-foreground group border-info bg-info',
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  },
)

const ToastActionVariants = cva(
  'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive:
          'border-muted/40 hover:border-muted/30 hover:bg-destructive-hover hover:text-destructive-foreground-hover focus:ring-destructive-focus',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

// eslint-disable-next-line tailwindcss/no-custom-classname
const ToastCloseVariants = cva(
  'absolute right-1 top-1 rounded-md p-1 opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100',
  {
    variants: {
      variant: {
        default: 'text-foreground/50 hover:text-foreground',
        // destructive: 'text-red-300 hover:text-red-50 focus:ring-red-400 focus:ring-offset-red-600',
        destructive:
          'focus:bg-descructive-focus text-destructive-foreground hover:bg-destructive-hover hover:text-destructive-foreground-hover',
        warning: 'text-warning-foreground hover:text-warning-foreground/60',
        success: 'text-success-foreground hover:text-success-foreground/60',
        info: 'text-info-foreground hover:text-info-foreground/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export { ToastActionVariants, ToastCloseVariants, ToastVariants }
