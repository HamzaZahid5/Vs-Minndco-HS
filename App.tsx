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
// @ts-ignore
import BootUp from './src/utils/BootUp';
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
import ThemeInspector from './src/utils/ThemeInspector';
import { RootStackParamList } from './types';


const Stack = createStackNavigator<RootStackParamList>();
// const Stack = createStackNavigator();
const store = configureStore();
const theme = DefaultTheme; //Appearance.getColorScheme() === 'dark' ? DarkTheme : DefaultTheme;
const Drawer = createDrawerNavigator();

export default function App() {
  const [ready, setReady] = useState(false);
  const userToken = useAuth();
  useEffect(() => {
    if (userToken) {
      store.dispatch({ type: 'user/setAuth', payload: userToken });
    }
  }, [userToken]);

  // while not ready
  if (userToken === undefined) {
    return <View><Text>Loading...</Text></View>;
  } else {
    if (userToken) {
      if (!ready) {
        return (
          <Provider store={store}>
            <BootUp onReady={() => setReady(true)} />
          </Provider>
        );
      }
    } else {
      if (ready) {
        setReady(false);
      }
    }
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer theme={theme as NavTheme}>
            <Stack.Navigator initialRouteName={userToken ? "Home" : "Login"}>
              {userToken ? (
                <>
                  <Stack.Screen name="Home" component={() => (
                    <Drawer.Navigator
                      // openByDefault
                      drawerContent={(props) => <CustomDrawerContent {...props} />}
                      drawerStyle={{
                        width: 80,
                      }}
                    >
                      <Drawer.Screen name="Home" component={HomeScreen}   options={{ headerShown: false }} />
                    </Drawer.Navigator>
                  )
                  }   options={{ headerShown: false }} />
                  <Stack.Screen name="StressRate" component={StressRateScreen}   options={{ headerShown: true, title: 'Rate your current stress' }} />
                  <Stack.Screen name="StressActivity" component={StressActivityScreen}   options={{ headerShown: true, title: 'What you were doing?' }} />
                  <Stack.Screen name="StressActivityType" component={StressActivityTypeScreen} options={{ title: 'Choose your preference' }} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
                  <Stack.Screen name="Registration" component={RegistrationScreen} />
                  <Stack.Screen name="ThemeInspector" component={ThemeInspector} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
