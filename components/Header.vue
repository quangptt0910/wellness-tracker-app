<!-- components/Header.vue -->
<script setup lang="ts">
import { useNavigationMenu } from '~/composables/useNavigationMenu'
import {useAuthStore} from "~/store/auth";

const { items } = useNavigationMenu();
const searchQuery = ref('');
const authStore = useAuthStore();

const handleLogout = async () => {
  try {
    authStore.logout();
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>

<template>
  <header class="border-b border-gray-200 accent-primary-800 bg-primary-200
       sticky top-0 z-50 shadow-sm">
    <UContainer class="py-3">
      <div class="flex items-center justify-between gap-6">
        <!-- App name pushed to far left -->
        <div class="flex items-center flex-shrink-0">
          <NuxtLink
              to="/"
              class="text-xl font-bold tracking-tight flex items-center gap-2"
          >
            <UIcon name="i-heroicons-heart" class="text-secondary-600 w-6 h-6" />
            <span class="text-primary-950 hover:text-primary-600  transition-colors text-2xl">
                  PureDose
                </span>
          </NuxtLink>
        </div>


        <!-- Centered navigation menu -->
        <div class="flex flex-1 justify-center">
          <UNavigationMenu
              arrow
              content-orientation="vertical"
              :items="items"
              :ui="{
                  root: 'gap-1',
                  item: 'px-3 py-2 rounded-lg text-primary-600 hover:text-primary-600 hover:bg-primary-300',
                }"
          >
          </UNavigationMenu>
        </div>

        <!-- Side searchbar and auth section -->
        <div class="flex items-center flex-shrink-0 gap-4">
          <!-- Search Input -->
          <UInput
              v-model="searchQuery"
              placeholder="Search for supplements"
              trailing-icon="i-heroicons-magnifying-glass"
              size="xl"
              variant="outline"
              color="primary"
              autocomplete="off"
              class="max-w-lg w-full rounded-full shadow-lg transition-all duration-300 hover:shadow-xl focus-within:shadow-xl [&>input]:rounded-full [&>input]:bg-primary-50 [&>input]:text-primary-900 [&>input]:placeholder-primary-400 [&>input]:ring-primary-300 [&>input]:focus:ring-primary-500 [&>input]:focus:ring-2"
          >
            <template v-if="searchQuery?.length" #trailing>
              <UButton
                  color="primary"
                  variant="ghost"
                  icon="i-lucide-circle-x"
                  :padded="false"
                  class="rounded-full hover:scale-110 transition-transform duration-200 text-primary-600 hover:bg-primary-100"
                  @click="searchQuery = ''"
              />
            </template>
          </UInput>

          <!-- Auth Section -->
          <div class="flex items-center">
            <!-- Unauthenticated State -->
            <template v-if="!authStore.isAuthenticated">
              <div class="flex items-center gap-2">
                <NuxtLink
                    to="/auth/login"
                    class="px-6 py-2 hover:bg-primary-300 text-sm font-semibold flex-shrink-0 rounded-lg transition-colors duration-200"
                >
                  Login
                </NuxtLink>
                <NuxtLink
                    to="/auth/register"
                    class="px-6 py-2 bg-primary-400 hover:bg-primary-700 text-white font-semibold text-sm flex-shrink-0 rounded-lg transition-colors duration-200"
                >
                  Sign Up
                </NuxtLink>
              </div>
            </template>

            <!-- Authenticated State -->
            <template v-else>
              <div class="flex items-center gap-4">
                <span> </span>
                <div class="flex items-center gap-2">
                  <NuxtLink
                      to="/profile"
                      class="px-4 py-2 hover:bg-primary-300 text-primary-400 font-semibold flex-shrink-0 rounded-lg transition-colors duration-200"
                  >
                    Profile
                  </NuxtLink>
                  <button
                      @click="handleLogout"
                      class="px-6 py-2 hover:bg-red-100 text-sm font-semibold flex-shrink-0 rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>

      </div>
    </UContainer>
  </header>
</template>

<style scoped>
</style>

