<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { DataPanel } from '@praxis/ui'

const props = withDefaults(defineProps<{
  degraded?: boolean
}>(), {
  degraded: false,
})

const emit = defineEmits<{ 'update:fps': [value: number] }>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const particleCount = ref(props.degraded ? 800 : 3000)
const frameMs = ref(0)
const overBudget = ref(false)

let animationId = 0
let particles: Array<{ x: number, y: number, vx: number, vy: number }> = []
let frameCount = 0
let fpsLast = performance.now()

function initParticles(count: number, width: number, height: number) {
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 2.5,
    vy: (Math.random() - 0.5) * 2.5,
  }))
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const { width, height } = canvas
  const start = performance.now()

  ctx.fillStyle = 'rgba(10, 10, 11, 0.25)'
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#E8FF47'
  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy
    if (p.x <= 0 || p.x >= width) p.vx *= -1
    if (p.y <= 0 || p.y >= height) p.vy *= -1
    ctx.beginPath()
    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
    ctx.fill()
  }

  frameMs.value = performance.now() - start
  overBudget.value = frameMs.value > 16

  frameCount++
  const now = performance.now()
  if (now - fpsLast >= 1000) {
    emit('update:fps', frameCount)
    frameCount = 0
    fpsLast = now
  }

  animationId = requestAnimationFrame(draw)
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.parentElement?.getBoundingClientRect()
  if (!rect) return
  canvas.width = rect.width
  canvas.height = rect.height
  initParticles(particleCount.value, canvas.width, canvas.height)
}

watch(particleCount, () => {
  resizeCanvas()
})

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  draw()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<template>
  <DataPanel
    title="Render Budget"
    subtitle="Performance Lab"
    :footer="overBudget ? 'Frame exceeded 16ms budget — consider reducing particle count.' : 'Staying within 16ms frame budget target.'"
  >
    <div class="mb-4">
      <label class="label-mono block mb-2">Particles: {{ particleCount.toLocaleString() }}</label>
      <input
        v-model.number="particleCount"
        type="range"
        :min="degraded ? 200 : 500"
        :max="degraded ? 2000 : 8000"
        :step="100"
        class="w-full accent-accent"
      >
    </div>

    <div
      class="relative rounded border overflow-hidden"
      :class="overBudget ? 'border-danger' : 'border-border'"
    >
      <canvas ref="canvasRef" class="w-full h-48 block bg-bg" />
      <div class="absolute top-2 right-2 flex gap-2">
        <span
          class="font-mono text-xs px-2 py-1 rounded border"
          :class="overBudget ? 'border-danger text-danger bg-danger/10' : 'border-success text-success bg-success/10'"
        >
          {{ frameMs.toFixed(1) }} ms / frame
        </span>
      </div>
    </div>
  </DataPanel>
</template>