import React from 'react'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import NavigationHeader from '../../components/NavigationHeader'
import { translate } from '../../utils/localization'
import ProfileScreen from '../Profile'
import { ValidationPhone as ValidationPhoneScreen } from '../ValidationPhone'
import { ValidationPhoneCode as ValidationPhoneCodeScreen } from '../ValidationPhoneCode'
import QuitDayModal from '../QuitDayScreen'

const Stack = createStackNavigator<RootStackParamList>()

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        header: (props: StackHeaderProps) => (
          <NavigationHeader
            {...props}
            contentAtBottom
            color="#14142b"
            backgroundColor="#F7F7FC"
            routeName={translate('screens.profile.title')}
          />
        ),
        headerTransparent: false,
        headerStyle: { backgroundColor: '#F7F7FC' },
      }}
    >
      <Stack.Screen
        key="ProfileUser"
        name="ProfileUser"
        component={ProfileScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        key="ValidationPhone"
        name="ValidationPhone"
        component={ValidationPhoneScreen}
        options={{
          headerShown: true,
          header: (props: StackHeaderProps) => (
            <NavigationHeader
              {...props}
              contentAtBottom
              color="#14142b"
              backgroundColor="#F7F7FC"
              routeName={translate('screens.Profile.validationPhoneTitle')}
            />
          ),
        }}
      />
      <Stack.Screen
        key="ValidationPhoneCodeScreen"
        name="ValidationPhoneCodeScreen"
        component={ValidationPhoneCodeScreen}
        options={{
          headerShown: true,
          header: (props: StackHeaderProps) => (
            <NavigationHeader
              {...props}
              contentAtBottom
              color="#14142b"
              backgroundColor="#F7F7FC"
              routeName={translate('screens.Profile.validationCodeTitle')}
            />
          ),
        }}
      />
      <Stack.Screen
        key="QuitDayModalProfile"
        name="QuitDayModalProfile"
        component={QuitDayModal}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          presentation: 'transparentModal',
        }}
      />
    </Stack.Navigator>
  )
}

export default ProfileNavigator
