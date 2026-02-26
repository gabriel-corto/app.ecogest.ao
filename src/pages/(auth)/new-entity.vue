<template>
  <AuthContainer>
    <AuthHeader title="Bem vindo (a) ao Ecogest" />

    <div
      class="from-primary-50/50 mt-8 flex items-center justify-between rounded-2xl border border-neutral-200 bg-gradient-to-r to-white p-4"
    >
      <div class="flex items-center gap-3">
        <div
          class="from-primary-500 to-primary-600 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white"
        >
          {{ formStepperStore.activeStep + 1 }}
        </div>
        <div>
          <p class="text-xs font-medium text-neutral-500">
            Passo {{ formStepperStore.activeStep + 1 }} de 2
          </p>
          <p class="text-sm font-semibold text-neutral-800">
            {{
              formStepperStore.activeStep === 0
                ? 'Identificação'
                : 'Credenciais'
            }}
          </p>
        </div>
      </div>

      <div class="ml-6 max-w-xs flex-1">
        <div class="h-2 w-full rounded-full bg-neutral-200">
          <div
            class="from-primary-500 to-primary-600 h-2 rounded-full bg-gradient-to-r transition-all duration-500 ease-out"
            :style="{
              width: `${((formStepperStore.activeStep + 1) / 2) * 100}%`,
            }"
          />
        </div>
      </div>
    </div>

    <UForm
      :state="state"
      :schema="signUpSchema"
      class="mt-8 flex flex-col gap-6"
      @submit="onSubmit"
    >
      <div class="w-full">
        <UStepper
          v-model="formStepperStore.activeStep"
          :items="stepperItems"
        >
          <template #identification>
            <div class="mt-6 overflow-hidden">
              <div class="mb-6 flex items-start gap-3">
                <div
                  class="bg-primary-100 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                >
                  <UIcon
                    name="i-hugeicons-user-id-verification"
                    class="text-primary h-6 w-6"
                  />
                </div>
                <div>
                  <h3 class="text-base font-semibold text-neutral-800">
                    Identificação
                  </h3>
                  <p class="text-xs text-neutral-600">
                    Insira o seu NIF para começar
                  </p>
                </div>
              </div>

              <div class="space-y-5">
                <UFormField
                  name="nif"
                  label="NIF"
                  class="relative"
                >
                  <UInput
                    v-model="state.nif"
                    size="default"
                    type="text"
                    class="w-full"
                    icon="i-hugeicons-face-id"
                    placeholder="Introduza O Seu NIF ou BI"
                  />
                </UFormField>

                <UFormField
                  name="name"
                  autofocus
                  label="Nome da Entidade (Empresa)"
                >
                  <UInput
                    v-model="state.name"
                    size="default"
                    type="text"
                    class="w-full"
                    icon="i-hugeicons-user"
                    placeholder="Nome"
                  />
                </UFormField>
              </div>
            </div>
          </template>

          <template #credentials>
            <div class="mt-6 overflow-hidden">
              <div class="mb-6 flex items-start gap-3">
                <div
                  class="bg-primary-100 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                >
                  <UIcon
                    name="i-hugeicons-lock-key"
                    class="text-primary-600 h-6 w-6"
                  />
                </div>
                <div>
                  <h3 class="text-base font-semibold text-neutral-800">
                    Credenciais de Acesso
                  </h3>
                  <p class="text-xs text-neutral-600">
                    Configure o seu email e palavra-passe
                  </p>
                </div>
              </div>

              <div class="space-y-5">
                <UFormField
                  name="email"
                  label="Email"
                >
                  <UInput
                    v-model="state.email"
                    size="default"
                    type="email"
                    class="w-full"
                    icon="i-heroicons-at-symbol"
                    placeholder="Digite o seu email"
                  />
                </UFormField>

                <UFormField
                  name="password"
                  label="Palavra Passe"
                  class="relative"
                >
                  <UInput
                    v-model="state.password"
                    size="default"
                    :type="showPassword ? 'text' : 'password'"
                    class="w-full"
                    icon="i-hugeicons-lock-password"
                    placeholder="Crie uma palavra Passe"
                  />

                  <UButton
                    :disabled="!state.email"
                    variant="ghost"
                    class="absolute top-2.5 right-2 cursor-pointer rounded-xl p-2"
                    :icon="
                      showPassword
                        ? 'i-hugeicons-eye'
                        : 'i-hugeicons-view-off-slash'
                    "
                    @click="showPassword = !showPassword"
                  />
                </UFormField>
              </div>
            </div>
          </template>
        </UStepper>

        <div class="mt-6 flex justify-between gap-4">
          <UButton
            size="default"
            type="button"
            variant="outline"
            icon="i-hugeicons-arrow-left-02"
            :disabled="formStepperStore.activeStep === 0"
            class="w-full px-8"
            @click="formStepperStore.goToPrev()"
          >
            Voltar
          </UButton>

          <UButton
            v-if="formStepperStore.activeStep < stepperItems.length - 1"
            size="default"
            type="button"
            :disabled="!state.nif || !state.name"
            icon="i-hugeicons-arrow-right-02"
            class="w-full px-8"
            @click="formStepperStore.goToNext()"
          >
            Próximo
          </UButton>

          <UButton
            v-if="formStepperStore.activeStep === stepperItems.length - 1"
            loading-icon="i-hugeicons-loading-03"
            :loading="isSubmitting"
            size="default"
            type="submit"
            icon="i-hugeicons-user-add-02"
            class="w-full px-8"
          >
            Cadastrar-se
          </UButton>
        </div>
      </div>

      <div class="relative mt-4">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-neutral-200" />
        </div>
        <div class="relative flex justify-center text-xs">
          <span class="bg-white px-3 text-neutral-500">Já tem uma conta?</span>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <ULink
          to="/login"
          class="group text-primary-600 hover:bg-primary-50 hover:text-primary-700 flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all"
          icon="i-heroicons-user-plus"
        >
          <UIcon
            name="i-hugeicons-login-01"
            class="text-primary-600"
          />
          Faça Login
        </ULink>
      </div>
    </UForm>
  </AuthContainer>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

import AuthHeader from '@/components/shared/base/AuthHeader.vue'
import AuthContainer from '@/components/shared/layout/AuthContainer.vue'

import { stepperItems } from '@/data/stepper-items'
import { signUpSchema, type SignUpForm } from '@/schemas/auth'

definePageMeta({
  layout: 'auth',
})

useHead({
  title: 'Criar conta',
})

const formStepperStore = useFormStepperStore()
const authStore = useAuthStore()

const state = reactive<SignUpForm>({
  nif: '',
  name: '',
  email: '',
  password: '',
})

const isSubmitting = ref(false)
const showPassword = ref(false)

const onSubmit = async (event: FormSubmitEvent<SignUpForm>) => {
  try {
    isSubmitting.value = true
    await authStore.createNewEntity(event.data)

    useSuccessToast({
      title: 'Conta Cadastrada com sucesso!',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    useErrorToast({
      title: error.data.message || 'Erro ao cadastrar-se!',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
