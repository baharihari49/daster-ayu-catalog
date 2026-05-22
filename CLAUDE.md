# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server on `0.0.0.0:3000`
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built bundle
- `npm run lint` — typecheck only (`tsc --noEmit`); there are no ESLint or test runners configured

There is no test suite. There is no linter beyond TypeScript's typechecker — `npm run lint` is the only correctness gate.

## Architecture

Single-page React 19 + Vite + TypeScript + Tailwind v4 catalog for "Daster Ayu," an Indonesian housedress (daster) brand. The whole app is intentionally tiny:

- `src/main.tsx` — React root.
- `src/App.tsx` — every component (Header, Hero, Tabs, ModelFilters, ProductCard, ProductDetailSheet, EmptyState, Footer) lives in this one file. Treat it as a single screen, not a place to introduce routing or a `components/` tree unless the catalog grows beyond this scope.
- `src/data.ts` — product catalog as a hardcoded `DUMMY_PRODUCTS` array plus the `Product`, `Tier`, `Model`, `Status` types that the rest of the app filters on. There is no backend; updating the catalog means editing this file.
- `src/index.css` — Tailwind v4 entrypoint. Brand colors and fonts are defined as CSS custom properties inside `@theme { ... }` (e.g. `--color-primary`, `--color-brand-sage`, `--font-serif`). Tailwind v4 turns these into utilities like `bg-primary`, `text-brand-sage`, `font-serif` — **add new brand tokens here**, not in a separate Tailwind config (there is no `tailwind.config.js`; the plugin is wired via `@tailwindcss/vite`).

### Ordering flow

There is no cart or checkout. Both the header "Hubungi Kami" button and the product detail sheet's "Order via WhatsApp" CTA open `https://wa.me/628123456789` with a `text` query string templated from the selected product. The phone number is duplicated in `App.tsx` (Header, Footer, `ProductDetailSheet`) — change all three together.

### Filtering

`App` holds two pieces of filter state (`activeTab` for tier, `activeModel` for model) and derives `filteredProducts` from `DUMMY_PRODUCTS`. The tab/model option lists are also hardcoded in `Tabs` and `ModelFilters`; when adding a new `Tier` or `Model` literal type in `data.ts`, update those component arrays too.

### Path alias

`@/*` resolves to the project root (set in both `tsconfig.json` and `vite.config.ts`). The current code doesn't use it — relative imports are the norm.

## Environment & hosting

This project was scaffolded by Google AI Studio (see `README.md`). Notes:

- `package.json` lists `@google/genai`, `express`, `dotenv`, `tsx` — none are imported yet. They're there because the AI Studio template assumes a future server/AI route.
- `.env.example` documents `GEMINI_API_KEY` and `APP_URL` as AI-Studio-injected variables. Locally, copy to `.env.local` if you start using them.
- `vite.config.ts` reads `DISABLE_HMR=true` to turn off HMR and file watching. The inline comment says this is for AI Studio agent edits — don't remove that branch.

## UI conventions

- All copy is Indonesian. Keep new strings in Indonesian unless the task explicitly says otherwise.
- Animations use `motion/react` (the Motion package, successor to Framer Motion), not `framer-motion`.
- Icons come from `lucide-react`.
- Currency is formatted via `formatRupiah` in `App.tsx` (IDR, no decimals, space after `Rp`).
