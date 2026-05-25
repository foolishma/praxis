import { cpSync, existsSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const src = resolve(root, 'apps/web/dist')
const dest = resolve(root, 'dist')

if (!existsSync(src)) {
  console.error(`Missing build output: ${src}`)
  process.exit(1)
}

rmSync(dest, { recursive: true, force: true })
cpSync(src, dest, { recursive: true })
console.log(`Copied ${src} -> ${dest}`)