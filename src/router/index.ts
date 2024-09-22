import {
    createRouter,
    createWebHistory,
    type RouteLocationNormalized,
    type RouteLocationRaw
} from 'vue-router'
import { FrontEndRoutes } from '@/constants'
import HomeView from '@/views/home-view.vue'
import { useUserStore } from '@/stores/user-store'
import pinia from '@/stores'

async function alreadyAuthenticated(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    const userStore = useUserStore(pinia)
    await userStore.checkAuthentication()

    if (userStore.isAuthenticated()) {
        const previousRoute = to.query.redirect as string | null
        return {
            path: previousRoute || FrontEndRoutes.Home,
            replace: true
        } as RouteLocationRaw
    }
    return true
}

function requiresAuthentication(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    const userStore = useUserStore(pinia)

    // route requires auth, check if logged in, else redirects to login page.
    if (!userStore.isAuthenticated()) {
        return {
            path: FrontEndRoutes.Auth,
            replace: true,
            query: {
                redirect: to.fullPath // save the location we were at to come back later
            }
        } as RouteLocationRaw
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'root',
            path: '/',
            redirect: {
                path: '/home',
                replace: true
            }
        },
        {
            name: 'home',
            component: HomeView,
            path: FrontEndRoutes.Home,
            beforeEnter: [requiresAuthentication],
            meta: {
                title: 'Home - Pixelated Pen'
            }
        },
        {
            name: 'auth',
            path: FrontEndRoutes.Auth,
            beforeEnter: [alreadyAuthenticated],
            component: () => import('@/views/auth-view.vue'),
            meta: {
                title: 'Auth - Pixelated Pen'
            }
        },
        {
            name: 'register',
            path: FrontEndRoutes.Register,
            beforeEnter: [alreadyAuthenticated],
            component: () => import('@/views/register-view.vue'),
            meta: {
                title: 'Register - Pixelated Pen'
            }
        },
        {
            name: 'write',
            path: FrontEndRoutes.Write,
            beforeEnter: [requiresAuthentication],
            component: () => import('@/views/write-view.vue'),
            meta: {
                title: 'Write - Pixelated Pen'
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
})

export default router
