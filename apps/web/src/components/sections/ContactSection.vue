<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { PraxisButton, SectionHeader } from '@praxis/ui'
import { SITE_BRIEF } from '@/content/siteBrief'

const { t } = useI18n()
const copied = ref(false)

const githubUrl = 'https://github.com/foolishma/praxis'

async function copyBrief() {
  try {
    await navigator.clipboard.writeText(SITE_BRIEF)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2500)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <section id="contact" class="py-24 border-t border-border">
    <div class="max-w-7xl mx-auto px-4">
      <SectionHeader
        :eyebrow="t('contact.eyebrow')"
        :title="t('contact.title')"
      />
      <div class="panel max-w-xl flex flex-col gap-4">
        <a
          :href="githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-sm text-accent hover:underline"
        >
          github.com/foolishma/praxis
        </a>
        <p class="text-muted text-sm">
          Source code and CI config. Summary also available at
          <RouterLink to="/brief" class="text-accent">/brief</RouterLink>.
        </p>
        <PraxisButton @click="copyBrief">
          {{ copied ? t('contact.copied') : t('contact.copyBrief') }}
        </PraxisButton>
      </div>
    </div>
  </section>
</template>
