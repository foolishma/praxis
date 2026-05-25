<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
}>()
</script>

<template>
  <header class="mb-10 max-w-3xl">
    <p class="label-mono mb-3 text-accent">{{ eyebrow }}</p>
    <h2 class="section-title text-text mb-4">{{ title }}</h2>
    <p v-if="description" class="text-muted text-lg leading-relaxed">{{ description }}</p>
  </header>
</template>