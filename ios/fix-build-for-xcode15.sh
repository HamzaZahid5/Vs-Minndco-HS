echo "Fixing build for Xcode 15"
sed -i '' 's/ABSL_CONST_INIT//g' Pods/FirebaseFirestore/Firestore/Source/API/FIRFirestoreSettings.mm
sed -i '' -e 's/unary_function/__unary_function/g' Pods/boost/boost/container_hash/hash.hpp
sed -i -e  $'s/__IPHONE_10_0/__IPHONE_13_0/' Pods/RCT-Folly/folly/portability/Time.h