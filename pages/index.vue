<script lang="ts" setup>
const count = ref(0);
</script>

<template>
  <main>
    <h2>Index Page</h2>
    <section>
      <p>{{ count }}</p>
      <button @click="count++">Increment Count</button>
      <button @click="count--">Decrement Count</button>
    </section>
  </main>
</template>
