import React from "react";
import { Appearance } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from 'react-redux';
import { Provider as PaperProvider, DarkTheme, DefaultTheme } from 'react-native-paper';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider } from '@ui-kitten/components';
import configureStore from './src/store';
import HomeScreen from "./src/screens/Home";
import RegistrationScreen from "./src/screens/Register";
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();
// const Stack = createStackNavigator();
const store = configureStore();
const theme = Appearance.getColorScheme() === 'dark' ? DarkTheme : DefaultTheme;

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
