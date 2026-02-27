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
            Detalhes do Pedido de Licença
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
          Detalhes da Entidade
        </h3>

        <div class="mt-3 grid grid-cols-2 space-y-4 gap-x-16">
          <div>
            <label
              class="mb-1 flex items-center gap-2 text-xs text-neutral-500"
            >
              Entidade
            </label>

            <div class="flex items-center gap-2">
              <div class="flex flex-col gap-y-1.5">
                <div class="flex items-center gap-x-1 text-xs">
                  <p class="text-xs">NIF:</p>
                  <p class="text-xs text-neutral-800">
                    {{ license?.entity.nif }}
                  </p>
                </div>

                <div class="flex items-center gap-x-1 text-xs">
                  <p class="text-xs">Nome:</p>
                  <p class="text-xs text-neutral-800">
                    {{ license?.entity.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              class="mb-1 flex items-center gap-2 text-xs text-neutral-500"
            >
              Nº Processo
            </label>
            <UBadge
              color="error"
              variant="subtle"
              size="sm"
              :label="license?.number"
            />
          </div>

          <div>
            <label
              class="mb-1 flex items-center gap-2 text-xs text-neutral-500"
            >
              Data de Solicitação
            </label>
            <p class="text-xs font-medium text-neutral-800">
              {{ useDateFormatter(license?.createdAt as string) }}
            </p>
          </div>

          <div>
            <label
              class="mb-1 flex items-center gap-2 text-xs text-neutral-500"
            >
              Estado do Pedido
            </label>
            <UBadge
              :color="statusColors(license?.status).statusColor.value"
              variant="subtle"
              size="sm"
              :label="useEnumTranslator().translate('status', license?.status)"
            />
          </div>
        </div>
      </div>

      <div class="border-b border-b-neutral-200 pb-3">
        <h3 class="text-sm font-semibold tracking-tight text-neutral-700">
          Detalhes do Projecto
        </h3>

        <div class="mt-3 grid grid-cols-2 space-y-4 gap-x-16">
          <div>
            <label
              class="mb-1 flex items-center gap-2 text-xs text-neutral-500"
            >
              Projecto Associado
            </label>

            <div class="flex items-center gap-2">
              <div class="flex flex-col gap-y-1.5">
                <div class="flex items-center gap-x-1 text-xs">
                  <p class="text-xs text-neutral-800">
                    {{ license?.project.name }}
                  </p>
                </div>

                <div class="flex items-center gap-x-1 text-xs">
                  <UBadge
                    :color="
                      sectorColors(license?.project.sector).sectorColor.value
                    "
                    variant="subtle"
                    size="xs"
                    :label="
                      useEnumTranslator().translate(
                        'sector',
                        license?.project.sector,
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
              Localização do Projecto
            </label>

            <div class="flex items-center gap-2">
              <UIcon
                name="i-hugeicons-location-06"
                class="text-primary-600 h-4 w-4"
              />
              <p class="text-xs font-medium text-neutral-800">
                {{ license?.project.location }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <template v-if="license?.licenseFileUrl">
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
                      {{ license?.licenseNumber }}
                    </p>
                  </div>

                  <p class="text-xs text-neutral-400">
                    Solicitado em:
                    {{ useDateFormatter(license?.createdAt as string) }}
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

                    <p class="text-sm font-medium text-neutral-800">
                      {{ license?.licenseFileUrl }}
                    </p>
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
                      useDateFormatter(license?.licenseExpiresAt as string)
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
        </div>
      </template>

      <template v-else>
        <h3 class="text-sm font-semibold tracking-tight text-neutral-700">
          Documento de Licença
        </h3>

        <div
          class="flex flex-col items-center gap-3 rounded-md border border-neutral-200 p-6 text-center"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50"
          >
            <UIcon
              name="i-hugeicons-files-02"
              class="h-6 w-6 text-neutral-400"
            />
          </div>

          <p class="text-sm text-neutral-500">
            Documento de licença não emitido
          </p>
        </div>
      </template>

      <div class="mt-auto space-y-4 border-t border-neutral-100 pt-6">
        <UButton
          v-if="license?.status === 'PENDING'"
          block
          variant="subtle"
          icon="i-hugeicons-arrow-up-right-01"
          color="success"
          class="text-sm font-medium"
          size="xl"
        >
          Aprovar Pedido
        </UButton>

        <UButton
          v-if="license?.status === 'PENDING'"
          block
          variant="subtle"
          icon="i-hugeicons-arrow-down-left-01"
          color="error"
          class="text-sm font-medium"
          size="xl"
        >
          Rejeitar Pedido
        </UButton>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { licenseService } from '~/services'
import SidebarSkeleton from '~/components/shared/SidebarSkeleton.vue'

interface Props {
  license: string
}

const emit = defineEmits(['close', 'updated'])
const props = defineProps<Props>()

const {
  data: license,
  status,
  refresh,
} = useLazyAsyncData(
  `license-${props.license}`,
  () => licenseService.getLicense(props.license),
  {
    server: false,
    watch: [props],
  },
)

defineExpose({
  refresh,
})

// const onActivateEntity = async () => {
//   const updated = await adminService.activateEntity(props.entityId)

//   if (updated) {
//     refreshEntity()
//     emit('updated')
//   }
// }

// const onBlockEntity = async () => {
//   const updated = await adminService.blockEntity(props.entityId)

//   if (updated) {
//     refreshEntity()
//     emit('updated')
//   }
// }
</script>
