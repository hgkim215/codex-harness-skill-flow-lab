# Harness Flow Board Product Brief

## Goal

Build a compact task board that can exercise the full Codex harness workflow from requirements clarification through code review.

## Target User

A Codex App operator who wants to inspect whether a skill chain leaves clear evidence, uses tmux-visible workers when useful, and verifies implementation before claiming completion.

## Required Behavior

- Show a `Harness Flow Board` screen with seeded tasks.
- Let the user add a new task from the input.
- Let the user filter tasks by `All`, `Todo`, `Doing`, and `Done`.
- Show summary counts for all statuses.
- Preserve tasks in `localStorage` so refresh does not erase added work.
- Keep the layout usable at desktop `1440x900` and mobile `390x844`.

## Known Baseline Gaps

- The current add-task form clears the input but does not create a task.
- Tasks are not persisted to `localStorage`.
- The shell has a fixed `min-width` that should cause mobile overflow.
- Visual QA evidence does not exist yet.

## Acceptance Criteria

- `npm run lint` passes.
- `npm run build` passes.
- `npm test -- --run` passes after QA fixes.
- Desktop and mobile visual checks show no blank screen, text overlap, or horizontal overflow.
- Final review records any residual risk and harness rule candidates.

