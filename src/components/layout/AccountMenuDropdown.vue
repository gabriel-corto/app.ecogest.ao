<script setup lang="ts">
const authStore = useAuthStore()
</script>

<template>
  <div>
    <UAvatar
      size="xl"
      src=""
      :alt="authStore.user?.name"
      :ui="{
        fallback: 'text-white font-extrabold',
      }"
      class="cursor-pointer bg-primary text-sm text-white uppercase"
    />
  </div>
</template>
