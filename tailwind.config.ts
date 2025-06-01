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
                primary: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                    950: '#022c22',
                },
                // Secondary Color Scale (Fuchsia)
                secondary: {
                    50: '#fdf4ff',
                    100: '#fae8ff',
                    200: '#f5d0fe',
                    300: '#f0abfc',
                    400: '#e879f9',
                    500: '#d946ef',
                    600: '#c026d3',
                    700: '#a21caf',
                    800: '#86198f',
                    900: '#701a75',
                    950: '#4a044e',
                },
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