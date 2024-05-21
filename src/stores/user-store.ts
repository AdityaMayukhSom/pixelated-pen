import { ref } from 'vue'
import { defineStore } from 'pinia'
import { User } from '@/models/user'

export const useUserStore = defineStore('user-store', () => {
    const user = ref<User>(User.empty())

    async function login(username: string, password: string) {
        try {
            user.value = await User.login(username, password)
        } catch (e) {
            user.value = User.empty()
        }
    }

    async function logout() {
        try {
            await User.logout()
        } finally {
            user.value = User.empty()
        }
    }

    return { user, login, logout }
})
