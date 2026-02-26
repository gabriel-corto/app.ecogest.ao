<!-- eslint-disable vue/component-name-in-template-casing -->
<template>
  <PageContainer
    title="Visão Geral"
    subtitle="Tenha a visão geral de seus processos e licenças"
  >
    <template #metrics>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          :value="15"
          title="Meus Projectos"
          description="Total de investimentos"
          icon="i-hugeicons-apartment"
        />

        <MetricCard
          :value="8"
          title="Processos em Análise"
          description="Aguardando Governo"
          icon="i-hugeicons-file-sync"
          color="#ca8a04"
        />

        <MetricCard
          :value="4"
          title="Licenças Emitidas"
          description="Prontas para download"
          icon="i-hugeicons-qr-code"
          color="#16a34a"
        />

        <MetricCard
          :value="2"
          title="Licenças a Expirar"
          description="Renovação necessária"
          icon="i-hugeicons-alert-01"
          color="#dc143c"
        />
      </div>

      <div class="mt-8">
        <UCard>
          <template #header>
            <h3 class="font-bold">Análise de Pedidos</h3>
          </template>
          <client-only>
            <apexchart
              type="bar"
              height="300"
              :options="barOptions"
              :series="barSeries"
            />
          </client-only>
        </UCard>
      </div>
    </template>
  </PageContainer>
</template>

<script setup lang="ts">
import MetricCard from '@/components/shared/cards/MetricCard.vue'
import PageContainer from '@/components/shared/layout/PageContainer.vue'

import type { ApexOptions } from 'apexcharts'

definePageMeta({
  layout: 'default',
})

const barSeries = ref([
  {
    name: 'Processos Iniciados',
    data: [4, 3, 10, 9, 29, 19],
  },
])

const barOptions: ApexOptions = {
  chart: {
    type: 'bar',
    toolbar: { show: true },
  },
  plotOptions: {
    bar: { borderRadius: 4, columnWidth: '45%', distributed: false },
  },
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    axisBorder: { show: true },
  },
  colors: ['#10b981'],
  grid: { strokeDashArray: 4 },
}
</script>
