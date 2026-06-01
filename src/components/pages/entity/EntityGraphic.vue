<!-- eslint-disable vue/component-name-in-template-casing -->
<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100"
        >
          <UIcon
            name="i-hugeicons-chart-histogram"
            class="h-4.5 w-4.5 text-neutral-600"
          />
        </div>
        <h3 class="font-bold">Análise de Licenças Emitidas</h3>
      </div>
    </template>

    <template v-if="isLoading">
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

    <template v-else-if="hasData">
      <client-only>
        <apexchart
          type="bar"
          height="300"
          :options="barOptions"
          :series="barSeries"
        />
      </client-only>
    </template>

    <template v-else>
      <div
        class="flex h-[300px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-neutral-200 bg-neutral-50/30"
      >
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100/80"
        >
          <UIcon
            name="i-hugeicons-chart-bar-line"
            class="h-7 w-7 text-neutral-500"
          />
        </div>

        <div class="space-y-1 text-center">
          <h4 class="text-base font-semibold text-neutral-700">
            Sem dados disponíveis
          </h4>
          <p class="max-w-xs text-sm text-neutral-400">
            Os dados de análise de pedidos serão exibidos aqui assim que
            existirem processos registados.
          </p>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { ApexOptions } from 'apexcharts'
import { licenseService } from '~/services'

const { data: response, status } = useLazyAsyncData(
  'entity-analysis',
  () => licenseService.getDashboardAnalysis(),
  {
    server: false,
  },
)

const isLoading = computed(() => status.value === 'pending')

const hasData = computed(() => {
  if (!response.value || response.value.length === 0) return false
  return response.value.some(item => item.total > 0)
})

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
