<script setup lang="ts">
useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk} | ECOGEST` : 'ECOGEST'
  },
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator
      :height="3"
      color="#BE8D5B"
    />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
