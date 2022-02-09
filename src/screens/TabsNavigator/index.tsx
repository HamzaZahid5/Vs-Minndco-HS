import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, View } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import HomeScreen from '../Home'
import { useRobTheme } from '@mindcoxr/rob'

const Tab = createBottomTabNavigator()
const Feed = () => (
  <View>
    <Text>Feed</Text>
  </View>
)
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
function MainTabs() {
  const theme = useRobTheme()
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTransparent: true,
        headerShown: false,
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarStyle: {
          height: 52,
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
            <AntDesign
              name="codepen"
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
