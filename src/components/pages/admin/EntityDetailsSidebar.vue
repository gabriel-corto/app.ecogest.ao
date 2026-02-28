<template>
  <EntityDetailsSidebarSkeleton v-if="status === 'pending'" />

  <aside
    v-else
    class="h-full w-1/4 border-l border-neutral-200 bg-white p-6"
  >
    <div class="flex h-full flex-col gap-8">
      <div
        class="flex items-center justify-between border-b border-neutral-100 pb-4"
      >
        <div class="flex items-center gap-3">
          <UIcon
            name="i-hugeicons-user-account"
            class="text-primary-600 h-8 w-8"
          />
          <h2 class="text-lg font-semibold tracking-tight text-neutral-900">
            Detalhes da Entidade
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

      <div class="space-y-8">
        <div>
          <label class="mb-1 flex items-center gap-2 text-sm text-neutral-500">
            <UIcon
              name="i-hugeicons-building-03"
              class="h-5 w-5"
            />
            Nome da Entidade
          </label>
          <p class="text-sm font-medium text-neutral-800">
            {{ entity?.name }}
          </p>
        </div>

        <div>
          <label class="mb-1 flex items-center gap-2 text-sm text-neutral-500">
            <UIcon
              name="i-hugeicons-passport"
              class="h-5 w-5"
            />
            NIF (Identificação Fiscal)
          </label>
          <UBadge
            variant="subtle"
            class="text-primary-700 bg-primary-50 border-primary-100 text-xs"
            >{{ entity?.nif }}</UBadge
          >
        </div>
      </div>

      <template v-if="entity?.licenses.length">
        <div class="space-y-4">
          <div
            class="flex items-center justify-between border-t border-neutral-100 pt-6"
          >
            <h3 class="text-neutral-900">Processos de Licenciamento</h3>
          </div>

          <div
            v-for="license in entity?.licenses"
            :key="license.id"
            class="cursor-pointer rounded-lg border border-neutral-200 bg-neutral-50 p-4 transition-colors"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex flex-col gap-y-2">
                <p class="text-sm font-bold text-neutral-800">
                  {{ license.number }}
                </p>

                <div>
                  <UIcon
                    name="i-hugeicons-apartment"
                    class="text-primary-500 h-6 w-6"
                  />
                  <p class="text-xs text-neutral-500">
                    {{ license.project.name }}
                  </p>
                </div>
              </div>

              <div>
                <UBadge
                  variant="subtle"
                  :color="statusColors(license.status).statusColor.value"
                  size="sm"
                  :label="
                    useEnumTranslator().translate('status', license.status)
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
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
            A Entidade {{ entity?.name }} Não possui processos a decorrer!
          </p>
        </div>
      </template>

      <div class="mt-auto space-y-3 border-t border-neutral-100 pt-6">
        <UButton
          v-if="entity?.status === 'BLOCKED'"
          block
          variant="soft"
          icon="i-hugeicons-arrow-up-right-01"
          color="success"
          size="default"
          @click="onActivateEntity()"
        >
          Activar Entidade
        </UButton>

        <UButton
          v-else
          block
          variant="soft"
          icon="i-hugeicons-arrow-down-left-01"
          color="error"
          size="default"
          @click="onBlockEntity()"
        >
          Bloquear Entidade
        </UButton>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { adminService } from '~/services'
import EntityDetailsSidebarSkeleton from './EntityDetailsSidebarSkeleton.vue'

interface Props {
  entityId: string
}

const emit = defineEmits(['close', 'updated'])

const props = defineProps<Props>()

const {
  data: entity,
  refresh: refreshEntity,
  status,
} = useLazyAsyncData(
  `entity-${props.entityId}`,
  () => adminService.getEntityDetails(props.entityId),
  {
    server: false,
    watch: [props],
  },
)

const onActivateEntity = async () => {
  const updated = await adminService.activateEntity(props.entityId)

  if (updated) {
    refreshEntity()
    emit('updated')
  }
}

const onBlockEntity = async () => {
  const updated = await adminService.blockEntity(props.entityId)

  if (updated) {
    refreshEntity()
    emit('updated')
  }
}

defineExpose({
  refresh: refreshEntity,
})
</script>
