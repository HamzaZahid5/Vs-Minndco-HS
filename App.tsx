import React, { useEffect, useState } from 'react';
import { Appearance, View, Text } from 'react-native';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// @ts-ignore
import { useAuth } from './src/services/Auth';
import { NavigationContainer, Theme as NavTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { DarkTheme, DefaultTheme } from './src/utils/OriginalTheme';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider } from '@ui-kitten/components';
import configureStore from './src/store';
import HomeScreen from './src/screens/Home';
import RegistrationScreen from './src/screens/Register';
import LoginScreen from './src/screens/Login';
import ThemeInspector from './src/utils/ThemeInspector';
import { RootStackParamList } from './types';


const Stack = createStackNavigator<RootStackParamList>();
// const Stack = createStackNavigator();
const store = configureStore();
const theme = DefaultTheme; //Appearance.getColorScheme() === 'dark' ? DarkTheme : DefaultTheme;

export default function App() {
  const userToken = useAuth();

  // return <View><Text>da app</Text></View>
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme as NavTheme}>
          <Stack.Navigator initialRouteName={userToken ? "Home" : "Login"}>
            {userToken ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen}   options={{ headerShown: false }} />
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
      </PaperProvider>
    </Provider>
  );
}
