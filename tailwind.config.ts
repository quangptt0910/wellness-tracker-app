import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.green
            }
        }
    }
}