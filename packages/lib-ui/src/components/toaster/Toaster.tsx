import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from './Toast'
import { useToast } from './useToast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ action, description, id, palette, title, ...props }) {
        return (
          <Toast key={id} palette={palette} {...props}>
            <div className='grid gap-1'>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose palette={palette} />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
