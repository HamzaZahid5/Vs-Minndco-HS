import React, { useState, useRef, RefObject, useEffect } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { Platform, View, ActivityIndicator } from 'react-native'
import { Theme as NavTheme, NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createStackNavigator } from '@react-navigation/stack'
import * as Localization from 'expo-localization'
import { getProductTheme } from './src/utils/config'
import { Button, Paragraph, RobThemeProvider, Row } from '@mindcoxr/rob'
import config from './env'
import crashlytics from './src/services/Crashlytics'
import analytics from './src/services/Analytics'
// @ts-ignore not typescript file
import Smartlook from 'smartlook-react-native-wrapper'
import Logo from './assets/SVG/Logo'

// SERVICES
// @ts-ignore: non-ts file
import { auth, useAuth } from './src/services/Auth'
import configureStore from './src/store'

// UTILS & HELPERS
import { RootStackParamList } from './types'
import useFontLoader from './src/utils/hooks/useFontLoader'
import useBootUpI18n from './src/utils/hooks/useBootUpI18n'
import { useFirestoreListener, updateDevideInfo } from './src/services/Firestore'
import NavigationHeader from './src/components/NavigationHeader'
import useDeepLinking from './src/utils/hooks/useDeepLinking'
import Orientation from 'react-native-orientation-locker'
import handleMessaging from './src/utils/RemoteMessagingHandler'
import { checkNotificationPermission, parseCommand } from './src/utils/helpers'
import { getCommonRoutes, getPostLoginRoutes, getPreLoginRoutes } from './src/utils/routes'
import useIsSmallDevice from './src/utils/hooks/useIsSmallDevice'
import { getLocale, translate } from './src/utils/localization'
import useOnScreenChange from './src/utils/hooks/useOnScreenChange'
import Blob from './assets/SVG/Blob'
import OfflineNotice from './src/components/OfflineNotice'
import ActivityComponent from './src/components/ActivityComponent/ActivityComponent'
import PostHog from 'posthog-react-native'

const Stack = createStackNavigator<RootStackParamList>()
const store = configureStore()

const PostLoginRoutes = getPostLoginRoutes(Stack)
const PreLoginRoutes = getPreLoginRoutes(Stack)
const CommonRoutes = getCommonRoutes(Stack)

function App() {
  const { userToken, isLoading } = useAuth()
  const userId = userToken?.uid as string

  const userData = useFirestoreListener('users', userToken?.uid ?? '')
  const i18nReady = useBootUpI18n()
  const deepLink = useDeepLinking()
  const navigatorRef: RefObject<NavigationContainerRef<RootStackParamList>> = useRef(null)

  useOnScreenChange(navigatorRef, ({ oldScreen, newScreen }) => {
    if (Platform.OS !== 'web') {
      if (oldScreen) {
        Smartlook.trackNavigationEvent(oldScreen, Smartlook.ViewState.Exit)
      }
      Smartlook.trackNavigationEvent(newScreen, Smartlook.ViewState.Enter)
    }
  })

  useOnScreenChange(navigatorRef, async ({ newScreen }) => {
    if (Platform.OS !== 'web') {
      await analytics().logScreenView({
        screen_name: newScreen,
        screen_class: newScreen,
      })
    }
  })

  const [navigatorReady, setNavigatorReady] = useState(false)
  useEffect(() => {
    if (navigatorReady && navigatorRef.current && deepLink) {
      const { value, isAuth, isSignInCode } = parseCommand(deepLink)
      if (isAuth) {
        navigatorRef.current.navigate('AuthByToken', { token: value })
      } else if (isSignInCode) {
        navigatorRef.current.navigate('LoginCode', { eid: value })
      } else {
        navigatorRef.current.navigate(value as keyof RootStackParamList)
      }
    }
  }, [deepLink, navigatorReady, navigatorRef])

  useEffect(() => {
    checkNotificationPermission()
  }, [])

  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])

  useEffect(() => {
    if (userToken) {
      store.dispatch({ type: 'user/setAuth', payload: userToken })
    }
    if (userToken === null) {
      store.dispatch({ type: 'user/logout' })
    }
  }, [userToken])

  useEffect(() => {
    if (userData === null) {
      store.dispatch({ type: 'user/logout' })
    }
    if (userData) {
      store.dispatch({ type: 'user/setUser', payload: userData })
      const posthog = PostHog.initAsync('phc_Ewp0opPn25tZg7Bu1GibYQs0fM5sMdGWrxUjN2ryKXr').then((a: any) =>
        a.identify(userData?.email, {
          ...userData,
        }),
      )
    }
    if (userData?.on_boarding_completed) {
      store.dispatch({ type: 'user/setOnBoardingComplete', payload: userData?.on_boarding_completed })
    }
    if (userData?.statistics) {
      store.dispatch({ type: 'smoke_record/setSmokesByDay', payload: userData?.statistics })
    }
  }, [userData])

  useEffect(() => {
    if (userData?.flags) {
      store.dispatch({ type: 'flags/setFlags', payload: userData?.flags })
    }
  }, [userData])

  useEffect(() => {
    if (userToken && userData) {
      if (Platform.OS !== 'web') {
        Smartlook.setUserIdentifier(userToken.uid)
      }
      userToken.uid && analytics().setUserId(userToken.uid)
      //@ts-ignore bad typed
      userToken.uid && crashlytics().log('User authenticated.')
      //@ts-ignore bad typed
      userToken.uid && crashlytics().setUserId(userToken.uid)
    }
  }, [userToken])

  // // while not ready
  const isWaitingForAuth = userToken === undefined // waiting for auth response
  const isNotAuthed = userToken === null // auth response with no-authed
  const isAuthed = !isWaitingForAuth && !isNotAuthed
  const [fontsLoaded] = useFontLoader()
  const isSmallDevice = useIsSmallDevice()
  const theme = getProductTheme(!!isSmallDevice)

  useEffect(() => {
    if (isAuthed && i18nReady && userData !== null) {
      updateDevideInfo({
        app_version: config.APP_VERSION,
        language: getLocale(),
        tz: Localization.timezone,
        tz_offset: new Date().getTimezoneOffset() * -60,
        platform: `${Platform.OS}(${Platform.Version})`,
      })
    } else {
      navigatorRef.current?.navigate('Landing')
    }
  }, [i18nReady, isAuthed, userData])

  if (!fontsLoaded || !i18nReady || isWaitingForAuth || (isAuthed && !userData)) {
    return (
      <ActivityComponent
        userData={userData}
        userToken={userToken}
        navigatorRef={navigatorRef}
        auth={auth}
        translate={translate}
        store={store}
      />
    )
  }

  handleMessaging()

  //Go to main as initial route, it should be at the top of the stack. Then check there if it's needed to navigate to Tutorial
  const headerBackground = () => <View style={{ height: 64 }} />

  return (
    <Provider store={store}>
      <RobThemeProvider theme={theme}>
        <PaperProvider theme={theme}>
          {/* {config.name !== 'production' && <NoProductionIndicator nav={navigatorRef} />} */}
          <SafeAreaProvider>
            <OfflineNotice />
            {/*<LoadingBackground isLoading={isGoingToLogin} />*/}
            <NavigationContainer
              theme={
                {
                  // ...theme,
                  colors: {
                    // ...theme.colors,
                    background: 'white',
                  },
                } as NavTheme
              }
              onReady={() => {
                setNavigatorReady(true)
              }}
              ref={navigatorRef}
            >
              {/* <PostHogProvider
                apiKey="phc_Ewp0opPn25tZg7Bu1GibYQs0fM5sMdGWrxUjN2ryKXr"
                options={{
                  host: 'https://app.posthog.com',
                }}
              > */}
              <Stack.Navigator
                initialRouteName={userToken ? 'Home' : 'Landing'}
                // initialRouteName="Main"
              >
                {userToken ? (
                  <>
                    <Stack.Group
                      screenOptions={{
                        headerMode: 'float',
                        // headerTintColor: Color(theme.colors.dark).darken(0.3).toString(),
                        headerTransparent: true,
                        headerBackground,
                        // eslint-disable-next-line react/display-name
                        header: NavigationHeader,
                      }}
                    >
                      {PostLoginRoutes}
                    </Stack.Group>
                  </>
                ) : (
                  <>{PreLoginRoutes}</>
                )}
                {CommonRoutes}
              </Stack.Navigator>
              {/* </PostHogProvider> */}
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </RobThemeProvider>
    </Provider>
  )
}

export default App
