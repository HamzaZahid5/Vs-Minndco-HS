import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useRef } from 'react'
import { View } from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'

import WebView, { WebViewMessageEvent } from 'react-native-webview'
import { RootStackParamList } from '../../../types'
import { parseCommand, parseDeepLink, parseRawDeepLink } from '../../utils/helpers'
import config from '../../../env'

// external urls open on in-app browser
const openUrl = async (url: string) => {
  if (await InAppBrowser.isAvailable()) {
    await InAppBrowser.open(url, {
      // iOS Properties
      dismissButtonStyle: 'close',
      preferredBarTintColor: 'black',
      preferredControlTintColor: 'white',
      readerMode: false,
      animated: true,
      modalPresentationStyle: 'overFullScreen',
      modalTransitionStyle: 'coverVertical',
      modalEnabled: true,
      enableBarCollapsing: true,
      ephemeralWebSession: false,
      // Android Properties
      showTitle: true,
      toolbarColor: '#6200EE',
      secondaryToolbarColor: 'black',
      enableUrlBarHiding: true,
      enableDefaultShare: false,
      forceCloseOnRedirection: true,
    })
  }
  return
}

// flag for enrollment process to know that is app embedd
const INJECTED_EMBEDD = `(function() {
  window.IS_EMBEDD = true;
})();`

const Registration = () => {
  const webViewRef = useRef<WebView | null>(null)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const getMessageEventsHandler = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.data === 'back') {
      navigation.goBack()
    }

    // on intent, used for auth or login with code
    if (event.nativeEvent.data.startsWith('intent:')) {
      // parse WebViewMessageEvent
      const intent = event.nativeEvent.data.replace('intent:', '')

      // parse intent
      const deepLink = parseRawDeepLink(intent)
      const { command } = parseDeepLink(deepLink)
      const { value, isAuth, isSignInCode } = parseCommand(command)

      if (isAuth) {
        navigation.navigate('AuthByToken', { token: value })
      } else if (isSignInCode) {
        navigation.navigate('LoginCode', { eid: value })
      }
    }
  }
  const BASE_URL = config.healthUrl
  const SAFE_URL = 'survey.zohopublic.com'
  const uri = `https://${BASE_URL}/enroll?app=APP2`
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView enableOnAndroid extraHeight={140} contentContainerStyle={{ flexGrow: 1 }}>
        <WebView
          ref={webViewRef}
          source={{
            uri,
          }}
          // originWhitelist={["intent://"]}
          onMessage={getMessageEventsHandler}
          injectedJavaScriptBeforeContentLoaded={INJECTED_EMBEDD}
          onNavigationStateChange={async event => {
            // external links (except for Zoho) open on in-app browser, ie: terms and conditions
            if (!event.url.includes(BASE_URL) && !event.url.includes(SAFE_URL)) {
              webViewRef.current?.stopLoading()
              openUrl(event.url)
            }
          }}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Registration
