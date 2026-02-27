<template>
  <UFormField name="project">
    <USelectMenu
      v-model="model"
      class="w-full"
      placeholder="Selecione o Projecto"
      :search-input="{
        placeholder: 'Pesquisar',
        icon: 'hugeicons:search-01',
      }"
      icon="hugeicons:search-01"
      size="xl"
      name="project"
      label-key="name"
      :loading="status === 'pending'"
      :items="projectsToSelect"
      @blur="emit('blur')"
    />
  </UFormField>
</template>
<script lang="ts" setup>
import { projectsService } from '~/services'
import type { Project } from '~/types/schemas'

const emit = defineEmits(['blur'])

const model = defineModel<Project | undefined>()

const { data: response, status } = useLazyAsyncData(
  'all-projects-entities',
  () => projectsService.getAllByEntity(),
  {
    server: false,
  },
)

const projectsToSelect = computed(() => {
  return response.value?.data.filter(project => {
    return project.status !== 'INACTIVE' && !project.hasLicense
  })
})
</script>
