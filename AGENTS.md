# AGENTS.md

## Project

"한입" — a Korean restaurant (맛집) discovery app. One TanStack Start web app deployed on Netlify, wrapped as
iOS/Android apps with Capacitor. UI copy is Korean.

## Architecture

- `src/routes/` — `index.tsx` (browse/search/filter), `r/$id.tsx` (detail + reviews), `saved.tsx` (favorites), `__root.tsx` (head/meta, fonts, manifest).
- `src/components/` — `AppShell` (top header on desktop, bottom tab bar on mobile, safe-area aware), `RestaurantCard`.
- `src/data/restaurants.ts` — curated restaurant catalog (static, typed). `baseRating/baseReviews` are curator seed values that get blended with real reviews in `src/lib/rating.ts`.
- `src/server/reviews.functions.ts` — TanStack server functions (`getReviewStats`, `getReviews`, `addReview`), validated with zod.
- `db/` — Drizzle schema + client (`drizzle-orm/netlify-db`). Migrations in `netlify/database/migrations/` (generate with `drizzle-kit generate --name ...`; never apply manually).
- `src/lib/favorites.ts` — favorites in localStorage (no accounts yet).
- `public/img/` — AI-generated food photos. Always render via Netlify Image CDN using `imageUrl()` from `restaurants.ts`.

## Mobile (Capacitor)

- `capacitor.config.ts` loads the production web URL (`server.url`); `mobile/www/` is only an offline fallback page.
- `ios/` and `android/` are committed native projects. App icon source: `resources/icon.png`.
- Native safe areas: viewport uses `viewport-fit=cover`; use `.pt-safe` / `.pb-safe` utilities.

## Conventions

- Tailwind v4 theme tokens in `src/styles.css` (`tomato`, `cream`, `paper`, `ink`, `muted`, `line`, `mustard`; `font-display` = Gowun Batang).
- Mobile-first layouts; desktop uses wider grids. Loaders must degrade gracefully if the DB is unavailable (`.catch`).
- Tailwind scans only `src/` (`source("./")`) so native folders are ignored.
