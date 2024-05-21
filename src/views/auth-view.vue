<script setup lang="ts">
import { useUserStore } from '@/stores/user-store'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { FrontEndRoutes } from '@/constants'

const username = ref<string>('')
const password = ref<string>('')

const route = useRoute()
const router = useRouter()

const handleLoginFormSubmission = async (ev: Event) => {
    const userStore = useUserStore()
    try {
        await userStore.login(username.value, password.value)
        const previousRoute = route.query.redirect as string | null
        router.push({
            path: previousRoute || FrontEndRoutes.Home,
            replace: false
        })
    } catch (error) {
        // somehow handle the error, maybe show invalid input
    }
}
</script>

<template>
    <h2 class="">Login - Pixelaed Pen</h2>
    <form @submit.prevent="handleLoginFormSubmission" class="">
        <div class="w-full gap-y-3 md:w-72 grid grid-flow-row">
            <label for="username">Username</label>
            <input type="text" name="username" id="username" v-model.trim="username" />
            <label for="password">Password</label>
            <input type="password" name="password" id="password" v-model.trim="password" />
            <button type="submit">Login</button>
        </div>
    </form>
</template>
