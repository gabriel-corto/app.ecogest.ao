<!-- eslint-disable vue/component-name-in-template-casing -->
<template>
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
</template>

<script lang="ts" setup>
import type { ApexOptions } from 'apexcharts'
import { licenseService } from '~/services'

const { data: response } = useLazyAsyncData(
  'entity-analysis',
  () => licenseService.getDashboardAnalysis(),
  {
    server: false,
  },
)

const barSeries = computed(() => {
  if (!response.value) return []
  return [
    {
      name: 'Processos Iniciados',
      data: response.value.map(item => item.total),
    },
  ]
})

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
