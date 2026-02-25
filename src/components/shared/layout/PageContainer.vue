<template>
  <div class="flex flex-col gap-10 px-11 py-16">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-semibold text-neutral-800">
          {{ props.title }}
        </h1>
        <p class="mt-2 text-neutral-600">
          {{ props.subtitle }}
        </p>
      </div>

      <div class="flex">
        <UButton
          v-if="props.exportable"
          size="xl"
          variant="outline"
          icon="i-hugeicons-file-download"
          class="h-11 cursor-pointer rounded-xl px-6"
        >
          Exportar Dados
        </UButton>

        <div class="ml-3 flex gap-3">
          <slot name="right" />
        </div>
      </div>
    </div>

    <slot name="metrics" />
    <slot name="default" />
    <slot name="table" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  exportable?: boolean
}

const props = defineProps<Props>()

useHead({
  title: props.title,
})
</script>
