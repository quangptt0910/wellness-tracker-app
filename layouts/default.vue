<!-- layouts/default.vue -->
<script setup lang="ts">
import { useNavigationMenu } from '@/composables/useNavigationMenu';

const { items } = useNavigationMenu();
const searchQuery = ref('');
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Enhanced Header with Nuxt UI Pro styling -->
    <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
      <UContainer class="py-3">
        <div class="grid grid-cols-12 gap-4">
          <!-- App name pushed to far left -->
          <div class="col-span-2 flex items-center">
            <NuxtLink
                to="/"
                class="text-xl font-bold tracking-tight flex items-center gap-2"
            >
              <UIcon name="i-heroicons-heart" class="text-primary-600 w-6 h-6" />
              <span class="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Wellness Tracker
              </span>
            </NuxtLink>
          </div>

          <!-- Centered search bar with enhancements -->
          <div class="col-span-8 flex justify-center">
            <UInput
                v-model="searchQuery"
                placeholder="Search supplements, vitamins, proteins..."
                icon="i-heroicons-magnifying-glass"
                size="xl"
                :ui="{
                base: 'max-w-xl w-full shadow-sm',
                trailingIcon: { base: 'text-gray-400 dark:text-gray-500' },
                padding: { l: 'px-5 py-2.5' }
              }"
                autocomplete="off"
                class="transition-all duration-300 "
            >
                <UButton
                    v-if="searchQuery"
                    color="info"
                    variant="ghost"
                    icon="i-heroicons-x-mark"
                    :ui="{ rounded: 'rounded-full' }"
                    :padded="false"
                    class="hover:bg-gray-200 dark:hover:bg-gray-700"
                    @click="searchQuery = ''"
                />
            </UInput>
          </div>

          <!-- Navigation menu with improved styling -->
          <div class="col-span-2 flex justify-end">
            <UNavigationMenu
                :items="items"
                :unmount-on-hide="false"
                :ui="{
                wrapper: 'gap-1',
                item: {
                  base: 'group relative',
                  padding: 'px-3 py-2',
                  rounded: 'rounded-lg',
                  active: 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900',
                  inactive: 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              }"
            >
              <template #default="{ item, open }">
                <span class="flex items-center gap-1.5">
                  <UIcon :name="item.icon" class="w-5 h-5 flex-shrink-0" />
                  <span class="truncate">{{ item.label }}</span>
                  <UIcon
                      v-if="item.children"
                      name="i-heroicons-chevron-down"
                      class="w-4 h-4 transition-transform duration-200"
                      :class="[open && 'rotate-180']"
                  />
                </span>
              </template>
            </UNavigationMenu>
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