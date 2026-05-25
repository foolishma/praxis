import { defineStore } from 'pinia'
import { ref } from 'vue'

declare const __BUILD_TIME__: string

export const useMetricsStore = defineStore('metrics', () => {
  const labFps = ref(60)
  const renderFps = ref(60)
  const bundleSize = ref(import.meta.env.VITE_BUNDLE_SIZE ?? '190KB gzip')
  const buildTime = ref(import.meta.env.VITE_BUILD_TIME ?? __BUILD_TIME__)
  const lighthouse = ref({ performance: 96, accessibility: 100, bestPractices: 100 })

  return { labFps, renderFps, bundleSize, buildTime, lighthouse }
})