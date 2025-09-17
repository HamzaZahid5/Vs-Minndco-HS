#!/bin/sh
set -euo pipefail

# This script patches legacy React Native 0.64 dependencies so they continue to
# compile under the Xcode 15 toolchain. The patches are idempotent and will only
# run when the target files are present in the local Pods directory.

PHASE="${1:-postinstall}"
echo "Fixing build for Xcode 15 (${PHASE})"

FIRESTORE_SETTINGS="Pods/FirebaseFirestore/Firestore/Source/API/FIRFirestoreSettings.mm"
BOOST_HASH_HEADER="Pods/boost/boost/container_hash/hash.hpp"
FOLLY_TIME_HEADER="Pods/RCT-Folly/folly/portability/Time.h"
GLOG_SCRIPT="../node_modules/react-native/scripts/ios-configure-glog.sh"

patch_glog_configure_script() {
  if [ ! -f "$GLOG_SCRIPT" ]; then
    return
  fi

  GLOG_SCRIPT_PATH="$GLOG_SCRIPT" /usr/bin/env node <<'NODE'
const fs = require('fs');
const path = require('path');
const scriptPath = path.resolve(process.env.GLOG_SCRIPT_PATH);
let contents = fs.readFileSync(scriptPath, 'utf8');
let changed = false;

if (contents.includes('CURRENT_ARCH="armv7"')) {
  contents = contents.replace('CURRENT_ARCH="armv7"', 'CURRENT_ARCH="arm64"');
  changed = true;
}

const anchor = '\nexport CXX="$CC"\n\n# Remove automake symlink if it exists\nif [ -h "test-driver" ]; then\n';
if (!contents.includes('Fix old automake "missing" helper for Xcode 15')) {
  const fixup = `\n# Fix the legacy automake helper so \`configure\` can detect modern toolchains\nif [ -f "missing" ] && ! grep -q "is-lightweight" missing; then\n  cat <<'EOF' > missing\n#! /bin/sh\n# Common wrapper for a few potentially missing GNU programs.\nscriptversion=\"2023-10-01\"\n\nset -e\n\ncase \"$1\" in\n  --is-lightweight) exit 1 ;;\n  --run) shift ;;\n  -* ) echo \"$0: unknown \$1 option\" >&2; exit 1 ;;\n  * ) ;;\nesac\n\nprog=\"$1\"\nshift\ncommand=\"$prog\"\nif ! command -v \"$prog\" >/dev/null 2>&1; then\n  echo \"$0: $prog is missing on your system\" >&2\n  exit 1\nfi\nexec \"$command\" \"$@\"\nEOF\n  chmod +x missing\nfi\n`;
  const idx = contents.indexOf(anchor);
  if (idx !== -1) {
    contents = contents.replace(anchor, `\nexport CXX=\"$CC\"\n\n# Fix old automake \"missing\" helper for Xcode 15\n${fixup}# Remove automake symlink if it exists\nif [ -h \"test-driver\" ]; then\n`);
    changed = true;
  }
}

if (changed) {
  fs.writeFileSync(scriptPath, contents, 'utf8');
}
NODE
}

if [ "$PHASE" = "preinstall" ] || [ "$PHASE" = "all" ]; then
  patch_glog_configure_script
fi

if [ "$PHASE" = "postinstall" ] || [ "$PHASE" = "all" ]; then
  if [ -f "$FIRESTORE_SETTINGS" ]; then
    sed -i '' 's/ABSL_CONST_INIT//g' "$FIRESTORE_SETTINGS"
  fi

  if [ -f "$BOOST_HASH_HEADER" ]; then
    sed -i '' 's/unary_function/__unary_function/g' "$BOOST_HASH_HEADER"
  fi

  if [ -f "$FOLLY_TIME_HEADER" ]; then
    sed -i '' $'s/__IPHONE_10_0/__IPHONE_13_0/' "$FOLLY_TIME_HEADER"
  fi
fi

