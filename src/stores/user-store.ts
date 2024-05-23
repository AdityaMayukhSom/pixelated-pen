import { ref } from 'vue'
import { defineStore } from 'pinia'
import { User } from '@/models/user'

export const useUserStore = defineStore('user-store', () => {
    const user = ref<User>(User.empty())

    async function login(username: string, password: string) {
        try {
            user.value = await User.login(username, password)
            return true
        } catch (e) {
            user.value = User.empty()
            return false
        }
    }

    async function logout() {
        try {
            await User.logout()
        } finally {
            user.value = User.empty()
        }
    }

    async function register(name: string, email: string, username: string, password: string) {
        const isRegistered = await User.register(name, email, username, password)
        return isRegistered
    }

    async function checkAuthentication() {
        user.value = await User.getUserIfAuthenticated()
        return user.value.isLoggedIn()
    }

    return { user, login, logout, register, checkAuthentication }
})
