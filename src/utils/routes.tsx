import React from 'react'
import { View } from 'react-native'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../types'
import { BackButton } from './hooks/useSetDefaultBackOnPress'
import { translate } from './localization'

// screens
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
import BasicModalScreen from '../screens/BasicModalScreen'
import LifesaverActivityScreen from '../screens/Lifesaver/LifesaverActivity'
import KitWelcome from '../screens/KitWelcomeScreen'
import KitActivation from '../screens/KitActivation'
import KitPresentation from '../screens/KitPresentation'
import NavigationHeader from '../components/NavigationHeader'
import LoginCode from '../screens/LoginCode'
import KitActivationLanding from '../screens/KitActivationLanding'
import ProfileNavigator from '../screens/ProfileNavigator'
import UpdateAppScreen from '../screens/UpdateApp'
import { LoginPhone } from '../screens/RegistrationPhone/LoginPhone'
import { ValidationLoginPhone } from '../screens/RegistrationPhone/ValidationLoginPhone'
import { ValidationLoginEmail } from '../screens/RegistrationPhone/ValidationLoginEmail'
import SupportRegister from '../screens/RegistrationPhone/SupportRegister'
import { LoginEmail as LoginEmailScreen } from '../screens/RegistrationPhone/LoginEmail'

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
          routeName={translate('screens.KitWelcome.welcome')}
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
  <Stack.Screen key="Profile" name="Profile" component={ProfileNavigator} options={{ headerShown: false }} />,
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
      headerTransparent: true,
      headerBackground,
    }}
  />,
  <Stack.Screen
    key="LoginPhone"
    name="LoginPhone"
    component={LoginPhone}
    options={{
      headerShown: false,
      headerTransparent: true,
      headerBackground,
    }}
  />,
  <Stack.Screen
    key="SupportRegister"
    name="SupportRegister"
    component={SupportRegister}
    options={{
      headerShown: true,
      header: (props: StackHeaderProps) => (
        <NavigationHeader
          {...props}
          contentAtBottom
          color="#14142b"
          backgroundColor="#F7F7FC"
          routeName={translate('screens.profile.supportActionLabel')}
        />
      ),
    }}
  />,
  <Stack.Screen
    key="ValidationLoginPhone"
    name="ValidationLoginPhone"
    component={ValidationLoginPhone}
    options={{
      headerShown: false,
      headerTransparent: true,
      headerBackground,
    }}
  />,
  <Stack.Screen
    key="ValidationLoginEmail"
    name="ValidationLoginEmail"
    component={ValidationLoginEmail}
    options={{
      headerShown: false,
      headerTransparent: true,
      headerBackground,
    }}
  />,
  <Stack.Screen
    key="LoginEmail"
    name="LoginEmail"
    component={LoginEmailScreen}
    options={{
      headerShown: false,
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
      headerTransparent: true,
      headerBackground,
      headerLeft: ({ onPress: defaultOnPress, ...props }) => <BackButton onPress={defaultOnPress} {...props} />,
    }}
  />,
  <Stack.Screen
    key="Login"
    name="Login"
    component={LoginScreen}
    options={{
      headerShown: false,
      headerTransparent: true,
      headerBackground,
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
      headerTransparent: true,
      headerBackground,
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
    key="UpdateApp"
    name="UpdateApp"
    component={UpdateAppScreen}
    options={{
      headerShown: false,
      cardStyle: { backgroundColor: 'white' },
      presentation: 'transparentModal',
    }}
  />,
  <Stack.Screen
    key="AuthByToken"
    name="AuthByToken"
    component={AuthByTokenScreen}
    options={{
      headerShown: false,
      headerTransparent: true,
      headerBackground,
    }}
  />,
]
