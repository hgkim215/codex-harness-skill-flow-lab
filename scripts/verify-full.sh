#!/usr/bin/env bash
set -euo pipefail

npm run lint
npm run build
if node -e "const pkg = require('./package.json'); process.exit(pkg.scripts && pkg.scripts.test ? 0 : 1)"; then
  npm test -- --run
fi
