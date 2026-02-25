<template>
  <div
    class="border-t-primary-600 rounded-lg border border-t border-neutral-200 bg-white p-6 transition-shadow"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-neutral-600">{{ props.title }}</p>

        <div class="flex items-center gap-3">
          <p class="mt-2 text-2xl font-bold text-neutral-900">
            {{ props.value }}
          </p>
          <p class="mt-2 text-xs text-neutral-500">{{ props.description }}</p>
        </div>
      </div>

      <div
        class="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600"
      >
        <UIcon
          :name="props.icon"
          class="h-6 w-6"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MetricCardItem } from '~/types/components'

const props = defineProps<MetricCardItem>()
</script>
