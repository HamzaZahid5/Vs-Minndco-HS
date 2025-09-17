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
SENTRY_PROFILING_DIR="Pods/Sentry"
PODFILE_LOCK="Podfile.lock"

reset_sentry_lock_state() {
  if [ ! -f "$PODFILE_LOCK" ]; then
    return
  fi

  if grep -q "Sentry/HybridSDK (= 7.31.5" "$PODFILE_LOCK"; then
    return
  fi

  python3 <<'PY'
import pathlib
import re

lock_path = pathlib.Path('Podfile.lock')
text = lock_path.read_text()

if 'Sentry/HybridSDK (= 7.31.5' in text:
    raise SystemExit(0)

patterns = [
    r"\n  - RNSentry .*?(?=\n  - [A-Z]|$)",
    r"\n  - Sentry/HybridSDK .*?(?=\n  - [A-Z]|$)",
    r"\n  - SentryPrivate .*?(?=\n  - [A-Z]|$)",
]

spec_patterns = [
    r"\n  RNSentry: .*(?=\n)",
    r"\n  Sentry: .*(?=\n)",
    r"\n  SentryPrivate: .*(?=\n)",
]

dependency_rewrite = re.compile(r"\n    - Sentry/HybridSDK \(= [^\n]+\)")

updated = text
for pattern in patterns:
    updated = re.sub(pattern, '\n', updated, flags=re.S)

for pattern in spec_patterns:
    updated = re.sub(pattern, '', updated)

updated = dependency_rewrite.sub('\n', updated)

lines = updated.splitlines()
result = []
previous_blank = False
for line in lines:
    if line.strip():
        previous_blank = False
        result.append(line)
    else:
        if not previous_blank:
            result.append('')
        previous_blank = True

cleaned = '\n'.join(result).rstrip() + '\n'

if cleaned != text:
    lock_path.write_text(cleaned)
PY
}

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
      const replacements = [
        ['--host=aarch64-apple-darwin', '--host=arm-apple-darwin'],
        ['--host aarch64-apple-darwin', '--host arm-apple-darwin'],
      ];
      let updated = source;
      const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      replacements.forEach(([needle, value]) => {
        if (updated.includes(needle)) {
          const next = updated.replace(new RegExp(escape(needle), 'g'), value);
          if (next !== updated) {
            changed = true;
            updated = next;
          }
        }
      });
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
  reset_sentry_lock_state
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

  if [ -d "$SENTRY_PROFILING_DIR" ]; then
    python3 <<'PY'
import pathlib
import re

root = pathlib.Path('Pods/Sentry')
targets = []
for pattern in ('ThreadMetadataCache*.h', 'ThreadMetadataCache*.hpp', 'ThreadMetadataCache*.m', 'ThreadMetadataCache*.mm', 'ThreadMetadataCache*.c', 'ThreadMetadataCache*.cc', 'ThreadMetadataCache*.cpp'):
    targets.extend(root.rglob(pattern))

allocator = re.compile(r'std::allocator<const (sentry::profiling::ThreadMetadataCache::ThreadHandleMetadataPair)>')
vector = re.compile(r'std::vector<const (sentry::profiling::ThreadMetadataCache::ThreadHandleMetadataPair)>')
const_pair = re.compile(r'const (sentry::profiling::ThreadMetadataCache::ThreadHandleMetadataPair)(?=[\s&*;,>)])')

for path in targets:
    text = path.read_text()
    updated = allocator.sub(r'std::allocator<\1>', text)
    updated = vector.sub(r'std::vector<\1>', updated)
    updated = const_pair.sub(r'\1', updated)
    if updated != text:
        path.write_text(updated)
PY
  fi
fi

