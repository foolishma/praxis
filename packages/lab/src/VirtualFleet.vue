<script setup lang="ts">
import { useVirtualizer } from '@tanstack/vue-virtual'
import { computed, ref } from 'vue'
import { DataPanel, PraxisButton } from '@praxis/ui'

const props = withDefaults(defineProps<{
  fps?: number
  degraded?: boolean
}>(), {
  fps: 60,
  degraded: false,
})

const emit = defineEmits<{ 'update:fps': [value: number] }>()

const ITEM_COUNT = computed(() => (props.degraded ? 10000 : 100000))
const virtualized = ref(true)
const parentRef = ref<HTMLElement | null>(null)

const items = computed(() =>
  Array.from({ length: ITEM_COUNT.value }, (_, i) => ({
    id: i,
    label: `Fleet Unit #${String(i + 1).padStart(6, '0')}`,
    status: i % 7 === 0 ? 'alert' : i % 3 === 0 ? 'idle' : 'active',
  })),
)

const rowVirtualizer = useVirtualizer(
  computed(() => ({
    count: virtualized.value ? items.value.length : 0,
    getScrollElement: () => parentRef.value,
    estimateSize: () => 44,
    overscan: 8,
  })),
)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

let frameCount = 0
let lastTime = performance.now()

function trackFps() {
  frameCount++
  const now = performance.now()
  if (now - lastTime >= 1000) {
    emit('update:fps', frameCount)
    frameCount = 0
    lastTime = now
  }
  requestAnimationFrame(trackFps)
}

requestAnimationFrame(trackFps)
</script>

<template>
  <DataPanel
    title="Virtual Fleet"
    subtitle="Performance Lab"
    footer="Toggle virtualization to compare DOM pressure at 100k rows."
  >
    <template #actions>
      <PraxisButton variant="ghost" @click="virtualized = !virtualized">
        {{ virtualized ? 'Virtualized ON' : 'Virtualized OFF' }}
      </PraxisButton>
    </template>

    <div class="flex items-center gap-4 mb-4 font-mono text-xs text-muted">
      <span>Items: {{ ITEM_COUNT.toLocaleString() }}</span>
      <span>FPS: {{ fps }}</span>
      <span v-if="degraded" class="text-accent">Degraded mode</span>
    </div>

    <div
      ref="parentRef"
      class="h-72 overflow-auto rounded border border-border bg-bg"
    >
      <div
        v-if="virtualized"
        :style="{ height: `${totalSize}px`, width: '100%', position: 'relative' }"
      >
        <div
          v-for="row in virtualRows"
          :key="row.index"
          class="absolute top-0 left-0 w-full flex items-center gap-3 px-3 border-b border-border/50 font-mono text-xs"
          :style="{ height: `${row.size}px`, transform: `translateY(${row.start}px)` }"
        >
          <span class="text-muted w-20">{{ row.index + 1 }}</span>
          <span class="text-text flex-1 truncate">{{ items[row.index]?.label }}</span>
          <span
            class="uppercase"
            :class="{
              'text-success': items[row.index]?.status === 'active',
              'text-muted': items[row.index]?.status === 'idle',
              'text-danger': items[row.index]?.status === 'alert',
            }"
          >
            {{ items[row.index]?.status }}
          </span>
        </div>
      </div>

      <div v-else>
        <div
          v-for="item in items.slice(0, 500)"
          :key="item.id"
          class="flex items-center gap-3 px-3 h-11 border-b border-border/50 font-mono text-xs"
        >
          <span class="text-muted w-20">{{ item.id + 1 }}</span>
          <span class="text-text flex-1 truncate">{{ item.label }}</span>
          <span class="uppercase text-muted">{{ item.status }}</span>
        </div>
        <p class="p-4 text-center text-muted text-xs">
          Non-virtualized mode capped at 500 rows to protect the browser.
        </p>
      </div>
    </div>
  </DataPanel>
</template>