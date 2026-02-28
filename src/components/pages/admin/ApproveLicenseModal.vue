<template>
  <UModal
    title="Aprovar Licença Ambiental"
    :close-icon="loading ? undefined : 'i-hugeicons-cancel-01'"
    :prevent-close="loading"
    class="max-w-xl"
  >
    <template #body>
      <div class="space-y-6 p-1">
        <ProcessInfoCard
          v-if="props.process"
          :license="props.process"
          class="opacity-80"
          :class="{ 'pointer-events-none grayscale-[0.5]': loading }"
        />

        <div
          v-if="loading"
          class="space-y-4 py-4"
        >
          <div class="flex flex-col items-center justify-center text-center">
            <UIcon
              name="i-hugeicons-loading-03"
              class="text-primary h-10 w-10 animate-spin"
            />
            <h4 class="mt-4 font-semibold text-neutral-900">
              Aprovando Licença...
            </h4>
            <p class="text-sm text-neutral-500">
              Gerando documento oficial e registrando QR Code de fiscalização.
            </p>
          </div>

          <UProgress
            animation="carousel"
            color="primary"
            size="sm"
          />
        </div>

        <UAlert
          v-else
          icon="i-hugeicons-alert-02"
          color="primary"
          variant="soft"
          title="Caro Técnico Operacional"
        >
          <template #description>
            <p class="text-xs">
              Ao confirmar aprovação, o sistema irá gerar automaticamente o
              documento PDF com validade de 3 anos para a
              <strong>{{ props.process?.entity.name || 'empresa' }}</strong
              >.
            </p>
          </template>
        </UAlert>

        <div
          v-if="!loading"
          class="mt-4 flex w-full"
        >
          <UButton
            color="primary"
            size="default"
            icon="i-hugeicons-tick-02"
            class="w-full"
            @click="handleApprove"
          >
            Confirmar Aprovação
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { License } from '~/types/schemas'
import { adminService } from '~/services'
import ProcessInfoCard from '../entity/ProcessInfoCard.vue'

interface Props {
  process?: License | null
}
const props = defineProps<Props>()
const emit = defineEmits(['close', 'success'])

const loading = ref(false)

const handleApprove = async () => {
  if (!props.process?.id) {
    useErrorToast({ title: 'ID do processo não encontrado!' })
    return
  }

  loading.value = true

  try {
    const r = await adminService.approveLicense(props.process.id)

    useSuccessToast({
      title: 'Licença Aprovada com Sucesso!',
      description: 'O documento foi gerado e enviado para a empresa.',
    })

    emit('close', r.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    useErrorToast({
      title: error?.data?.message || 'Falha ao aprovar licença.',
    })
  } finally {
    loading.value = false
  }
}
</script>
