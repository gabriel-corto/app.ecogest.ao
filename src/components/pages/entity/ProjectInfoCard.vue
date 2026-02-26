<template>
  <div class="space-y-6">
    <div
      class="border-primary-200 bg-primary-50/30 relative overflow-hidden rounded-xl border p-5"
    >
      <div class="text-primary-100/50 absolute -top-4 -right-4">
        <UIcon
          name="i-hugeicons-apartment"
          class="h-24 w-24 rotate-12"
        />
      </div>

      <div class="relative flex items-center gap-4">
        <div
          class="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-lg"
        >
          <UIcon
            name="i-hugeicons-apartment"
            class="h-6 w-6"
          />
        </div>

        <div class="flex-1">
          <p class="text-primary-700 text-lg leading-tight font-black">
            {{ props.project.name }}
          </p>
          <div class="mt-1 flex items-center gap-3 text-xs text-neutral-500">
            <UBadge
              :color="sectorColors(props.project.sector).sectorColor.value"
              variant="subtle"
              size="sm"
              >{{
                useEnumTranslator().translate('sector', props.project.sector)
              }}</UBadge
            >

            <span class="flex items-center gap-1">
              <UIcon
                name="i-hugeicons-location-01"
                class="h-3.5 w-3.5"
              />
              {{ props.project.location }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-4 text-neutral-400">
      <div class="h-[1px] flex-1 bg-neutral-100" />
      <span class="text-[10px] font-bold tracking-widest uppercase"
        >Documentação Necessária</span
      >
      <div class="h-[1px] flex-1 bg-neutral-100" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Project } from '~/types/schemas'

interface Props {
  project: Project
}
const props = defineProps<Props>()
</script>
