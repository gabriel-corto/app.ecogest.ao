<template>
  <USelectMenu
    v-model="model"
    label-key="label"
    :search-input="{
      placeholder: 'Pesquisar Sector',
      icon: 'hugeicons:search-01',
    }"
    value-key="value"
    :items="sectorItems"
    name="sector"
    class="w-full"
    size="normal"
    icon="i-hugeicons-work"
    placeholder="Selecione o sector"
  />
</template>

<script setup lang="ts">
import { sectorItems } from '~/data/sectors'
import type { SectorItem } from '~/types/schemas'

const model = defineModel<SectorItem | SectorItem[] | undefined>(undefined)
</script>
