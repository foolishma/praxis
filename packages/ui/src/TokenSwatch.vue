<script setup lang="ts">
defineProps<{
  name: string
  value: string
  usage?: string
}>()

const emit = defineEmits<{ copy: [value: string] }>()
</script>

<template>
  <button
    type="button"
    class="group flex items-center gap-3 p-3 rounded border border-border hover:border-accent transition text-left w-full"
    @click="emit('copy', value)"
  >
    <span
      class="w-10 h-10 rounded border border-border shrink-0"
      :style="{ background: value }"
    />
    <span class="min-w-0">
      <span class="block font-mono text-sm text-text">{{ name }}</span>
      <span class="block font-mono text-xs text-muted truncate">{{ value }}</span>
      <span v-if="usage" class="block text-xs text-muted mt-1">{{ usage }}</span>
    </span>
  </button>
</template>