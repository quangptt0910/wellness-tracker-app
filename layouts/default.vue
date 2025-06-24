
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
