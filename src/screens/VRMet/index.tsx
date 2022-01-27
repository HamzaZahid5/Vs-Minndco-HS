import React, { MutableRefObject, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { useTheme } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { DefaultScreenRouteType } from '../../../types';
import { getLocale } from '../../utils/localization';
import AnalyticEvent from '../../utils/AnalyticsEvent';
import useOrientationLocker from '../../utils/hooks/useOrientationLocker';
import { OrientationLock } from 'expo-screen-orientation';
import env from '../../../env';
const BASE_URL = `${env.webVrURL}`;

const getMessageEventsHandler =
  (webViewRef: MutableRefObject<WebView | null>, onCancel: () => void, onComplete: () => void, resourceId: string) =>
  (event: WebViewMessageEvent) => {
    // @TODO we need to trigger this event from player
    if (event.nativeEvent.data === 'Video:ready') {
      AnalyticEvent('video_start', { video_type: 'vr', video_id: resourceId });
    }
    if (event.nativeEvent.data === 'Video:ended') {
      onComplete();
    }
    if (event.nativeEvent.data === 'Video:canceled') {
      onCancel();
    }
  };

const VRPlayer = ({ route }: DefaultScreenRouteType<'VRMet'>) => {
  useOrientationLocker(OrientationLock.LANDSCAPE_RIGHT);
  const { assetUrl, onComplete = Function, onCancel = Function, useUrl = false } = route.params || {};
  const theme = useTheme();
  useKeepAwake();
  const webViewRef = useRef<WebView | null>(null);
  const uri = useUrl
    ? `https://${BASE_URL}/${assetUrl}?lang=${getLocale()}`
    : `https://${BASE_URL}/?lang=${getLocale()}&video=${encodeURIComponent(assetUrl)}`;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{
          uri,
        }}
        allowsInlineMediaPlayback
        // @ts-ignore: package bad type
        ignoreSilentHardwareSwitch
        onMessage={getMessageEventsHandler(webViewRef, onCancel, onComplete, assetUrl)}
        style={{
          backgroundColor: theme.colors.primary,
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
    paddingHorizontal: 40,
    flex: 1,
    height: '100%',
    backgroundColor: 'black',
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 65,
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
  },
});
