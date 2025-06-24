import {useAuthStore} from "~/store/auth";

export default defineNuxtPlugin(async () => {
    const authStore = useAuthStore()
    authStore.init()

    // Fetch user if authenticated
    if (authStore.isAuthenticated && !authStore.user) {
        try {
            await authStore.fetchUser()
        } catch (error) {
            console.error('Failed to fetch user:', error)
        }
    }

    // Setup token refresh timer
    if (process.client && authStore.isAuthenticated && authStore.expiresAt) {
        const refreshTime = authStore.expiresAt - Date.now() - 60000 // 1 min before expiration

        if (refreshTime > 0) {
            setTimeout(() => {
                authStore.refresh()
            }, refreshTime)
        } else if (authStore.willExpireSoon) {
            await authStore.refresh()
        }
    }
})