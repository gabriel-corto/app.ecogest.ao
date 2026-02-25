<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen">
    <div
      class="bg-primary-50 border-r-primary-200 hidden items-center justify-center overflow-hidden border-r xl:flex xl:w-1/2"
    >
      <div class="relative z-10 flex flex-col items-center gap-8 px-8">
        <div class="flex items-center gap-2">
          <img
            class="w-[450px]"
            src="/qr-code.svg"
            alt="Ecogest"
          />
        </div>

        <div class="flex flex-col items-center gap-4 text-center">
          <h3 class="text-primary-700 text-2xl font-bold">
            Software de Licenciamento Ambiental
          </h3>
          <p class="text-primary-600/80 max-w-md leading-relaxed">
            Simplifique seus processos ambientais com uma plataforma moderna,
            segura e eficiente
          </p>
        </div>
      </div>
    </div>

    <div
      class="flex w-full items-center justify-center bg-white px-4 py-8 xl:w-1/2"
    >
      <NuxtPage />
    </div>
  </div>
</template>
