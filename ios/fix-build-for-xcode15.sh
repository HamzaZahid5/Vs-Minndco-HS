#!/bin/sh
set -eu

log() {
  printf '%s\n' "$1"
}

log "Fixing build for Xcode 15"

apply_patch() {
  file=$1
  shift
  if [ ! -f "$file" ]; then
    log "Skipping $file (not found)"
    return
  fi

  for script in "$@"; do
    perl -0pi -e "$script" "$file"
  done
}

apply_patch "Pods/FirebaseFirestore/Firestore/Source/API/FIRFirestoreSettings.mm" \
  's/ABSL_CONST_INIT//g'

apply_patch "Pods/boost/boost/container_hash/hash.hpp" \
  's/unary_function/__unary_function/g'

apply_patch "Pods/RCT-Folly/folly/portability/Time.h" \
  's/__IPHONE_10_0/__IPHONE_13_0/g'

if [ -d "Pods/Sentry" ]; then
  find Pods/Sentry -name 'ThreadMetadataCache*.hpp' -print | while IFS= read -r file; do
    apply_patch "$file" \
      's/std::vector<const ThreadMetadataCache::ThreadHandleMetadataPair>/std::vector<ThreadMetadataCache::ThreadHandleMetadataPair>/g' \
      's/std::vector<const ThreadHandleMetadataPair>/std::vector<ThreadHandleMetadataPair>/g' \
      's/std::allocator<const ThreadMetadataCache::ThreadHandleMetadataPair>/std::allocator<ThreadMetadataCache::ThreadHandleMetadataPair>/g' \
      's/std::allocator<const ThreadHandleMetadataPair>/std::allocator<ThreadHandleMetadataPair>/g'
  done
else
  log "Skipping Sentry profiling patch (Pods/Sentry not found)"
fi
