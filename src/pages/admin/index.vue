<!-- eslint-disable vue/component-name-in-template-casing -->
<template>
  <PageContainer
    title="Gestão do Sistema"
    subtitle="Acompanhe os principais indicadores do sistema"
  >
    <template #metrics>
      <MetricCards />

      <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <AdminDashboardGraphic />
        <AdminDashboardLineGraphic />
      </div>
    </template>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/shared/layout/PageContainer.vue'

import AdminDashboardGraphic from '~/components/pages/admin/AdminDashboardGraphic.vue'
import AdminDashboardLineGraphic from '~/components/pages/admin/AdminDashboardLineGraphic.vue'
import MetricCards from '~/components/pages/admin/MetricCards.vue'

definePageMeta({
  layout: 'default',
})
</script>
