# Codex Harness Rules

This repo is a live testbed for the user's Codex-native skill flow.

## Source Of Truth

- Use this file as the map, not the full spec.
- Product intent lives in `docs/product/`.
- Execution plans and skill handoffs live in `docs/exec-plans/`.
- Evaluation evidence and KPI results live in `docs/evaluation/`.
- Verification entrypoints live in `Makefile` and `scripts/`.

## Skill Flow Under Test

Run the workflow in this order:

1. `deep-interview`
2. `analyze`
3. `ralplan`
4. `ralph-execute`
5. `ralph-qa`
6. `visual-ralph-qa`
7. `code-review`

## Operating Rules

- Read repo docs before asking the user for discoverable facts.
- Keep read-only skills read-only.
- Preserve existing user changes. Do not use destructive git commands.
- When worker execution is useful, prefer tmux-visible workers opened in Ghostty.
- Every implementation or QA claim needs command, browser, screenshot, or file evidence.
- Repeated failures should become harness rule candidates.

## Verification

- Fast local check: `make verify-fast`
- Full local check: `make verify-full`
- UI preview: `npm run dev -- --host 127.0.0.1 --port 5173`

