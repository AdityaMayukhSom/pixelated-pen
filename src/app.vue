<script setup lang="ts">
import FooterComponent from './components/footer-component.vue'
import HeaderComponent from './components/header-component.vue'
</script>

<template>
    <header-component />
    <router-view />
    <footer-component />
</template>

<style scoped></style>
