import { defineStore } from 'pinia'

import { agtService } from '@/services'
import type { AgtEntity } from '@/types/schemas'

export const useAgtEntityStore = defineStore('entity', () => {
  const loadedAgtEntity = ref<AgtEntity | null>(null)
  const isLoadingAgtEntity = ref(false)

  async function fetchAgtEntityByNif(nif: string) {
    try {
      isLoadingAgtEntity.value = true
      //TODO: only to simulate a delay
      await new Promise(resolve => setTimeout(resolve, 3000))

      const response = await agtService.getEntityByNif(nif)
      loadedAgtEntity.value = response.data

      useSuccessToast({
        title: 'Dados Fiscais carregados com sucesso!',
      })

      isLoadingAgtEntity.value = false

      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      useErrorToast({
        title: error.data.message,
      })
    } finally {
      isLoadingAgtEntity.value = false
    }
  }

  return {
    loadedAgtEntity,
    isLoadingAgtEntity,
    fetchAgtEntityByNif,
  }
})
