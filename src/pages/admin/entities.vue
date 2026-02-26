<template>
  <div class="flex h-full w-full flex-1">
    <div class="w-3/4 flex-1">
      <PageContainer
        title="Gestão de Entidades"
        subtitle="Acompanhe e faça gestão das entidades cadastradas"
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

    <EntityDetailsSidebar
      v-if="selectedEntityId"
      :entity-id="selectedEntityId"
      @close="selectedEntityId = null"
      @updated="refresh()"
    />
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Entity } from '~/types/schemas'

import PageContainer from '~/components/shared/layout/PageContainer.vue'
import TableContainer from '~/components/shared/layout/TableContainer.vue'
import TableFilterLine from '~/components/shared/layout/TableFilterLine.vue'
import { adminService } from '~/services'
import EntityDetailsSidebar from '~/components/pages/admin/EntityDetailsSidebar.vue'

import { UBadge, UButton, UIcon, ULink } from '#components'

const columns: TableColumn<Entity>[] = [
  {
    accessorKey: 'name',
    header: 'Nome da Entidade',
    cell: ({ row }) => {
      return h(
        ULink,
        {
          class: 'flex items-center gap-2 text-primary-500 font-medium',
          onClick: () => onSelectEntity(row.original.id),
        },
        [
          h(UIcon, {
            name: 'i-hugeicons-arrow-up-right-01',
            class: 'w-5 h-5',
          }),
          h('span', row.original.name),
        ],
      )
    },
  },
  {
    accessorKey: 'nif',
    header: 'NIF',
    cell: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center gap-2',
        },
        [
          h(UIcon, {
            name: 'i-hugeicons-user-account',
            class: 'w-5 h-5',
          }),
          h('span', row.original.nif),
        ],
      )
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center gap-2',
        },
        [
          h(UIcon, {
            name: 'i-hugeicons-mail-01',
            class: 'w-5 h-5',
          }),
          h('span', row.original.email),
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
    accessorKey: 'status',
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
              await adminService.activateEntity(row.original.id)
              refresh()
            },
          }),
          h(UButton, {
            variant: 'subtle',
            size: 'md',
            label: 'Bloquear',
            color: 'error',
            disabled: row.original.status === 'BLOCKED',
            icon: 'i-hugeicons-arrow-down-left-01',
            onClick: async () => {
              await adminService.blockEntity(row.original.id)
              refresh()
            },
          }),
          h(UButton, {
            variant: 'subtle',
            size: 'md',
            label: 'Ver Detalhes',
            color: 'neutral',
            icon: 'i-hugeicons-eye',
            disabled: selectedEntityId.value === row.original.id,
            onClick: () => onSelectEntity(row.original.id),
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
  'all-company-entities',
  () => adminService.getAllCompanyEntities(),
  {
    server: false,
  },
)

const selectedEntityId = ref<string | null>(null)

const onSelectEntity = (entityId: string) => {
  selectedEntityId.value = entityId
}
</script>
