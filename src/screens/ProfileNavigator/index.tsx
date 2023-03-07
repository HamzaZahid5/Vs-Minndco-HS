import React from 'react'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'
import { View } from 'react-native'
import { RootStackParamList } from '../../../types'
import NavigationHeader from '../../components/NavigationHeader'
import { translate } from '../../utils/localization'
import ProfileScreen from '../Profile'
import QuitDayModal from '../QuitDayScreen'

const Stack = createStackNavigator<RootStackParamList>()
// const headerBackground = () => <View style={{ height: 64 }} />

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
