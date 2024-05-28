<script setup lang="ts">
import { ref } from 'vue'

const title = ref<string>('')
const content = ref<string>('')
console.log('hello')
const handleWriteSubmission = (ev: Event) => {
    console.log('write form submitted')
}
</script>

<template>
    <form @submit.prevent="handleWriteSubmission" class="flex flex-col w-80 gap-y-2">
        <label for="content">Title</label>
        <input type="text" name="title" id="title" v-model="title" />
        <label for="content">Content</label>
        <textarea name="content" id="content" v-model="content"></textarea>
        <input type="submit" value="Create" />
    </form>

    <div>{{ title }}</div>
    <div>{{ content }}</div>
</template>

<style></style>
