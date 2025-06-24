import {useAuthStore} from "~/store/auth";
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore()

    // Create a typed wrapper for $fetch
    const customFetch = async (url: string, options: any = {}) => {
        const config = useRuntimeConfig()
        const baseURL = config.public.apiBase

        // Add authorization header
        if (authStore.accessToken) {
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${authStore.accessToken}`
            }
        }

        try {
            return await $fetch(url, { ...options, baseURL })
        } catch (error: any) {
            // Handle 401 errors
            if (error.status === 401) {
                try {
                    // Attempt to refresh token
                    await authStore.refresh()

                    // Retry with new token
                    if (authStore.accessToken) {
                        options.headers = {
                            ...options.headers,
                            Authorization: `Bearer ${authStore.accessToken}`
                        }
                        return await $fetch(url, { ...options, baseURL })
                    }
                } catch (refreshError) {
                    authStore.logout()
                    throw refreshError
                }
            }
            throw error
        }
    }

    // Add to Nuxt context
    return {
        provide: {
            api: customFetch
        }
    }
})