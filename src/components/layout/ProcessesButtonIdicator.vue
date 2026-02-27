<template>
  <div class="relative">
    <UButton
      size="xl"
      variant="soft"
      class="mr-2 cursor-pointer"
      icon="i-hugeicons-files-01"
      to="/entities/processes"
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
import { licenseService } from '~/services'

const { data: response } = useLazyAsyncData(
  'all-processes-entities',
  () => licenseService.getLicenses(),
  {
    server: false,
  },
)
</script>
