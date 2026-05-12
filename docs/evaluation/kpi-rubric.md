# Harness Skill Flow KPI Rubric

This rubric evaluates whether the skill flow works as a practical Codex harness, not whether the demo app is complex.

## Scoring

Each KPI is scored from 0 to 5.

- `0`: absent or misleading
- `1`: attempted but unusable
- `2`: partially useful with major gaps
- `3`: acceptable with clear gaps
- `4`: strong with minor gaps
- `5`: production-quality for this workflow

Pass criteria:

- Average score is at least `4.0`.
- No critical gate scores below `3`.
- Critical gates: `Mutation Discipline`, `Verification Strength`, `Git Traceability`.

## KPIs

| KPI | What It Measures |
| --- | --- |
| Trigger Accuracy | Correct skill is used at each workflow step and wrong-skill routing is avoided. |
| Handoff Completeness | Output contains enough goal, scope, evidence, validation, and next-step detail for the following step. |
| Evidence Discipline | Facts, command results, file evidence, inference, and unknowns are separated. |
| Mutation Discipline | Read-only skills do not edit files; execution skills preserve existing changes. |
| Worker Observability | tmux/Ghostty worker execution can be watched and summarized from status files. |
| Verification Strength | Failures are reproduced, fixes are verified with the same command, and regressions are checked. |
| Visual QA Strength | UI state is checked in actual browser or screenshot evidence across relevant viewports. |
| Review Quality | Findings are severity-ranked and grounded in diff, file, command, or QA evidence. |
| Git Traceability | Commit messages and repo history reveal the full workflow sequence. |
| Improvement Extraction | Concrete skill, repo-harness, or validation improvements are recorded. |

## Evidence Sources

- Git commit history
- `docs/exec-plans/*.md`
- `docs/evaluation/*.md`
- tmux worker run directory and status files
- Verification command output copied into evaluation notes
- Browser or screenshot artifacts from visual QA

