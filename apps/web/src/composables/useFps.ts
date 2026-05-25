import { onMounted, onUnmounted, ref } from 'vue'

export function useFps() {
  const fps = ref(60)
  let frameCount = 0
  let lastTime = performance.now()
  let rafId = 0

  function tick(now: number) {
    frameCount++
    if (now - lastTime >= 1000) {
      fps.value = frameCount
      frameCount = 0
      lastTime = now
    }
    rafId = requestAnimationFrame(tick)
  }

  onMounted(() => {
    rafId = requestAnimationFrame(tick)
  })

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
  })

  return { fps }
}