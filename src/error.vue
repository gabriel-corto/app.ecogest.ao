<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

const authStore = useAuthStore()

const handleError = () => {
  if (authStore.user?.role === 'ADMIN') {
    clearError({ redirect: '/admin' })
  } else {
    clearError({ redirect: '/entity' })
  }
}
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center"
  >
    <div class="flex flex-col items-center space-y-6">
      <div
        class="bg-primary-50 flex items-center justify-center rounded-full p-6"
      >
        <UIcon
          name="i-hugeicons-alert-01"
          class="text-primary-700 h-16 w-16"
        />
      </div>

      <h1 class="text-primary-700 text-6xl font-bold sm:text-8xl">
        {{ error?.statusCode === 404 ? '404' : error?.statusCode }}
      </h1>

      <div class="flex flex-col items-center gap-2">
        <h3 class="text-primary-700 text-2xl font-bold">
          {{
            error?.statusCode === 404
              ? 'Página não encontrada'
              : 'Ocorreu um erro'
          }}
        </h3>

        <p class="text-primary-600/80 max-w-md text-lg">
          {{
            error?.statusCode === 404
              ? 'Desculpe, a página que você está procurando não existe ou foi movida.'
              : error?.message ||
                'Um erro inesperado aconteceu. Por favor, tente novamente mais tarde.'
          }}
        </p>
      </div>

      <div class="pt-4">
        <UButton
          size="lg"
          color="primary"
          variant="solid"
          icon="i-hugeicons-arrow-left-02"
          @click="handleError"
        >
          Voltar para o início
        </UButton>
      </div>
    </div>
  </div>
</template>
