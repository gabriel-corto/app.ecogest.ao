<template>
  <div
    class="flex flex-col items-center space-y-2"
    :class="position === 'left' && 'items-start'"
  >
    <img
      class="w-18"
      src="/logo.svg"
      alt=""
    />
    <h1 class="text-xl font-semibold">{{ props.title }}</h1>
    <p class="text-14">{{ props.subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  position?: 'left' | 'center'
}
const props = defineProps<Props>()
</script>
