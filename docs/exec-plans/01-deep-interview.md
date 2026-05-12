# Deep Interview Artifact

## Goal

Run a real-use test of the Codex harness skill flow from `deep-interview` through `code-review`, using this repository as the observable source of truth.

## Scope

- Build and evaluate a small React task board called `Harness Flow Board`.
- Exercise each skill in sequence: `deep-interview`, `analyze`, `ralplan`, `ralph-execute`, `ralph-qa`, `visual-ralph-qa`, and `code-review`.
- Preserve each phase as a separate Git commit so GitHub history explains the workflow.
- Use tmux-visible workers during execution when the work can split into safe, disjoint scopes.
- Evaluate skill effectiveness with the KPI rubric in `docs/evaluation/kpi-rubric.md`.

## Non-goals

- Do not turn this repo into a production app.
- Do not optimize for feature breadth beyond what is needed to test the skill chain.
- Do not depend on OMX, HUD, or `.omx/state`.
- Do not hide failures just to make the final score look better.

## Constraints

- The GitHub repository is public.
- Ghostty should open for tmux worker runs.
- `AGENTS.md`, `docs/`, scripts, tests, and source files are the project source of truth.
- Read-only skills may produce analysis artifacts, but should not change product/source behavior.
- Implementation claims require verification evidence.

## Done Criteria

- GitHub has a pushed commit for every planned phase.
- The app satisfies the product brief: add task, filter tasks, summary counts, localStorage persistence, and responsive layout.
- `npm run lint`, `npm run build`, and `npm test -- --run` pass by the end of QA.
- Visual QA checks desktop `1440x900` and mobile `390x844`.
- Code review produces findings or explicitly says there are no findings.
- Final evaluation scores every KPI and lists concrete improvements.

## Known Project Context

- `AGENTS.md` defines the workflow order and verification entrypoints.
- `docs/product/brief.md` defines required behavior and known baseline gaps.
- `docs/evaluation/kpi-rubric.md` defines scoring and pass criteria.
- Baseline verification currently has one expected failing test: adding a task does not render the new card.
- The current CSS has a fixed `min-width`, so mobile overflow is expected until visual QA or execution fixes it.

## Open Questions

None blocking. The user delegated the test subject selection and already approved public GitHub progress tracking and Ghostty-visible worker runs.

## Recommended Next Step

`analyze`

