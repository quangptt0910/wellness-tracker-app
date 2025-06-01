<script setup lang="ts">
// Reactive state
const state = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false)
const toast = useToast()

// Login method
const submit = async () => {
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.add({
      title: 'Login successful',
      description: 'Welcome back!',
      icon: 'i-heroicons-check-circle',
      color: 'primary'
    })
    // await navigateTo('/dashboard')
  } catch (error) {
    toast.add({
      title: 'Login failed',
      description: 'Invalid credentials',
      icon: 'i-heroicons-exclamation-circle',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center-safe gap-4 p-4">
    <UPageCard class="max-w-md w-full">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white text-center block">
            Welcome back
          </h1>
          <p class="mt-2 text-xl text-gray-500 dark:text-gray-400 text-center block">
            Sign in to your account
          </p>
        </div>

      <UForm :state="state" @submit="submit" class="space-y-4">
        <UFormField label="Email" name="email" required :ui="{label : 'text-base font-medium mb-3' }" >
          <UInput class="w-full " v-model="state.email" type="email" placeholder="your@email.com" icon="i-heroicons-envelope" autofocus size="xl"/>
        </UFormField>

        <UFormField label="Password" name="password" required :ui="{ label : 'text-base font-medium mb-3'}" >
          <UInput class="w-full " v-model="state.password" type="password" placeholder="••••••••" icon="i-heroicons-lock-closed" size="xl"/>
        </UFormField>

        <div class="flex justify-end">
          <NuxtLink
              to="/auth/forgot-password"
              class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Forgot password?
          </NuxtLink>
        </div>

        <UButton
            type="submit"
            block
            size="lg"
            :loading="isLoading"
            label="Sign in"
            color="secondary"
        />
      </UForm>

      <div>
        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?
          <NuxtLink
              to="/auth/register"
              class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Sign up
          </NuxtLink>
        </p>
      </div>
    </UPageCard>

    <!-- Custom utility classes -->
    <span class="text-secondary">This uses text-secondary utility</span>
    <div class="bg-secondary text-white p-4">Secondary background</div>

    <!-- Various secondary shades -->
    <div class="space-y-2">
      <div class="bg-secondary-50 p-2">Very light fuchsia</div>
      <div class="bg-secondary-200 p-2">Light fuchsia</div>
      <div class="bg-secondary-400 p-2 text-white">Medium fuchsia</div>
      <div class="bg-secondary-600 p-2 text-white">Dark fuchsia</div>
      <div class="bg-secondary-800 p-2 text-white">Very dark fuchsia</div>
    </div>

  </div>
</template>

<style scoped>
</style>