<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <section class="panel h-full flex flex-col">
    <header class="mb-4 flex items-start justify-between gap-4">
      <div>
        <p class="label-mono mb-1">{{ subtitle }}</p>
        <h3 class="font-display text-xl font-700 text-text">{{ title }}</h3>
      </div>
      <slot name="actions" />
    </header>
    <div class="flex-1 min-h-0">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="mt-4 pt-4 border-t border-border text-sm text-muted">
      <slot name="footer" />
    </footer>
  </section>
</template>