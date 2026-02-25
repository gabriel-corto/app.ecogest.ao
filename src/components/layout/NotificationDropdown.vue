<template>
  <div class="relative flex items-center gap-4">
    <UDropdownMenu
      arrow
      :items="notificationItems"
      :content="{
        align: 'center',
      }"
      :ui="{
        content: 'w-92',
      }"
    >
      <UButton
        size="xl"
        variant="ghost"
        class="cursor-pointer"
        icon="i-hugeicons-notification-01"
      />

      <span
        class="absolute top-1 right-0 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
      >
        2
      </span>
    </UDropdownMenu>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const notificationItems: DropdownMenuItem[] = [
  {
    label: 'A sua identificação foi aprovada com sucesso!',
    icon: 'i-hugeicons-notification-01',
    class: 'p-3 cursor-pointer',
  },
]
</script>
