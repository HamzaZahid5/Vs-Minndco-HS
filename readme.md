## Ease your stress and anxiety

### Devel notes
- clone repo
- `yarn install`
- `yarn run
#### Run
- ios: `yarn run ios` strats emulator. `yarn run ios --udid [device id]` to start into device.
- android: `yarn run android`
- web: `yarn run web`

#### Release iOS
- build ios `yarn run ios-build`.
- open xCode project.
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
