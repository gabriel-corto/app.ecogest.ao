<template>
  <div v-if="authStore.user && authStore.user.role === 'COMPANY'">
    <UBadge
      size="md"
      variant="subtle"
      :color="useStatusColor(authStore.user.status)"
      :label="useIdentificationStatusTranslation(authStore.user.status)"
      class="cursor-pointer uppercase"
    />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
</script>
