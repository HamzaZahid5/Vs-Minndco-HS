import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Keyboard, Platform, KeyboardAvoidingView } from 'react-native'
import { WebView } from 'react-native-webview'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
// @ts-ignore: non-ts file
import template from 'lodash.template'
import { useDispatch, useSelector } from 'react-redux'
import { updateCrispSessionId, updateNoPendingCoachMessage, updateWelcomeMessageSeen } from '../../services/Firestore'
import KeyboardSpacer from '../../utils/KeyboardSpacer'
import { IS_PREMIUM, USER_SUPPORT_PROFILE } from '../../store/selectors'
import { DefaultScreenPropType } from '../../../types'
import { translate } from '../../utils/localization'
import { useRobTheme, Theme as RobTheme, TabbedScreen } from '@mindcoxr/rob'
import { URL_UI_SUPPORT, URL_UI_COACHING } from '../../utils/config'
import { ActivityIndicator } from 'react-native-paper'
const FAKE_SESSION_ID = 'session_fake_to_destroy_previous_one'

const SupportRegister = ({ navigation }: DefaultScreenPropType<'Support'>) => {
  // REDUX
  const {
    crisp_session_id: crispSessionId,
    display_name: displayName,
    has_coach_messages: hasCoachMessages,
    group,
    kit_id: kitId,
    show_welcome_message_on_chat: showWelcomeMessageOnChat,
    uid,
    email,
  } = useSelector(USER_SUPPORT_PROFILE)
  const dispatch = useDispatch()
  const isCoachingSupport = useSelector(IS_PREMIUM)

  // TOOLS
  const theme = useRobTheme()
  const styles = getStyles(theme)
  // ref to inject JS on demand
  const webViewRef = useRef<WebView | null>(null)

  // LOCAL
  // to hide overlay when Crisp chat is ready
  const [webViewVisible, setWebViewVisible] = useState<boolean>()
  // to store Crisp sess id at state leve and avoid refresh screen if sess id is updated.
  const [currentCrispSessionId, setCrispSessionId] = useState(crispSessionId)

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => setWebViewVisible(false))

    return () => {
      unsubscribeBlur()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // HELPERS
  useEffect(() => {
    const unsubsFocus = navigation.addListener('focus', () => {
      // @todo trigger this conditionally only if it's needed
      dispatch({ type: 'flags/showChatHelper', payload: false })
    })
    const unsubsBlur = navigation.addListener('blur', () => {
      webViewRef.current?.reload()
    })
    return () => {
      unsubsFocus()
      unsubsBlur()
    }
  }, [navigation, dispatch])

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // AWFUL HACK TO MAKE CRISP CHAT TO EXPAND ON KEYBOARD CLOSE
      // otherwise iOS 14 shows a blank space where keyboard was visible.
      webViewRef.current?.injectJavaScript(`
          $crisp.push(["do", "chat:hide"]);
          $crisp.push(["do", "chat:show"]);
          true;
        `)
    })

    // flag user as pending message read on DB
    if (hasCoachMessages && isCoachingSupport) {
      updateNoPendingCoachMessage()
    }

    return () => {
      keyboardDidHideListener.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // first user message to activate channel
  const activationMessage = translate('screens.Support.starting-coach')
  // first message template from Coach to user
  const welcomeMessage = template(translate('screens.Support.coach-welcome'))({ display_name: displayName })

  // Note this message is printed into Crisp event session:loaded callback.
  const welcomeMessageCommand = `
      window.$crisp.push(["do", "message:send", ["text", \`${activationMessage}\`]]);
      window.setTimeout(() => {
        window.$crisp.push(["do", "message:show", ["text", \`${welcomeMessage}\`]]);
        window.ReactNativeWebView.postMessage("welcome_message:shown");
        true;
      }, 3000);
      true;
  `
  const runFirst = `
    /* keep this email well formatted for Crisp verification but anonymous */
    window.injectedEmail = '${email}';
    window.startingText = \`${translate('screens.Support.starting-chat')}\`;
  `

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

  const uri = isCoachingSupport
    ? `${URL_UI_COACHING}?crisp_sid=${currentCrispSessionId || FAKE_SESSION_ID}`
    : URL_UI_SUPPORT

  // flag to remove overlay, only when webview loads and crisp session is set and real
  const chatReady = crispSessionId?.length && crispSessionId !== FAKE_SESSION_ID && webViewVisible

  return (
    <TabbedScreen colors={[theme.colors.primaryPalette[400], 'white']}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }} enabled={Platform.OS === 'android'}>
        <WebView
          ref={webViewRef}
          scrollEnabled={false}
          style={styles.webView}
          onNavigationStateChange={async event => {
            if (!event.url.includes(URL_UI_COACHING) && !event.url.includes(URL_UI_SUPPORT)) {
              webViewRef.current?.stopLoading()
              openUrl(event.url)
            }
          }}
          onMessage={event => {
            // navigate back on chat close
            if (event.nativeEvent.data === 'chat:closed') {
              navigation.navigate('Home')
            }
            // on crisp ready actions
            if (event.nativeEvent.data === 'chat:opened') {
              // show automatic 2 messages conversation
              if (showWelcomeMessageOnChat && isCoachingSupport && chatReady) {
                webViewRef.current?.injectJavaScript(welcomeMessageCommand)
              }
              // updates session id if changed and triggers readyness event to hide overlay
              webViewRef.current?.injectJavaScript(`
              window.session_id = window.$crisp.get("session:identifier");
              if (window.session_id !== "${currentCrispSessionId}") {
                window.ReactNativeWebView.postMessage("session:loaded:" + window.session_id);
              }
              window.ReactNativeWebView.postMessage("session:ready");

              window.$crisp.push(["set", "user:nickname", ["${displayName}"]])
              window.$crisp.push(["set", "session:data", [[
                ["user-profile", "${group}"],
                ["user-name", "${displayName}"],
                ["user-kit-id", "${kitId}"],
                ["user-id", "${uid}"],
              ]]]);
              true;
            `)
            }
            // all ready, hide overlay and reveal the chat.
            if (event.nativeEvent.data === 'session:ready') {
              setWebViewVisible(true)
            }
            // updates session id if is coaching screen
            if (event.nativeEvent.data.includes('session:loaded:') && isCoachingSupport) {
              const session_id = event.nativeEvent.data.split(':').pop()
              if (session_id && session_id !== currentCrispSessionId) {
                //local update
                setCrispSessionId(session_id)
                // db update
                updateCrispSessionId(session_id)
              }
            }

            // flag user into DB to avoid welcome messages in the future.
            if (event.nativeEvent.data === 'welcome_message:shown') {
              if (showWelcomeMessageOnChat && isCoachingSupport) {
                updateWelcomeMessageSeen()
              }
            }
          }}
          // include session id in URL in case of coaching screen.
          // if no session id is stored in DB use some fake value to let Crisp
          // to generate a new session id.
          source={{
            uri,
          }}
          // injectedJavaScriptBeforeContentLoaded={runFirst}
          onError={syntheticEvent => {
            const { nativeEvent } = syntheticEvent
            // eslint-disable-next-line no-console
            console.warn('WebView error: ', nativeEvent)
          }}
        />
        {!chatReady && (
          <View style={[styles.overlay, webViewVisible ? styles.overlayHidden : null]}>
            <View style={{ marginBottom: 20 }}>
              <ActivityIndicator color={theme.colors.primary} size={'small'} />
            </View>
            <Text>
              {isCoachingSupport
                ? translate('screens.Support.starting-coach-chat')
                : translate('screens.Support.starting-support-chat')}
            </Text>
          </View>
        )}
        {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={Platform.OS === 'ios' ? -80 : 0} />}
      </KeyboardAvoidingView>
    </TabbedScreen>
  )
}

export default SupportRegister

const getStyles = (theme: typeof RobTheme) =>
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
      backgroundColor: theme.colors.primaryPalette[400],
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
  })
