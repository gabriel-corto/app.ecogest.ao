<template>
  <div class="flex h-full w-full flex-1">
    <div class="w-3/4 flex-1">
      <PageContainer
        title="Gestão de Licenças"
        subtitle="Acompanhamento e Gestão de Licenças Ambientais"
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

    <LicenseDetailSidebar
      v-if="selectedLicenseId"
      :license="selectedLicenseId"
      @close="selectedLicenseId = null"
    />
  </div>
</template>

<script setup lang="ts">
import { adminService } from '~/services'

import type { TableColumn } from '@nuxt/ui'
import type { License } from '~/types/schemas'

import PageContainer from '~/components/shared/layout/PageContainer.vue'
import TableContainer from '~/components/shared/layout/TableContainer.vue'
import TableFilterLine from '~/components/shared/layout/TableFilterLine.vue'

import { UBadge, UButton, UIcon } from '#components'
import LicenseDetailSidebar from '~/components/pages/admin/LicenseDetailSidebar.vue'

const columns: TableColumn<License>[] = [
  {
    accessorKey: 'number',
    header: 'Nº do Processo',
    cell: ({ row }) => {
      return h(UButton, {
        variant: 'link',
        label: row.original.number,
        color: 'primary',
        size: 'sm',
        icon: 'i-hugeicons-files-01',
        class:
          'text-primary-500 border border-primary-300 font-semibold rounded-md',
        onClick: () => onSelectLicense(row.original.id),
      })
    },
  },
  {
    accessorKey: 'entity',
    header: 'Entidade',
    cell: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center gap-2',
        },
        [
          h(UIcon, {
            name: 'i-hugeicons-user-list',
            class: 'w-5 h-5',
          }),
          h('span', row.original.entity.name),
        ],
      )
    },
  },

  {
    accessorKey: 'project.sector',
    header: 'Sector',
    cell: ({ row }) => {
      return h(UBadge, {
        label: row.original.project.sector,
        color: sectorColors(row.original.project.sector).sectorColor.value,
        variant: 'subtle',
      })
    },
  },
  {
    accessorKey: '',
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
    accessorKey: 'requestFile',
    header: 'Anexo',
    cell: ({ row }) => {
      return h(UButton, {
        variant: 'link',
        color: 'primary',
        size: 'sm',
        icon: 'i-hugeicons-pdf-01',
        to: row.original.requestFile,
        target: '_blank',
        class: 'text-primary-500 border border-primary-300 rounded-md',
        label: 'EIA',
      })
    },
  },

  {
    accessorKey: 'actions',
    header: 'Acções',
    cell: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center gap-2',
        },
        [
          h(UButton, {
            variant: 'link',
            label: 'Ver',
            color: 'primary',
            size: 'sm',
            icon: 'i-hugeicons-eye',
            class: 'text-primary-500 border border-primary-300 rounded-md',
            onClick: () => onSelectLicense(row.original.id),
          }),
          h(UButton, {
            variant: 'outline',
            label: 'Aprovar',
            color: 'success',
            size: 'sm',
            icon: 'i-hugeicons-arrow-up-right-01',
          }),
          h(UButton, {
            variant: 'outline',
            label: 'Rejeitar',
            color: 'error',
            size: 'sm',
            icon: 'i-hugeicons-arrow-down-left-01',
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
  'all-licenses-entities',
  () => adminService.getLicenses(),
  {
    server: false,
  },
)

const selectedLicenseId = ref<string | null>(null)

const onSelectLicense = (license: string) => {
  selectedLicenseId.value = license
}
</script>
