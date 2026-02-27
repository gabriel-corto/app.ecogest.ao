<template>
  <UModal
    title="Rejeitar Processo"
    close-icon="i-hugeicons-cancel-01"
    description="Preencha os dados abaixo para rejeitar o processo"
    class="max-w-xl"
  >
    <template #body>
      <UForm
        :state="state"
        :schema="schema"
        class="space-y-6 p-1"
        @submit="onSubmit"
      >
        <ProcessInfoCard
          v-if="props.process"
          :license="props.process"
        />

        <UFormField
          label="Motivo da Rejeição"
          required
          name="reason"
        >
          <UTextarea
            v-model="state.reason"
            label="Motivo da Rejeição"
            class="w-full"
            description="Preencha o motivo da rejeição"
            placeholder="Preencha o motivo da rejeição"
          />
        </UFormField>

        <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <UButton
            :loading="loading"
            loading-icon="i-hugeicons-loading-03"
            size="default"
            icon="i-hugeicons-arrow-up-right-01"
            type="submit"
            class="w-full cursor-pointer"
          >
            Rejeitar
          </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { License } from '~/types/schemas'
import { z } from 'zod'
import { adminService } from '~/services'
import ProcessInfoCard from '../entity/ProcessInfoCard.vue'
import type { FormSubmitEvent } from '@nuxt/ui'

interface Props {
  process?: License | null
}
const emit = defineEmits(['close'])

const props = defineProps<Props>()
const loading = ref(false)
const schema = z.object({
  reason: z.string().min(1, 'Motivo obrigatório!'),
})
type Schema = z.infer<typeof schema>

const state = reactive<Schema>({
  reason: '',
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true

  if (!state.reason) {
    useErrorToast({
      title: 'Motivo da rejeição obrigatório!',
    })
    return
  }

  if (!props.process?.id) {
    useErrorToast({
      title: 'Processo não encontrado!',
    })
    return
  }

  try {
    const r = await adminService.rejectLicense(props.process?.id, {
      reason: event.data.reason,
    })

    useSuccessToast({
      title: r.message,
    })

    emit('close', r.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    useErrorToast({
      title: error?.data?.message || 'Erro ao rejeitar processo!',
    })
  } finally {
    loading.value = false
  }
}
</script>
