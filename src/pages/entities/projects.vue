<template>
  <div class="flex h-full w-full flex-1">
    <div class="w-3/4 flex-1">
      <PageContainer
        title="Gestão de Projectos"
        subtitle="Painel de Administração e Gestão de Projectos"
      >
        <template #table>
          <TableContainer>
            <TableFilterLine>
              <div class="flex min-w-[300px] flex-1 items-center gap-6">
                <UButton
                  variant="soft"
                  color="neutral"
                  size="lg"
                  icon="i-hugeicons-arrow-reload-horizontal"
                  @click="refresh()"
                />

                <UInput
                  size="lg"
                  icon="i-hugeicons-search-01"
                  placeholder="Pesquisar..."
                  class="w-82"
                />
              </div>

              <div>
                <UButton
                  color="success"
                  size="lg"
                  label="Cadastrar Novo Projecto"
                  icon="i-hugeicons-add-01"
                  @click="onCreateProject()"
                />
              </div>
            </TableFilterLine>

            <UTable
              :columns="columns"
              :data="response?.data"
              :loading="status === 'pending'"
            />
          </TableContainer>
        </template>
      </PageContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Project } from '~/types/schemas'

import PageContainer from '~/components/shared/layout/PageContainer.vue'
import TableContainer from '~/components/shared/layout/TableContainer.vue'
import TableFilterLine from '~/components/shared/layout/TableFilterLine.vue'
import { projectsService } from '~/services'

import { UBadge, UButton, UIcon, ULink } from '#components'
import { useCreateProjectModal } from '~/domain/projects'

const columns: TableColumn<Project>[] = [
  {
    accessorKey: 'name',
    header: 'Nome do Projeto',
    cell: ({ row }) => {
      return h(
        ULink,
        {
          class: 'flex items-center gap-2 text-primary-500 font-medium',
        },
        [
          h(UIcon, {
            name: 'i-hugeicons-apartment',
            class: 'w-5 h-5',
          }),
          h('span', row.original.name),
        ],
      )
    },
  },
  {
    accessorKey: 'sector',
    header: 'Sector',
    cell: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center gap-2',
        },
        [
          h(UIcon, {
            name: 'i-hugeicons-arrow-up-right-01',
            class: 'w-5 h-5',
          }),
          h(UBadge, {
            label: useEnumTranslator().translate('sector', row.original.sector),
            color: sectorColors(row.original.sector).sectorColor.value,
            variant: 'subtle',
          }),
        ],
      )
    },
  },
  {
    accessorKey: 'location',
    header: 'Localização',
    cell: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center gap-2',
        },
        [
          h(UIcon, {
            name: 'i-hugeicons-location-06',
            class: 'w-5 h-5',
          }),
          h('span', row.original.location),
        ],
      )
    },
  },

  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center gap-2',
        },
        [
          h(UBadge, {
            label: useEnumTranslator().translate('status', row.original.status),
            color: statusColors(row.original.status).statusColor.value,
            variant: 'subtle',
          }),
        ],
      )
    },
  },

  {
    accessorKey: 'options',
    header: 'Acções',
    cell: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center gap-x-6',
        },
        [
          h(UButton, {
            variant: 'subtle',
            size: 'md',
            label: 'Activar',
            color: 'success',
            disabled: row.original.status === 'ACTIVE',
            icon: 'i-hugeicons-arrow-up-right-01',
            onClick: async () => {
              await projectsService.activateProject(row.original.id)
              refresh()
            },
          }),
          h(UButton, {
            variant: 'subtle',
            size: 'md',
            label: 'Desactivar',
            color: 'primary',
            disabled: row.original.status === 'INACTIVE',
            icon: 'i-hugeicons-arrow-down-left-01',
            onClick: async () => {
              await projectsService.inactiveProject(row.original.id)
              refresh()
            },
          }),
          h(UButton, {
            variant: 'subtle',
            size: 'md',
            label: 'Eliminar',
            color: 'error',
            icon: 'i-hugeicons-delete-02',
            onClick: async () => {
              try {
                const r = await projectsService.deleteProject(row.original.id)
                refresh()

                useSuccessToast({ title: r.message })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } catch (error: any) {
                useErrorToast({
                  title: error?.message || 'Erro ao eliminar projecto',
                })
              }
            },
          }),
        ],
      )
    },
  },
]

const {
  data: response,
  status,
  refresh,
} = useLazyAsyncData(
  'all-projects-entities',
  () => projectsService.getAllByEntity(),
  {
    server: false,
  },
)

const onCreateProject = async () => {
  const data = await useCreateProjectModal()

  if (data) {
    refresh()
  }
}
</script>
