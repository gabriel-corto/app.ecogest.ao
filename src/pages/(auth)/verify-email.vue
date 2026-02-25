<template>
  <AuthContainer>
    <AuthHeader :title="`Olá, ${authStore.user?.name}!`" />

    <!-- Card com destaque visual -->
    <div
      class="relative mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 transition-shadow"
    >
      <!-- Decoração de fundo -->
      <div
        class="bg-primary-100/30 absolute -top-8 -right-8 h-32 w-32 rounded-full blur-3xl"
      />
      <div
        class="bg-primary-100/20 absolute -bottom-8 -left-8 h-32 w-32 rounded-full blur-3xl"
      />

      <div class="relative flex flex-col items-center gap-3">
        <img
          src="/otp.gif"
          class="h-14 w-14"
          alt="Verificação"
        />

        <!-- Texto informativo -->
        <div class="flex flex-col items-center gap-2 text-center">
          <h3 class="text-lg font-semibold text-neutral-800">
            Verifique o seu e-mail
          </h3>
          <p class="max-w-sm text-sm leading-relaxed text-neutral-600">
            Enviámos um código de verificação de 6 dígitos para
            <span class="text-primary-600 font-semibold">{{
              authStore.user?.email
            }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Formulário -->
    <UForm
      :schema="schema"
      :state="state"
      name="file"
      class="mt-10 flex flex-col gap-8"
      @submit="onSubmit"
    >
      <!-- Input OTP estilizado -->
      <div class="flex flex-col gap-3">
        <label
          class="text-center text-xs font-medium tracking-wider text-neutral-500 uppercase"
        >
          Digite o código
        </label>
        <div class="flex items-center justify-center">
          <UFormField name="otp">
            <UPinInput
              v-model="state.otp"
              size="default"
              inputmode="numeric"
              autofocus
              placeholder="•"
              :length="6"
              :ui="{
                base: 'mx-1.5 h-14 w-12 rounded-xl border-2 border-neutral-200 bg-white text-center text-2xl font-bold text-neutral-800 outline-none transition-all hover:border-primary-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
              }"
            />
          </UFormField>
        </div>
      </div>

      <!-- Botões de ação -->
      <div class="flex flex-col gap-4">
        <UButton
          :loading="isSubmitting"
          :disabled="isResending"
          loading-icon="i-hugeicons-loading-02"
          size="default"
          label="Confirmar"
          icon="i-hugeicons-arrow-right-02"
          type="submit"
          class="w-full px-8"
        />

        <!-- Reenviar código -->
        <div
          class="flex items-center justify-center gap-2 rounded-xl bg-neutral-50 px-4 py-3 text-sm"
        >
          <span class="text-neutral-600">Não recebeu o código?</span>
          <UButton
            v-if="isCountDowning"
            :disabled="true"
            variant="link"
            :label="`Aguarde ${countdown}s`"
            class="text-neutral-400"
          />

          <UButton
            v-else
            :disabled="isResending || isSubmitting"
            :loading="isResending"
            loading-icon="i-hugeicons-loading-02"
            variant="link"
            :label="isResending ? 'Reenviando...' : 'Reenviar código'"
            class="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            @click="reSendOTP"
          />
        </div>

        <!-- Botão de sair -->
        <UButton
          :disabled="isResending"
          size="default"
          color="error"
          variant="subtle"
          icon="i-hugeicons-logout-02"
          type="button"
          class="w-full px-8"
          @click="authStore.signOut()"
        >
          Terminar Sessão
        </UButton>
      </div>
    </UForm>
  </AuthContainer>
</template>

<script setup lang="ts">
import AuthHeader from '@/components/shared/base/AuthHeader.vue'
import AuthContainer from '@/components/shared/layout/AuthContainer.vue'
import type { FormSubmitEvent } from '@nuxt/ui'

import { z } from 'zod'

definePageMeta({
  layout: 'auth',
})

useHead({
  title: 'Confirmar E-mail',
})

const schema = z.object({
  otp: z.array(z.string()).length(6, 'O Código deve conter 6 dígitos!'),
})

type Schema = z.infer<typeof schema>

const isSubmitting = ref(false)
const isResending = ref(false)
const authStore = useAuthStore()

const state = reactive<Schema>({
  otp: [],
})

const countdown = ref(5)
const isCountDowning = computed(() => countdown.value > 0)

function startCoundDown() {
  setInterval(() => {
    if (countdown.value <= 0) return
    countdown.value--
  }, 1000)
}

onMounted(() => {
  startCoundDown()
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const parsedOTP = event.data.otp.join('')

  try {
    isSubmitting.value = true

    //CHECK: only for demo
    await new Promise(resolve => setTimeout(resolve, 1000))

    const response = await authStore.verifyEmail(parsedOTP)
    isSubmitting.value = false

    useSuccessToast({
      title: response.message,
    })

    navigateTo('/verify-identity')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    useErrorToast({
      title: error.data.message || 'Erro ao validar código de confirmação!',
    })
  } finally {
    isSubmitting.value = false
  }
}

const reSendOTP = async () => {
  try {
    isResending.value = true

    //CHECK: only for demo
    await new Promise(resolve => setTimeout(resolve, 1000))
    const response = await authStore.generateOTP()

    isResending.value = false

    useSuccessToast({
      title: response.message,
    })

    countdown.value = 45

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    useErrorToast({
      title: error.data.message || 'Erro ao reenviar código!',
    })
  } finally {
    isResending.value = false
  }
}
</script>
