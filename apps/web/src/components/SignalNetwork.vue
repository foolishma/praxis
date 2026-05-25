<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  degraded?: boolean
}>(), {
  degraded: false,
})

const containerRef = ref<HTMLElement | null>(null)
let cleanup: (() => void) | null = null

async function initThree() {
  if (!containerRef.value || props.degraded) return

  const THREE = await import('three')
  const container = containerRef.value
  const width = container.clientWidth
  const height = container.clientHeight

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
  camera.position.z = 28

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)

  const count = 420
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40
    positions[i * 3 + 1] = (Math.random() - 0.5) * 28
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: 0xe8ff47,
    size: 0.12,
    transparent: true,
    opacity: 0.85,
  })
  const points = new THREE.Points(geometry, material)
  scene.add(points)

  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x2a2a2e, transparent: true, opacity: 0.35 })
  const maxConnections = 180
  for (let i = 0; i < maxConnections; i++) {
    const a = Math.floor(Math.random() * count)
    const b = Math.floor(Math.random() * count)
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(positions[a * 3], positions[a * 3 + 1], positions[a * 3 + 2]),
      new THREE.Vector3(positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2]),
    ])
    scene.add(new THREE.Line(lineGeo, lineMaterial))
  }

  let mouseX = 0
  let mouseY = 0
  const onMove = (e: MouseEvent) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('mousemove', onMove)

  let raf = 0
  const animate = () => {
    points.rotation.y += 0.0015
    points.rotation.x += 0.0008
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.02
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
    renderer.render(scene, camera)
    raf = requestAnimationFrame(animate)
  }
  animate()

  const onResize = () => {
    const w = container.clientWidth
    const h = container.clientHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
  window.addEventListener('resize', onResize)

  cleanup = () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('resize', onResize)
    geometry.dispose()
    material.dispose()
    renderer.dispose()
    container.removeChild(renderer.domElement)
  }
}

watch(() => props.degraded, (val) => {
  if (!val) initThree()
  else cleanup?.()
})

onMounted(() => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => initThree())
  } else {
    setTimeout(() => initThree(), 100)
  }
})

onUnmounted(() => cleanup?.())
</script>

<template>
  <div ref="containerRef" class="w-full h-full min-h-72 relative">
    <div
      v-if="degraded"
      class="absolute inset-0 flex items-center justify-center border border-border rounded-lg bg-surface"
    >
      <div class="text-center p-6">
        <div class="w-32 h-32 mx-auto mb-4 rounded-full border border-accent/30 relative">
          <div class="absolute inset-4 rounded-full border border-accent/50 animate-pulse" />
          <div class="absolute inset-8 rounded-full bg-accent/20" />
        </div>
        <p class="label-mono text-accent">Canvas fallback</p>
        <p class="text-muted text-sm mt-2">Reduced motion / mobile mode</p>
      </div>
    </div>
  </div>
</template>