<!-- layouts/default.vue -->
<script setup lang="ts">
import { useNavigationMenu } from '~/composables/useNavigationMenu';

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Enhanced Header with Nuxt UI Pro styling -->
    <header class="border-b border-gray-200 accent-primary-800 bg-primary-200 sticky top-0 z-50 shadow-sm">
      <UContainer class="py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center flex-shrink-0">
            <NuxtLink
                to="/"
                class="text-3xl font-bold tracking-tight flex items-center gap-2"
            >
              <UIcon name="i-heroicons-heart" class="text-secondary-600 w-6 h-6" />
              <span class="text-primary-950 hover:text-primary-600  transition-colors">
                PureDose
              </span>
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </header>

    <!-- Page Content -->
    <main class="flex-grow">
      <slot />
    </main>
  </div>
</template>