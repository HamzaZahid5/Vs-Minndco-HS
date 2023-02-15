import React, { useState, useRef, RefObject, useEffect } from 'react'
import { Provider as PaperProvider, TouchableRipple } from 'react-native-paper'
import { Theme as PaperTheme } from 'react-native-paper/src/types'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Provider } from 'react-redux'
import { Platform, View, ActivityIndicator } from 'react-native'
import { Theme as NavTheme, NavigationContainer, NavigationContainerRef, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createStackNavigator, StackHeaderProps, StackNavigationProp } from '@react-navigation/stack'
import * as Localization from 'expo-localization'
import { getProductTheme } from './src/utils/config'
import { BasicScreen, Button, Paragraph, RobThemeProvider, Row, Text } from '@mindcoxr/rob'
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

// SCREENS
import LandingScreen from './src/screens/LandingScreen'
import RegistrationScreen from './src/screens/Registration'
import LoginScreen from './src/screens/Login'
import AuthByTokenScreen from './src/screens/AuthByToken'
import ForgotPasswordScreen from './src/screens/ForgotPassword'
import DrawerHomeNavigator from './src/screens/DrawerNavigator'
import Playground from './src/screens/Playground'
import SmokeRecordScreen from './src/screens/SmokeRecordScreen'
import QuitDayModal from './src/screens/QuitDayScreen'
import OnBoardingScreens from './src/screens/OnBoardingScreens'
import ActivityScreen from './src/screens/ActivityScreen'
import VRMet from './src/screens/VRMet'
import ProfileScreen from './src/screens/Profile'
import BasicModalScreen from './src/screens/BasicModalScreen'
import LifesaverActivityScreen from './src/screens/Lifesaver/LifesaverActivity'
import KitWelcome from './src/screens/KitWelcomeScreen'
import KitActivation from './src/screens/KitActivation'

// UTILS & HELPERS
import { BackButton } from './src/utils/hooks/useSetDefaultBackOnPress'
import { RootStackParamList } from './types'
import useFontLoader from './src/utils/hooks/useFontLoader'
import useBootUpI18n from './src/utils/hooks/useBootUpI18n'
import { useFirestoreListener, updateDevideInfo } from './src/services/Firestore'
import { Icon } from '@mindcoxr/rob'
import NavigationHeader from './src/components/NavigationHeader'
import useDeepLinking from './src/utils/hooks/useDeepLinking'
import Orientation from 'react-native-orientation-locker'
// // @ts-ignore: non-ts file
// import AboutVRScreen from './src/screens/AboutVR';
// // @ts-ignore: non-ts file
// import ActivityScreen from './src/screens/ActivityScreen';
// import Color from 'color';
// import ContentsShelfScreen from './src/screens/ContentsShelf';
// // @ts-ignore: non-ts file
// import HowItWorksScreen from './src/screens/HowItWorks';
// // @ts-ignore: non-ts file
// import KitActivationScreen from './src/screens/KitActivation';
// // @ts-ignore: non-ts file
// import KitAssembleScreen from './src/screens/KitAssemble';
// import RoadmapScreen from './src/screens/Roadmap';
// import LibraryScreen from './src/screens/Library';
// import LoadingScreen from './src/screens/Loading';
// import LoginScreen from './src/screens/Login';
// import ResetPassword from './src/screens/ResetPassword';
// // @ts-ignore: non-ts file
// import MainComponent from './src/screens/Home/DrawerNavigator';
// // @ts-ignore: non-ts file
// import ModalScreen from './src/screens/ModalScreen';
// // @ts-ignore: non-ts file
// import PathEndingScreen from './src/screens/PathEnding';
// // @ts-ignore: non-ts file
// import ProfileScreen from './src/screens/Profile';
// import RegistrationScreen from './src/screens/Register';
// import { RootStackParamList } from './types';
// // @ts-ignore: non-ts file
// import StatisticsScreen from './src/screens/Statistics';
// // @ts-ignore: non-ts file
// import StressActivityToDoScreen from './src/screens/StressActivityScreen';
// // @ts-ignore: non-ts file
// import StressActivityTypeScreen from './src/screens/StressActivityType';
// // @ts-ignore: non-ts file
// import StressRateScreen from './src/screens/StressRate';
// // @ts-ignore: non-ts file
// import StressTriggerScreen from './src/screens/StressTrigger';
// // @ts-ignore: non-ts file
// import SupportScreen from './src/screens/Support';
// import ThemeInspector from './src/utils/ThemeInspector';
// // @ts-ignore: non-ts file
// import VRMetScreen from './src/screens/VRMet';
// // @ts-ignore: non-ts file
// import WelcomeWizardScreen from './src/screens/WelcomeWizard';
// import configureStore from './src/store';
// import useBootUpI18n from './src/utils/hooks/useBootUpI18n';
// // @ts-ignore: non-ts file
// import config from './env';
// // @ts-ignore: non-ts file
// import { useFirestoreListener, updateProfile } from './src/services/Firestore';
// // @ts-ignore: non-ts file
// import useFontLoader from './src/utils/hooks/useFontLoader';
import handleMessaging from './src/utils/RemoteMessagingHandler'
import KitPresentation from './src/screens/KitPresentation'
import LoginCode from './src/screens/LoginCode'
import functions from './src/services/Functions'
import LoadingBackground from './src/components/LoadingBackground'
import { parseCommand } from './src/utils/helpers'
// import useDeepLinking from './src/utils/hooks/useDeepLinking';
// import navigateToDeepLink from './src/utils/navigateToDeepLink';
// import { translate, getLocale } from './src/utils/localization';
// // @ts-ignore: non-ts file
// import Smartlook from 'smartlook-react-native-wrapper';
// import analytics from './src/services/Analytics';
// import crashlytics from './src/services/Crashlytics';
// import useOnScreenChange from './src/utils/hooks/useOnScreenChange';
// import NoProductionIndicator from './src/components/NoProductionIndicator';
// import { BackButton } from './src/utils/hooks/useSetDefaultBackOnPress';
// import Playground from './src/screens/Playground';
// import VRPlaygroundActivity from './src/screens/VRPlaygroundActivity';
// import Zoho from './src/screens/Zoho';
// import StressActivitySelect from './src/screens/StressActivitySelect';
// import ReadActivitySelect from './src/screens/ReadActivitySelect';
import { getCommonRoutes, getPostLoginRoutes, getPreLoginRoutes } from './src/utils/routes'
import useIsSmallDevice from './src/utils/hooks/useIsSmallDevice'
import { getLocale, translate } from './src/utils/localization'
import useOnScreenChange from './src/utils/hooks/useOnScreenChange'
import Blob from './assets/SVG/Blob'

const Stack = createStackNavigator<RootStackParamList>()
const store = configureStore()

const PostLoginRoutes = getPostLoginRoutes(Stack)
const PreLoginRoutes = getPreLoginRoutes(Stack)
const CommonRoutes = getCommonRoutes(Stack)

export default function App() {
  const userToken = useAuth()
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

  // useEffect(() => {
  //   if (!userData) {
  //     auth().signOut()
  //     store.dispatch({ type: 'user/logout' })
  //     navigatorRef.current?.navigate('Login')
  //   }
  // }, [userData])

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
  }, [deepLink, navigatorReady])

  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])

  useEffect(() => {
    if (userToken) {
      // console.log({ userToken })
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
      navigatorRef.current?.navigate('Login')
    }
  }, [i18nReady, isAuthed, userData])

  const ActivityComponent = () => {
    const [loading, setLoading] = useState(true)

    const execute = () => {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }
    execute()

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
        <Button role="primary" onPress={() => auth().signOut()}>
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
  if (!fontsLoaded || !i18nReady || isWaitingForAuth || (isAuthed && !userData)) {
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
