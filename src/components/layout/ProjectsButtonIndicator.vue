<template>
  <div class="relative">
    <UButton
      size="xl"
      variant="soft"
      class="mr-2 cursor-pointer"
      icon="i-hugeicons-apartment"
      to="/entities/projects"
      label="Meus Projectos"
    />

    <span
      v-if="response?.data.length"
      class="absolute top-0 right-0 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
    >
      {{ response?.data.length ?? 0 }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { projectsService } from '~/services'

const { data: response } = await useLazyAsyncData(
  'all-company-projects',
  () => projectsService.getAllByEntity(),
  {
    server: false,
  },
)
</script>
