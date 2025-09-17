#!/bin/sh
set -euo pipefail

# This script patches legacy React Native 0.64 dependencies so they continue to
# compile under the Xcode 15 toolchain. The patches are idempotent and will only
# run when the target files are present in the local Pods directory.

echo "Fixing build for Xcode 15"

FIRESTORE_SETTINGS="Pods/FirebaseFirestore/Firestore/Source/API/FIRFirestoreSettings.mm"
BOOST_HASH_HEADER="Pods/boost/boost/container_hash/hash.hpp"
FOLLY_TIME_HEADER="Pods/RCT-Folly/folly/portability/Time.h"

if [ -f "$FIRESTORE_SETTINGS" ]; then
  sed -i '' 's/ABSL_CONST_INIT//g' "$FIRESTORE_SETTINGS"
fi

if [ -f "$BOOST_HASH_HEADER" ]; then
  sed -i '' 's/unary_function/__unary_function/g' "$BOOST_HASH_HEADER"
fi

if [ -f "$FOLLY_TIME_HEADER" ]; then
  sed -i '' $'s/__IPHONE_10_0/__IPHONE_13_0/' "$FOLLY_TIME_HEADER"
fi

