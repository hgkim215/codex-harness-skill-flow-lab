#!/usr/bin/env bash
set -euo pipefail

npm run lint
npm run build
if npm run | grep -qE '^  test$'; then
  npm test -- --run
fi

