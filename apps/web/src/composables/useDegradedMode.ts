import { useMediaQuery } from '@vueuse/core'
import { computed } from 'vue'

export function useDegradedMode() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const degraded = computed(() => isMobile.value || prefersReducedMotion.value)
  return { degraded, isMobile, prefersReducedMotion }
}