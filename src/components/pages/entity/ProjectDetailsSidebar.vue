<template>
  <SidebarSkeleton v-if="status === 'pending'" />

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
            name="i-hugeicons-apartment"
            class="text-primary-600 h-8 w-8"
          />
          <h2 class="font-semibold tracking-tight text-neutral-900">
            Detalhes da Projecto
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

      <div class="grid grid-cols-2 space-y-4 gap-x-10">
        <div>
          <label class="mb-1 flex items-center gap-2 text-sm text-neutral-500">
            Nome do Projecto
          </label>
          <p class="text-sm font-medium text-neutral-800">
            {{ project?.name }}
          </p>
        </div>

        <div>
          <label class="mb-1 flex items-center gap-2 text-sm text-neutral-500">
            Sector
          </label>
          <UBadge
            :color="sectorColors(project?.sector).sectorColor.value"
            variant="subtle"
            >{{
              useEnumTranslator().translate('sector', project?.sector)
            }}</UBadge
          >
        </div>

        <div>
          <label class="mb-1 flex items-center gap-2 text-sm text-neutral-500">
            Localização
          </label>
          <p class="text-sm font-medium text-neutral-800">
            {{ project?.location }}
          </p>
        </div>

        <div>
          <label class="mb-1 flex items-center gap-2 text-sm text-neutral-500">
            Data de Criação
          </label>
          <p class="text-sm font-medium text-neutral-800">
            {{ useDateFormatter(project?.createdAt as string) }}
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <div
          class="flex items-center justify-between border-t border-neutral-100 pt-6"
        >
          <h3 class="text-sm font-medium text-neutral-500">
            Histórico de Processos
          </h3>
        </div>

        <div class="space-y-3">
          <div
            class="cursor-pointer rounded-lg border border-neutral-200 bg-white p-4"
          >
            <div class="flex items-start justify-between">
              <div class="space-y-1">
                <div class="flex w-full items-center justify-between gap-4">
                  <p class="font-black text-neutral-900">PRC/002/2026</p>
                </div>

                <p class="text-xs text-neutral-400">
                  Solicitado em: 26/02/2026
                </p>
              </div>

              <div class="flex items-center gap-x-2">
                <UBadge
                  color="warning"
                  variant="subtle"
                  >Em Análise</UBadge
                >
              </div>
            </div>

            <div
              v-if="project?.hasLicense"
              class="mt-4 flex items-center justify-between border-t border-neutral-50 pt-3"
            >
              <div class="flex items-center gap-1.5">
                <UIcon
                  name="i-hugeicons-calendar-03"
                  class="h-4 w-4 text-neutral-400"
                />
                <span class="text-xs font-medium text-neutral-500"
                  >Expira em: 26/02/2029</span
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

      <div class="mt-auto space-y-3 border-t border-neutral-100 pt-6">
        <!-- <UButton
          v-if="pro?.status === 'BLOCKED'"
          block
          variant="soft"
          icon="i-hugeicons-arrow-up-right-01"
          color="success"
          size="default"
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
        >
          Bloquear Entidade
        </UButton> -->
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { projectsService } from '~/services'
import SidebarSkeleton from '~/components/shared/SidebarSkeleton.vue'

interface Props {
  projectId: string
}

const emit = defineEmits(['close', 'updated'])

const props = defineProps<Props>()

const { data: project, status } = useLazyAsyncData(
  `project-${props.projectId}`,
  () => projectsService.getProjectDetails(props.projectId),
  {
    server: false,
    watch: [props],
  },
)

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
