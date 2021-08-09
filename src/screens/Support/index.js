import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { WebView } from 'react-native-webview';
import template from 'lodash.template';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import KeyboardSpacer from '../../utils/KeyboardSpacer';
import { USER_SUPPORT_PROFILE } from '../../store/selectors';

const URL_UI_SUPPORT = 'https://www.mindcotine.com/wp-content/assets/support/index.html';
const URL_UI_COACHING = 'https://mindco-relief-support.web.app/support/coach';

const Support = ({
  navigation,
  // flag to determine if user comes from support or coach.
  // this flag is set at navigation level
  isCoachingSupport = true,
}) => {
  const { crisp_session_id: crispSessionId, flag_has_coach_messages: hasCoachMessages } =
    useSelector(USER_SUPPORT_PROFILE);
  const theme = useTheme();
  const styles = getStyles(theme);
  // ref to inject JS on demand
  const webViewRef = useRef();
  // to hide overlay when Crisp chat is ready
  const [webViewVisible, setWebViewVisible] = useState();
  // to store Crisp sess id at state leve and avoid refresh screen if sess id is updated.
  const [currentCrispSessionId] = useState(crispSessionId);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // AWFUL HACK TO MAKE CRISP CHAT TO EXPAN ON KEYBOARD CLOSE
      // otherwise iOS 14 shows a blank space where keyboard was visible.
      webViewRef.current.injectJavaScript(`
          $crisp.push(["do", "chat:hide"]);
          $crisp.push(["do", "chat:show"]);
          true;
        `);
    });

    // flag user as pending message read on DB
    if (hasCoachMessages && isCoachingSupport) {
      // Firebase.updateUser({ flag_has_coach_messages: false });
    }

    return () => {
      keyboardDidHideListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // first user message to activate channel
  const activationMessage = 'Hi there, I´m starting my coaching support';
  // first message template from Coach to user
  const welcomeMessage = template(
    'Hi ${display_name}, I’m your Personal Coach. I’m here to help on your relief process, and guide you throughout your experience here. You can ask me any question, whenever you feel like.\n\nHere is my first advice:\nForm a new habit takes at least 18 days. Make you stress management practices a habit, perform an activity a day, consistently, for this behavior to become automatic. Can you do your first activity today?',
  )({ display_name: displayName });

  // Note this message is printed into Crisp event session:loaded callback.
  const welcomeMessageCommand = `
      window.$crisp.push(["do", "message:send", ["text", "${activationMessage}"]]);
      window.setTimeout(() => {
        window.$crisp.push(["do", "message:show", ["text", "${welcomeMessage}"]]);
        window.ReactNativeWebView.postMessage("welcome_message:shown");
        true;
      }, 3000);
      true;
  `;
  const runFirst = `
    window.injectedEmail = '${email}';
    window.startingText = 'starting chat...';
    document.body.style.backgroundColor = 'teal';
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        // userAgent={`Mozilla/5.0 (Linux; Android 8.1.0; Android SDK built for x86 Build/OSM1.180201.021; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/MindCotineMobile.0.3163.98 Mobile Safari/537.36 DemoApp/1.1.0`}
        // applicationNameForUserAgent={`MindCotineMobile/${config.APP_VERSION}`}
        scrollEnabled={false}
        style={{ flex: 1, height: '100%' }}
        onMessage={event => {
          // navigate back on chat close
          if (event.nativeEvent.data === 'chat:closed') {
            navigation.goBack();
          }
          // on crisp ready actions
          if (event.nativeEvent.data === 'chat:opened') {
            // show automatic 2 messages conversation
            if (showWelcomeMessageOnChat && isCoachingSupport && !currentCrispSessionId) {
              webViewRef.current.injectJavaScript(welcomeMessageCommand);
            }
            // updates session id if changed and triggers readyness event to hide overlay
            webViewRef.current.injectJavaScript(`
              const session_id = window.$crisp.get("session:identifier");
              if (session_id !== "${currentCrispSessionId}") {
                window.ReactNativeWebView.postMessage("session:loaded:" + session_id);
              }
              window.ReactNativeWebView.postMessage("session:ready");

              window.$crisp.push(["set", "user:nickname", ["${displayName}"]])
              window.$crisp.push(["set", "session:data", [[
                ["user-profile", "${userProfile}"],
                ["user-name", "${displayName}"],
                ["user-is-premium", "${isPremium}"],
                ["user-kit-id", "${kitId}"],
                ["user-id", "${uid}"],
                ["user-source", "${source}"],
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
            }
          }

          // flag user into DB to avoid welcome messages in the future.
          if (event.nativeEvent.data === 'welcome_message:shown') {
            if (showWelcomeMessageOnChat && isCoachingSupport) {
              // Firebase.updateUser({ flag_show_welcome_message_on_chat: false });
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
          console.warn('WebView error: ', nativeEvent);
        }}
      />
      {!webViewVisible && (
        <View style={[styles.overlay, webViewVisible ? styles.overlayHidden : null]}>
          <Text>{isCoachingSupport ? 'Starting Coach chat' : 'Starting support chat'}</Text>
        </View>
      )}
      <KeyboardSpacer />
    </SafeAreaView>
  );
};

Support.propTypes = {
  navigation: PropTypes.object,
  isCoachingSupport: PropTypes.bool,
};

export default Support;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      // minHeight: '100%',
      // alignItems: 'center',
      // justifyContent: 'center',
      // paddingBottom: Platform.OS === 'ios' ? 45 : 0,
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
  });
