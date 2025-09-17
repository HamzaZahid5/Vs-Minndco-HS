## Ease your stress and anxiety

### Environment
- Use **Node.js 14.21.x** or **Node.js 16.20.x** with Yarn 1.22. React Native 0.64.3 does not
  support Node 18+. Install Node with [nvm](https://github.com/nvm-sh/nvm) and run `nvm use 16.20.2`
  (or `nvm use 14.21.3`) before installing dependencies.
- Install **JDK 11** (Adoptium Temurin or OpenJDK). Newer JDKs are not supported by Android
  Gradle Plugin 4.2 used by this project.
- macOS builds require **CocoaPods 1.12.x** with Ruby 2.7.x. (Ruby 3 will fail because RN 0.64
  pods are not yet compatible.) `bundle exec pod install` or `pod install` under a Ruby 2.7.6
  environment has been validated with CocoaPods 1.12.1 and Xcode 16.4.
- Xcode 16.4 is fully supported once the `fix-build-for-xcode15.sh` patches run during `pod install`.
  The iOS deployment target is locked to 13.0 for every pod target so the modern SDKs continue to
  link against the current toolchain.

### Devel notes
- clone repo
- `yarn install`
- `yarn run`
#### Run
- ios: `yarn run ios` strats emulator. `yarn run ios --udid [device id]` to start into device.
- android: `yarn run android`
- web: `yarn run web`

### iOS Setup

1. Run `npm run google-services-dev` (or `npm run google-services-prod` for production) to copy the
   correct `GoogleService-Info.plist` before opening Xcode. This keeps the Firebase configuration in
   sync with the selected environment.
2. Install pods with `npm run pods` or manually with `cd ios && pod install --repo-update`. The
   Podfile runs `fix-build-for-xcode15.sh` before and after installation so the legacy React Native
   0.64.3 dependencies (glog, Firebase, Folly, Boost, Sentry) keep compiling cleanly on modern Xcode
   toolchains. The script now forces glog to build for **arm64** while keeping the classic
   `arm-apple-darwin` host triple so configure succeeds on Xcode 16.4, patches Firebase/Folly/Boost
   headers, rewrites the bundled Sentry profiling sources so they build with the older GNU++14
   standard, and scrubs any stale `Sentry/HybridSDK (= 8.x)` locks from `Podfile.lock` before
   installation. That ensures CocoaPods resolves `Sentry/HybridSDK` **7.31.5** to match the
   downgraded `@sentry/react-native@4.15.x` package without manual `pod update` steps.
3. Open `ios/MindCotine.xcworkspace` in Xcode and build/run the `MindCotine` scheme.

### Firebase

- The iOS app delegate configures Firebase during launch, requests notification permissions, and
  registers for remote notifications. On startup it now sets the `FIRMessaging` delegate so
  background token refreshes are delivered to JavaScript via an `FCMToken` notification.
- Remember to run `npm run google-services-dev` (or `npm run google-services-prod`) so the correct
  `GoogleService-Info.plist` is copied into `ios/` before building.

#### Release iOS
- build ios `yarn run ios-build`.
- open Xcode project.
- select scheme `Any iOS Device (arm64)`.
- menu > Product > Archive.
- follow instructions (mostly next..., next..., next...).

#### Release Android
- build for bundle with: `yarn run android-build`. In case you need an apk use: `cd android; ./gradlew assembleRelease`
- drop the .aab into [Play Store Console](https://play.google.com/console/u/0/developers/5268654866045272558/app/4975841932698710594/tracks/production) and follow from there.

### Tests

To run tests:
First build for testing (if not built or if have to re-build): yarn run test-build
Start metro server for testing (if you want to use phone, it has to be connected): yarn run test-start
Run the tests: yarn run test-run (yarn run test-run-emu if you wish to use emulators)

In order to run test, firebase emulators have to be running.

You have to insert your device name (adb device) in attached-device adbName (.detoxrc.json) to use your phone.
You have to insert your emulator name (emulator -list-avds) in emulator device avbName (.detoxrc.json) to use emulators.
