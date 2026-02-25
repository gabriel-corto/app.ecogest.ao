<template>
  <PageContainer
    title="Gestão de Administradores"
    subtitle="Acompanhe e faça gestão dos administradores"
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
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Entity } from '~/types/schemas'

import PageContainer from '~/components/shared/layout/PageContainer.vue'
import TableContainer from '~/components/shared/layout/TableContainer.vue'
import TableFilterLine from '~/components/shared/layout/TableFilterLine.vue'
import { adminService } from '~/services'

import { UBadge, UIcon } from '#components'

const columns: TableColumn<Entity>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center gap-2',
        },
        [
          h(UIcon, {
            name: 'i-hugeicons-house-01',
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
    accessorKey: 'role',
    header: 'Tipologia',
    cell: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center gap-2',
        },
        [
          h(UBadge, {
            label: useEnumTranslator().translate('role', row.original.role),
            color: roleColors('ADMIN').roleColor.value,
            variant: 'subtle',
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
  'all-administrators',
  () => adminService.getAllAdministrators(),
  {
    server: false,
  },
)
</script>
