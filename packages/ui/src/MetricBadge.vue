<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  status?: 'neutral' | 'good' | 'warn' | 'bad'
}>()
</script>

<template>
  <div class="inline-flex flex-col gap-1 px-3 py-2 rounded border border-border bg-bg/80 backdrop-blur-sm min-w-24">
    <span class="label-mono">{{ label }}</span>
    <span
      class="font-mono text-sm font-500"
      :class="{
        'text-text': !status || status === 'neutral',
        'text-success': status === 'good',
        'text-accent': status === 'warn',
        'text-danger': status === 'bad',
      }"
    >
      {{ value }}
    </span>
  </div>
</template>