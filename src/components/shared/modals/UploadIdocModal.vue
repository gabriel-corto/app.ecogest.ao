<template>
  <UModal
    title="Submeter Documento de Identificação"
    description="Faça o upload do novo documento de identificação"
    class="max-w-2xl"
  >
    <template #body>
      <AuthContainer class="min-w-full">
        <!-- Card informativo -->
        <div
          class="relative overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-br from-primary-50/50 to-white p-8"
        >
          <!-- Decoração de fundo -->
          <div
            class="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-primary-100/30 blur-3xl"
          />
          <div
            class="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary-100/20 blur-3xl"
          />

          <div class="relative flex flex-col items-center gap-6">
            <!-- Ícone do documento -->
            <div
              class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30"
            >
              <UIcon
                name="i-hugeicons-files-02"
                class="h-8 w-8 text-white"
              />
            </div>

            <!-- Texto informativo -->
            <div class="flex flex-col items-center gap-2 text-center">
              <h3 class="text-lg font-semibold text-neutral-800">
                {{
                  confirmType === 'BI'
                    ? 'Verificação de Identidade'
                    : 'Verificação Empresarial'
                }}
              </h3>
              <p class="max-w-sm text-sm leading-relaxed text-neutral-600">
                {{
                  confirmType === 'BI'
                    ? 'Para sua segurança, precisamos verificar a sua identidade através do seu Bilhete de Identidade.'
                    : 'Para completar o registo, precisamos verificar o Alvará Comercial da sua empresa.'
                }}
              </p>
            </div>
          </div>
        </div>

        <UForm
          :schema="schema"
          :state="state"
          name="file"
          class="mt-10 flex flex-col gap-6"
          @submit="onSubmit"
        >
          <!-- Card de upload -->
          <div class="flex flex-col gap-3">
            <label class="text-sm font-medium text-neutral-700">
              {{
                confirmType === 'BI'
                  ? 'Bilhete de Identidade'
                  : 'Alvará Comercial'
              }}
              <span class="text-red-500">*</span>
            </label>

            <div
              class="group relative overflow-hidden rounded-2xl border-2 border-dashed border-neutral-300 bg-white transition-all hover:border-primary-400 hover:bg-primary-50/30"
            >
              <UFileUpload
                v-model="state.file"
                name="file"
                accept="application/pdf"
                icon="i-hugeicons-file-upload"
                description="Faça o upload do seu Documento"
                layout="list"
                class="min-h-32 w-full cursor-pointer"
              />
            </div>
          </div>

          <!-- Botões de ação -->
          <div class="mt-4 flex flex-col justify-between gap-6">
            <UButton
              :loading="isSubmitting"
              loading-icon="i-hugeicons-loading-02"
              size="default"
              icon="i-hugeicons-arrow-right-02"
              type="submit"
              class="w-full px-8"
            >
              Submeter
            </UButton>
          </div>
        </UForm>
      </AuthContainer>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import AuthContainer from '@/components/shared/layout/AuthContainer.vue'
import type { FormSubmitEvent } from '@nuxt/ui'

import { z } from 'zod'
import { authService } from '~/services'

definePageMeta({
  layout: 'auth',
})

useHead({
  title: 'Confirmar Identidade',
})

const schema = z.object({
  file: z
    .instanceof(File, {
      message: 'Ops, Adcione um ficheiro válido!',
    })
    .nullable(),
})

type Schema = z.infer<typeof schema>

const isSubmitting = ref(false)
const emit = defineEmits(['close'])

const authStore = useAuthStore()
const entityType = computed(() => authStore.user?.entityType)
const confirmType = entityType.value === 'SINGULAR' ? 'BI' : 'COMERCIAL_LICENSE'

const state = reactive<Schema>({
  file: null,
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    isSubmitting.value = true

    await new Promise(resolve => setTimeout(resolve, 3000))

    const response = await authService.verifyIdentity({
      type: confirmType,
      file: event.data.file,
    })

    useSuccessToast({
      title: response.message,
    })

    authStore.user = response.data
    emit('close')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    useErrorToast({
      title: error.data.message || 'Erro ao confirmar identidade!',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
