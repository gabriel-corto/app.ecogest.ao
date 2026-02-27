<template>
  <div class="flex h-full w-full flex-1">
    <div class="w-3/4 flex-1">
      <PageContainer
        title="Gestão de Processos"
        subtitle="Gestão e Administração de Processos"
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
                  color="primary"
                  size="lg"
                  label="Solicitar Processo de Licenciamento"
                  icon="i-hugeicons-add-01"
                  @click="onRequestLicense()"
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
import type { License } from '~/types/schemas'

import PageContainer from '~/components/shared/layout/PageContainer.vue'
import TableContainer from '~/components/shared/layout/TableContainer.vue'
import TableFilterLine from '~/components/shared/layout/TableFilterLine.vue'
import { licenseService } from '~/services'

import { UBadge, UButton } from '#components'
import { useRequestLicenseModal } from '~/domain/projects'

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
    header: 'Documento Anexado',
    cell: ({ row }) => {
      return h(UButton, {
        variant: 'link',
        label: 'EIA',
        color: 'primary',
        size: 'sm',
        icon: 'i-hugeicons-files-02',
        to: row.original.requestFile,
        target: '_blank',
        class: 'text-primary-500 border border-primary-300 rounded-md',
      })
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Solicitado em',
    cell: ({ row }) => {
      return h('span', useDateFormatter(row.original.createdAt))
    },
  },
]

const {
  data: response,
  status,
  refresh,
} = useLazyAsyncData(
  'all-processes-entities',
  () => licenseService.getLicenses(),
  {
    server: false,
  },
)

const onRequestLicense = async () => {
  const data = await useRequestLicenseModal()

  if (data) {
    refresh()
  }
}
</script>
