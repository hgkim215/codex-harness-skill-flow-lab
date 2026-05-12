# visual-worker Prompt

You are a ralph-execute tmux-visible worker in a shared repo. You are not alone in the codebase. Another worker may edit `src/App.tsx`; do not revert user, main Codex, or other-worker changes.

## Responsibility

Make the existing `Harness Flow Board` shell responsive enough that it no longer has obvious fixed-width mobile overflow.

## Write Scope

You may edit only:

- `src/App.css`

Do not edit TypeScript, tests, package files, docs, or generated artifacts.

## Context

- Product brief: `docs/product/brief.md`
- Analyze artifact: `docs/exec-plans/02-analyze.md`
- Ralplan handoff: `docs/exec-plans/03-ralplan.md`

## Required Behavior

- Remove the fixed `min-width: 760px` mobile overflow risk.
- Keep desktop layout organized.
- At mobile widths, stack header columns, summary cards, form controls, filters, and task cards so text can fit.
- Avoid a broad redesign. Keep the current quiet work-focused visual direction.

## Verification

Run the most relevant available static check you can. Prefer:

```bash
npm run build
```

If you cannot run browser visual checks, say that final visual evidence remains for `visual-ralph-qa`.

## Final Response Required

Return:

- changed paths
- verification command and result
- blockers
- residual risk

