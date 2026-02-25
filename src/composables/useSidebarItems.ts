import { navigationItems } from '~/data/navigation'
import type { Role } from '~/types/enums'

export const useSidebarItems = () => {
  const authStore = useAuthStore()
  const userRole = authStore.user?.role as Role

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (navigationItems.value as any).filter(
    (item: { context: string | string[] }) => item?.context.includes(userRole),
  )
}
