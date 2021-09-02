import React, { useState, useRef, RefObject, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Theme as PaperTheme } from 'react-native-paper/src/types';
import { Provider } from 'react-redux';
import { Platform, View } from 'react-native';
import {
  Theme as NavTheme,
  NavigationContainer,
  NavigationContainerRef,
  NavigationContainerEventMap,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme } from './src/utils/OriginalTheme';
// @ts-ignore: non-ts file
import { useAuth } from './src/services/Auth';
// @ts-ignore: non-ts file
import AboutVRScreen from './src/screens/AboutVR';
// @ts-ignore: non-ts file
import ActivityScreen from './src/screens/ActivityScreen';
import Color from 'color';
import ContentsShelfScreen from './src/screens/ContentsShelf';
// @ts-ignore: non-ts file
import HowItWorksScreen from './src/screens/HowItWorks';
// @ts-ignore: non-ts file
import KitActivationScreen from './src/screens/KitActivation';
// @ts-ignore: non-ts file
import KitAssembleScreen from './src/screens/KitAssemble';
import LibraryScreen from './src/screens/Library';
import LoadingScreen from './src/screens/Loading';
import LoginScreen from './src/screens/Login';
// @ts-ignore: non-ts file
import MainComponent from './src/screens/Home/DrawerNavigator';
// @ts-ignore: non-ts file
import ModalScreen from './src/screens/ModalScreen';
// @ts-ignore: non-ts file
import PathEndingScreen from './src/screens/PathEnding';
// @ts-ignore: non-ts file
import ProfileScreen from './src/screens/Profile';
import RegistrationScreen from './src/screens/Register';
import { RootStackParamList } from './types';
// @ts-ignore: non-ts file
import StatisticsScreen from './src/screens/Statistics';
// @ts-ignore: non-ts file
import StressActivityToDoScreen from './src/screens/StressActivityScreen';
// @ts-ignore: non-ts file
import StressActivityTypeScreen from './src/screens/StressActivityType';
// @ts-ignore: non-ts file
import StressRateScreen from './src/screens/StressRate';
// @ts-ignore: non-ts file
import StressTriggerScreen from './src/screens/StressTrigger';
// @ts-ignore: non-ts file
import SupportScreen from './src/screens/Support';
import ThemeInspector from './src/utils/ThemeInspector';
// @ts-ignore: non-ts file
import VRMetScreen from './src/screens/VRMet';
// @ts-ignore: non-ts file
import WelcomeWizardScreen from './src/screens/WelcomeWizard';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider } from '@ui-kitten/components';
import configureStore from './src/store';
import useBootUpI18n from './src/utils/hooks/useBootUpI18n';
// @ts-ignore: non-ts file
import { useFirestoreListener, updateUserLanguage } from './src/services/Firestore';
// @ts-ignore: non-ts file
import useFontLoader from './src/utils/hooks/useFontLoader';
import handleMessaging from './src/utils/RemoteMessagingHandler';
import useDeepLinking from './src/utils/hooks/useDeepLinking';
import navigateToDeepLink from './src/utils/navigateToDeepLink';
import { translate, getLocale } from './src/utils/localization';
import Smartlook from 'smartlook-react-native-wrapper';
import crashlytics from '@react-native-firebase/crashlytics';
import useOnScreenChange from './src/utils/hooks/useOnScreenChange';

const Stack = createStackNavigator<RootStackParamList>();
// const Stack = createStackNavigator();
const store = configureStore();
const theme = DefaultTheme; //Appearance.getColorScheme() === 'dark' ? DarkTheme : DefaultTheme;

export default function App() {
  const userToken = useAuth();
  const i18nReady = useBootUpI18n();
  const deepLink = useDeepLinking();
  const navigatorRef: RefObject<NavigationContainerRef> = useRef(null);
  useOnScreenChange(navigatorRef, ({ oldScreen, newScreen }) => {
    if (Platform.OS !== 'web') {
      if (oldScreen) {
        Smartlook.trackNavigationEvent(oldScreen, Smartlook.ViewState.Exit);
      }
      Smartlook.trackNavigationEvent(newScreen, Smartlook.ViewState.Enter);
    }
  });
  const [navigatorReady, setNavigatorReady] = useState(false);
  useEffect(() => {
    if (navigatorReady && navigatorRef.current && deepLink) {
      navigateToDeepLink(deepLink, navigatorRef.current);
    }
  }, [deepLink, navigatorReady]);
  if (userToken) {
    store.dispatch({ type: 'user/setAuth', payload: userToken });
  }
  const userData = useFirestoreListener('users', userToken?.uid ?? null);
  if (userData) {
    store.dispatch({ type: 'user/setUser', payload: userData });
  }
  useEffect(() => {
    if (userToken && Platform.OS !== 'web') {
      Smartlook.setUserIdentifier(userToken.uid);
      crashlytics().log('User authenticated.');
      crashlytics().setUserId(userToken.uid);
    }
  }, [userToken]);

  // while not ready
  const isWaitingForAuth = userToken === undefined; // waiting for auth response
  const isNotAuthed = userToken === null; // auth response with no-authed
  const isAuthed = !isWaitingForAuth && !isNotAuthed;
  const [fontsLoaded] = useFontLoader();

  useEffect(() => {
    if (isAuthed && i18nReady) {
      updateUserLanguage(getLocale());
    }
  }, [i18nReady, isAuthed]);

  if (isWaitingForAuth || (isAuthed && !userData) || !fontsLoaded || !i18nReady || deepLink === undefined) {
    return <LoadingScreen />;
  }

  handleMessaging();

  //Go to main as initial route, it should be at the top of the stack. Then check there if it's needed to navigate to Tutorial
  const protectedInitialRouteName = 'Main';
  const headerBackground = () => <View style={{ height: 64 }} />;
  return (
    <Provider store={store}>
      <PaperProvider theme={theme as PaperTheme}>
        <SafeAreaProvider>
          <NavigationContainer
            theme={theme as NavTheme}
            onReady={() => {
              setNavigatorReady(true);
            }}
            ref={navigatorRef}
          >
            <Stack.Navigator
              initialRouteName={userToken ? protectedInitialRouteName : 'Login'}
              mode="modal"
              headerMode="float"
              screenOptions={{
                headerTintColor: Color(theme.colors.dark).darken(0.3).toString(),
                headerTransparent: true,
                headerBackground,
              }}
            >
              {userToken ? (
                <>
                  <Stack.Screen name="Main" component={MainComponent} options={{ headerShown: false }} />
                  <Stack.Screen name="Tutorial" component={WelcomeWizardScreen} options={{ headerShown: false }} />
                  <Stack.Screen
                    name="StressRate"
                    component={StressRateScreen}
                    options={{ headerShown: true, title: translate('screens.StressRate.headerTitle') }}
                  />
                  <Stack.Screen
                    name="StressTrigger"
                    component={StressTriggerScreen}
                    options={{ headerShown: true, title: translate('screens.StressTrigger.headerTitle') }}
                  />
                  <Stack.Screen
                    name="StressActivityType"
                    component={StressActivityTypeScreen}
                    options={{ title: translate('screens.StressActivityType.headerTitle') }}
                  />
                  <Stack.Screen
                    name="StressActivityToDo"
                    component={StressActivityToDoScreen}
                    options={{ title: '' }}
                  />
                  <Stack.Screen
                    name="Activity"
                    component={ActivityScreen}
                    options={{ title: translate('screens.Activity.headerTitle') }}
                  />
                  <Stack.Screen name="KitActivation" component={KitActivationScreen} options={{ title: '' }} />
                  <Stack.Screen
                    name="AboutVR"
                    component={AboutVRScreen}
                    options={{ title: translate('screens.AboutVR.headerTitle') }}
                  />
                  <Stack.Screen name="VRMet" component={VRMetScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Support" component={SupportScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="PathEnding" component={PathEndingScreen} options={{ title: '' }} />
                  <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: '' }} />
                  <Stack.Screen
                    name="Statistics"
                    component={StatisticsScreen}
                    options={{ title: translate('screens.Statistics.headerTitle') }}
                  />
                  <Stack.Screen name="ContentsShelf" component={ContentsShelfScreen} options={{ title: '' }} />
                  <Stack.Screen
                    name="KitAssemble"
                    component={KitAssembleScreen}
                    options={{ title: translate('screens.KitAssemble.headerTitle') }}
                  />
                  <Stack.Screen name="Library" component={LibraryScreen} options={{ title: '' }} />
                  <Stack.Screen
                    name="HowItWorks"
                    component={HowItWorksScreen}
                    options={{ title: translate('screens.HowItWorks.headerTitle') }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, title: '' }} />
                  <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: '' }} />
                  <Stack.Screen name="ThemeInspector" component={ThemeInspector} />
                </>
              )}
              <Stack.Screen
                name="Modal"
                component={ModalScreen}
                options={{
                  headerShown: false,
                  cardStyle: { backgroundColor: 'transparent' },
                  cardOverlayEnabled: true,
                  cardStyleInterpolator: ({ current: { progress } }) => ({
                    cardStyle: {
                      opacity: progress.interpolate({
                        inputRange: [0, 0.5, 0.9, 1],
                        outputRange: [0, 0.25, 0.7, 1],
                      }),
                    },
                    overlayStyle: {
                      opacity: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0.5],
                        extrapolate: 'clamp',
                      }),
                    },
                  }),
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
