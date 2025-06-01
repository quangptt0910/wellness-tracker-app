import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
    darkMode: false, // Completely disable dark mode
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './nuxt.config.{js,ts}',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}'
    ],
    theme: {
        extend: {
            colors: {
                // Primary Color Scale
                primary: colors.emerald,
                // Secondary Color Scale
                secondary: colors.fuchsia,
                // Background colors
                background: {
                    DEFAULT: '#ecfdf5', // primary-50
                    paper: '#ffffff', // white for surfaces
                },
                // Text colors
                text: {
                    DEFAULT: 'primary-900',
                    secondary: '#374151', // gray-700
                    disabled: '#9ca3af', // gray-400
                },
                // Override default grayscale to match your theme
                gray: colors.zinc,
            },
        },
    },
    plugins: [
        // Add any Tailwind plugins you need
    ],
}