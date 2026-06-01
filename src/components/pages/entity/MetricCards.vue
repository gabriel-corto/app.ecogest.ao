<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    <template v-if="response">
      <MetricCard
        :value="response?.totalProjects"
        title="Meus Projectos"
        description="Total de investimentos"
        icon="i-hugeicons-building-03"
        @click="navigateTo('/entities/projects')"
      />

      <MetricCard
        :value="response?.totalPendingProcesses"
        title="Processos em Análise"
        description="Aguardando Governo"
        icon="i-hugeicons-file-sync"
        color="#f59e0b"
        @click="navigateTo('/entities/processes')"
      />

      <MetricCard
        :value="response?.totalApprovedLicenses"
        title="Licenças Emitidas"
        description="Prontas para download"
        icon="i-hugeicons-file-sync"
        color="#10b981"
        @click="navigateTo('/entities/processes')"
      />

      <MetricCard
        :value="response?.totalRejectedLicenses"
        title="Licenças Rejeitadas"
        description="Solicitações rejeitadas"
        icon="i-hugeicons-fingerprint-scan"
        color="#dc143c"
        @click="navigateTo('/entities/processes')"
      />
    </template>

    <template v-else>
      <MetricSkeleton
        v-for="card in 4"
        :key="card"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import MetricCard from '~/components/shared/cards/MetricCard.vue'
import MetricSkeleton from '~/components/shared/MetricSkeleton.vue'
import { licenseService } from '~/services'

const { data: response } = useLazyAsyncData(
  'entity-dashboard-summary',
  () => licenseService.getDashboard(),
  {
    server: false,
  },
)
</script>
