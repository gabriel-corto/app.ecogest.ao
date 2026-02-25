export default defineNuxtRouteMiddleware((to, _) => {
  const authStore = useAuthStore()

  const publicRoutes = ['/login', '/new-entity']
  const isPublicRoute = publicRoutes.includes(to.path)

  if (!authStore.accessToken && !isPublicRoute) {
    return navigateTo('/login')
  }

  if (authStore.accessToken && isPublicRoute) {
    if (authStore.user?.role === 'ADMIN') {
      return navigateTo('/admin')
    }
    return navigateTo('/entities')
  }
})
