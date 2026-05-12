---
type: project
created: 2026-05-04
updated: 2026-05-12
status: maintenance
side: personal
phase: showcase-complete
tags: [personal, e-commerce, showcase, frontend, react]
linked: [[claude-project]], [[holidai]]
---

# Lumière Beauty — Context

## 1. What it is
Lumière Beauty Boutique — a luxury e-commerce showcase. Three-tier app (frontend / backend / api) demonstrating Ali's full-stack capability outside the TUI / travel domain. Personal portfolio piece, not a live product.

## 2. Why it exists
Two reasons:
- **Portfolio breadth** — most of Ali's personal work is agentic AI (jarvis, holidai). Lumière proves the toolkit covers traditional commerce stacks too, in case a recruiter or collaborator wants evidence outside the AI lane.
- **React Vite Node baseline** — a relatively simple, modern stack reference for any future personal e-commerce experimentation.

## 3. Where it lives
| | |
|---|---|
| **Vault** | `30-projects/lumiere-beauty/` (submodule) |
| **Remote** | `github.com/alikhan-specs/lumiere-beauty` |
| **Side** | Personal — public repo |

## 4. Tech stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite (`frontend/`) |
| API | Express + CORS + UUID (`api/`) |
| Backend | Node.js (`backend/`) |
| Deployment | Vercel (`vercel.json` configured) |
| Architecture | Three-tier monorepo |

## 5. Current state (as of 2026-05-12)
**Maintenance mode — showcase complete.** Last submodule commit `6a5ace4 chore: add project context file` (2026-05-05). Prior to that: `b75ac3e Security hardening: input validation, CORS, headers`, `aa1fafc Fix broken hero image on home page`. Pattern: hardening pass complete, no new features in progress.

## 6. Recent decisions
- **Origin in `claude-project/beauty-shop/`** (decisions inherited) — content moved out of [[claude-project]] workspace into this dedicated repo when ready to ship.
- **Security hardening pass** — input validation + CORS + security headers added before treating the showcase as portfolio-ready.
- **No backend integration beyond stubs** — this is a frontend-led showcase; the backend exists but isn't a real commerce engine.

## 7. Open threads / blockers
- **No deployment URL captured** — `vercel.json` exists, but the live URL (if any) isn't in the vault. Worth recording.
- **No analytics / conversion tracking** — fine for a portfolio piece, but if it ever serves real traffic the gap matters.
- **Stale dependency set possible** — last security hardening pass predates 2026-05-05; routine dep audit not scheduled.

## 8. What "done" looks like
**Likely already done.** As a portfolio piece, the showcase is complete: hero image fixed, security hardened, three tiers wired. Anything beyond is gold-plating unless the project pivots to something real.

## 9. People involved
- Ali — sole maintainer
- No customers, no team

## 10. Cross-references
- Related vault: [[claude-project]] (origin — content moved out of `beauty-shop/`), [[holidai]] (consumer-facing e-commerce sibling, more complete)
- Strategic narrative: portfolio breadth — demonstrates non-AI full-stack capability

## 11. How to work on this with the clone
Three-tier structure (`api/`, `backend/`, `frontend/`). When touching any tier, respect the tier boundary — no cross-tier imports. Static showcase data, no real customer flow. Treat any change as opt-in: this repo is in maintenance, not active development.
