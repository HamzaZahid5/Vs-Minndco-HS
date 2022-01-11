import React, { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View, Text } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { useTheme } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { DefaultScreenRouteType } from '../../../types';
import { getLocale } from '../../utils/localization';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
// @ts-ignore: non-ts file
import { auth } from '../../services/Auth';
// @ts-ignore: non-ts file
import BubblesBackground from '../../components/BubblesBackground';
import Loading from '../../components/Loading';

const Zoho = ({ route }: DefaultScreenRouteType<'Zoho'>) => {
  const { zohoUrl, onComplete = Function, onCancel = Function, customData } = route.params || {};
  const animation = useRef(new Animated.Value(1));
  const [isFading, setIsFading] = useState(false);
  const webViewRef = useRef<WebView | null>(null);

  const fadeIn = (duration = 1000) => {
    setIsFading(true);
    Animated.timing(animation.current, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start(() => setIsFading(false));
  };
  const fadeOut = (duration = 1000) => {
    setIsFading(true);
    Animated.timing(animation.current, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start(() => setIsFading(false));
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      fadeIn(1000);
    } else {
      fadeOut(1000);
    }
  }, [isLoading]);

  useKeepAwake();
  const uri = `${zohoUrl}?lang=${getLocale()}&uid=${auth().currentUser.uid}&custom_keys=${encodeURIComponent(
    JSON.stringify(Object.keys(customData ?? {})),
  )}&custom_values=${encodeURIComponent(JSON.stringify(Object.values(customData ?? {})))}`;
  return (
    <View style={styles.container}>
      <BubblesBackground />
      <Animated.View
        style={{ width: '100%', height: '100%', opacity: Animated.subtract(new Animated.Value(1), animation.current) }}
      >
        <ScreenDecorator>
          <WebView
            source={{
              uri,
            }}
            ref={webViewRef}
            allowsInlineMediaPlayback
            ignoreSilentHardwareSwitch
            onLoad={() => {
              if (webViewRef.current) {
                webViewRef.current.injectJavaScript('document.getElementById("language_navigator").remove()');
              }
              setIsLoading(false);
            }}
            onNavigationStateChange={state => {
              if (state.url.includes('thankyou')) {
                setIsLoading(true);
                webViewRef.current?.stopLoading();
                if (state.loading === false) {
                  onComplete();
                }
              }
            }}
          />
        </ScreenDecorator>
      </Animated.View>
      {(isFading || isLoading) && (
        <View style={styles.overlay}>
          <Animated.View
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: animation.current,
            }}
          >
            <ScreenDecorator>
              <Loading iconSize={50} />
            </ScreenDecorator>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

export default Zoho;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: '100%',
    backgroundColor: 'blue',
    flexGrow: 1,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 999,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
