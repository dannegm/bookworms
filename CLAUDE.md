# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package manager

This project uses **yarn** (classic v1). Never use `npm install` or `npm uninstall` — it creates a spurious `package-lock.json` and breaks the lockfile. Migration to pnpm is planned but not yet done.

```bash
yarn install        # Install dependencies
yarn add <pkg>      # Add a package
yarn remove <pkg>   # Remove a package
```

## Commands

```bash
# Development
yarn dev          # Start Vite dev server with HMR
yarn build        # Production build
yarn preview      # Preview production build locally
yarn lint         # Run ESLint
yarn make         # Run Plop code generator (component or hook)

# Bucket server (cd bucket/ first)
yarn start        # Start Express file server
```

There are no tests in this project.

## Project Context

Bookworms is a fork of "la biblioteca secreta" — a private digital library with ~150k ePub books, shared among a small closed group (~10 users). There is no authentication by design; security through obscurity is intentional and sufficient. Production: https://bookworms.hckr.mx. Sole developer and maintainer.

### What the app does

Users can search for books, authors, and series, browse results, read book details, download ePub files, send books to Kindle, and read books in an integrated ePub reader. Search uses vector-approximate matching (backed by Postgres + Supabase on the API side), so queries like "Jarry Poder" correctly return "Harry Potter".

### How book downloads work

Books are not hosted anywhere permanently — they're fetched on demand from a torrent repository to avoid copyright violations. The flow:

1. User clicks "Descargar" → frontend calls `requestBookFile(filename)` on the API
2. The API notifies the torrent repository via pub/sub
3. The repository (running on somewhere*) finds the book, converts it to any preferred format (ePub/Mobi) using Calibre, and uploads it to a temporary cloud bucket
4. After 5 seconds, the frontend calls `validateBookFile(filename)` to check if the file is ready
5. If ready, a green download button appears — clicking it calls `downloadBookFile(filename)`, which streams the blob to the browser
6. The file is deleted from the temporary bucket after download
7. If the file isn't ready, the button shows "No disponible" (terminal state, no automatic retry)

### Kindle delivery

Same request flow, but instead of returning the file to the browser, the API downloads it, converts it to Mobi via Calibre, attaches it to an email, and sends it to the user's Kindle address.

### Book covers (bucket server)

Covers are served from somewhere* via a small Express server (`bucket/`) exposed through a Cloudflare Tunnel. This bypasses CORS and avoids cloud hosting costs. Previously used Firebase Storage, but switched when it stopped being free. Controlled by `NEXT_PUBLIC_COVER_VENDOR=tunnel` in production (`firebase` is legacy and unused).

### Integrated ePub reader

Uses the `react-reader` library. Reading progress is stored in `localStorage`, keyed by `libid` (the book's identifier — inherited from the original fork's database and kept in Bookworms' own DB).

### API configuration

The API (`endpoints.hckr.mx/bookworms`) exposes key/value settings (stored as `jsonb`). The most relevant to the frontend: whether the torrent repository is currently available — when it's offline, the frontend shows an alert to users.

## Architecture

This is a **book discovery SPA** built with React 19 + Vite, deployed to Vercel. A separate Express server (`bucket/`) handles file serving (book covers) and is deployed independently via PM2.

### Frontend Structure

```
src/
├── main.jsx                  # Entry: renders <RouterProvider router={router} />
├── router.jsx                # TanStack Router — code-based routes (/, /book/$libid, /author/$key, /serie/$key, /category/$key, /search/$entity, /search, /404)
├── css/                      # Global styles: fonts, animations, shadcn vars, utils
├── helpers/                  # Pure utilities: constants, arrays, maths, strings, date, image, utils
├── hooks/                    # All hooks: useBreakpoint, useDarkMode, useLocalStorage, useAuthorAvatar, etc.
├── providers/                # Context providers: HelmetProvider, DarkMode, Trackers (Umami), ReactQuery, NuqsAdapter
├── services/                 # API clients: bookworms.js, openlibrary.js, umami.js, firebase.js (legacy)
├── pages/                    # Route-level components: home, book, author, serie, category, search, not-found
├── components/
│   ├── book/                 # BookCover, BookDetails, BookPreview, BookViewer, BooksList, etc.
│   ├── author/               # AuthorAvatar, AuthorChip, AuthorDetails, AuthorsList, etc.
│   ├── serie/                # SerieChip, SerieDetails, SerieSuggestions, SeriesList, etc.
│   ├── category/             # CategoryChip, CategoryDetails, etc.
│   ├── download/             # DownloadBook, SendToKindle
│   ├── layout/               # Layout, Section, Logo, SearchBox, Summaries, TopBooks, Faqs, BucketStatus, Loader
│   └── system/               # Debugger, JsonViewer, BreakpointIndicator, DarkModeToggle, DebugModeToggle, TrackClick
├── ui/                       # Shadcn/UI primitives + RichText (Button, Input, Dialog, Drawer, etc.)
└── index.css                 # CSS entry: imports from css/
```

### Provider Stack (outer → inner)

`NuqsAdapter` → `TrackersProvider` → `QueryClientProvider` → `DarkModeProvider` → `Suspense` + `Toaster`

### Data Flow

- **API layer**: All data fetches go through `src/modules/core/services/bookworms.js` → `https://endpoints.hckr.mx/bookworms`
- **Data fetching**: TanStack React Query v5. Service functions follow a query factory pattern — they return `{ queryKey, queryFn, ...options }` objects and are passed directly to `useQuery()`. Example: `useQuery(getBook(libid, { retry: 0 }))`.
- **Rendering pattern**: use if-block early returns instead of ternary conditional renders. Repeat the layout structure in loading/error states rather than nesting ternaries.
- **Book covers**: `book-cover.jsx` (tunnel, production) and `book-cover-firebase.jsx` (legacy). Controlled by `NEXT_PUBLIC_COVER_VENDOR`.
- **URL state**: `nuqs` manages search/filter state in query strings
- **Download state machine**: `UNINITIALIZED → REQUESTED → (5s) → AVAILABLE → DOWNLOADING → UNINITIALIZED` (or `REJECTED` on failure — terminal, no retry). See `src/modules/main/components/download-book.jsx`.

### Path Alias

`@/` maps to `./src/` — use it for all imports.

## Code Generation

Use `yarn make` (Plop) to scaffold new files from templates:
- `component` → `src/modules/main/components/{name}.jsx`
- `hook` → `src/modules/main/hooks/use-{name}.jsx`

Templates live in `/templates/`.

## Environment Variables

All frontend vars use `NEXT_PUBLIC_` prefix (Vite reads them via `import.meta.env`):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_BOOKWORMS_API_KEY` | Main API auth |
| `NEXT_PUBLIC_BUCKET_URL` | File server URL |
| `NEXT_PUBLIC_COVER_VENDOR` | `tunnel` or `firebase` |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase config (5 vars) |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami analytics |
| `NEXT_PUBLIC_UMAMI_WEBSITE_HOST_URL` | Umami host |

Bucket server vars: `PORT`, `ALLOWED_ORIGINS`, `ALLOWED_EXTENSIONS`, `COVERS_DIR`

## Code Conventions

**Files and exports**
- Filenames: kebab-case always (`my-component.jsx`, `use-my-hook.js`)
- `export const` for everything; `export default` only in `app.jsx`
- No TypeScript, no JSDoc, no type annotations
- `useRef` variables use a `$` prefix (e.g. `$ref`); never `$` on other state/variables

**CSS and Tailwind**
- Always use `cn()` from `@/modules/core/helpers/utils` for class names — never template literals or string concatenation. Tailwind can't scan dynamic strings and purges the classes.
- **Text opacity**: main labels `text-white/90`+, secondary `text-white/70`+, hints `text-white/50`+. Below `/50` only for decorative/disabled.
- **No transparency on icons or text**: stroke-based icons have overlapping paths — transparency creates visible artifacts. Use solid palette colors (`text-zinc-500`) instead of opacity suffixes.
- **Icon sizing**: `[&>svg]:size-X` on the container; never the `size` prop on Lucide icons.
- **Square sizing**: when `w-X` and `h-X` are equal, always use `size-X` (`w-4 h-4` → `size-4`). Exception: conditional orientation classes.
- **Units**: prefer `rem` over `px`. Use `px` only for values that must not scale (e.g. 1px borders).
- **Tailwind scale**: use built-in scale values; only use arbitrary brackets (`size-[X]`) when no equivalent exists.
- **Dynamic values**: pass runtime values as CSS custom properties and reference with Tailwind's variable syntax: `<div className="w-(--panel-width)" style={{ '--panel-width': '22.5rem' }} />`.
- **Shadows**: always pair with an explicit color — `shadow-lg shadow-black/30`. Tailwind v4 shadows have no default color.

**Other**
- `match()` from `@/modules/core/helpers/utils` is a custom pattern-matching utility inspired by `ts-pattern`. Always works with objects. Handlers can be functions `() => value` or raw values directly.

## Responsive Design

- **Mobile-first**: start with mobile layout, add responsive variants up.
- **Overlay pattern**: Drawer on mobile, Dialog on desktop. Used consistently for any modal/panel/overlay component (the ePub reader follows this pattern).

## Planned Refactors (in order)

1. ~~Code style — paradigms and conventions cleanup~~ ✓
2. ~~Folder structure reorganization~~ ✓
3. UI redesign
4. New features (TBD)
