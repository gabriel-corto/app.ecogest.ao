<template>
  <aside class="relative h-full w-1/4 border-l border-neutral-200 bg-white p-6">
    <div
      class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[1px]"
    >
      <UIcon
        name="i-hugeicons-loading-03"
        class="text-primary-600 h-10 w-10 animate-spin"
      />
      <p class="mt-4 animate-pulse text-sm font-medium text-neutral-500">
        Carregando Dados...
      </p>
    </div>

    <div
      class="pointer-events-none flex h-full flex-col gap-8 opacity-20 grayscale"
    >
      <div
        class="flex items-center justify-between border-b border-neutral-100 pb-4"
      >
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-lg bg-neutral-200" />
          <div class="h-6 w-32 rounded bg-neutral-200" />
        </div>
      </div>

      <div class="space-y-8">
        <div
          v-for="i in 2"
          :key="i"
        >
          <div class="mb-2 h-3 w-24 rounded bg-neutral-100" />
          <div class="h-5 w-48 rounded bg-neutral-200" />
        </div>
      </div>

      <div class="mt-auto border-t border-neutral-100 pt-6">
        <div class="h-10 w-full rounded-md bg-neutral-200" />
      </div>
    </div>
  </aside>
</template>
