<!--&lt;!&ndash; layouts/default.vue &ndash;&gt;-->
<!--<script setup lang="ts">-->
<!--import { useNavigationMenu } from '~/composables/useNavigationMenu';-->

<!--const { items } = useNavigationMenu();-->
<!--const searchQuery = ref('');-->
<!--</script>-->

<!--<template>-->
<!--  <div class="min-h-screen flex flex-col">-->
<!--    &lt;!&ndash; Enhanced Header with Nuxt UI Pro styling &ndash;&gt;-->
<!--    <header class="border-b border-gray-200 accent-primary-800 bg-primary-200-->
<!--     sticky top-0 z-50 shadow-sm">-->
<!--      <UContainer class="py-3">-->
<!--        <div class="flex items-center justify-between gap-6">-->
<!--        &lt;!&ndash; App name pushed to far left &ndash;&gt;-->
<!--          <div class="flex items-center flex-shrink-0">-->
<!--            <NuxtLink-->
<!--                to="/"-->
<!--                class="text-xl font-bold tracking-tight flex items-center gap-2"-->
<!--            >-->
<!--              <UIcon name="i-heroicons-heart" class="text-secondary-600 w-6 h-6" />-->
<!--              <span class="text-primary-950 hover:text-primary-600  transition-colors">-->
<!--                PureDose-->
<!--              </span>-->
<!--            </NuxtLink>-->
<!--          </div>-->


<!--          &lt;!&ndash; Centered navigation menu &ndash;&gt;-->
<!--          <div class="flex flex-1 justify-center">-->
<!--            <UNavigationMenu-->
<!--                arrow-->
<!--                content-orientation="vertical"-->
<!--                :items="items"-->
<!--                :ui="{-->
<!--                root: 'gap-1',-->
<!--                item: 'px-3 py-2 rounded-lg text-primary-600 hover:text-primary-600 hover:bg-secondary-200',-->
<!--              }"-->
<!--            >-->
<!--            </UNavigationMenu>-->


<!--          </div>-->

<!--          &lt;!&ndash; Side searchbar &ndash;&gt;-->
<!--          <div class="flex items-center flex-shrink-0">-->
<!--            <UInput-->
<!--                v-model="searchQuery"-->
<!--                placeholder="Search for supplements"-->
<!--                trailing-icon="i-heroicons-magnifying-glass"-->
<!--                size="xl"-->
<!--                variant="outline"-->
<!--                color="primary"-->
<!--                autocomplete="off"-->
<!--                class="max-w-lg w-full rounded-full shadow-lg transition-all duration-300 hover:shadow-xl focus-within:shadow-xl [&>input]:rounded-full [&>input]:bg-primary-50 [&>input]:text-primary-900 [&>input]:placeholder-primary-400 [&>input]:ring-primary-300 [&>input]:focus:ring-primary-500 [&>input]:focus:ring-2"-->
<!--            >-->
<!--              <template v-if="searchQuery?.length" #trailing>-->
<!--                <UButton-->
<!--                    color="primary"-->
<!--                    variant="ghost"-->
<!--                    icon="i-lucide-circle-x"-->
<!--                    :padded="false"-->
<!--                    class="rounded-full hover:scale-110 transition-transform duration-200 text-primary-600 hover:bg-primary-100"-->
<!--                    @click="searchQuery = ''"-->
<!--                />-->
<!--              </template>-->
<!--            </UInput>-->

<!--          </div>-->

<!--        </div>-->
<!--      </UContainer>-->
<!--    </header>-->

<!--    &lt;!&ndash; Page Content &ndash;&gt;-->
<!--    <main class="flex-grow">-->
<!--      <slot />-->
<!--    </main>-->
<!--  </div>-->
<!--</template>-->

<!-- layouts/default.vue -->
<script setup lang="ts">
import Header from '~/components/Header.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main class="flex-grow">
      <slot />
    </main>
  </div>
</template>

<style>
</style>
