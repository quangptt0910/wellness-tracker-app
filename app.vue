<script setup lang="ts">
import { en } from '@nuxt/ui/locale'
</script>

<template>
<!--    <NuxtRouteAnnouncer />-->
<!--    <NuxtWelcome />-->
  <UApp :locale="en">
    <NuxtLayout>
      <NuxtPage class="min-h-screen bg-primary-100"/>
    </NuxtLayout>
  </UApp>
</template>
