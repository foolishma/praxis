<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'ghost' | 'danger'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'primary',
  disabled: false,
  type: 'button',
})

const variantClass: Record<string, string> = {
  primary: 'bg-accent text-bg hover:brightness-110',
  ghost: 'border border-border text-text hover:border-accent hover:text-accent',
  danger: 'bg-danger/20 text-danger border border-danger/40 hover:bg-danger/30',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded font-mono text-sm font-500 transition disabled:opacity-40 disabled:cursor-not-allowed"
    :class="variantClass[variant]"
  >
    <slot />
  </button>
</template>