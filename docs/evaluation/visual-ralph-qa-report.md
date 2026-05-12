# Visual Ralph QA Report

## Target

`http://127.0.0.1:5173/` running through:

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

## Viewports

- Desktop: `1440x900`
- Mobile: `390x844`
- Mobile interaction state: `390x844` after adding a deliberately long task title

## Visual Checks

- Page is not blank.
- Primary `Harness Flow Board` content is visible.
- Task cards render.
- Form input and `Add task` button are clickable.
- Desktop and mobile have no horizontal overflow.
- Long mobile task title wraps without increasing document width.
- Browser console has no warnings or errors captured by the Playwright check.

## Issues Found

- Initial Playwright run was blocked because Chromium was not installed in the local Playwright cache.
- After running `npx playwright install chromium`, visual checks completed successfully.
- No app UI issue required a code fix in this phase.

## Fixes

- No source fix was needed during visual QA.
- The responsive CSS fix from `ralph-execute` was confirmed by browser evidence.

## Evidence

Screenshots:

- `docs/evaluation/visual/desktop-1440x900.png`
- `docs/evaluation/visual/mobile-390x844.png`
- `docs/evaluation/visual/mobile-after-add-390x844.png`

Desktop metrics:

```json
{
  "bodyClientWidth": 1440,
  "bodyScrollWidth": 1440,
  "documentClientWidth": 1440,
  "documentScrollWidth": 1440,
  "hasHorizontalOverflow": false,
  "appWidth": 1120,
  "taskCardCount": 3,
  "controlCount": 6,
  "consoleMessages": []
}
```

Mobile metrics:

```json
{
  "bodyClientWidth": 390,
  "bodyScrollWidth": 390,
  "documentClientWidth": 390,
  "documentScrollWidth": 390,
  "hasHorizontalOverflow": false,
  "appWidth": 388,
  "taskCardCount": 3,
  "controlCount": 6,
  "consoleMessages": []
}
```

Mobile interaction metrics:

```json
{
  "bodyClientWidth": 390,
  "bodyScrollWidth": 390,
  "documentClientWidth": 390,
  "documentScrollWidth": 390,
  "hasHorizontalOverflow": false,
  "addedTaskVisible": true,
  "taskCardCount": 4,
  "consoleMessages": []
}
```

Post-visual regression check:

```bash
make verify-full
```

Result:

- `npm run lint`: passed.
- `npm run build`: passed.
- `npm test -- --run`: passed.
- `1` test file passed with `4` tests.

Harness Rule Candidates:

- Add a documented Playwright browser-install prerequisite for fresh machines: `npx playwright install chromium`.
- Keep committing visual evidence paths with viewport sizes in the filename.

