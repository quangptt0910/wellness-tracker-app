// composables/useNavigationMenu.ts
import type { NavigationMenuItem } from '@nuxt/ui';
import { ref } from 'vue';

export const useNavigationMenu = () => {
    const items = ref<NavigationMenuItem[]>([
        {
            label: 'Supplements',
            icon: 'i-lucide-pill',
            to: '/supplements',
            children: [
                {
                    label: "All Supplements",
                    to: '/supplements',
                    icon: 'i-lucide-list'
                },
                {
                    label: "Vitamins",
                    to: '/supplements/vitamins',
                    icon: 'i-lucide-beaker'
                }
            ]
        },
        {
            label: 'Login',
            icon: 'i-lucide-user',
            to: '/auth/login',
        }
    ]);

    return { items };
};