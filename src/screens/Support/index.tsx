import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Keyboard, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
// @ts-ignore: non-ts file
import template from 'lodash.template';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
// @ts-ignore: non-ts file
import { updateProfile } from '../../services/Firestore';
// @ts-ignore: non-ts file
import KeyboardSpacer from '../../utils/KeyboardSpacer';
import { USER_SUPPORT_PROFILE } from '../../store/selectors';
import { DefaultScreenPropType } from '../../../types';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';

const URL_UI_SUPPORT = 'https://www.mindcotine.com/wp-content/assets/support/index.html';
const URL_UI_COACHING = 'https://mindco-relief-support.web.app/support/coach';

const Support = ({
  navigation,
  // flag to determine if user comes from support or coach.
  // this flag is set at navigation level
  isCoachingSupport = true,
}: DefaultScreenPropType<'Support'> & { isCoachingSupport: boolean }) => {
  const {
    crisp_session_id: crispSessionId,
    display_name: displayName,
    has_coach_messages: hasCoachMessages,
    group,
    kit_id: kitId,
    show_welcome_message_on_chat: showWelcomeMessageOnChat,
    uid,
    email,
  } = useSelector(USER_SUPPORT_PROFILE);
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  // ref to inject JS on demand
  const webViewRef = useRef<WebView | null>(null);
  // to hide overlay when Crisp chat is ready
  const [webViewVisible, setWebViewVisible] = useState<boolean>();
  // to store Crisp sess id at state leve and avoid refresh screen if sess id is updated.
  const [currentCrispSessionId] = useState(crispSessionId);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // AWFUL HACK TO MAKE CRISP CHAT TO EXPAND ON KEYBOARD CLOSE
      // otherwise iOS 14 shows a blank space where keyboard was visible.
      webViewRef.current?.injectJavaScript(`
          $crisp.push(["do", "chat:hide"]);
          $crisp.push(["do", "chat:show"]);
          true;
        `);
    });

    // flag user as pending message read on DB
    if (hasCoachMessages && isCoachingSupport) {
      updateProfile({ 'flags.has_coach_messages': false });
    }

    return () => {
      keyboardDidHideListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // first user message to activate channel
  const activationMessage = translate('screens.Support.starting-coach');
  // first message template from Coach to user
  const welcomeMessage = template(translate('screens.Support.coach-welcome'))({ display_name: displayName });

  // Note this message is printed into Crisp event session:loaded callback.
  const welcomeMessageCommand = `
      window.$crisp.push(["do", "message:send", ["text", \`${activationMessage}\`]]);
      window.setTimeout(() => {
        window.$crisp.push(["do", "message:show", ["text", \`${welcomeMessage}\`]]);
        window.ReactNativeWebView.postMessage("welcome_message:shown");
        true;
      }, 3000);
      true;
  `;
  const runFirst = `
    /* keep this email well formatted for Crisp verification but anonymous */
    window.injectedEmail = '${email}';
    window.startingText = \`${translate('screens.Support.starting-chat')}\`;
  `;

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
      });
    }
    return;
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        scrollEnabled={false}
        style={styles.webView}
        onNavigationStateChange={async event => {
          if (!event.url.includes(URL_UI_COACHING)) {
            webViewRef.current?.stopLoading();
            openUrl(event.url);
          }
        }}
        onMessage={event => {
          // navigate back on chat close
          if (event.nativeEvent.data === 'chat:closed') {
            navigation.goBack();
          }
          // on crisp ready actions
          if (event.nativeEvent.data === 'chat:opened') {
            // show automatic 2 messages conversation
            if (showWelcomeMessageOnChat && isCoachingSupport) {
              webViewRef.current?.injectJavaScript(welcomeMessageCommand);
            }
            // updates session id if changed and triggers readyness event to hide overlay
            webViewRef.current?.injectJavaScript(`
              const session_id = window.$crisp.get("session:identifier");
              if (session_id !== "${currentCrispSessionId}") {
                window.ReactNativeWebView.postMessage("session:loaded:" + session_id);
              }
              window.ReactNativeWebView.postMessage("session:ready");

              window.$crisp.push(["set", "user:nickname", ["${displayName}"]])
              window.$crisp.push(["set", "session:data", [[
                ["user-profile", "${group}"],
                ["user-name", "${displayName}"],
                ["user-kit-id", "${kitId}"],
                ["user-id", "${uid}"],
                ["profile-page", "https://app.mindcotine.com/admin/users/${uid}"],
              ]]]);
              true;
            `);
          }
          // all ready, hide overlay and reveal the chat.
          if (event.nativeEvent.data === 'session:ready') {
            setWebViewVisible(true);
          }
          // updates session id if is coaching screen
          if (event.nativeEvent.data.includes('session:loaded:') && isCoachingSupport) {
            const session_id = event.nativeEvent.data.split(':').pop();
            if (session_id !== currentCrispSessionId) {
              // Firebase.updateUser({ crisp_session_id: session_id });
              updateProfile({ crisp_session_id: session_id });
            }
          }

          // flag user into DB to avoid welcome messages in the future.
          if (event.nativeEvent.data === 'welcome_message:shown') {
            if (showWelcomeMessageOnChat && isCoachingSupport) {
              updateProfile({ 'flags.show_welcome_message_on_chat': false });
            }
          }
        }}
        // include session id in URL in case of coaching screen.
        // if no session id is stored in DB use some fake value to let Crisp
        // to generate a new session id.
        source={{
          uri: isCoachingSupport
            ? `${URL_UI_COACHING}?crisp_sid=${currentCrispSessionId || 'session_fake_to_destroy_previous_one'}`
            : URL_UI_SUPPORT,
        }}
        injectedJavaScriptBeforeContentLoaded={runFirst}
        onError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent;
          // eslint-disable-next-line no-console
          console.warn('WebView error: ', nativeEvent);
        }}
      />
      {!webViewVisible && (
        <View style={[styles.overlay, webViewVisible ? styles.overlayHidden : null]}>
          <Text>
            {isCoachingSupport
              ? translate('screens.Support.starting-coach-chat')
              : translate('screens.Support.starting-support-chat')}
          </Text>
        </View>
      )}
      {Platform.OS === 'ios' && <KeyboardSpacer />}
    </SafeAreaView>
  );
};

Support.propTypes = {
  navigation: PropTypes.object,
  isCoachingSupport: PropTypes.bool,
};

export default Support;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginBottom: Platform.OS === 'ios' ? -30 : 0,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.secondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlayHidden: {
      height: 0,
      overflow: 'hidden',
      display: 'none',
    },
    webView: {
      flex: 1,
      height: '100%',
    },
  });
