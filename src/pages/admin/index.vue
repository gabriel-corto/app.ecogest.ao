<!-- eslint-disable vue/component-name-in-template-casing -->
<template>
  <PageContainer
    title="Gestão do Sistema"
    subtitle="Acompanhe os principais indicadores do sistema"
  >
    <template #metrics>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          :value="12"
          title="Total de Licenças Aprovadas"
          description="Licenças Aprovadas"
          icon="i-hugeicons-files-02"
        />

        <MetricCard
          :value="12"
          title="Licenças Em Análise"
          description="Aguardam verificação"
          icon="i-hugeicons-file-sync"
        />

        <MetricCard
          :value="12"
          title="Entidades cadastradas"
          description="Entidades cadastradas"
          icon="i-hugeicons-user-square"
        />

        <MetricCard
          :value="12"
          title="Fiscalização & Auditoria"
          description="Processos de Fiscalização"
          icon="i-hugeicons-fingerprint-scan"
          color="#dc143c"
        />
      </div>

      <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <UCard class="lg:col-span-4">
          <template #header>
            <h3 class="font-bold">Gestão de Licenças</h3>
          </template>

          <client-only>
            <apexchart
              type="donut"
              :options="pieOptions"
              :series="pieSeries"
            />
          </client-only>
        </UCard>

        <UCard class="lg:col-span-8">
          <template #header>
            <h3 class="font-bold">Análise de Pedidos</h3>
          </template>
          <client-only>
            <apexchart
              type="line"
              height="300"
              :options="lineOptions"
              :series="lineSeries"
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

const pieSeries = ref([20, 20, 25])
const pieOptions: ApexOptions = {
  labels: ['Aprovadas', 'Pendentes', 'Rejeitadas'],
  colors: ['#10b981', '#eab308', '#ef4444'],
  legend: {
    position: 'bottom',
    fontFamily: 'Inter',
    itemMargin: { horizontal: 20 },
  },
  plotOptions: {
    pie: { donut: { size: '60%' } },
  },
}

const lineSeries = ref([
  {
    name: 'Licenças Emitidas',
    data: [10, 21, 35, 50, 49, 60],
  },
])

const lineOptions: ApexOptions = {
  chart: { id: 'evolution-chart', toolbar: { show: false } },
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  },
  colors: ['#dc143c'],
  stroke: { curve: 'smooth' },
}
</script>
