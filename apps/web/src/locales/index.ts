import { createI18n } from 'vue-i18n'
import en from './en.json'
import zh from './zh.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, zh },
})

export function toggleLocale() {
  i18n.global.locale.value = i18n.global.locale.value === 'en' ? 'zh' : 'en'
}