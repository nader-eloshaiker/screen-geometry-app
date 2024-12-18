import { cva } from 'class-variance-authority'

// eslint-disable-next-line tailwindcss/no-custom-classname
const ToastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',

  {
    variants: {
      palette: {
        info: 'border bg-secondary text-secondary-foreground',
        danger: 'danger group border-danger bg-danger-700 text-danger-foreground',
        warning: 'warning group border-warning bg-warning-700 text-warning-foreground',
        success: 'success group border-success bg-success-700 text-success-foreground',
      },
    },
    defaultVariants: {
      palette: 'info',
    },
  },
)

const ToastActionVariants = cva(
  'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      palette: {
        info: 'border-primary-border bg-primary text-primary-foreground focus-visible:outline-primary-ring hocus:bg-primary-hover hocus:text-primary-foreground-hover',
        danger:
          'border-danger-border bg-danger text-danger-foreground focus-visible:outline-danger-ring hocus:bg-danger-hover hocus:text-danger-foreground-hover',
        success:
          'border-success-border bg-success text-success-foreground focus-visible:outline-success-ring hocus:bg-success-hover hocus:text-success-foreground-hover',
        warning:
          'border-warning-border bg-warning text-warning-foreground focus-visible:outline-warning-ring hocus:bg-warning-hover hocus:text-warning-foreground-hover',
      },
    },
    defaultVariants: {
      palette: 'info',
    },
  },
)

// eslint-disable-next-line tailwindcss/no-custom-classname
const ToastCloseVariants = cva(
  'absolute right-1 top-1 rounded-full p-1 opacity-0 outline-none transition-opacity focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 group-hover:opacity-100',
  {
    variants: {
      palette: {
        info: 'text-secondary-foreground focus-visible:outline-primary-ring hocus:text-secondary-foreground-active',
        danger: 'text-danger-foreground focus-visible:outline-danger-ring hocus:text-danger-foreground-active',
        warning: 'text-warning-foreground focus-visible:outline-warning-ring hocus:text-warning-foreground-active',
        success: 'text-success-foreground focus-visible:outline-success-ring hocus:text-success-foreground-active',
      },
    },
    defaultVariants: {
      palette: 'info',
    },
  },
)

export { ToastActionVariants, ToastCloseVariants, ToastVariants }
