<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { SectionHeader } from '@praxis/ui'
import { useDegradedMode } from '@/composables/useDegradedMode'

type Preset = 'wave' | 'grid' | 'pulse'

const { t } = useI18n()
const { degraded, prefersReducedMotion } = useDegradedMode()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const preset = ref<Preset>('wave')
const presets: Preset[] = ['wave', 'grid', 'pulse']

let animationId = 0
let startTime = 0

const staticMode = computed(() => degraded.value || prefersReducedMotion.value)

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas?.parentElement) return
  const rect = canvas.parentElement.getBoundingClientRect()
  canvas.width = Math.floor(rect.width)
  canvas.height = Math.floor(rect.height)
}

function drawWave(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  ctx.fillStyle = '#0a0a0b'
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = 'rgba(232, 255, 71, 0.55)'
  ctx.lineWidth = 1.5
  for (let layer = 0; layer < 3; layer++) {
    ctx.beginPath()
    for (let x = 0; x <= w; x += 4) {
      const y = h / 2
        + Math.sin(x * 0.012 + time * 0.002 + layer) * (28 - layer * 6)
        + Math.cos(x * 0.006 - time * 0.0015) * 12
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
}

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  ctx.fillStyle = '#0a0a0b'
  ctx.fillRect(0, 0, w, h)
  const spacing = 32
  const offset = (time * 0.04) % spacing
  ctx.strokeStyle = 'rgba(42, 42, 46, 0.9)'
  ctx.lineWidth = 1
  for (let x = -offset; x < w; x += spacing) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
  }
  for (let y = -offset; y < h; y += spacing) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
  }
  const cx = w / 2
  const cy = h / 2
  const radius = 40 + Math.sin(time * 0.003) * 16
  ctx.strokeStyle = '#E8FF47'
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.stroke()
}

function drawPulse(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  ctx.fillStyle = '#0a0a0b'
  ctx.fillRect(0, 0, w, h)
  const cx = w / 2
  const cy = h / 2
  for (let i = 0; i < 6; i++) {
    const phase = time * 0.002 + i * 0.9
    const r = 20 + ((Math.sin(phase) + 1) / 2) * Math.min(w, h) * 0.35
    ctx.strokeStyle = `rgba(232, 255, 71, ${0.45 - i * 0.06})`
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()
  }
}

function drawFrame(time: number) {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const { width: w, height: h } = canvas
  if (preset.value === 'wave') drawWave(ctx, w, h, time)
  else if (preset.value === 'grid') drawGrid(ctx, w, h, time)
  else drawPulse(ctx, w, h, time)
}

function renderStatic() {
  drawFrame(0)
}

function loop(time: number) {
  if (!startTime) startTime = time
  drawFrame(time - startTime)
  animationId = requestAnimationFrame(loop)
}

function startAnimation() {
  cancelAnimationFrame(animationId)
  startTime = 0
  if (staticMode.value) {
    renderStatic()
    return
  }
  animationId = requestAnimationFrame(loop)
}

watch([preset, staticMode], () => {
  resizeCanvas()
  startAnimation()
})

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  startAnimation()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<template>
  <section id="visual" class="py-24 border-t border-border">
    <div class="max-w-7xl mx-auto px-4">
      <SectionHeader
        :eyebrow="t('visual.eyebrow')"
        :title="t('visual.title')"
        :description="t('visual.description')"
      />
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          v-for="p in presets"
          :key="p"
          type="button"
          class="font-mono text-xs uppercase px-3 py-2 rounded border transition"
          :class="preset === p ? 'border-accent text-accent bg-accent/10' : 'border-border text-muted hover:text-text'"
          @click="preset = p"
        >
          {{ p }}
        </button>
        <span v-if="staticMode" class="label-mono text-accent self-center ml-2">Reduced motion</span>
      </div>
      <div class="panel p-0 overflow-hidden">
        <canvas ref="canvasRef" class="w-full h-64 md:h-80 block" role="img" aria-label="Visual shader preset preview" />
      </div>
    </div>
  </section>
</template>