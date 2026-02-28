<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    <template v-if="response">
      <MetricCard
        :value="response?.totalEntities"
        title="Entidades cadastradas"
        description="Entidades cadastradas"
        icon="i-hugeicons-user-square"
        @click="navigateTo('/admin/entities')"
      />

      <MetricCard
        :value="response?.totalApproved"
        title="Licenças Emitidas"
        description="Licenças Aprovadas e Emitidas"
        icon="i-hugeicons-files-02"
        @click="navigateTo('/admin/licenses')"
      />

      <MetricCard
        :value="response?.totalPending"
        title="Processos Pendentes"
        description="Aguardam verificação"
        icon="i-hugeicons-file-sync"
        @click="navigateTo('/admin/licenses')"
      />

      <MetricCard
        :value="response?.totalRejected"
        title="Processos Rejeitados"
        description="Solicitações de licenças rejeitadas"
        icon="i-hugeicons-fingerprint-scan"
        color="#dc143c"
        @click="navigateTo('/admin/licenses')"
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
import { adminService } from '~/services'

const { data: response } = useLazyAsyncData(
  'all-admin-metrics',
  () => adminService.getMetrics(),
  {
    server: false,
  },
)
</script>
