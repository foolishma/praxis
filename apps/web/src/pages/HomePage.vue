<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SiteNav from '@/components/SiteNav.vue'
import ArchitectureSection from '@/components/sections/ArchitectureSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import LabSection from '@/components/sections/LabSection.vue'
import QualitySection from '@/components/sections/QualitySection.vue'
import SystemSection from '@/components/sections/SystemSection.vue'
import VisualSection from '@/components/sections/VisualSection.vue'

const { t } = useI18n()
const active = ref('hero')

const sectionIds = ['hero', 'lab', 'visual', 'system', 'architecture', 'quality', 'contact']

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      const top = visible[0]?.target.id
      if (top) active.value = top
    },
    { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
  )
  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="min-h-screen">
    <SiteNav :active="active" />
    <main>
      <HeroSection />
      <LabSection />
      <VisualSection />
      <SystemSection />
      <ArchitectureSection />
      <QualitySection />
      <ContactSection />
    </main>
    <footer class="border-t border-border py-8">
      <p class="text-center font-mono text-xs text-muted">{{ t('footer.built') }}</p>
    </footer>
  </div>
</template>