<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <h1 class="w-full text-center">Welcome To PureDose!</h1>
      <p class="text-center mt-4 text-primary-700">
        Track your health and wellness journey with our comprehensive supplement tracking system.
      </p>

      <!-- Demo section to show theme colors -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-md border border-primary-200">
          <h3 class="text-primary-800 mb-2">Primary Theme</h3>
          <p class="text-primary-600">This showcases our emerald-based primary color theme.</p>
          <UButton color="primary" class="mt-4">Primary Button</UButton>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border border-secondary-200">
          <h3 class="text-secondary-800 mb-2">Secondary Theme</h3>
          <p class="text-secondary-600">This showcases our fuchsia-based secondary color theme.</p>
          <UButton color="secondary" class="mt-4">Secondary Button</UButton>
        </div>

        <div class="bg-primary-100 p-6 rounded-lg shadow-md border border-primary-300">
          <h3 class="text-primary-900 mb-2">Background Theme</h3>
          <p class="text-primary-700">This shows our primary background styling.</p>
          <UButton variant="outline" class="mt-4">Outline Button</UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>