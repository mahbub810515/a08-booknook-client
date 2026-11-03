<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Verify before finishing

- `npm run lint` (→ `eslint`, flat config). **Currently red for pre-existing reasons**: 2 errors in shadcn-generated files (`react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`) plus unused-import warnings in `src/app/page.tsx`. Judge your work by whether *your* touched files add new problems — don't mass-edit vendored UI files to chase green.
- `npx tsc --noEmit` — there is **no** typecheck script; passes today. Also no test runner, no CI, no pre-commit hooks.
- Order: lint → typecheck. `npm run build` runs a full `next build` if you need deeper verification.

## Stack facts that change how you work

- Next.js **16.4.4** / React 19.3 with **React Compiler** on (`reactCompiler: true` in `next.config.ts`) — render code must be compiler-clean, and route files use generated global types: keep the `LayoutProps<"/...">` pattern (see `src/app/layout.tsx`).
- `cacheComponents: true` (+ `partialPrefetching`) — server-component data fetching is cache-aware. Read `node_modules/next/dist/docs/` before writing fetching/caching code.
- **Tailwind v4, CSS-first**: no `tailwind.config` and no `postcss.config` — the theme lives in `src/app/globals.css` (`@theme inline` + CSS variables), and CSS compiles via the `@tailwindcss/turbopack` loader rule in `next.config.ts`. Dev server is Turbopack.
- shadcn style is **`base-nova`** on **Base UI** (`@base-ui/react`), *not* Radix — don't assume Radix-style APIs. `src/components/ui/*` is generated: add components with `npx shadcn add <name>` (config: `components.json`); treat existing files as vendored.
- `cn` is re-exported from the `cn` npm package (`src/lib/utils.ts`) — don't replace it with a hand-rolled clsx/tailwind-merge helper.
- Path alias `@/*` → `src/*` (tsconfig + shadcn aliases).

## Repo shape

- Single App Router client app, everything under `src/`: `app/` routes, `components/shared/` feature components, `components/ui/` vendored shadcn, `hooks/`, `lib/`. No backend/API/env code yet (`.env*` is gitignored).
- npm only (`package-lock.json`); Node ≥ 22 (dependency-enforced; local is 24).
