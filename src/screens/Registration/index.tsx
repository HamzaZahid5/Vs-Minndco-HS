import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import WebView, { WebViewMessageEvent } from 'react-native-webview'

const Registration = () => {
  const navigation = useNavigation()
  const getMessageEventsHandler = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.data === 'back') {
      navigation.goBack()
    }
  }
  const uri = 'https://app.mindco.health/enroll?app=APP2&embedd=1'
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri,
        }}
        onMessage={getMessageEventsHandler}
      />
    </SafeAreaView>
  )
}

export default Registration
