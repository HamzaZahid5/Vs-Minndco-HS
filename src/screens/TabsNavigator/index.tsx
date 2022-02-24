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

const Tab = createBottomTabNavigator()

const Notifications = () => (
  <View>
    <Text>Notifications</Text>
  </View>
)
const Profile = () => (
  <View>
    <Text>Profile</Text>
  </View>
)
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
          marginTop: Platform.OS === 'ios' ? 10 : 0,
        },
        tabBarStyle: {
          flex: 1,
          maxHeight: Platform.OS === 'ios' ? 80 : 70,
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
        name="Playground"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, focused }) => (
            <Icon
              name="Box"
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
