import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import { FrontEndRoutes } from '@/constants'
import HomeView from '@/views/home-view.vue'
import { useUserStore } from '@/stores/user-store'
import pinia from '@/stores'

function alreadyAuthenticated(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    const userStore = useUserStore(pinia)
    if (userStore.user.isLoggedIn()) {
        return {
            path: FrontEndRoutes.Home
        } as RouteLocationNormalized
    }
    return true
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: FrontEndRoutes.Home,
            name: 'home',
            component: HomeView,
            meta: {
                title: 'Home - Pixelated Pen',
                requiresAuth: true
            }
        },
        {
            path: FrontEndRoutes.Auth,
            name: 'auth',
            component: () => import('@/views/auth-view.vue'),
            meta: {
                title: 'Auth - Pixelated Pen',
                requiresAuth: false
            },
            beforeEnter: [alreadyAuthenticated]
        },
        {
            path: FrontEndRoutes.Register,
            name: 'register',
            component: () => import('@/views/register-view.vue'),
            meta: {
                title: 'Register - Pixelated Pen',
                requiresAuth: false
            }
        },
        {
            path: FrontEndRoutes.Write,
            name: 'write',
            component: () => import('@/views/write-view.vue'),
            meta: {
                title: 'Write - Pixelated Pen',
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from) => {
    const defaultTitle = 'Pixelated Pen'
    const foundTitle = to.meta.title as string
    document.title = foundTitle || defaultTitle

    // const defaultDescription = 'Default Description'
    // const descriptionElement = document.querySelector('head meta[name="description"]')
    // descriptionElement.setAttribute('content', description || defaultDescription)

    const userStore = useUserStore(pinia)

    if (to.meta.requiresAuth && userStore.user.isEmpty()) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        return {
            path: FrontEndRoutes.Auth,
            // save the location we were at to come back later
            query: {
                redirect: to.fullPath
            }
        }
    }
})

export default router
