import React, { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { Provider as PaperProvider, DarkTheme, DefaultTheme } from 'react-native-paper';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider } from '@ui-kitten/components';
import configureStore from './src/store';
import HomeScreen from './src/screens/Home';
import RegistrationScreen from './src/screens/Register';
import LoginScreen from './src/screens/Login';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();
// const Stack = createStackNavigator();
const store = configureStore();
const theme = Appearance.getColorScheme() === 'dark' ? DarkTheme : DefaultTheme;

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // setInitializing(false);
    const unsubscribe = auth().onAuthStateChanged(async authCredentials => {
      console.log('update user', authCredentials);
      setUserToken(authCredentials);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={userToken ? "Home" : "Login"}>
            {userToken ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Registration" component={RegistrationScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
