<script setup lang="ts">
import type { LoginResponse, LoginCredentials } from "~/types/auth";
import { useAuthStore } from "~/store/auth";


definePageMeta({
  layout: 'auth'
})

const state = reactive<LoginCredentials>({
  username: '',
  password: ''
})

const isLoading = ref(false)
const toast = useToast()
const authStore = useAuthStore()

// Login method
const submit = async () => {
  isLoading.value = true
  try {
    await authStore.login(state)
    toast.add({
      title: 'Login successful',
      description: 'Welcome back!',
      icon: 'i-heroicons-check-circle',
      color: 'primary'
    })
    await navigateTo('/')
  } catch (error: any) {
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
  <div class="flex items-start justify-center p-2 pt-0 bg-primary-100">
    <UPageCard class="max-w-lg w-full bg-primary-50 mt-8">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white text-center block">
            Welcome back
          </h1>
          <p class="mt-2 text-xl text-gray-500 dark:text-gray-400 text-center block">
            Sign in to your account
          </p>
        </div>

      <UForm :state="state" @submit="submit" class="space-y-4">
        <UFormField label="Username" name="username" required :ui="{label : 'text-base font-medium mb-3' }" >
          <UInput class="w-full " v-model="state.username" type="text" placeholder="your username" icon="i-heroicons-envelope" autofocus size="xl"/>
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
            class="bg-primary-400"
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


  </div>
</template>

<style scoped>
</style>