<script setup lang="ts">
import { en } from '@nuxt/ui/locale'

useColorMode().preference = 'light'
</script>

<template>
<!--    <NuxtRouteAnnouncer />-->
<!--    <NuxtWelcome />-->
  <UApp :locale="en" class="light">
    <NuxtLayout>
      <NuxtPage class="min-h-screen"/>
    </NuxtLayout>
  </UApp>
</template>

<style>
/* Additional global styles to ensure theme consistency */
</style>