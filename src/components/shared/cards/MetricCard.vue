<template>
  <div
    class="cursor-pointer rounded-lg border border-neutral-200 bg-white p-6"
    :style="{ borderTopColor: props.color || '#525252', borderTopWidth: '4px' }"
    @click="props.onClick"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs font-bold tracking-wider text-neutral-500 uppercase">
          {{ props.title }}
        </p>

        <div class="flex flex-col">
          <p class="mt-1 text-2xl font-black text-neutral-900">
            {{ props.value }}
          </p>
          <p class="text-[10px] font-medium text-neutral-400">
            {{ props.description }}
          </p>
        </div>
      </div>

      <div
        class="flex h-12 w-12 items-center justify-center rounded-xl transition-colors"
        :style="{
          backgroundColor: `${props.color || '#525252'}15`,
          color: props.color || '#525252',
        }"
      >
        <UIcon
          :name="props.icon"
          class="h-7 w-7"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MetricCardItem {
  title: string
  value: string | number
  description: string
  icon: string
  color?: string
  onClick?: () => void
}

const props = defineProps<MetricCardItem>()
</script>
