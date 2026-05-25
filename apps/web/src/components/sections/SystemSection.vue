<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DataPanel, MetricBadge, PraxisButton, SectionHeader, TokenSwatch } from '@praxis/ui'

const { t } = useI18n()
const copiedToken = ref<string | null>(null)

const tokens = [
  { name: 'bg', value: '#0a0a0b', usage: 'Page background' },
  { name: 'surface', value: '#141416', usage: 'Panels & cards' },
  { name: 'border', value: '#2a2a2e', usage: 'Dividers' },
  { name: 'accent', value: '#E8FF47', usage: 'Primary signal' },
  { name: 'text', value: '#f0f0f2', usage: 'Body copy' },
  { name: 'muted', value: '#8b8b95', usage: 'Secondary text' },
]

async function copyToken(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    copiedToken.value = value
    setTimeout(() => {
      if (copiedToken.value === value) copiedToken.value = null
    }, 2000)
  } catch {
    copiedToken.value = null
  }
}
</script>

<template>
  <section id="system" class="py-24 border-t border-border">
    <div class="max-w-7xl mx-auto px-4">
      <SectionHeader
        :eyebrow="t('system.eyebrow')"
        :title="t('system.title')"
        :description="t('system.description')"
      />
      <div class="grid lg:grid-cols-2 gap-6">
        <DataPanel title="Components" subtitle="Design System" footer="From my @praxis/ui package.">
          <div class="flex flex-wrap gap-3 mb-6">
            <PraxisButton>Primary</PraxisButton>
            <PraxisButton variant="ghost">Ghost</PraxisButton>
          </div>
          <div class="flex flex-wrap gap-3">
            <MetricBadge label="Status" value="OK" status="good" />
            <MetricBadge label="Latency" value="12ms" status="warn" />
            <MetricBadge label="Errors" value="0" status="neutral" />
          </div>
        </DataPanel>
        <DataPanel title="Color tokens" subtitle="Design System" footer="Click a swatch to copy the hex value.">
          <p v-if="copiedToken" class="font-mono text-xs text-accent mb-3">Copied {{ copiedToken }}</p>
          <div class="grid sm:grid-cols-2 gap-2">
            <TokenSwatch
              v-for="token in tokens"
              :key="token.name"
              :name="token.name"
              :value="token.value"
              :usage="token.usage"
              @copy="copyToken"
            />
          </div>
        </DataPanel>
      </div>
    </div>
  </section>
</template>