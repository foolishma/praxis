<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { MetricBadge } from '@praxis/ui'
import SignalNetwork from '@/components/SignalNetwork.vue'
import { useDegradedMode } from '@/composables/useDegradedMode'
import { useFps } from '@/composables/useFps'
import { useMetricsStore } from '@/stores/metrics'

const { t } = useI18n()
const { degraded } = useDegradedMode()
const { fps } = useFps()
const metrics = useMetricsStore()

watch(fps, (value) => {
  metrics.renderFps = value
}, { immediate: true })
</script>

<template>
  <section id="hero" class="relative min-h-screen pt-14 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
      <div class="relative z-10">
        <p
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          class="label-mono text-accent mb-4"
        >
          {{ t('hero.eyebrow') }}
        </p>
        <h1
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 80, duration: 600 } }"
          class="section-title text-text mb-6"
        >
          {{ t('hero.title') }}
        </h1>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 160, duration: 600 } }"
          class="text-muted text-lg leading-relaxed mb-8 max-w-xl"
        >
          {{ t('hero.subtitle') }}
        </p>
        <div
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 240, duration: 500 } }"
          class="flex flex-wrap gap-3 mb-6"
        >
          <MetricBadge label="Live FPS" :value="fps" :status="fps >= 55 ? 'good' : fps >= 45 ? 'warn' : 'bad'" />
          <MetricBadge label="Bundle" :value="metrics.bundleSize" status="neutral" />
          <MetricBadge label="Lighthouse" :value="`${metrics.lighthouse.performance}`" status="good" />
        </div>
        <div
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 320, duration: 500 } }"
          class="flex flex-wrap items-center gap-4"
        >
          <RouterLink to="/brief" class="btn-primary">{{ t('hero.cta') }}</RouterLink>
          <span class="font-mono text-xs text-muted">{{ t('hero.cmdHint') }}</span>
        </div>
      </div>
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.96 }"
        :enter="{ opacity: 1, scale: 1, transition: { delay: 200, duration: 700 } }"
        class="relative h-80 lg:h-[28rem] rounded-lg border border-border bg-surface/50"
      >
        <SignalNetwork :degraded="degraded" />
      </div>
    </div>
  </section>
</template>