<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

Next.js 16 (App Router, Turbopack) + React 19 app, package manager **npm**. Standard commands live in `README.md` / `package.json` (`npm run dev` → http://localhost:3000, `npm run build`, `npm run start`, `npm run lint`).

Non-obvious notes:
- The app **boots and runs with zero external services**. Env vars go in `.env.local` (copy `.env.example`); it is gitignored. A local `.env.local` with `CALL_MODE=mock` and an `ADMIN_PASSWORD` is enough for dev.
- Without `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`, the quote API (`POST /api/quote`) still returns `200 {ok:true, persisted:false}` — nothing is stored, and `/admin` DB features / price comparison won't function. This graceful degradation is by design, not a bug.
- `GET /api/health` reports Supabase config/connection + current call mode — use it to verify env setup.
- `CALL_MODE=mock` avoids Retell/Twilio entirely (free simulation via `/admin/test`). `web`/`phone` modes need Retell (and a Twilio number for `phone`).
- `npm run lint` currently reports pre-existing errors in `src/components/Header.tsx` and `src/components/StatsCounter.tsx` (`react-hooks/set-state-in-effect`) — these are not caused by env setup.
