<template>
  <header
    class="sticky top-0 z-50 flex w-full items-center justify-between border-b border-neutral-200 bg-white/80 px-10 py-4 backdrop-blur-lg"
  >
    <div class="flex items-center gap-3">
      <div
        v-if="authStore.user"
        class="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white"
      >
        <UIcon
          :name="useRoleIcon(authStore.user.role) as string"
          class="h-5 w-5"
          form
        />
      </div>
      <div>
        <p class="text-xs font-medium text-neutral-500">Bem-vindo de volta</p>
        <h1 class="text-base font-semibold text-neutral-800">
          {{ authStore.user?.name }}
        </h1>
      </div>
    </div>

    <div class="relative max-w-xl flex-1 px-12">
      <UInput
        v-model="searchQuery"
        size="costum"
        icon="i-hugeicons-search-01"
        placeholder="Pesquisar processos, documentos..."
        class="w-96"
      >
        <template
          v-if="searchQuery"
          #trailing
        >
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-hugeicons-cancel-01"
            size="xs"
            class="rounded-full"
            @click="searchQuery = ''"
          />
        </template>
      </UInput>
    </div>

    <div class="flex items-center justify-between gap-3">
      <ProcessesButtonIdicator v-if="authStore?.user?.role === 'COMPANY'" />
      <ProjectsButtonIndicator v-if="authStore?.user?.role === 'COMPANY'" />

      <EntitiesManagmentButtonIndicator
        v-if="authStore?.user?.role === 'ADMIN'"
      />

      <PendingLicencesButtonIndicator
        v-if="authStore?.user?.role === 'ADMIN'"
      />

      <NotificationsButtonIndicator />
      <div class="h-8 w-px bg-neutral-200" />

      <AccountMenuDropdown />
    </div>
  </header>
</template>

<script setup lang="ts">
import AccountMenuDropdown from './AccountMenuDropdown.vue'
import EntitiesManagmentButtonIndicator from './EntitiesManagmentButtonIndicator.vue'
import NotificationsButtonIndicator from './NotificationsButtonIndicator.vue'
import PendingLicencesButtonIndicator from './PendingLicencesButtonIndicator.vue'
import ProcessesButtonIdicator from './ProcessesButtonIdicator.vue'
import ProjectsButtonIndicator from './ProjectsButtonIndicator.vue'

const authStore = useAuthStore()

const searchQuery = ref('')
</script>
