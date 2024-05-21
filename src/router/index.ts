import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home-view.vue'
import { FrontEndRoutes } from '@/constants'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: FrontEndRoutes.Home,
            name: 'home',
            component: HomeView,
            meta: {
                title: 'Home - Pixelated Pen'
            }
        },
        {
            path: FrontEndRoutes.Auth,
            name: 'auth',
            component: () => import('@/views/auth-view.vue'),
            meta: {
                title: 'Auth - Pixelated Pen'
            }
        },
        {
            path: FrontEndRoutes.Register,
            name: 'register',
            component: () => import('@/views/register-view.vue'),
            meta: {
                title: 'Register - Pixelated Pen'
            }
        },
        {
            path: FrontEndRoutes.Write,
            name: 'write',
            component: () => import('@/views/write-view.vue'),
            meta: {
                title: 'Write - Pixelated Pen'
            }
        }
    ]
})

router.beforeEach((to) => {
    const defaultTitle = 'Pixelated Pen'
    const foundTitle = to.meta.title as string
    document.title = foundTitle || defaultTitle

    // const defaultDescription = 'Default Description'
    // const descriptionElement = document.querySelector('head meta[name="description"]')
    // descriptionElement.setAttribute('content', description || defaultDescription)
})

export default router
