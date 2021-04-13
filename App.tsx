import React, { useEffect, useState } from 'react';
import { Appearance, View, Text, SafeAreaView } from 'react-native';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// @ts-ignore
import { useAuth } from './src/services/Auth';
import { NavigationContainer, Theme as NavTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkTheme, DefaultTheme } from './src/utils/OriginalTheme';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider } from '@ui-kitten/components';
import configureStore from './src/store';

import HomeScreen from './src/screens/Home';
import RegistrationScreen from './src/screens/Register';
import LoginScreen from './src/screens/Login';
// @ts-ignore
import StressRateScreen from './src/screens/StressRate';
// @ts-ignore
import StressActivityScreen from './src/screens/StressActivity';
// @ts-ignore
import StressActivityTypeScreen from './src/screens/StressActivityType';
// @ts-ignore
import CustomDrawerContent from './src/screens/Home/CustomDrawerContent';
// @ts-ignore
import ActivityScreen from './src/screens/ActivityScreen';
// @ts-ignore
import ModalScreen from './src/screens/ModalScreen';
// @ts-ignore
import WelcomeWizardScreen from './src/screens/WelcomeWizard';
// @ts-ignore
import KitActivationScreen from './src/screens/KitActivation';
// @ts-ignore
import { useFirestoreListener } from './src/services/Firestore';

import ThemeInspector from './src/utils/ThemeInspector';
import { RootStackParamList } from './types';


const Stack = createStackNavigator<RootStackParamList>();
// const Stack = createStackNavigator();
const store = configureStore();
const theme = DefaultTheme; //Appearance.getColorScheme() === 'dark' ? DarkTheme : DefaultTheme;
const Drawer = createDrawerNavigator();
// @ts-ignore
const customDrawerContent = props => (
  <CustomDrawerContent {...props} />
);

const MainComponent = () => (
  <Drawer.Navigator
    // openByDefault
    drawerContent={customDrawerContent}
    drawerStyle={{
      width: 80,
    }}
  >
    <Drawer.Screen name="Home" component={HomeScreen}   options={{ headerShown: false }} />
  </Drawer.Navigator>
);

export default function App() {
  const [ready, setReady] = useState(false);
  const userToken = useAuth();
  if (userToken) {
    store.dispatch({ type: 'user/setAuth', payload: userToken });
  }
  
  const userData = useFirestoreListener('users', userToken?.uid ?? null);
  if (userData) {
    store.dispatch({ type: 'user/setUser', payload: userData });
  }
  // console.log(store.getState().user.data);
  
  // while not ready
  console.log(userToken, userData);
  if (userToken === undefined || userData === undefined) {
    return <View><Text>Loading...</Text></View>;
  }
  
  // overwrite Home if show_basic_tutorial
  const protectedRouteName = userData?.flags?.show_basics_tutorial ? "Tutorial" : "Home";
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer theme={theme as NavTheme}>
            <Stack.Navigator
              initialRouteName={userToken ? protectedRouteName : "Login"}
              mode="modal"
              headerMode="float"
              screenOptions={{
                headerTransparent: true,
                headerBackground: () => (
                  <View style={{ height: 64 }} />
                )
              }}
            >
              {userToken ? (
                <>
                  <Stack.Screen name="Main" component={MainComponent}   options={{ headerShown: false }} />
                  <Stack.Screen name="Tutorial" component={WelcomeWizardScreen}   options={{ headerShown: false }} />
                  <Stack.Screen name="StressRate" component={StressRateScreen} options={{ headerShown: true, title: 'Rate your current stress' }} />
                  <Stack.Screen name="StressActivity" component={StressActivityScreen}   options={{ headerShown: true, title: 'What you were doing?' }} />
                  <Stack.Screen name="StressActivityType" component={StressActivityTypeScreen} options={{ title: 'Choose your preference' }} />
                  <Stack.Screen name="Activity" component={ActivityScreen} options={{ title: 'Next activity' }} />
                  <Stack.Screen name="KitActivation" component={KitActivationScreen} options={{ title: '' }} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
                  <Stack.Screen name="Registration" component={RegistrationScreen} />
                  <Stack.Screen name="ThemeInspector" component={ThemeInspector} />
                </>
              )}
              <Stack.Screen name="Modal" component={ModalScreen} options={{ headerShown: false, cardStyle: { backgroundColor: 'transparent' } }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
