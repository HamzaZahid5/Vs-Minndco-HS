import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform, Text, View } from 'react-native'
import HomeScreen from '../Home'
import { useRobTheme, Icon } from '@mindcoxr/rob'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import { ONBOARDING_COMPLETE } from '../../store/selectors'
import ProgramScreen from '../Program'
import SupportScreen from '../Support'
import LifesaverScreen from '../Lifesaver'

export type TabsParamList = {
  Home: undefined
  Program: undefined
  SmokeRecord: undefined
  Messages: undefined
  Lifesaver: undefined
}

export const tabMarginTop = Platform.OS === 'ios' ? 10 : 0
export const tabHeight = Platform.OS === 'ios' ? 80 : 70

const Tab = createBottomTabNavigator<TabsParamList>()

const Notifications = () => {
  return (
    <View>
      <Text>Notifications</Text>
    </View>
  )
}

function MainTabs({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) {
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const onboardingComplete = useSelector(ONBOARDING_COMPLETE)
  useEffect(() => {
    if (onboardingComplete === false) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Onboarding',
          },
        ],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onboardingComplete])
  const theme = useRobTheme()
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        lazy: false,
        headerTransparent: true,
        headerShown: false,
        tabBarIconStyle: {
          marginTop: tabMarginTop,
        },
        tabBarStyle: {
          flex: 1,
          maxHeight: tabHeight,
          backgroundColor: 'white',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="Home"
              color={focused ? theme.colors.primaryPalette['500'] : theme.colors.monochrome.line}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Program"
        component={ProgramScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, focused }) => (
            <Icon
              name="Paste"
              color={focused ? theme.colors.primaryPalette['500'] : theme.colors.monochrome.line}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SmokeRecord"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, focused }) => (
            <Icon
              name="Plus"
              color={focused ? theme.colors.primaryPalette['500'] : theme.colors.monochrome.line}
              size={30}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault()
            // alert('open modal')
            navigation.navigate('SmokeModal')
            // navigation.push('SmokeModal')
          },
        })}
      />
      <Tab.Screen
        name="Messages"
        component={SupportScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, focused }) => (
            <Icon
              name="Comment"
              color={focused ? theme.colors.primaryPalette['500'] : theme.colors.monochrome.line}
              size={22}
            />
          ),
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: theme.colors.danger.dark },
        }}
      />
      <Tab.Screen
        name="Lifesaver"
        component={LifesaverScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, focused }) => (
            <Icon
              name="Help"
              color={focused ? theme.colors.primaryPalette['500'] : theme.colors.monochrome.line}
              size={22}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabs
