<script setup lang="ts">
import { useNewProcessModal } from '@/domain/processes'

const handleOPenNewProcessModal = () => {
  useNewProcessModal()
}
</script>

<template>
  <div
    class="mt-4 flex min-h-86 flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-primary-200 bg-primary-50/30 p-4"
  >
    <div
      class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 p-2"
    >
      <UIcon
        name="i-hugeicons-folder-off"
        class="h-8 w-8 text-primary-700"
      />
    </div>

    <div class="space-y-2 text-center">
      <h1 class="text-xl font-semibold text-primary-700">
        Nenhum Processo a Decorrer
      </h1>
      <p class="text-neutral-500">
        Não existem solicitações ou processos de licença no momento!
      </p>
    </div>

    <div>
      <UButton
        size="default"
        icon="i-hugeicons-folder-add"
        class="w-full px-8"
        @click="handleOPenNewProcessModal"
      >
        Iniciar Novo Processo
      </UButton>
    </div>
  </div>
</template>
