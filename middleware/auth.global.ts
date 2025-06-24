import {useAuthStore} from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuthStore()

    // Initialize store if not already initialized
    if (!authStore.accessToken) {
        authStore.init()
    }

    // Protected routes
    const protectedRoutes = ['/dashboard','/profile', '/settings']


    // Skip middleware for auth pages
    const authPages = ['/auth/login', '/auth/register', '/auth/forgot-password']

    const requiresAuth = protectedRoutes.some(route =>
        to.path === route || to.path.startsWith(route + '/')
    )

    if (authPages.includes(to.path)) {
        // If already authenticated, redirect away from auth pages
        if (authStore.isAuthenticated) {
            return navigateTo('/')
        }
        return
    }

    if (requiresAuth && !authStore.isAuthenticated) {
        return navigateTo('/auth/login')
    }

    // Handle token refresh for authenticated users only
    if (authStore.isAuthenticated) {
        try {
            // Refresh token if about to expire
            if (authStore.willExpireSoon) {
                await authStore.refresh()
            }

            // Fetch user if not already loaded
            if (!authStore.user) {
                await authStore.fetchUser()
            }
        } catch (error) {
            console.error('Auth middleware error:', error)
            authStore.logout()
            return navigateTo('/')
        }
    }
})