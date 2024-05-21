<script setup lang="ts">
import { FrontEndRoutes } from '@/constants'
import { useUserStore } from '@/stores/user-store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref<string>('')
const email = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')

const userStore = useUserStore()
const router = useRouter()

const handleRegisterFormSubmission = async (ev: Event) => {
    const isRegstered = await userStore.register(
        name.value,
        email.value,
        username.value,
        password.value
    )
    if (isRegstered) {
        router.push(FrontEndRoutes.Home)
    } else {
        // somehow handle the error, maybe show invalid input
    }
}
</script>

<template>
    <h2 class="p-5">Register - Pixelaed Pen</h2>
    <form @submit.prevent="handleRegisterFormSubmission">
        <div class="w-full grid grid-flow-row md:w-80 gap-y-3">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" v-model="name" />
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="email" />
            <label for="username">Username</label>
            <input type="text" name="username" id="username" v-model="username" />
            <label for="password">Password</label>
            <input type="password" name="password" id="password" v-model="password" />
            <button variant="default">Register</button>
        </div>
    </form>
</template>
