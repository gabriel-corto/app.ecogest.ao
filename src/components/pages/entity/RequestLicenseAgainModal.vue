<template>
  <UModal
    title="Reenviar Solicitação de Licença Ambiental"
    close-icon="i-hugeicons-cancel-01"
    description="Preencha os dados abaixo para reenviar a solicitação de licença ambiental"
    class="max-w-xl"
  >
    <template #body>
      <UForm
        :state="state"
        :schema="schema"
        class="space-y-6 p-1"
        @submit="onSubmit()"
      >
        <ProcessInfoCard
          v-if="props.process"
          :license="props.process"
        />

        <UFormField
          label="Documento (EIA)"
          required
        >
          <UFileUpload
            v-model="state.file"
            layout="list"
            label="Estudo de Impacto Ambiental (EIA)"
            description="Submeta o ficheiro PDF contendo o Estudo de Impacto Ambiental. Máx: 10MB."
            icon="i-hugeicons-document-attachment"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
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
            Reenviar Solicitação
          </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { License } from '~/types/schemas'
import { z } from 'zod'
import { licenseService } from '~/services'
import ProcessInfoCard from './ProcessInfoCard.vue'

interface Props {
  process?: License | null
}
const emit = defineEmits(['close'])

const props = defineProps<Props>()
const loading = ref(false)
const schema = z.object({
  file: z.instanceof(File, {
    message: 'Documento obrigatório!',
  }),
})

const state = reactive<
  Partial<{
    file: File
  }>
>({})

const onSubmit = async () => {
  loading.value = true

  if (!state.file) {
    useErrorToast({
      title: 'Documento não anexado!',
    })
    return
  }

  if (!props.process?.id) {
    useErrorToast({
      title: 'Processo não encontrado!',
    })
    return
  }

  const formData = new FormData()
  formData.append('file', state.file)

  try {
    const r = await licenseService.reRequest(props.process?.id, formData)

    useSuccessToast({
      title: r.message,
    })

    emit('close', r.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    useErrorToast({
      title: error?.data?.message || 'Erro ao reenviar solicitação!',
    })
  } finally {
    loading.value = false
  }
}
</script>
