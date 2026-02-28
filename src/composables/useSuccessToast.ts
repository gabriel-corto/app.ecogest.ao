import type { ToastProps } from '@nuxt/ui'

export const useSuccessToast = ({ title, description }: ToastProps) => {
  const toast = useToast()

  return toast.add({
    title,
    icon: 'i-hugeicons-checkmark-circle-04',
    color: 'success',
    description,
  })
}
