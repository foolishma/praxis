<script setup lang="ts">
import { SITE_BRIEF } from '@/content/siteBrief'
</script>

<template>
  <div class="min-h-screen pt-14 px-4 pb-16">
    <div class="max-w-2xl mx-auto">
      <RouterLink to="/#lab" class="font-mono text-xs text-accent hover:underline">← Back to Performance Lab</RouterLink>
      <h1 class="section-title text-text mt-8 mb-6">Project brief</h1>
      <p class="text-lg text-text leading-relaxed mb-4">
        I focus on frontend systems that stay fast under pressure. Praxis is my playground for
        performance work, visual craft, and the tooling I use day to day.
      </p>
      <ul class="text-muted space-y-2 mb-8 list-disc pl-5">
        <li>Vue 3 + TypeScript + Vite, dark Industrial theme, accent <span class="text-accent font-mono">#E8FF47</span></li>
        <li>Pinia metrics, Vue Router, Web Workers, PWA</li>
        <li>Vitest, Playwright, Lighthouse CI on every push</li>
      </ul>
      <p class="text-sm text-muted border-l-2 border-accent pl-4 mb-8">
        中文：这是我的个人前端作品集，用可交互的性能实验展示工程能力。
      </p>
      <pre class="panel font-mono text-xs text-muted whitespace-pre-wrap leading-relaxed">{{ SITE_BRIEF }}</pre>
      <RouterLink to="/" class="btn-ghost inline-flex mt-8">Full site</RouterLink>
    </div>
  </div>
</template>
