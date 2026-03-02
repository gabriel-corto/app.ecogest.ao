<!-- eslint-disable vue/component-name-in-template-casing -->
<template>
  <UCard class="lg:col-span-8">
    <template #header>
      <h3 class="font-bold">Análise de Pedidos de Licenças</h3>
    </template>

    <template v-if="response">
      <client-only>
        <apexchart
          type="line"
          height="300"
          :options="lineOptions"
          :series="lineSeries"
        />
      </client-only>
    </template>

    <template v-else>
      <div
        class="flex h-[300px] flex-col items-center justify-center space-y-4"
      >
        <div class="flex h-48 w-48 items-center justify-center">
          <UIcon
            name="i-hugeicons-loading-03"
            class="h-12 w-12 animate-spin text-neutral-500"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { ApexOptions } from 'apexcharts'
import { adminService } from '~/services'

const { data: response } = useLazyAsyncData(
  'all-admin-metrics-by-year',
  () => adminService.getMetricsByYear(),
  {
    server: false,
  },
)

const lineSeries = computed(() => {
  if (response.value) {
    return [
      {
        name: 'Licenças Emitidas',
        data: [
          response.value.total2023,
          response.value.total2024,
          response.value.total2025,
          response.value.total2026,
          response.value.total2027,
        ],
      },
    ]
  }

  return [
    {
      name: 'Licenças Emitidas',
      data: [21, 35, 50, 49, 60],
    },
  ]
})

const lineOptions: ApexOptions = {
  chart: { id: 'evolution-chart', toolbar: { show: false } },
  xaxis: {
    categories: ['2023', '2024', '2025', '2026', '2027'],
  },
  colors: ['#dc143c'],
  stroke: { curve: 'monotoneCubic' },
}
</script>
