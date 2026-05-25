import { useMagicKeys, whenever } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export interface CommandItem {
  id: string
  label: string
  hint?: string
  action: () => void
}

export function useCommandPalette() {
  const open = ref(false)
  const query = ref('')
  const router = useRouter()
  const keys = useMagicKeys()
  const cmdK = computed(() => keys['Meta+K']?.value || keys['Ctrl+K']?.value)

  whenever(cmdK, () => {
    open.value = !open.value
    query.value = ''
  })

  const commands: CommandItem[] = [
    { id: 'hero', label: 'Go to Signal Console', hint: '#hero', action: () => router.push({ hash: '#hero' }) },
    { id: 'lab', label: 'Go to Performance Lab', hint: '#lab', action: () => router.push({ hash: '#lab' }) },
    { id: 'visual', label: 'Go to Visual Engine', hint: '#visual', action: () => router.push({ hash: '#visual' }) },
    { id: 'system', label: 'Go to Design System', hint: '#system', action: () => router.push({ hash: '#system' }) },
    { id: 'architecture', label: 'Go to Architecture', hint: '#architecture', action: () => router.push({ hash: '#architecture' }) },
    { id: 'quality', label: 'Go to Quality', hint: '#quality', action: () => router.push({ hash: '#quality' }) },
    { id: 'contact', label: 'Go to Contact', hint: '#contact', action: () => router.push({ hash: '#contact' }) },
    { id: 'brief', label: 'Open project brief', hint: '/brief', action: () => router.push('/brief') },
  ]

  const filtered = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(c =>
      c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q),
    )
  })

  function run(item: CommandItem) {
    item.action()
    open.value = false
    query.value = ''
  }

  function close() {
    open.value = false
    query.value = ''
  }

  return { open, query, filtered, run, close }
}