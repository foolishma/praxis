<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { MetricBadge, SectionHeader } from '@praxis/ui'

const { t } = useI18n()

const badges = [
  { label: 'Vitest', value: 'unit', status: 'good' as const },
  { label: 'Playwright', value: 'e2e smoke', status: 'good' as const },
  { label: 'a11y', value: 'WCAG-minded', status: 'warn' as const },
]

const tradeoffs = [
  'Three.js hero network loads on idle time — first paint stays lean, with a CSS fallback on older GPUs.',
  'Non-virtualized list mode caps at 500 rows so the browser stays responsive during comparisons.',
  'Lighthouse scores in CI depend on preview cold start — I use them as regression guardrails, not marketing numbers.',
  'i18n covers navigation and sections; lab copy stays English-first for consistency.',
  'PWA caching speeds repeat visits; Vite asset hashing handles cache busting on deploy.',
]
</script>

<template>
  <section id="quality" class="py-24 border-t border-border">
    <div class="max-w-7xl mx-auto px-4">
      <SectionHeader
        :eyebrow="t('quality.eyebrow')"
        :title="t('quality.title')"
        :description="t('quality.description')"
      />
      <div class="flex flex-wrap gap-3 mb-10">
        <MetricBadge
          v-for="badge in badges"
          :key="badge.label"
          :label="badge.label"
          :value="badge.value"
          :status="badge.status"
        />
      </div>
      <div class="panel max-w-3xl">
        <h3 class="font-mono text-sm text-accent uppercase tracking-widest mb-4">Engineering trade-offs</h3>
        <ul class="space-y-3 text-muted leading-relaxed list-disc pl-5">
          <li v-for="(item, index) in tradeoffs" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>