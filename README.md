# Bookworms

A private digital library SPA for a small closed group (~10 users). Search ~150k ePub books with vector-approximate matching, download them on demand via a torrent pipeline, send to Kindle, or read them in-browser.

Production: **https://bookworms.hckr.mx**

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite, TanStack Router, TanStack Query v5 |
| Styling | Tailwind CSS v4, Radix UI, shadcn/ui primitives |
| State | nuqs (URL), React Query (server), localStorage (reader progress) |
| Analytics | Umami |
| Deployment | Vercel (SPA) + PM2 + Cloudflare Tunnel (bucket server) |

---

## Getting started

```bash
yarn install
yarn dev        # Vite dev server with HMR → http://localhost:5173
```

```bash
yarn build      # Production build
yarn preview    # Preview production build locally
yarn lint       # ESLint
yarn make       # Plop code generator (component or hook)
```

> Uses **yarn** (classic v1). Never use `npm install` — it creates a spurious `package-lock.json`.

### Environment variables

All frontend vars use the `NEXT_PUBLIC_` prefix (read via `import.meta.env`):

```env
NEXT_PUBLIC_BOOKWORMS_API_KEY=     # Main API auth
NEXT_PUBLIC_BUCKET_URL=            # Book covers server URL
NEXT_PUBLIC_COVER_VENDOR=tunnel    # "tunnel" (prod) or "firebase" (legacy)
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
NEXT_PUBLIC_UMAMI_WEBSITE_HOST_URL=

# Firebase (legacy, unused in production)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## Architecture

```
bookworms/
├── src/
│   ├── main.jsx            # Entry point
│   ├── router.jsx          # TanStack Router (/, /book/$libid, /author/$key, /serie/$key, ...)
│   ├── pages/              # Route-level components
│   ├── components/         # Feature components (book/, author/, download/, layout/, ...)
│   ├── hooks/              # Custom hooks
│   ├── services/           # API clients (bookworms.js, openlibrary.js)
│   ├── providers/          # Context providers (DarkMode, ReactQuery, Trackers, ...)
│   ├── helpers/            # Pure utilities (constants, strings, maths, ...)
│   ├── ui/                 # shadcn/ui primitives
│   └── css/                # Global styles, fonts, animations
└── bucket/                 # Express file server for book covers
    ├── server.js
    └── HOW_TO_DEPLOY.md
```

### Provider stack (outer → inner)

`NuqsAdapter` → `TrackersProvider` → `QueryClientProvider` → `DarkModeProvider` → `Suspense` + `Toaster`

### Data fetching

Service functions return query factory objects `{ queryKey, queryFn, ...options }` passed directly to `useQuery()`:

```js
const { data } = useQuery(getBook(libid, { retry: 0 }))
```

---

## How book downloads work

Books are fetched on demand from a torrent repository — nothing is hosted permanently.

```
User clicks "Descargar"
  → requestBookFile(filename)          API notifies the torrent repo via pub/sub
  → (5 second wait)
  → validateBookFile(filename)         Check if the file landed in the temp bucket
  → AVAILABLE: green download button
  → downloadBookFile(filename)         Streams the blob to the browser
  → file deleted from bucket after download

REJECTED state is terminal — no automatic retry.
```

**Kindle delivery** follows the same request flow, but the API converts the file to Mobi via Calibre and emails it to the user's Kindle address instead of returning it to the browser.

**Download state machine:** `UNINITIALIZED → REQUESTED → AVAILABLE → DOWNLOADING → UNINITIALIZED` (or `REJECTED` on failure).

---

## Bucket server (book covers)

A small Express server that serves cover images from a local directory via a Cloudflare Tunnel, bypassing CORS and cloud hosting costs.

```bash
cd bucket
npm install
```

Create `bucket/.env`:

```env
NODE_ENV=production
PORT=3100
BUCKET_DIR=/absolute/path/to/covers
ALLOWED_ORIGINS=yourdomain.com
ALLOWED_EXTENSIONS=webp
```

See [`bucket/HOW_TO_DEPLOY.md`](bucket/HOW_TO_DEPLOY.md) for the full PM2 + Cloudflare Tunnel setup.

---

## Code generation

```bash
yarn make
# → component  →  src/components/{name}.jsx
# → hook       →  src/hooks/use-{name}.jsx
```

Templates live in `/templates/`.
