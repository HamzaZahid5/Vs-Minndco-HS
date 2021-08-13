import React, { MutableRefObject, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
// import { useKeepAwake } from '@sayem314/react-native-keep-awake';
// @ts-ignore: non-ts file
import template from 'lodash.template';
import { DefaultScreenRouteType } from '../../../types';
import { translate } from '../../utils/localization';

const DEBUGGING = `
     // Debug
     console = new Object();
     console.log = function(log) {
       window.ReactNativeWebView.postMessage("console:"+ JSON.stringify(log));
     };
     console.debug = console.log;
     console.info = console.log;
     console.warn = console.log;
     console.error = console.log;
     true;
`;

const INJECTED_PANOVIEWER_CONFIG = `
window.MINDCO_PANOVIEWER_CONFIG = {
  fov: 110,
  yaw: 0,
  pitch: 0,
};
const enterVrAndPlay = async () => {
  // AFTER ALLOWING ACCESS TO MOTION SEEMS TO BE TOO LATE FOR POLYFILL TO ADJUST
  // CAMERA YAW, AND FOR SOME BUG THE METHOS FROM PANOVIEWER FOR THAT ARE NOT WORKING (lookAt)
  // BUT NEXT TIME YOU PLAY THE VIDEO THE YAW IS CORRECT (DUE TO MOTION ACCES ALREADE GRANTED)
  // THEN, UNTIL FURTHER INVESTIGATION, WE DETECT A DELAY AUTHORIZING ACCESS TO MOTION AND RELOAD
  // THE PAGE TO START OVER AGAIN WITH PERMISSION GRANTED.
  let timeStart = new Date();
  await window.MindCoPanoViewer.enterVR();
  let timeEnd = new Date();
  if (timeEnd-timeStart > 500) {
    window.MindCoPanoViewer.destroy();
    window.location.reload();
  } else {
    window.MindCoPanoViewer.getVideo().play();
    window.PanoControls.showLoading(false);
  }
  
  const vrButton = document.querySelector(".entervr")
  if (vrButton) {
    vrButton.style.marginLeft = "9px";
    vrButton.style.marginTop = "7px";
  }
  window.MindCoPanoViewer.getVideo().addEventListener(
    'ended',
    () => window.ReactNativeWebView.postMessage("Video:ended")
    , false);
};
true;
`;

const JS_PLAY_VIDEO = () => `
// enterVrAndPlay();
window.MindCoPanoViewer.enableSensor().then(enterVrAndPlay).catch(e => {
  alert(\`${translate('screens.VRMet.error-enter-vr')}\`);
  window.ReactNativeWebView.postMessage("PanoViewer:denied")
});
true;`;

const getMessageEventsHandler =
  (webViewRef: MutableRefObject<WebView | null>, onCancel: () => void, onComplete: () => void) =>
  (event: WebViewMessageEvent) => {
    if (event.nativeEvent.data === 'PanoViewer:ready') {
      webViewRef.current?.injectJavaScript(JS_PLAY_VIDEO());
    }
    if (event.nativeEvent.data === 'Video:ended') {
      onComplete();
    }
    if (event.nativeEvent.data === 'PanoViewer:exit-vr' || event.nativeEvent.data === 'PanoViewer:denied') {
      onCancel();
    }
    if (event.nativeEvent.data.indexOf('log:') === 0) {
      // console.log(event.nativeEvent.data);
    }
  };

const VRPlayer = ({ route }: DefaultScreenRouteType<'VRMet'>) => {
  const { assetUrl, onComplete = Function, onCancel = Function } = route.params || {};
  const webViewRef = useRef<WebView | null>(null);
  const uri = `https://mindco-web-vr-player-ios.web.app?video=${encodeURIComponent(assetUrl)}`;
  // useKeepAwake();
  // eslint-disable-next-line no-console
  console.log({ uri });

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{
          uri,
        }}
        injectedJavaScriptBeforeContentLoaded={template(INJECTED_PANOVIEWER_CONFIG)({ VIDEO_URL: assetUrl })}
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
        injectedJavaScript={DEBUGGING}
        allowsInlineMediaPlayback
        ignoreSilentHardwareSwitch
        onMessage={getMessageEventsHandler(webViewRef, onCancel, onComplete)}
        style={{
          backgroundColor: 'red',
        }}
      />
    </View>
  );
};

VRPlayer.propTypes = {
  route: PropTypes.object,
};

export default VRPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'lime',
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 65,
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
  },
});
