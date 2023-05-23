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
import * as Sentry from '@sentry/react-native'

Sentry.init({
  dsn: 'https://593319997bcf45dbba7cc9def44c514f@o4504793554944000.ingest.sentry.io/4504793558155264',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  enableNative: false,
})

const Stack = createStackNavigator<RootStackParamList>()
const store = configureStore()

const PostLoginRoutes = getPostLoginRoutes(Stack)
const PreLoginRoutes = getPreLoginRoutes(Stack)
const CommonRoutes = getCommonRoutes(Stack)

function App() {
  const { userToken, isLoading } = useAuth()
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
    }
    if (userData?.on_boarding_completed) {
      store.dispatch({ type: 'user/setOnBoardingComplete', payload: userData?.on_boarding_completed })
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
      analytics().setUserId(userToken.uid)
      //@ts-ignore bad typed
      crashlytics().log('User authenticated.')
      //@ts-ignore bad typed
      crashlytics().setUserId(userToken.uid)
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

  const ActivityComponent = () => {
    const [loading, setLoading] = useState(true)

    const fetchUserData = async () => {
      setLoading(true)
      console.log('ingresa Activity')
      try {
        if (userToken && userToken.uid && userToken.uid.length > 10) {
          console.log({ userToken })
          const userData = useFirestoreListener('users', userToken?.uid ?? '')
          console.log({ userData })
          if (!userData) {
            auth().signOut()
            navigatorRef && navigatorRef.current && navigatorRef.current.navigate('Landing')
          } else {
            const timeout = setTimeout(() => {
              setLoading(false)
            }, 3000)

            clearTimeout(timeout)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchUserData()
    }, [])

    if (loading) {
      return (
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Blob style={{ position: 'absolute', top: '16%', right: 0 }} />
        <Row>
          <Logo />
        </Row>
        <Row>
          <View style={{ marginBottom: 20 }}>
            <Paragraph>
              {translate('commons.messages.error_message', {
                defaultValue: 'An unexpected error occurred, please contact support so that we can best assist you.',
              })}
            </Paragraph>
          </View>
        </Row>
        <Button
          role="primary"
          onPress={() => {
            auth().signOut()
            navigatorRef && navigatorRef.current && navigatorRef.current.navigate('Landing')
          }}
        >
          {translate('commons.messages.button_back', { defaultValue: 'Back' })}
        </Button>
      </View>
    )
  }

  // if (isWaitingForAuth || (isAuthed && !userData) || !fontsLoaded || !i18nReady || deepLink === undefined) {
  //   return <LoadingScreen />;

  // }
  // auth().signOut()
  // console.log(userData)
  // if (!fontsLoaded || !i18nReady || isWaitingForAuth || (isAuthed && !userData)) {
  //   return null
  // }
  if (!fontsLoaded || !i18nReady || isWaitingForAuth || (isAuthed && !userData) || isLoading) {
    return <ActivityComponent />
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
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </RobThemeProvider>
    </Provider>
  )
}

export default Sentry.wrap(App)
