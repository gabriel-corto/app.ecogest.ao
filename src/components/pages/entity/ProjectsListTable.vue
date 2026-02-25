<template>
  <TableContainer>
    <TableFilterLine>
      <div class="flex min-w-[300px] flex-1 items-center gap-6">
        <UButton
          variant="soft"
          color="neutral"
          size="lg"
          icon="i-hugeicons-arrow-reload-horizontal"
          @click="refreshTable()"
        />

        <UInput
          size="lg"
          icon="i-hugeicons-search-01"
          placeholder="Pesquisar..."
          class="w-82"
        />
      </div>

      <USelectMenu
        placeholder="Filtrar por sector"
        size="lg"
        class="w-48"
      />

      <UButton
        variant="soft"
        color="neutral"
        size="xl"
        icon="i-hugeicons-filter-remove"
      />

      <UButton
        size="xl"
        icon="i-hugeicons-add-01"
        class="rounded-xl px-8"
        @click="openCreateProjectModal()"
      >
        Cadastrar projecto
      </UButton>
    </TableFilterLine>

    <UTable
      :data="response"
      :columns="columns"
      :loading="status === 'pending'"
      empty="Nenhum Projecto Cadastrado"
      class="flex-1"
    >
      <template #options-cell="{ row }">
        <UDropdownMenu :items="getOptionsItems(row.original)">
          <UButton
            size="md"
            icon="i-hugeicons-more-horizontal"
            color="neutral"
            variant="ghost"
            class="cursor-pointer"
          />
        </UDropdownMenu>
      </template>
    </UTable>
  </TableContainer>
</template>

<script setup lang="ts">
import { UIcon } from '#components'
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import TableContainer from '~/components/shared/layout/TableContainer.vue'
import TableFilterLine from '~/components/shared/layout/TableFilterLine.vue'
import { useCreateProjectModal } from '~/domain/projects'
import { projectsService } from '~/services'
import type { Project } from '~/types/schemas'

const UBadge = resolveComponent('UBadge')

const columns: TableColumn<Project>[] = [
  {
    accessorKey: 'slug',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2' }, [
        h(UIcon, {
          name: 'i-hugeicons-files-01',
          size: '18',
        }),
        h('span', row.original.name),
      ]),
  },

  {
    accessorKey: 'locale',
    header: 'Localização',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2' }, [
        h(UIcon, {
          name: 'i-hugeicons-location-01',
          size: '18',
        }),
        h('span', row.original.locale),
      ]),
  },
  {
    accessorKey: 'sector',
    header: 'Sector de actividade',
    cell: ({ row }) => {
      return h(UBadge, {
        class: 'capitalize w-28 flex rounded-md justify-center',
        variant: 'subtle',
        color: 'primary',
        size: 'md',
        label: useSectorEnum(row.original.sector),
      })
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Data de criação',
    cell: ({ row }) => {
      return h('span', useDateFormatter(row.original.createdAt))
    },
  },
  {
    accessorKey: 'options',
    header: 'Acções',
  },
]

const {
  data: response,
  status,
  refresh: refreshTable,
} = await useLazyAsyncData(
  'get-projects',
  () => projectsService.getProjects(),
  {
    server: false,
  },
)

const openCreateProjectModal = async () => {
  const data = await useCreateProjectModal()

  if (data) {
    refreshTable()
  }
}

const getOptionsItems = (project: Project) => {
  const items: DropdownMenuItem[] = [
    {
      label: 'Eliminar',
      color: 'error',
      icon: 'i-hugeicons-delete-02',
      onSelect: async () => {
        const deleted = await projectsService.deleteProject(project.id)

        if (deleted) {
          refreshTable()
        }
      },
    },
  ]

  return items
}
</script>
