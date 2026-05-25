<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RenderBudget, VirtualFleet, WorkerSplit } from '@praxis/lab'
import { SectionHeader } from '@praxis/ui'
import { useDegradedMode } from '@/composables/useDegradedMode'
import { useMetricsStore } from '@/stores/metrics'

const { t } = useI18n()
const { degraded } = useDegradedMode()
const metrics = useMetricsStore()

function onLabFps(value: number) {
  metrics.labFps = value
}
</script>

<template>
  <section id="lab" class="py-24 border-t border-border">
    <div class="max-w-7xl mx-auto px-4">
      <SectionHeader
        :eyebrow="t('lab.eyebrow')"
        :title="t('lab.title')"
        :description="t('lab.description')"
      />
      <div class="grid lg:grid-cols-2 gap-6">
        <VirtualFleet :fps="metrics.labFps" :degraded="degraded" @update:fps="onLabFps" />
        <WorkerSplit />
      </div>
      <div class="mt-6">
        <RenderBudget :degraded="degraded" @update:fps="onLabFps" />
      </div>
    </div>
  </section>
</template>