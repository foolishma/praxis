<script setup lang="ts">
import { ref } from 'vue'
import { DataPanel, PraxisButton } from '@praxis/ui'
import ComputeWorker from './workers/compute.worker.ts?worker'

const INPUT = 4200000
const running = ref(false)
const mainDuration = ref<number | null>(null)
const workerDuration = ref<number | null>(null)

function fibonacci(n: number): number {
  if (n <= 1) return n
  let a = 0
  let b = 1
  for (let i = 2; i <= n; i++) {
    const next = a + b
    a = b
    b = next
  }
  return b
}

async function runMainThread() {
  running.value = true
  mainDuration.value = null
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      const start = performance.now()
      fibonacci(INPUT)
      mainDuration.value = performance.now() - start
      resolve()
    }, 0)
  })
  running.value = false
}

async function runWorker() {
  running.value = true
  workerDuration.value = null
  const worker = new ComputeWorker()
  await new Promise<void>((resolve) => {
    worker.onmessage = (event: MessageEvent<{ duration: number }>) => {
      workerDuration.value = event.data.duration
      worker.terminate()
      resolve()
    }
    worker.postMessage(INPUT)
  })
  running.value = false
}

async function runBoth() {
  await runMainThread()
  await runWorker()
}

const maxDuration = () => Math.max(mainDuration.value ?? 0, workerDuration.value ?? 0, 1)
</script>

<template>
  <DataPanel
    title="Worker Split"
    subtitle="Performance Lab"
    footer="Same Fibonacci(4.2M) task — main thread blocks UI; Worker keeps the thread free."
  >
    <div class="flex flex-wrap gap-2 mb-6">
      <PraxisButton :disabled="running" @click="runBoth">Run comparison</PraxisButton>
      <PraxisButton variant="ghost" :disabled="running" @click="runMainThread">Main only</PraxisButton>
      <PraxisButton variant="ghost" :disabled="running" @click="runWorker">Worker only</PraxisButton>
    </div>

    <div class="space-y-4">
      <div>
        <div class="flex justify-between font-mono text-xs mb-1">
          <span class="text-muted">Main thread</span>
          <span class="text-text">{{ mainDuration != null ? `${mainDuration.toFixed(1)} ms` : '—' }}</span>
        </div>
        <div class="h-3 rounded bg-bg overflow-hidden">
          <div
            class="h-full bg-danger transition-all duration-500"
            :style="{ width: mainDuration != null ? `${(mainDuration / maxDuration()) * 100}%` : '0%' }"
          />
        </div>
      </div>
      <div>
        <div class="flex justify-between font-mono text-xs mb-1">
          <span class="text-muted">Web Worker</span>
          <span class="text-text">{{ workerDuration != null ? `${workerDuration.toFixed(1)} ms` : '—' }}</span>
        </div>
        <div class="h-3 rounded bg-bg overflow-hidden">
          <div
            class="h-full bg-success transition-all duration-500"
            :style="{ width: workerDuration != null ? `${(workerDuration / maxDuration()) * 100}%` : '0%' }"
          />
        </div>
      </div>
    </div>
  </DataPanel>
</template>