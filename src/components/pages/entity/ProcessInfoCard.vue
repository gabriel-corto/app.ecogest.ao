<template>
  <div class="space-y-6">
    <div
      class="border-primary-200 bg-primary-50/30 relative overflow-hidden rounded-xl border p-5"
    >
      <div class="text-primary-100/50 absolute -top-4 -right-4">
        <UIcon
          name="i-hugeicons-license"
          class="h-24 w-24 rotate-12"
        />
      </div>

      <div class="relative flex items-center gap-4">
        <div
          class="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-lg"
        >
          <UIcon
            name="i-hugeicons-file-02"
            class="h-6 w-6"
          />
        </div>

        <div class="flex-1">
          <p class="text-primary-700 text-lg leading-tight font-black">
            {{ props.license.number }}
          </p>

          <div class="mt-1 flex flex-col gap-1">
            <p class="text-sm font-medium text-neutral-700 italic">
              {{ props.license.project?.name }}
            </p>

            <div class="flex items-center gap-3 text-xs text-neutral-500">
              <span class="flex items-center gap-1 text-[10px]">
                <UIcon
                  name="i-hugeicons-location-01"
                  class="h-3.5 w-3.5"
                />
                {{ props.license.project?.location }}
              </span>

              <UBadge
                :color="statusColors(props.license.status).statusColor.value"
                variant="subtle"
                size="sm"
                class="font-bold"
              >
                {{
                  useEnumTranslator().translate('status', props.license.status)
                }}
              </UBadge>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-4 text-neutral-400">
      <div class="h-[1px] flex-1 bg-neutral-100" />
      <span class="text-[10px] font-bold tracking-widest uppercase"
        >Actualização de Ficheiros</span
      >
      <div class="h-[1px] flex-1 bg-neutral-100" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { License } from '~/types/schemas'

interface Props {
  license: License
}

const props = defineProps<Props>()
</script>
