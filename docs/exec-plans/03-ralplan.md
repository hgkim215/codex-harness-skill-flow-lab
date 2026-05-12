# Ralplan Artifact

## Decision

Use a staged workflow that intentionally exercises all execution and QA skills:

1. `ralph-execute` implements the first functional pass with tmux-visible workers.
2. `ralph-qa` handles the remaining persistence acceptance criterion with a reproduce-fix-verify loop.
3. `visual-ralph-qa` verifies and fixes any browser-visible layout issues.
4. `code-review` reviews the completed diff and QA evidence.

## Drivers

- The user wants the full skill chain tested, not only a final green build.
- `AGENTS.md:17-23` requires the skill order under test.
- `docs/product/brief.md:13-18` gives enough acceptance criteria to plan implementation.
- `docs/evaluation/kpi-rubric.md:24-35` requires evidence for worker observability, verification strength, visual QA, review quality, and git traceability.
- `docs/exec-plans/02-analyze.md` identifies independent functional and visual gaps that can split into disjoint worker scopes.

## Alternatives Considered

1. Main-only implementation
   - Pros: simpler integration, lower coordination overhead.
   - Cons: does not meaningfully test Ghostty/tmux worker observability.
   - Rejected because worker visibility is a core KPI.

2. One worker owns all source and test changes
   - Pros: fewer merge conflicts than multiple workers.
   - Cons: weak test of parallel ownership and status summarization.
   - Rejected because the implementation can split safely.

3. Tmux-visible workers with disjoint scopes
   - Pros: tests Ghostty/tmux visibility, worker status files, and main Codex integration.
   - Cons: requires careful scope control and final integration review.
   - Selected.

## Plan

1. Run `ralph-execute` with tmux-visible workers.
   - Implement add-task behavior in `src/App.tsx`.
   - Fix obvious mobile overflow risk in `src/App.css`.
   - Do not implement `localStorage` persistence in this phase; leave it as a deliberate QA handoff so `ralph-qa` can reproduce and fix a remaining acceptance gap.
   - Main Codex integrates worker outputs and runs `npm run lint`, `npm run build`, and `npm test -- --run`.

2. Run `ralph-qa` for persistence.
   - Add a focused persistence regression test in `src/App.test.tsx`.
   - Run the focused test and record the failure.
   - Implement `localStorage` load/save in `src/App.tsx`.
   - Rerun the same focused test and then `make verify-full`.

3. Run `visual-ralph-qa`.
   - Start Vite on `127.0.0.1:5173`.
   - Check desktop `1440x900` and mobile `390x844`.
   - Capture screenshots under `docs/evaluation/visual/`.
   - Fix layout only if browser evidence shows overflow, clipping, blank screen, or overlap.

4. Run `code-review`.
   - Review local diff and QA artifacts.
   - Lead with findings.
   - Record test gaps, residual risks, and harness rule candidates.

## Worker Visibility Plan

Worker Mode: `tmux-visible`

| worker_id | title | responsibility | write_scope | prompt_input | validation | dependency |
| --- | --- | --- | --- | --- | --- | --- |
| `state-worker` | Add task behavior | Make form submission append a task and update counts/filters without persistence. | `src/App.tsx` | Product brief, analyze artifact, this plan | `npm test -- --run src/App.test.tsx` or report why not run | none |
| `visual-worker` | Responsive shell | Remove fixed mobile overflow and make the existing board usable at mobile width. | `src/App.css` | Product brief, analyze artifact, this plan | `npm run build` or static CSS reasoning if browser is not run | none |

Worker prompt constraints:

- Other workers may be active in this repo.
- Do not revert user, main Codex, or other-worker changes.
- Stay inside the assigned write scope.
- Final response must list changed paths, verification, blockers, and residual risk.

## Validation

- After `ralph-execute`: `npm run lint`, `npm run build`, `npm test -- --run`.
- During `ralph-qa`: reproduce persistence failure with the focused test, then rerun the same command after the fix.
- After `ralph-qa`: `make verify-full`.
- During `visual-ralph-qa`: browser or Playwright screenshot evidence for `1440x900` and `390x844`.
- After code review: final KPI report scores every rubric item.

## Risks

- Tmux worker prompts may fail due Codex CLI environment or terminal launch behavior.
- Parallel workers could overlap if they ignore write scopes.
- Persistence tests may require careful localStorage cleanup to avoid order-dependent failures.
- Playwright may require browser installation before screenshots can be captured.

## Assumptions

- Public GitHub progress repo and Ghostty opening are approved.
- The repo is a harness testbed, so a staged handoff from execution to QA is acceptable.
- Vite/Vitest are sufficient for functional checks.
- Browser screenshot artifacts can be committed because this is an evaluation repo.

## Handoff

`ralph-execute`

