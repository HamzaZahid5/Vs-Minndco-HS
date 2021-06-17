import React, { useEffect, useState } from 'react';
import { Appearance, View, Text, SafeAreaView } from 'react-native';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// @ts-ignore: non-ts file
import { useAuth, auth } from './src/services/Auth';
import { NavigationContainer, Theme as NavTheme } from '@react-navigation/native';
import { Theme as PaperTheme } from 'react-native-paper/src/types';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkTheme, DefaultTheme } from './src/utils/OriginalTheme';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider } from '@ui-kitten/components';
import configureStore from './src/store';
// @ts-ignore: non-ts file
import { useFirestoreListener } from './src/services/Firestore';

import RegistrationScreen from './src/screens/Register';
import LoginScreen from './src/screens/Login';
import LibraryScreen from './src/screens/Library';
import ContentsShelfScreen from './src/screens/ContentsShelf';
// @ts-ignore: non-ts file
import StressRateScreen from './src/screens/StressRate';
// @ts-ignore: non-ts file
import StressTriggerScreen from './src/screens/StressTrigger';
// @ts-ignore: non-ts file
import StressActivityTypeScreen from './src/screens/StressActivityType';
// @ts-ignore: non-ts file
import StressActivityToDoScreen from './src/screens/StressActivityScreen';
// @ts-ignore: non-ts file
import ActivityScreen from './src/screens/ActivityScreen';
// @ts-ignore: non-ts file
import ModalScreen from './src/screens/ModalScreen';
// @ts-ignore: non-ts file
import WelcomeWizardScreen from './src/screens/WelcomeWizard';
// @ts-ignore: non-ts file
import KitActivationScreen from './src/screens/KitActivation';
// @ts-ignore: non-ts file
import AboutVRScreen from './src/screens/AboutVR';
// @ts-ignore: non-ts file
import VRMetScreen from './src/screens/VRMet';
// @ts-ignore: non-ts file
import SupportScreen from './src/screens/Support';
// @ts-ignore: non-ts file
import PathEndingScreen from './src/screens/PathEnding';
// @ts-ignore: non-ts file
import ProfileScreen from './src/screens/Profile';
// @ts-ignore: non-ts file
import StatisticsScreen from './src/screens/Statistics';
// @ts-ignore: non-ts file
import HowItWorksScreen from './src/screens/HowItWorks';
// @ts-ignore: non-ts file
import MainComponent from './src/screens/Home/DrawerNavigator';
// @ts-ignore: non-ts file
import KitAssembleScreen from './src/screens/KitAssemble';
// @ts-ignore: non-ts file
import useFontLoader from './src/utils/hooks/useFontLoader';

import ThemeInspector from './src/utils/ThemeInspector';
import { RootStackParamList } from './types';
import Color from 'color';

const Stack = createStackNavigator<RootStackParamList>();
// const Stack = createStackNavigator();
const store = configureStore();
const theme = DefaultTheme; //Appearance.getColorScheme() === 'dark' ? DarkTheme : DefaultTheme;

export default function App() {
  const userToken = useAuth();
  if (userToken) {
    store.dispatch({ type: 'user/setAuth', payload: userToken });
  }

  const userData = useFirestoreListener('users', userToken?.uid ?? null);
  if (userData) {
    store.dispatch({ type: 'user/setUser', payload: userData });
  }

  // while not ready
  const isWaitingForAuth = userToken === undefined; // waiting for auth response
  const isNotAuthed = userToken === null; // auth response with no-authed
  const isAuthed = !isWaitingForAuth && !isNotAuthed;
  const [fontsLoaded] = useFontLoader();
  if (isWaitingForAuth || (isAuthed && !userData) || !fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // replace Main by Tutorial as initialRoute if show_basic_tutorial
  // eslint-disable-next-line camelcase
  const protectedInitialRouteName = userData?.flags?.show_basics_tutorial ? 'Tutorial' : 'Main';
  const headerBackground = () => <View style={{ height: 64 }} />;
  return (
    <Provider store={store}>
      <PaperProvider theme={theme as PaperTheme}>
        <SafeAreaProvider>
          <NavigationContainer theme={theme as NavTheme}>
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
                    options={{ headerShown: true, title: 'Rate your current stress' }}
                  />
                  <Stack.Screen
                    name="StressTrigger"
                    component={StressTriggerScreen}
                    options={{ headerShown: true, title: 'What you were doing?' }}
                  />
                  <Stack.Screen
                    name="StressActivityType"
                    component={StressActivityTypeScreen}
                    options={{ title: 'Choose your preference' }}
                  />
                  <Stack.Screen
                    name="StressActivityToDo"
                    component={StressActivityToDoScreen}
                    options={{ title: '' }}
                  />
                  <Stack.Screen name="Activity" component={ActivityScreen} options={{ title: 'Next activity' }} />
                  <Stack.Screen name="KitActivation" component={KitActivationScreen} options={{ title: '' }} />
                  <Stack.Screen name="AboutVR" component={AboutVRScreen} options={{ title: 'About VR' }} />
                  <Stack.Screen name="VRMet" component={VRMetScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Support" component={SupportScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="PathEnding" component={PathEndingScreen} options={{ title: '' }} />
                  <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: '' }} />
                  <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ title: 'Your insights' }} />
                  <Stack.Screen name="ContentsShelf" component={ContentsShelfScreen} options={{ title: '' }} />
                  <Stack.Screen
                    name="KitAssemble"
                    component={KitAssembleScreen}
                    options={{ title: 'Assemble your VR Headset' }}
                  />
                  <Stack.Screen name="Library" component={LibraryScreen} options={{ title: '' }} />
                  <Stack.Screen
                    name="HowItWorks"
                    component={HowItWorksScreen}
                    options={{ title: 'How MindCo Relief Works' }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
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
