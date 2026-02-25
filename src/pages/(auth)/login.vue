<template>
  <AuthContainer>
    <AuthHeader
      title="Bem vindo (a) de volta!"
      subtitle="Juntos por um futuro mais sustentável"
    />

    <div
      class="from-primary-50/50 relative mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-br to-white p-6"
    >
      <div
        class="bg-primary-100/30 absolute -top-8 -right-8 h-32 w-32 rounded-full blur-3xl"
      />
      <div
        class="bg-primary-100/20 absolute -bottom-8 -left-8 h-32 w-32 rounded-full blur-3xl"
      />

      <div class="relative flex items-center gap-4">
        <div
          class="from-primary-500 to-primary-600 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br"
        >
          <UIcon
            name="i-hugeicons-lock-key"
            class="h-8 w-8 text-white"
          />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-neutral-800">
            Acesse a sua conta
          </h3>
          <p class="text-sm text-neutral-600">
            Entre com as suas credenciais de acesso
          </p>
        </div>
      </div>
    </div>

    <UForm
      :state="state"
      :schema="signInSchema"
      class="mt-8 space-y-5"
      @submit="onSubmit"
    >
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
            placeholder="Digite a sua palavra passe"
          />

          <UButton
            :disabled="!state.email"
            variant="ghost"
            class="absolute top-2.5 right-2 cursor-pointer rounded-xl p-2"
            :icon="
              showPassword ? 'i-hugeicons-eye' : 'i-hugeicons-view-off-slash'
            "
            @click="showPassword = !showPassword"
          />
        </UFormField>

        <div class="flex justify-end">
          <ULink
            disabled
            class="group text-primary-600 hover:text-primary-700 flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            Recuperar Credenciais
          </ULink>
        </div>
      </div>

      <UButton
        size="default"
        class="w-full"
        type="submit"
        :loading="isSubmitting"
        loading-icon="i-hugeicons-loading-03"
        icon="i-hugeicons-arrow-right-02"
      >
        {{ isSubmitting ? 'Verificando...' : 'Entrar' }}
      </UButton>

      <div class="relative mt-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-neutral-200" />
        </div>
        <div class="relative flex justify-center text-xs">
          <span class="bg-white px-3 text-neutral-500"
            >Ainda não tem uma conta?</span
          >
        </div>
      </div>

      <div class="flex items-center justify-center">
        <ULink
          to="/new-entity"
          class="group text-primary-600 hover:bg-primary-50 hover:text-primary-700 flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all"
        >
          <UIcon
            name="i-hugeicons-user-add-02"
            class="h-4 w-4 transition-transform group-hover:scale-110"
          />
          Crie o seu registro
        </ULink>
      </div>
    </UForm>
  </AuthContainer>
</template>

<script setup lang="ts">
import AuthHeader from '@/components/shared/base/AuthHeader.vue'
import AuthContainer from '@/components/shared/layout/AuthContainer.vue'

import type { FormSubmitEvent } from '@nuxt/ui'
import { signInSchema, type SignInForm } from '~/schemas/auth'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'auth',
})
useHead({
  title: 'Login',
})

const isSubmitting = ref(false)
const showPassword = ref(false)

const authStore = useAuthStore()

const state = reactive<SignInForm>({
  email: '',
  password: '',
})

const onSubmit = async (event: FormSubmitEvent<SignInForm>) => {
  try {
    isSubmitting.value = true
    await new Promise(resolve => setTimeout(resolve, 2000))

    await authStore.login(event.data)
    isSubmitting.value = false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    useErrorToast({
      title: error?.data?.message || 'Não foi possível fazer login!',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
