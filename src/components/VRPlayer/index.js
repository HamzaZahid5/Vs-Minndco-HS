import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
// import { useKeepAwake } from '@sayem314/react-native-keep-awake';
import template from 'lodash.template';

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
window.MINDCOTINE_PANOVIEWER_CONFIG = {
  fov: 110,
  yaw: 0,
  pitch: 0,
  video: "\${VIDEO_URL}"
};
const enterVrAndPlay = async () => {
  // AFTER ALLOWING ACCESS TO MOTION SEEMS TO BE TOO LATE FOR POLYFILL TO ADJUST
  // CAMERA YAW, AND FOR SOME BUG THE METHOS FROM PANOVIEWER FOR THAT ARE NOT WORKING (lookAt)
  // BUT NEXT TIME YOU PLAY THE VIDEO THE YAW IS CORRECT (DUE TO MOTION ACCES ALREADE GRANTED)
  // THEN, UNTIL FURTHER INVESTIGATION, WE DETECT A DELAY AUTHORIZING ACCESS TO MOTION AND RELOAD
  // THE PAGE TO START OVER AGAIN WITH PERMISSION GRANTED.
  let timeStart = new Date();
  await window.MindCotinePanoViewer.enterVR();
  let timeEnd = new Date();
  if (timeEnd-timeStart > 500) {
    window.MindCotinePanoViewer.destroy();
    window.location.reload();
  } else {
    window.MindCotinePanoViewer.getVideo().play();
    window.PanoControls.showLoading(false);
  }
  
  const vrButton = document.querySelector(".entervr")
  if (vrButton) {
    vrButton.style.marginLeft = "9px";
    vrButton.style.marginTop = "7px";
  }
  window.MindCotinePanoViewer.getVideo().addEventListener(
    'ended',
    () => window.ReactNativeWebView.postMessage("Video:ended")
    , false);
};
true;
`;

const JS_PLAY_VIDEO = `
enterVrAndPlay();
true;`;

const getMessageEventsHandler = (webViewRef, onExit, onFinish) => event => {
  if (event.nativeEvent.data === 'PanoViewer:ready') {
    webViewRef.current.injectJavaScript(JS_PLAY_VIDEO);
  }
  if (event.nativeEvent.data === 'Video:ended') {
    onFinish();
  }
  if (event.nativeEvent.data === 'PanoViewer:exit-vr') {
    onExit();
  }
  if (event.nativeEvent.data.indexOf('log:') === 0) {
    // console.log(event.nativeEvent.data);
  }
};

const VRPlayer = ({ onFinish, onExit, url }) => {
  const webViewRef = useRef();
  // useKeepAwake();

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{
          uri: 'https://www.mindcotine.com/wp-content/assets/vrmet_player/',
        }}
        injectedJavaScriptBeforeContentLoaded={template(INJECTED_PANOVIEWER_CONFIG)({ VIDEO_URL: url })}
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
        injectedJavaScript={DEBUGGING}
        allowsInlineMediaPlayback
        ignoreSilentHardwareSwitch
        onError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent;
          // console.warn('WebView error: ', nativeEvent);
        }}
        onMessage={getMessageEventsHandler(webViewRef, onExit, onFinish)}
        style={{
          backgroundColor: 'red',
        }}
      />
    </View>
  );
};

VRPlayer.propTypes = {
  onFinish: PropTypes.func,
  onExit: PropTypes.func,
  url: PropTypes.string,
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
