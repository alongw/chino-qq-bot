import { createRouter, createWebHistory } from 'vue-router'

import { on } from '@/event'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/pages/Home/Home.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/pages/Login/Login.vue')
        }
    ]
})

on('MENU:CLICK', (path: string) => {
    router.push(`/${path}`)
})

export default router
