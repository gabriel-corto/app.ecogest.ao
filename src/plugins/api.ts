export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: '/api-backend',
    credentials: 'include',

    onRequest({ options }) {
      const authStore = useAuthStore()
      if (authStore.accessToken) {
        options.headers = new Headers(options.headers)
        options.headers.set('Authorization', `Bearer ${authStore.accessToken}`)
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
