<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { CommandItem } from '@/composables/useCommandPalette'

const props = defineProps<{
  open: boolean
  query: string
  items: CommandItem[]
}>()

const emit = defineEmits<{
  'update:query': [value: string]
  run: [item: CommandItem]
  close: []
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const activeIndex = ref(0)

watch(() => props.open, (val) => {
  if (val) {
    activeIndex.value = 0
    setTimeout(() => inputRef.value?.focus(), 0)
  }
})

watch(() => props.items.length, () => {
  activeIndex.value = 0
})

function onKeydown(e: KeyboardEvent) {
  if (!props.open) return
  if (e.key === 'Escape') {
    emit('close')
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % props.items.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + props.items.length) % props.items.length
  } else if (e.key === 'Enter' && props.items[activeIndex.value]) {
    emit('run', props.items[activeIndex.value])
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-100 flex items-start justify-center pt-[15vh] px-4 bg-bg/70 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div class="w-full max-w-xl panel shadow-2xl">
        <input
          ref="inputRef"
          :value="query"
          type="text"
          placeholder="Jump to section..."
          class="w-full bg-transparent border-b border-border pb-3 font-mono text-text outline-none placeholder:text-muted"
          @input="emit('update:query', ($event.target as HTMLInputElement).value)"
        >
        <ul class="mt-3 max-h-72 overflow-auto">
          <li v-for="(item, index) in items" :key="item.id">
            <button
              type="button"
              class="w-full flex items-center justify-between px-3 py-2 rounded font-mono text-sm text-left transition"
              :class="index === activeIndex ? 'bg-accent/10 text-accent' : 'text-text hover:bg-surface'"
              @click="emit('run', item)"
            >
              <span>{{ item.label }}</span>
              <span class="text-muted text-xs">{{ item.hint }}</span>
            </button>
          </li>
          <li v-if="!items.length" class="px-3 py-4 text-muted text-sm">No matches</li>
        </ul>
      </div>
    </div>
  </Teleport>
</template>