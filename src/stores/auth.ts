import type { Entity } from '@/types/schemas'
import { defineStore } from 'pinia'

import { authService, profileService } from '@/services'
import type { CreateNewEntityBody, LoginBody } from '~/types/forms'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<Entity | null>(null)
    const accessToken = useCookie<string | null>('accessToken', {
      default: () => null,
      maxAge: 60 * 60 * 24 * 7,
    })

    const fetchUser = async () => {
      const data = await profileService.getProfile()
      user.value = data
    }

    const login = async (data: LoginBody) => {
      const response = await authService.login(data)
      accessToken.value = response.accessToken
      await fetchUser()

      if (user.value?.role === 'ADMIN') {
        navigateTo('/admin')
      } else {
        navigateTo('/entities')
      }
    }

    const createNewEntity = async (
      data: CreateNewEntityBody,
      //{ ...options }: LoginOptions,
    ) => {
      await authService.createNewEntity(data)
      await login({
        email: data.email,
        password: data.password,
      })

      // if (options) {
      //   return navigateTo(options.to)
      // }

      //return navigateTo('/')
    }

    const signOut = async () => {
      accessToken.value = null
      user.value = null

      return navigateTo('/login')
    }

    return {
      user,
      login,
      createNewEntity,
      signOut,
      accessToken,
    }
  },
  {
    persist: {
      pick: ['user'],
    },
  },
)
