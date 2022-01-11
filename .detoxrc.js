module.exports = {
  "testRunner": require('path').join('node_modules/jest', require('jest/package.json').bin),
  "runnerConfig": "e2e/config.json",
  "skipLegacyWorkersInjection": true,
  "apps": {
    "ios": {
      "type": "ios.app",
      "binaryPath": "SPECIFY_PATH_TO_YOUR_APP_BINARY"
    },
    "android": {
      "type": "android.apk",
      "binaryPath": "android/app/build/outputs/apk/debug/app-arm64-v8a-debug.apk",
      "testBinaryPath": "android/app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk",
      "build": "cd android && ./gradlew app:assembleDebug app:assembleAndroidTest -DtestBuildType=debug && cd .."
    },
    "android-emu": {
      "type": "android.apk",
      "binaryPath": "android/app/build/outputs/apk/debug/app-x86-debug.apk",
      "testBinaryPath": "android/app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk",
      "build": "cd android && ./gradlew app:assembleDebug app:assembleAndroidTest -DtestBuildType=debug && cd .."
    }
  },
  "devices": {
    "simulator": {
      "type": "ios.simulator",
      "device": {
        "type": "iPhone 11"
      }
    },
    "emulator": {
      "type": "android.emulator",
      "device": {
        "avdName": "Pixel_5_API_29"
      }
    },
    "attached": {
      "type": "android.attached",
      "device": {
        "adbName": "RF8R206EJQN"
      }
    }
  },
  "configurations": {
    "ios": {
      "device": "simulator",
      "app": "ios"
    },
    "android-emu": {
      "device": "emulator",
      "app": "android-emu"
    },
    "android-attached": {
      "device": "attached",
      "app": "android"
    }
  }
}