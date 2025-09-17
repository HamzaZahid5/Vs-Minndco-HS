#!/usr/bin/env bash
set -euo pipefail

# This script patches legacy React Native 0.64 dependencies so they continue to
# compile under modern Xcode toolchains (15 and newer). The patches are
# idempotent and only run when the target files are present in the local Pods
# directory.

PHASE="${1:-postinstall}"
echo "Fixing build for Xcode 15+ (${PHASE})"

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
if (!fs.existsSync(scriptPath)) {
  process.exit(0);
}

let contents = fs.readFileSync(scriptPath, 'utf8');
let changed = false;

const updates = [
  {
    apply: (source) => {
      if (!source.includes('CURRENT_ARCH="armv7"')) {
        return source;
      }
      const replaced = source.replace(/CURRENT_ARCH="armv7"/g, 'CURRENT_ARCH="arm64"');
      if (replaced !== source) {
        changed = true;
      }
      return replaced;
    },
  },
  {
    apply: (source) => {
      const needle = './configure --host arm-apple-darwin';
      if (!source.includes(needle)) {
        return source;
      }
      const updated = source.replace(needle, './configure --host=aarch64-apple-darwin');
      if (updated !== source) {
        changed = true;
      }
      return updated;
    },
  },
  {
    apply: (source) => {
      if (source.includes('Fix legacy automake "missing" helper for modern Xcode')) {
        return source;
      }
      const anchor = '\nexport CXX="$CC"\n\n# Remove automake symlink if it exists\nif [ -h "test-driver" ]; then\n';
      const idx = source.indexOf(anchor);
      if (idx === -1) {
        return source;
      }
      const shim = `\nexport CXX=\"$CC\"\n\n# Fix legacy automake \"missing\" helper for modern Xcode\nif [ -f \"missing\" ] && ! grep -q \"is-lightweight\" missing; then\n  cat <<'EOF' > missing\n#! /bin/sh\n# Common wrapper for a few potentially missing GNU programs.\nscriptversion=\"2023-10-01\"\n\nset -e\n\ncase \"$1\" in\n  --is-lightweight) exit 1 ;;\n  --run) shift ;;\n  -* ) echo \"$0: unknown $1 option\" >&2; exit 1 ;;\n  * ) ;;\nesac\n\nprog=\"$1\"\nshift\ncommand=\"$prog\"\nif ! command -v \"$prog\" >/dev/null 2>&1; then\n  echo \"$0: $prog is missing on your system\" >&2\n  exit 1\nfi\nexec \"$command\" \"$@\"\nEOF\n  chmod +x missing\nfi\n\n# Remove automake symlink if it exists\nif [ -h \"test-driver\" ]; then\n`;
      changed = true;
      return source.replace(anchor, shim);
    },
  },
];

contents = updates.reduce((source, step) => step.apply(source), contents);

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

