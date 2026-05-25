import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno({ dark: 'class' }),
    presetIcons({ scale: 1.1 }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      bg: '#0a0a0b',
      surface: '#141416',
      border: '#2a2a2e',
      muted: '#8b8b95',
      text: '#f0f0f2',
      accent: '#E8FF47',
      danger: '#FF4D4D',
      success: '#47FFB2',
    },
    fontFamily: {
      display: 'Syne, sans-serif',
      sans: 'IBM Plex Sans, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
  },
  shortcuts: {
    'panel': 'bg-surface border border-border rounded-lg p-6',
    'section-title': 'font-display text-3xl md:text-4xl font-700 tracking-tight',
    'label-mono': 'font-mono text-xs uppercase tracking-widest text-muted',
    'btn-primary': 'inline-flex items-center gap-2 px-4 py-2 bg-accent text-bg font-mono text-sm font-500 rounded hover:brightness-110 transition',
    'btn-ghost': 'inline-flex items-center gap-2 px-4 py-2 border border-border text-text font-mono text-sm rounded hover:border-accent hover:text-accent transition',
  },
})