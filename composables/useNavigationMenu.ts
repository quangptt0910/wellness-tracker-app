// composables/useNavigationMenu.ts
import type { NavigationMenuItem } from '@nuxt/ui'

export const useNavigationMenu = () => {
    const items = ref<NavigationMenuItem[]>([
        {
            label: 'HOME',
            to: '/',
            icon: 'i-lucide-home',
        },
        {
            label: 'SUPPLEMENT',
            icon: 'i-lucide-pill',
            to: '/supplements',
            children: [
                {
                    label: "All Supplements",
                    to: '/supplements',
                    icon: 'i-lucide-list',
                    class: 'py-3'
                },
                {
                    label: "Vitamins",
                    to: '/supplements/vitamins',
                    icon: 'i-lucide-beaker',
                    class: 'py-3'
                }
            ]
        },
        {
          label: 'YOUR TRACKER',
          icon: 'i-lucide-activity',
        },
        // {
        //     label: 'Login',
        //     icon: 'i-lucide-user',
        //     to: '/auth/login',
        //     children: [
        //         {
        //             label: 'Register',
        //             to: '/auth/register',
        //             icon: 'i-lucide-user-plus'
        //         }
        //     ]
        // }
    ]);

    return { items };
};