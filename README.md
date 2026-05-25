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

**Option A — Root Directory empty (recommended)**

| Setting | Value |
|---------|-------|
| Root Directory | *(empty)* |
| Build Command | `pnpm vercel-build` *(or leave blank — uses package.json)* |
| Output Directory | `dist` |
| Install Command | `pnpm install --frozen-lockfile` |

**Option B — Root Directory = `apps/web`**

Vercel reads `apps/web/vercel.json` automatically. Output Directory must be `dist`.

After changing settings, click **Redeploy**.

## License

MIT
