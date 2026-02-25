import type { ToastProps } from '@nuxt/ui'

export const useErrorToast = ({ title }: ToastProps) => {
  const toast = useToast()

  return toast.add({
    title,
    icon: 'i-hugeicons-information-circle',
    color: 'error',
  })
}
