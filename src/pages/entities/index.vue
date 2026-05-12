<!-- eslint-disable vue/component-name-in-template-casing -->
<template>
  <PageContainer
    title="Visão Geral"
    subtitle="Tenha a visão geral de seus processos e licenças"
  >
    <template #metrics>
      <MetricCards />

      <div class="mt-8">
        <EntityGraphic />
      </div>
    </template>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/shared/layout/PageContainer.vue'
import EntityGraphic from '~/components/pages/entity/EntityGraphic.vue'

import MetricCards from '~/components/pages/entity/MetricCards.vue'

definePageMeta({
  layout: 'default',
})
</script>
