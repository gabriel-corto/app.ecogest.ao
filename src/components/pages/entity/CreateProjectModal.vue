<template>
  <UModal
    title="Criar Projecto"
    close-icon="i-hugeicons-cancel-01"
    description="Preencha os dados abaixo para criar um projecto"
    class="max-w-2xl"
  >
    <template #body>
      <UForm
        class="space-y-6 p-1"
        :state="state"
        :schema="schema"
        @submit="onSubmit"
      >
        <!-- Informações do Projeto -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 pb-2">
            <div class="bg-primary-500 h-8 w-1 rounded-full" />
            <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Informações do Projeto
            </h3>
          </div>

          <UFormField
            required
            name="name"
            label="Nome do Projecto"
          >
            <UInput
              v-model="state.name"
              size="normal"
              class="w-full"
              icon="i-hugeicons-file-01"
              placeholder="Ex: Construção de Edifício Comercial"
            />
          </UFormField>

          <UFormField
            required
            name="sector"
            label="Sector de Actividade"
          >
            <USelect
              v-model="model"
              label-key="label"
              value-key="value"
              :items="sectorItems"
              name="sector"
              class="w-full"
              size="normal"
              icon="i-hugeicons-work"
              placeholder="Selecione o sector"
            />
          </UFormField>

          <UFormField
            required
            name="locale"
            label="Localização"
          >
            <UInput
              v-model="state.locale"
              size="normal"
              class="w-full"
              icon="i-hugeicons-location-01"
              placeholder="Ex: Zona Económica"
            />
          </UFormField>
        </div>

        <!-- Informação Importante -->
        <UAlert
          icon="i-hugeicons-alert-02"
          color="primary"
          variant="soft"
          title="Informação Importante"
          description="Certifique-se de que todos os dados estão corretos  antes de submeter."
        />

        <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <UButton
            type="button"
            color="neutral"
            variant="soft"
            size="default"
            icon="i-hugeicons-cancel-01"
            class="w-full"
            @click="$emit('close')"
          >
            Cancelar
          </UButton>
          <UButton
            :loading="submitting"
            loading-icon="i-hugeicons-loading-02"
            size="default"
            icon="i-hugeicons-arrow-right-02"
            trailing
            type="submit"
            class="w-full"
          >
            Submeter Processo
          </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { sectorItems } from '~/data/sectors'
import * as zod from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { projectsService } from '~/services'
import type { SectorItem } from '~/types/schemas'

const schema = zod.object({
  name: zod.string().min(4, 'Adciona um nome válido para este projecto'),
  sector: zod.enum(['AGRICULTURE', 'BUILDING', 'EDUCATION', 'ENGINEERING']),
  locale: zod.string().min(4, 'Adcione uma localização válida'),
})
type Schema = zod.infer<typeof schema>

const state = reactive<Schema>({
  name: '',
  locale: '',
  sector: 'AGRICULTURE',
})

const submitting = ref(false)
const emit = defineEmits(['close'])
const model = defineModel<SectorItem | undefined>()

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const { name, locale, sector } = event.data
  try {
    submitting.value = true
    const response = await projectsService.create({
      name,
      sector,
      locale,
    })

    useSuccessToast({
      title: response.message,
    })

    emit('close', response.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.data)
    useErrorToast(error.data.message[0] || 'Erro ao cadastrar projecto')
  } finally {
    submitting.value = false
  }
}
</script>
