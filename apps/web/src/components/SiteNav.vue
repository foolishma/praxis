<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { toggleLocale } from '@/locales'

defineProps<{ active?: string }>()
const { t } = useI18n()

const links = [
  { id: 'hero', key: 'nav.hero' },
  { id: 'lab', key: 'nav.lab' },
  { id: 'visual', key: 'nav.visual' },
  { id: 'system', key: 'nav.system' },
  { id: 'architecture', key: 'nav.architecture' },
  { id: 'quality', key: 'nav.quality' },
  { id: 'contact', key: 'nav.contact' },
]
</script>

<template>
  <nav class="fixed top-0 inset-x-0 z-50 border-b border-border/80 bg-bg/80 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
      <a href="#hero" class="font-display font-800 text-accent tracking-tight">PRAXIS</a>
      <div class="hidden lg:flex items-center gap-1">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="px-2 py-1 font-mono text-xs uppercase tracking-wide transition"
          :class="active === link.id ? 'text-accent' : 'text-muted hover:text-text'"
        >
          {{ t(link.key) }}
        </a>
      </div>
      <div class="flex items-center gap-2">
        <button type="button" class="btn-ghost text-xs" @click="toggleLocale">EN/中</button>
        <RouterLink to="/brief" class="btn-primary text-xs hidden sm:inline-flex">{{ t('nav.brief') }}</RouterLink>
        <kbd class="hidden md:inline font-mono text-xs text-muted border border-border px-2 py-1 rounded">Ctrl+K</kbd>
      </div>
    </div>
  </nav>
</template>