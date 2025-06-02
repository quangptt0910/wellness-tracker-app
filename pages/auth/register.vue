<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

// Reactive state
const state = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const isLoading = ref(false)
const toast = useToast()

// Registration method
const submit = async () => {
  if (state.password !== state.confirmPassword) {
    toast.add({
      title: 'Password mismatch',
      description: 'Passwords do not match',
      icon: 'i-heroicons-exclamation-circle',
      color: 'error'
    })
    return
  }

  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.add({
      title: 'Account created',
      description: 'Welcome to our platform!',
      icon: 'i-heroicons-check-circle',
      color: 'success'
    })
    // await navigateTo('/dashboard')
  } catch (error) {
    toast.add({
      title: 'Registration failed',
      description: 'Please try again',
      icon: 'i-heroicons-exclamation-circle',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex items-start justify-center-safe gap-4 p-4 bg-primary-100">
    <UPageCard class="max-w-md w-full mt-6 bg-primary-50">
      <div class="py-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white text-center block">
          Create an account
        </h1>
        <p class="mt-2 text-xl text-gray-500 dark:text-gray-400 text-center block">
          Get started with our platform
        </p>
      </div>

      <UForm :state="state" @submit="submit" class="space-y-4">
        <UFormField label="First Name" name="firstName" required :ui="{label : 'text-base font-medium mb-3'}">
          <UInput class="w-full" v-model="state.firstName" type="text" placeholder="John" icon="i-heroicons-user" autofocus  size="xl"/>
        </UFormField>

        <UFormField label="Last Name" name="lastName" required :ui="{label : 'text-base font-medium mb-3'}">
          <UInput class="w-full" v-model="state.lastName" type="text" placeholder="Doe" icon="i-heroicons-user" size="xl"/>
        </UFormField>

        <UFormField label="Email" name="email" required :ui="{label : 'text-base font-medium mb-3'}">
          <UInput class="w-full" v-model="state.email" type="email" placeholder="your@email.com" icon="i-heroicons-envelope" size="xl"/>
        </UFormField>

        <UFormField label="Password" name="password" required :ui="{label : 'text-base font-medium mb-3'}">
          <UInput class="w-full" v-model="state.password" type="password" placeholder="••••••••" icon="i-heroicons-lock-closed"/>
        </UFormField>

        <UFormField label="Confirm Password" name="confirmPassword" required :ui="{label : 'text-base font-medium mb-3'}">
          <UInput class="w-full" v-model="state.confirmPassword" type="password" placeholder="••••••••" icon="i-heroicons-lock-closed"/>
        </UFormField>

        <UButton
            type="submit"
            block
            size="lg"
            :loading="isLoading"
            label="Create account"
            color="primary"
            :ui="{
            base: 'transition-all duration-200',
          }"
        />
      </UForm>

      <div>
        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?
          <NuxtLink
              to="/auth/login"
              class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Sign in
          </NuxtLink>
        </p>
      </div>
    </UPageCard>
  </div>
</template>

<style scoped>
</style>