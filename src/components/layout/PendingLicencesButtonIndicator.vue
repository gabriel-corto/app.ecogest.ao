<template>
  <div class="relative">
    <UButton
      size="xl"
      variant="soft"
      class="mr-2 cursor-pointer"
      icon="i-hugeicons-files-01"
      label="Processos"
    />

    <span
      class="absolute top-0 right-0 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
    >
      {{ response?.data.length ?? 0 }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { adminService } from '~/services'

const { data: response } = useLazyAsyncData(
  'all-licenses-entities',
  () => adminService.getLicenses(),
  {
    server: false,
  },
)
</script>
