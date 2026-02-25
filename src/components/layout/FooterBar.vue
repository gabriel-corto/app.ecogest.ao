<script setup lang="ts">
const authStore = useAuthStore()

const signOut = async () => await authStore.signOut()
</script>

<template>
  <div>
    <UButton
      icon="i-hugeicons-logout-02"
      color="error"
      class="w-54 cursor-pointer rounded-lg"
      size="xl"
      label="Terminar Sessão"
      variant="ghost"
      @click="signOut()"
    />
  </div>
</template>
