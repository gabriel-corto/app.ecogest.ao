<!-- eslint-disable vue/component-name-in-template-casing -->
<template>
  <UCard class="lg:col-span-4">
    <template #header>
      <h3 class="font-bold">Gestão de Licenças</h3>
    </template>

    <template v-if="response">
      <client-only>
        <apexchart
          type="donut"
          :options="pieOptions"
          :series="pieSeries"
        />
      </client-only>
    </template>

    <template v-else-if="status === 'pending'">
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

    <template v-else-if="isEmpty">
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

const { data: response, status } = useLazyAsyncData(
  'all-admin-metrics',
  () => adminService.getMetrics(),
  {
    server: false,
  },
)

const pieSeries = computed(() => {
  if (response.value) {
    return [
      Number(response.value.totalRejected || 0),
      Number(response.value.totalPending || 0),
      Number(response.value.totalApproved || 0),
    ]
  }

  return [12, 12, 12]
})

const isEmpty = computed(
  () =>
    response.value?.totalApproved === 0 &&
    response.value.totalEntities === 0 &&
    response.value.totalPending === 0 &&
    response.value.totalRejected === 0,
)

const pieOptions: ApexOptions = {
  labels: ['Rejeitadas', 'Pendentes', 'Aprovadas'],
  colors: ['#dc143c', '#eab308', '#10b981'],
  legend: {
    position: 'bottom',
    fontFamily: 'Inter',
    itemMargin: { horizontal: 20 },
  },
  plotOptions: {
    pie: { donut: { size: '60%' } },
  },
}
</script>
