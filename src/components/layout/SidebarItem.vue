<script setup lang="ts">
import FooterBar from './FooterBar.vue'
const items = useSidebarItems()
</script>

<template>
  <aside
    class="border-primary-100 bg-primary-50 flex h-full w-[280px] flex-col justify-between border-r-2 p-5"
  >
    <div>
      <div class="flex items-center gap-4">
        <img
          class="w-12"
          src="/logo.svg"
          alt=""
        />

        <h1 class="text-primary-600 text-2xl font-bold">ECOGEST</h1>
      </div>

      <UNavigationMenu
        arrow
        :items="items"
        :highlight="true"
        orientation="vertical"
        highlight-color="primary"
        class="data-[orientation=vertical]:w-56"
      />
    </div>

    <FooterBar />
  </aside>
</template>
