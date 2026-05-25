<script setup lang="ts">
import CommandPalette from '@/components/CommandPalette.vue'
import { useCommandPalette } from '@/composables/useCommandPalette'

const { open, query, filtered, run, close } = useCommandPalette()
</script>

<template>
  <div class="grain min-h-screen relative">
    <RouterView />
    <CommandPalette
      :open="open"
      :query="query"
      :items="filtered"
      @update:query="query = $event"
      @run="run"
      @close="close"
    />
  </div>
</template>