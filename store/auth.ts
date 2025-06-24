import { defineStore } from 'pinia'
import type { AuthState, LoginResponse, LoginCredentials, RegisterCredentials, RegisterResponse } from '~/types/auth'
import type { User,UserDto, UpdateUserPayload} from '~/types/user'


export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        accessToken: null,
        refreshToken: null,
        expiresAt: null
    }),

    actions: {
        // Initialize store from cookies
        init() {
            const accessToken = useCookie<string | null>('auth_token')
            const refreshToken = useCookie<string | null>('refresh_token')
            const expiresAt = useCookie<number | null>('expires_at')

            this.accessToken = accessToken.value
            this.refreshToken = refreshToken.value
            this.expiresAt = expiresAt.value
        },

        // Set tokens after successful login
        setTokens(payload: LoginResponse) {
            const accessToken = useCookie<string | null>('auth_token', {
                maxAge: payload.expiresIn,
                secure: true,
                sameSite: 'strict'
            })

            const refreshToken = useCookie<string | null>('refresh_token', {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                secure: true,
                sameSite: 'strict'
            })

            const expiresAt = useCookie<number>('expires_at', {
                maxAge: payload.expiresIn,
                secure: true,
                sameSite: 'strict'
            })

            accessToken.value = payload.token
            refreshToken.value = payload.refreshToken || null

            if (payload.expiresIn) {
                const expiresAtValue = Date.now() + payload.expiresIn * 1000
                expiresAt.value = expiresAtValue
                this.expiresAt = expiresAtValue
            }

            this.accessToken = payload.token
            this.refreshToken = payload.refreshToken || null
        },

        // Login action
        async login(credentials: LoginCredentials) {
            const config = useRuntimeConfig()

            try {
                const response = await $fetch<LoginResponse>(
                    `${config.public.apiBase}/api/auth/login`,
                    {
                        method: 'POST',
                        body: credentials,
                        headers: {
                            'Content-Type' : 'application/json'
                        }
                    }
                )

                this.setTokens(response)
                await this.fetchUser()

                return response
            } catch (error: any) {
                const message = error.data?.message ||
                    error.response?._data?.message ||
                    error.message ||
                    'Login failed'
                throw new Error(message)
            }
        },

        // Fetch user profile
        async fetchUser(): Promise<User> {
            if (!this.accessToken) throw new Error('Not authenticated')

            const config = useRuntimeConfig()
            const apiBase = config.public.apiBase

            try {
                const user = await $fetch<User>(
                    `${apiBase}/api/user/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.accessToken}`
                        }
                    }
                )

                this.user = user
                return user
            } catch (error: any) {
                const message = error.data?.message || error.response?._data?.message ||  'Failed to fetch user profile'
                throw new Error(message)
            }
        },

        // Update user profile
        async updateUser(payload: UpdateUserPayload): Promise<User> {
            if (!this.user || !this.accessToken) {
                throw new Error('Not authenticated')
            }

            const config = useRuntimeConfig()
            const apiBase = config.public.apiBase

            try {
                const updatedUser = await $fetch<User>(
                    `${apiBase}/api/user/me`,
                    {
                        method: 'PUT',
                        body: payload,
                        headers: {
                            Authorization: `Bearer ${this.accessToken}`
                        }
                    }
                )

                this.user = updatedUser
                return updatedUser
            } catch (error: any) {
                const message = error.data?.message || 'Failed to update user'
                throw new Error(message)
            }
        },

        // Refresh token
        async refresh() {
            if (!this.refreshToken) {
                throw new Error('No refresh token available')
            }

            const config = useRuntimeConfig()
            const { data, error } = await useFetch<LoginResponse>(
                `${config.public.apiBase}/api/auth/refresh`,
                {
                    method: 'POST',
                    body: { refreshToken: this.refreshToken }
                }
            )

            if (error.value || !data.value) {
                throw new Error('Token refresh failed')
            }

            this.setTokens(data.value)
            return data.value.token
        },

        async register(credentials: RegisterCredentials) {
            const config = useRuntimeConfig()

            try {
                const response = await $fetch<RegisterResponse>(
                    `${config.public.apiBase}/api/auth/register`,
                    {
                        method: 'POST',
                        body: credentials
                    }
                )

                this.setTokens({
                    token: response.token,
                    refreshToken: response.refreshToken,
                    expiresIn: response.expiresIn
                })

                // Set user information
                this.user = {
                    name: response.name || '', // From RegisterResponse
                    surname: response.surname || '', // From RegisterResponse
                    email: response.email, // From RegisterResponse
                    gender: undefined,
                    height: 0,
                    weight: 0,
                }

                return response
            } catch (error: any) {
                throw new Error(error?.data?.message || error?.message || 'Registration failed')
            }
        },

        // Logout
        logout() {
            const authToken = useCookie('auth_token')
            const refreshToken = useCookie('refresh_token')
            const expiresAt = useCookie('expires_at')

            authToken.value = null
            refreshToken.value = null
            expiresAt.value = null

            this.$reset()
            navigateTo('/')
        }
    },

    getters: {
        isAuthenticated: (state) => !!state.accessToken,
        willExpireSoon: (state) => {
            if (!state.expiresAt) return true
            return state.expiresAt - Date.now() < 300000 // 5 minutes
        }
    }
})