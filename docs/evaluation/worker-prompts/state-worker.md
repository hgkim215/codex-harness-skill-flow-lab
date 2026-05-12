# state-worker Prompt

You are a ralph-execute tmux-visible worker in a shared repo. You are not alone in the codebase. Another worker may edit `src/App.css`; do not revert user, main Codex, or other-worker changes.

## Responsibility

Implement add-task behavior for the `Harness Flow Board`.

## Write Scope

You may edit only:

- `src/App.tsx`

Do not edit tests, CSS, package files, docs, or generated artifacts.

## Context

- Product brief: `docs/product/brief.md`
- Analyze artifact: `docs/exec-plans/02-analyze.md`
- Ralplan handoff: `docs/exec-plans/03-ralplan.md`

## Required Behavior

- Submitting a non-empty task title appends a new task.
- The new task should render in the current task list when the current filter allows it.
- New tasks should default to `todo` status and `medium` priority.
- Summary counts should update through existing derived state.
- The form should clear after a successful add.
- Empty or whitespace-only submissions should not add a task.
- Do not implement `localStorage` persistence in this phase. That is intentionally reserved for `ralph-qa`.

## Verification

Run the most focused available test command you can. Prefer:

```bash
npm test -- --run src/App.test.tsx
```

If you cannot run verification, explain why.

## Final Response Required

Return:

- changed paths
- verification command and result
- blockers
- residual risk

