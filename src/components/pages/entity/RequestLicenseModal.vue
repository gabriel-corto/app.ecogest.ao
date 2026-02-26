<template>
  <UModal
    title="Solicitação de Licença Ambiental
"
    close-icon="i-hugeicons-cancel-01"
    description="Preencha os dados abaixo para solicitar uma licença ambiental"
    class="max-w-xl"
  >
    <template #body>
      <UForm
        :state="state"
        :schema="schema"
        class="space-y-6 p-1"
        @submit="onSubmit()"
      >
        <ProjectInfoCard
          v-if="props.project"
          :project="props.project"
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
            loading-icon="i-hugeicons-loading-03"
            size="default"
            icon="i-hugeicons-arrow-up-right-01"
            type="submit"
            class="w-full cursor-pointer"
            @click="onSubmit()"
          >
            Enviar Solicitação
          </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { Project } from '~/types/schemas'
import ProjectInfoCard from './ProjectInfoCard.vue'
import { z } from 'zod'

interface Props {
  project: Project | null
}

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

  const formData = new FormData()
  formData.append('file', state.file)
}
</script>
