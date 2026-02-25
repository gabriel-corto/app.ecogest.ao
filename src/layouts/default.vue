<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Sidebar from '@/components/layout/SidebarItem.vue'
</script>

<template>
  <main class="flex h-screen w-screen">
    <Sidebar />

    <div class="flex flex-1 flex-col">
      <Header />

      <div class="flex-1 overflow-auto">
        <slot />
      </div>
    </div>
  </main>
</template>
