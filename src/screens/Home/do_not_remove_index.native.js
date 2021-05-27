
import React from 'react';
import WebView from 'react-native-webview';
import { Linking, Alert, View, Text, Pressable } from 'react-native'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { Button } from 'react-native-paper';

export default () => {
  const openLink = async () => {
    try {
      const url = 'https://ccbf8306221a.ngrok.io';
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right'
          },
          headers: {
            'my-custom-header': 'my custom header value'
          }
        })
        Alert.alert(JSON.stringify(result))
      }
      else Linking.openURL(url)
    } catch (error) {
      alert('no va');
      // Alert.alert(error.message)
    }
  }
  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#f00a', alignItems: 'center', justifyContent: 'center'}}>
      <Pressable onPress={openLink}><Text>open</Text></Pressable>
    </View>
    // <WebView
    //       source={{
    //         uri: 'https://41c34c121656.ngrok.io',
    //       }}
          
    //       allowsInlineMediaPlayback
    //       ignoreSilentHardwareSwitch
    //       onError={syntheticEvent => {
    //         const { nativeEvent } = syntheticEvent;
    //         console.warn('WebView error: ', nativeEvent);
    //       }}
    //       onMessage={console.log}
    //       style={{
    //         flex: 1,
    //         backgroundColor: 'red',
    //       }}
    //     />
  )
};
