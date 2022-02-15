import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, View } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import HomeScreen from '../Home'
import { useRobTheme } from '@mindcoxr/rob'
import { DefaultScreenPropType } from '../../../types'
import { useSelector } from 'react-redux'
import { ONBOARDING_COMPLETE } from '../../store/selectors'

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
function MainTabs({ navigation }: DefaultScreenPropType<'Main'>) {
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
        headerTransparent: true,
        headerShown: false,
        tabBarIconStyle: {
          marginTop: 10,
        },
        tabBarStyle: {
          flex: 1,
          maxHeight: 80,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign
              name="home"
              color={focused ? theme.colors.primaryPalette['500'] : theme.colors.monochrome.line}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Program"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, focused }) => (
            <SimpleLineIcons
              name="notebook"
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
            <AntDesign
              name="plus"
              color={focused ? theme.colors.primaryPalette['500'] : theme.colors.monochrome.line}
              size={30}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault()
            alert('open modal')
            // navigation.navigate("chat")
          },
        })}
      />
      <Tab.Screen
        name="Messages"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, focused }) => (
            <SimpleLineIcons
              name="bubble"
              color={focused ? theme.colors.primaryPalette['500'] : theme.colors.monochrome.line}
              size={22}
            />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Playground"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, focused }) => (
            <SimpleLineIcons
              name="support"
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
