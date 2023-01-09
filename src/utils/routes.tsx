import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../types'
import LandingScreen from '../screens/LandingScreen'
import RegistrationScreen from '../screens/Registration'
import LoginScreen from '../screens/Login'
import AuthByTokenScreen from '../screens/AuthByToken'
import ForgotPasswordScreen from '../screens/ForgotPassword'
import DrawerHomeNavigator from '../screens/DrawerNavigator'
import Playground from '../screens/Playground'
import SmokeRecordScreen from '../screens/SmokeRecordScreen'
import QuitDayModal from '../screens/QuitDayScreen'
import OnBoardingScreens from '../screens/OnBoardingScreens'
import ActivityScreen from '../screens/ActivityScreen'
import VRMet from '../screens/VRMet'
import ProfileScreen from '../screens/Profile'
import BasicModalScreen from '../screens/BasicModalScreen'
import LifesaverActivityScreen from '../screens/Lifesaver/LifesaverActivity'
import KitWelcome from '../screens/KitWelcomeScreen'
import KitActivation from '../screens/KitActivation'
import KitPresentation from '../screens/KitPresentation'
import NavigationHeader from '../components/NavigationHeader'
import React from 'react'
import { View } from 'react-native'
import { BackButton } from './hooks/useSetDefaultBackOnPress'
import LoginCode from '../screens/LoginCode'
import { translate } from './localization'
import KitActivationLanding from '../screens/KitActivationLanding'
import ProfileNavigator from '../screens/ProfileNavigator'

// ReturnType<> doesn't support generics, so it needs to be wrapped
const createStackNavigatorWrapper = () => createStackNavigator<RootStackParamList>()
type StackType = ReturnType<typeof createStackNavigatorWrapper>
const headerBackground = () => <View style={{ height: 64 }} />

export const getPostLoginRoutes = (Stack: StackType) => [
  <Stack.Screen key="Main" name="Main" component={DrawerHomeNavigator} options={{ headerShown: false }} />,
  <Stack.Screen key="Onboarding" name="Onboarding" component={OnBoardingScreens} options={{ headerShown: false }} />,
  <Stack.Screen key="Activity" name="Activity" component={ActivityScreen} options={{ headerShown: true }} />,
  <Stack.Screen
    key="KitWelcome"
    name="KitWelcome"
    component={KitWelcome}
    options={{
      headerShown: true,
      header: (props: StackHeaderProps) => (
        <NavigationHeader
          {...props}
          contentAtBottom
          color="#14142b"
          backgroundColor="#F7F7FC"
          routeName="Welcome"
          height={100}
        />
      ),
      headerTransparent: true,
      headerStyle: { backgroundColor: '#F7F7FC', height: 100 },
    }}
  />,
  <Stack.Screen
    key="KitActivationLanding"
    name="KitActivationLanding"
    component={KitActivationLanding}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    key="KitPresentation"
    name="KitPresentation"
    component={KitPresentation}
    options={{
      headerShown: true,
    }}
  />,
  <Stack.Screen
    key="LifesaverActivity"
    name="LifesaverActivity"
    component={LifesaverActivityScreen}
    options={{ headerShown: true }}
  />,
  <Stack.Screen key="VRMet" name="VRMet" component={VRMet} options={{ headerShown: false }} />,
  // <Stack.Screen
  //   key="Profile"
  //   name="Profile"
  //   component={ProfileScreen}
  //   options={{
  //     headerShown: true,
  //     header: (props: StackHeaderProps) => (
  //       <NavigationHeader
  //         {...props}
  //         contentAtBottom
  //         color="#14142b"
  //         backgroundColor="#F7F7FC"
  //         routeName={translate('screens.Drawer.profile')}
  //       />
  //     ),
  //     headerTransparent: false,
  //     headerStyle: { backgroundColor: '#F7F7FC' },
  //   }}
  // />,
  <Stack.Screen key="Profile" name="Profile" component={ProfileNavigator} options={{ headerShown: true }} />,
  <Stack.Screen
    key="Playground"
    name="Playground"
    component={Playground}
    options={{
      headerShown: true,
      header: (props: StackHeaderProps) => (
        <NavigationHeader
          {...props}
          contentAtBottom
          color="#14142b"
          backgroundColor="#eff0f7"
          routeName="Dojo"
          height={100}
        />
      ),
      headerTransparent: false,
      headerStyle: { backgroundColor: '#eff0f7', height: 100 },
    }}
  />,
  <Stack.Screen
    key="KitActivation"
    name="KitActivation"
    component={KitActivation}
    options={{
      headerShown: false,
      header: (props: StackHeaderProps) => (
        <NavigationHeader
          {...props}
          contentAtBottom
          color="#14142b"
          backgroundColor="#F7F7FC"
          routeName="Activation"
          height={100}
        />
      ),
      headerTransparent: false,
      headerStyle: { backgroundColor: '#F7F7FC', height: 100 },
    }}
  />,
  <Stack.Screen
    key="SmokeModal"
    name="SmokeModal"
    component={SmokeRecordScreen}
    options={{
      headerShown: false,
      cardStyle: { backgroundColor: 'transparent' },
      presentation: 'transparentModal',
    }}
  />,
  <Stack.Screen
    key="QuitDayModal"
    name="QuitDayModal"
    component={QuitDayModal}
    options={{
      headerShown: false,
      cardStyle: { backgroundColor: 'transparent' },
      presentation: 'transparentModal',
    }}
  />,
]

export const getPreLoginRoutes = (Stack: StackType) => [
  <Stack.Screen
    key="Landing"
    name="Landing"
    component={LandingScreen}
    options={{
      headerShown: false,
      // @ts-ignore seems to be bad typed by Navigation
      // headerMode: 'screen',
      // headerTintColor: Color(theme.colors.dark).darken(0.3).toString(),
      headerTransparent: true,
      headerBackground,
    }}
  />,
  <Stack.Screen
    key="Registration"
    name="Registration"
    component={RegistrationScreen}
    options={{
      headerShown: false,
      // @ts-ignore seems to be bad typed by Navigation
      // headerMode: 'screen',
      // headerTintColor: Color(theme.colors.dark).darken(0.3).toString(),
      headerTransparent: true,
      headerBackground,
      // eslint-disable-next-line react/display-name
      headerLeft: ({ onPress: defaultOnPress, ...props }) => <BackButton onPress={defaultOnPress} {...props} />,
    }}
  />,
  <Stack.Screen
    key="Login"
    name="Login"
    component={LoginScreen}
    options={{
      headerShown: false,
      // @ts-ignore seems to be bad typed by Navigation
      // headerMode: 'screen',
      // headerTintColor: Color(theme.colors.dark).darken(0.3).toString(),
      headerTransparent: true,
      headerBackground,
      // eslint-disable-next-line react/display-name
      headerLeft: ({ onPress: defaultOnPress, ...props }) => <BackButton onPress={defaultOnPress} {...props} />,
    }}
  />,
  <Stack.Screen key="LoginCode" name="LoginCode" component={LoginCode} options={{ headerShown: false }} />,
  <Stack.Screen
    key="ForgotPassword"
    name="ForgotPassword"
    component={ForgotPasswordScreen}
    options={{
      headerShown: false,
      // @ts-ignore seems to be bad typed by Navigation
      // headerMode: 'screen',
      // headerTintColor: Color(theme.colors.dark).darken(0.3).toString(),
      headerTransparent: true,
      headerBackground,
      // eslint-disable-next-line react/display-name
      headerLeft: ({ onPress: defaultOnPress, ...props }) => <BackButton onPress={defaultOnPress} {...props} />,
    }}
  />,
]

export const getCommonRoutes = (Stack: StackType) => [
  <Stack.Screen
    key="BasicModal"
    name="BasicModal"
    component={BasicModalScreen}
    options={{
      headerShown: false,
      cardStyle: { backgroundColor: 'transparent' },
      presentation: 'transparentModal',
    }}
  />,
  <Stack.Screen
    key="AuthByToken"
    name="AuthByToken"
    component={AuthByTokenScreen}
    options={{
      headerShown: false,
      // @ts-ignore seems to be bad typed by Navigation
      // headerMode: 'screen',
      // headerTintColor: Color(theme.colors.dark).darken(0.3).toString(),
      headerTransparent: true,
      headerBackground,
    }}
  />,
]
