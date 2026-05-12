# Ralph QA Report

## Reproduction

Target failure: added tasks should persist across remounts through `localStorage`.

Focused regression test added:

- `src/App.test.tsx`: `persists added tasks across remounts`
- `src/setupTests.ts`: clears `window.localStorage` before each test for isolation

Failing command before fix:

```bash
npm test -- --run src/App.test.tsx -t "persists added tasks across remounts"
```

Observed result:

- Failed.
- Vitest could not find `Persist QA task` after unmounting and rendering `App` again.

## Cause

Confirmed cause:

- `src/App.tsx` initialized tasks from in-memory `initialTasks`.
- The app had task state mutation after `ralph-execute`, but no `localStorage` load or save path.

Related harness issue:

- `make verify-full` previously passed but printed an npm error-style log because `scripts/verify-full.sh` used `npm run | grep -q`, which can close the pipe early.

## Fix

- Added guarded `localStorage` loading in `src/App.tsx`.
- Added a `useEffect` persistence path that writes task state to `localStorage`.
- Added runtime validation for stored task shape before accepting saved JSON.
- Replaced `npm run | grep -q` in `scripts/verify-full.sh` with a direct `package.json` script check through Node.

## Verification

Same focused command rerun after fix:

```bash
npm test -- --run src/App.test.tsx -t "persists added tasks across remounts"
```

Result:

- Passed.
- `1` test passed and `3` tests skipped by the focused filter.

## Regression Checks

Full repo verification:

```bash
make verify-full
```

Result:

- `npm run lint`: passed.
- `npm run build`: passed.
- `npm test -- --run`: passed.
- `1` test file passed with `4` tests.

## Residual Risk

- Persistence is covered for remount behavior inside the same browser storage context.
- Corrupt `localStorage` falls back to seeded tasks, but there is no user-facing reset message. That is acceptable for this harness test app.

Harness Rule Candidates:

- Avoid `npm run | grep -q` style script detection in verification scripts because early pipe close can emit noisy npm error logs.
- When acceptance includes persistence, include a test that remounts or reloads the app state, not only a same-render assertion.

