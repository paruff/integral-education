#!/usr/bin/env bash
# Prints one sha256 over every file in a build directory (paths + contents; .build-hash is the recorded result and is skipped), so the
# artifact CI tested and the artifact deploy ships can be compared byte for byte.
set -euo pipefail
cd "${1:-build}"
find . -type f ! -name .build-hash -print0 | LC_ALL=C sort -z | xargs -0 sha256sum | sha256sum | cut -d' ' -f1
