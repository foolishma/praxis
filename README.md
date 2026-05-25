# Praxis

Personal frontend portfolio — live performance labs, shared design system, and CI-backed quality checks.

Accent: `#E8FF47` on `#0a0a0b`.

## Architecture

```text
praxis/
├── apps/web/          # Vite + Vue 3 app
├── packages/ui/       # @praxis/ui — buttons, panels, tokens
├── packages/lab/      # @praxis/lab — VirtualFleet, WorkerSplit, RenderBudget
├── turbo.json
└── vercel.json
```

**Stack:** Vue 3, TypeScript, Vue Router, Pinia, vue-i18n, `@vueuse/motion`, UnoCSS.

**Quality:** Vitest, Playwright, Lighthouse CI.

**Routes:** `/` (home), `/brief` (quick summary).

## Local development

Requirements: Node.js 20+, pnpm 10.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173`. Use **Ctrl+K** for the command palette.

```bash
pnpm build
pnpm test
pnpm test:e2e
pnpm --filter @praxis/web typecheck
```

## Deploy to Vercel

1. Import the repository in Vercel.
2. Root Directory: repository root (this folder).
3. Build: `pnpm build`, output: `dist` (repo root).
4. In Vercel Project Settings, set **Output Directory** to `dist` and **Root Directory** to empty (repo root). Do not set Root Directory to `apps/web`.
4. Node 20.x recommended.

## License

MIT
