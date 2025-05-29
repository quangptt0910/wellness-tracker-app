<!-- for notes/id it will use custom (with definePageMeta-->
<script setup lang="ts">
definePageMeta({
  layout:'custom'
})
</script>

<template>
  <h1>{{ $route.params.id }}</h1>
</template>

<style scoped>

</style>