<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { SectionHeader } from '@praxis/ui'

const { t } = useI18n()

interface ArchNode {
  id: string
  label: string
  summary: string
  rationale: string
}

const nodes: ArchNode[] = [
  {
    id: 'monorepo',
    label: 'pnpm monorepo',
    summary: 'apps/web + packages/ui + packages/lab',
    rationale: 'I split UI and lab modules into workspace packages so the app stays thin and reusable pieces stay testable on their own.',
  },
  {
    id: 'vue-router',
    label: 'vue-router',
    summary: 'Home anchors + /brief summary page',
    rationale: 'Hash navigation keeps section jumps smooth; /brief is a short standalone page I can share without the full scroll experience.',
  },
  {
    id: 'pinia',
    label: 'pinia',
    summary: 'Live metrics store',
    rationale: 'FPS, bundle size, and lighthouse scores live in one store and feed the hero HUD plus lab widgets.',
  },
  {
    id: 'workers',
    label: 'web workers',
    summary: 'Off-main-thread compute',
    rationale: 'WorkerSplit shows how I keep heavy work off the main thread — the same approach I use for large client-side transforms.',
  },
  {
    id: 'pwa',
    label: 'vite-plugin-pwa',
    summary: 'Offline shell + installable',
    rationale: 'The service worker caches the static shell; canvas and WebGL modules fall back when GPU or storage budget is tight.',
  },
  {
    id: 'ci',
    label: 'GitHub Actions',
    summary: 'build · test · e2e · lighthouse',
    rationale: 'Every push runs unit tests, Playwright smoke, and Lighthouse CI so the numbers on the site match what CI reports.',
  },
]

const expanded = ref<string | null>('monorepo')

function toggle(id: string) {
  expanded.value = expanded.value === id ? null : id
}
</script>

<template>
  <section id="architecture" class="py-24 border-t border-border">
    <div class="max-w-7xl mx-auto px-4">
      <SectionHeader
        :eyebrow="t('architecture.eyebrow')"
        :title="t('architecture.title')"
        :description="t('architecture.description')"
      />
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <button
          v-for="node in nodes"
          :key="node.id"
          type="button"
          class="panel text-left transition hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          :class="expanded === node.id ? 'border-accent' : ''"
          @click="toggle(node.id)"
        >
          <p class="label-mono text-accent mb-2">{{ node.label }}</p>
          <p class="font-mono text-sm text-text mb-2">{{ node.summary }}</p>
          <p
            v-if="expanded === node.id"
            class="text-muted text-sm leading-relaxed border-t border-border pt-3 mt-3"
          >
            {{ node.rationale }}
          </p>
          <p v-else class="text-xs text-muted font-mono">Click to expand rationale</p>
        </button>
      </div>
    </div>
  </section>
</template>