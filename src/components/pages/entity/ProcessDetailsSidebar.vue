<template>
  <SidebarSkeleton v-if="status === 'pending'" />

  <aside
    v-else
    class="h-full w-1/4 border-l border-neutral-200 bg-white p-6"
  >
    <div class="flex h-full flex-col gap-5">
      <div
        class="flex items-center justify-between border-b border-neutral-100 pb-4"
      >
        <div class="flex items-center gap-3">
          <UIcon
            name="i-hugeicons-files-01"
            class="text-primary-600 h-8 w-8"
          />
          <h2 class="font-semibold tracking-tight text-neutral-900">
            Detalhes do Processo
          </h2>
        </div>

        <UButton
          variant="subtle"
          size="md"
          color="neutral"
          icon="i-hugeicons-cancel-01"
          @click="emit('close')"
        />
      </div>

      <div class="border-b border-b-neutral-200 pb-3">
        <h3 class="text-sm font-semibold tracking-tight text-neutral-700">
          Informações do Processo
        </h3>

        <div class="mt-3 grid grid-cols-2 space-y-4 gap-x-16">
          <div>
            <label
              class="mb-1 flex items-center gap-2 text-xs text-neutral-500"
            >
              Estado
            </label>

            <UBadge
              :color="statusColors(process?.status).statusColor.value"
              variant="subtle"
              size="sm"
              :label="useEnumTranslator().translate('status', process?.status)"
            />
          </div>

          <div>
            <label
              class="mb-1 flex items-center gap-2 text-xs text-neutral-500"
            >
              Nº do Processo
            </label>

            <div class="flex items-center gap-2">
              <h4 class="text-xs font-medium text-neutral-800">
                {{ process?.number }}
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div class="border-b border-b-neutral-200 pb-3">
        <h3 class="text-sm font-semibold tracking-tight text-neutral-700">
          Informações do Projecto
        </h3>

        <div class="mt-3 grid grid-cols-2 space-y-4 gap-x-16">
          <div>
            <label
              class="mb-1 flex items-center gap-2 text-xs text-neutral-500"
            >
              Nome:
            </label>

            <div class="flex items-center gap-2">
              <div class="flex flex-col gap-y-1.5">
                <div class="flex items-center gap-x-1 text-xs">
                  <p class="text-xs text-neutral-800">
                    {{ process?.project.name }}
                  </p>
                </div>

                <div class="flex items-center gap-x-1 text-xs">
                  <UBadge
                    :color="
                      sectorColors(process?.project.sector).sectorColor.value
                    "
                    variant="subtle"
                    size="xs"
                    :label="
                      useEnumTranslator().translate(
                        'sector',
                        process?.project.sector,
                      )
                    "
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              class="mb-1 flex items-center gap-2 text-xs text-neutral-500"
            >
              Localização
            </label>

            <div class="flex items-center gap-2">
              <UIcon
                name="i-hugeicons-location-06"
                class="text-primary-600 h-4 w-4"
              />
              <p class="text-xs font-medium text-neutral-800">
                {{ process?.project.location }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <template v-if="process?.licenseFileUrl">
        <div class="space-y-4">
          <div
            class="flex items-center justify-between border-t border-neutral-100 pt-6"
          >
            <h3 class="text-sm font-medium text-neutral-500">
              Documento de Licença
            </h3>
          </div>

          <div class="space-y-3">
            <div
              class="cursor-pointer rounded-lg border border-neutral-200 bg-white p-4"
            >
              <div class="flex items-start justify-between">
                <div class="space-y-1">
                  <div class="flex w-full items-center justify-between gap-4">
                    <p class="font-black text-neutral-900">
                      {{ process?.licenseNumber }}
                    </p>
                  </div>

                  <p class="text-xs text-neutral-400">
                    Solicitado em:
                    {{ useDateFormatter(process?.createdAt as string) }}
                  </p>
                </div>

                <div class="flex items-center gap-x-2">
                  <div>
                    <div
                      class="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50"
                    >
                      <UIcon
                        name="i-hugeicons-file-02"
                        class="h-6 w-6 text-neutral-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="mt-4 flex items-center justify-between border-t border-neutral-50 pt-3"
              >
                <div class="flex items-center gap-1.5">
                  <UIcon
                    name="i-hugeicons-calendar-03"
                    class="h-4 w-4 text-neutral-400"
                  />
                  <span class="text-xs font-medium text-neutral-500"
                    >Expira em:
                    {{
                      useDateFormatter(process?.licenseExpiresAt as string)
                    }}</span
                  >
                </div>
                <UIcon
                  name="i-hugeicons-arrow-right-01"
                  class="h-4 w-4 text-neutral-300"
                />
              </div>
            </div>
          </div>

          <div>
            <UButton
              variant="subtle"
              color="primary"
              icon="i-hugeicons-files-02"
              :to="process?.licenseFileUrl"
              target="_blank"
              label="Exportar Licença"
            />
          </div>
        </div>
      </template>

      <template v-if="process?.status === 'REJECTED'">
        <UAlert
          icon="i-hugeicons-alert-02"
          color="error"
          variant="soft"
          title="Solicitação de Licença Rejeitada"
          :description="`${process?.rejectReason}`"
        />
      </template>

      <template v-else>
        <h3 class="text-sm font-semibold tracking-tight text-neutral-700">
          Obserações
        </h3>

        <div
          class="flex flex-col items-center gap-3 rounded-xl border border-dashed border-neutral-200 p-6 text-center"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50"
          >
            <UIcon
              name="i-hugeicons-files-02"
              class="h-6 w-6 text-neutral-400"
            />
          </div>

          <p class="text-xs text-neutral-500">
            Ainda não foi emitido uma licença para este processo
          </p>
        </div>
      </template>

      <div
        v-if="process?.status === 'REJECTED'"
        class="mt-auto space-y-4 border-t border-neutral-100 pt-6"
      >
        <UButton
          block
          variant="subtle"
          icon="i-hugeicons-arrow-up-right-01"
          color="primary"
          class="text-sm font-medium"
          size="xl"
          @click="onReRequestLicense(process)"
        >
          Reenviar Solicitação
        </UButton>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { licenseService } from '~/services'
import SidebarSkeleton from '~/components/shared/SidebarSkeleton.vue'
import { useRequestLicenseAgainModal } from '~/domain/projects'
import type { License } from '~/types/schemas'

interface Props {
  process: string
}

const emit = defineEmits(['close', 'updated'])
const props = defineProps<Props>()

const {
  data: process,
  status,
  refresh,
} = useLazyAsyncData(
  `license-${props.process}`,
  () => licenseService.getLicense(props.process),
  {
    server: false,
    watch: [props],
  },
)

defineExpose({
  refresh,
})

const onReRequestLicense = async (process: License) => {
  const data = await useRequestLicenseAgainModal(process)
  if (data) {
    refresh()
  }
}
</script>
