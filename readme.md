## Ease your stress and anxiety

### Environment
- Use **Node.js 14.21.x** or **Node.js 16.20.x** with Yarn 1.22. React Native 0.64.3 does not
  support Node 18+.
- Install **JDK 11** (Adoptium Temurin or OpenJDK). Newer JDKs are not supported by Android
  Gradle Plugin 4.2 used by this project.
- macOS builds require **CocoaPods 1.12.x** with Ruby 2.7.x. (Ruby 3 will fail because RN 0.64
  pods are not yet compatible.)
- Xcode 15+ is supported, but you must run the pod installation step below to patch legacy pods.

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
   0.64.3 dependencies (glog, Firebase, Folly, Boost) keep compiling cleanly on modern Xcode
   toolchains.
3. Open `ios/MindCotine.xcworkspace` in Xcode and build/run the `MindCotine` scheme.

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
