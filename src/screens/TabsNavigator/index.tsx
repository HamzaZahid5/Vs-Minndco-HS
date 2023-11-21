import React, { useEffect, useRef, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform, Text, View, Image } from 'react-native'
import HomeScreen from '../Home'
import { useRobTheme, Icon } from '@mindcoxr/rob'
import { useSelector } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import { ONBOARDING_COMPLETE, USER_SUPPORT_PROFILE, FLAGS } from '../../store/selectors'
import ProgramScreen from '../Program'
import SupportScreen from '../Support'
import LifesaverScreen from '../Lifesaver'
import TargetIndicator from '../../components/TargetIndicator'
import { translate } from '../../utils/localization'

export type TabsParamList = {
  Home: undefined
  Program: undefined
  SmokeRecord: undefined
  Messages: undefined
  Lifesaver: undefined
}

export const tabMarginTop = Platform.OS === 'ios' ? 5 : 5
export const tabHeight = Platform.OS === 'ios' ? 90 : 75

const Tab = createBottomTabNavigator<TabsParamList>()

const Notifications = () => {
  return (
    <View>
      <Text>Notifications</Text>
    </View>
  )
}

function MainTabs({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) {
  const [screenFocused, setFocused] = useState<string>('Home')
  const { has_coach_messages } = useSelector(USER_SUPPORT_PROFILE)
  const onboardingComplete = useSelector(ONBOARDING_COMPLETE)
  const { showJournalCTAHelper, showChatCTAHelper, showLifeSaverCTAHelper } = useSelector(FLAGS)

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
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarIconStyle: {
          marginTop: tabMarginTop,
        },
        tabBarStyle: {
          flex: 1,
          padding: 'auto',
          maxHeight: tabHeight,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
      screenListeners={{
        focus: e => setFocused(e.target!.split('-')[0]),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                flex: 1,
                justifyContent: Platform.OS === 'ios' ? 'center' : 'center',
                alignItems: 'center',
                margin: 8,
                marginTop: Platform.OS === 'ios' ? 20 : undefined,
                marginHorizontal: 5,
              }}
            >
              <TargetIndicator>
                <Image
                  source={require('../../../assets/images/train.png')}
                  style={{ width: 22, height: 22, tintColor: focused ? theme.colors.primaryPalette['500'] : '#CCCCCC' }}
                />
                <Text
                  style={{
                    color: focused ? theme.colors.primaryPalette['500'] : '#CCCCCC',
                    fontSize: 14,
                    textAlign: 'center',
                    marginTop: 5,
                  }}
                >
                  {translate('commons.buttons.training', { defaultValue: 'Training' })}
                </Text>
              </TargetIndicator>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Program"
        component={ProgramScreen}
        options={{
          tabBarLabel: '',
          unmountOnBlur: true,
          lazy: true,
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                flex: 1,
                justifyContent: Platform.OS === 'ios' ? 'center' : 'center',
                alignItems: 'center',
                margin: 10,
                marginTop: Platform.OS === 'ios' ? 20 : undefined,
                marginHorizontal: 5,
              }}
            >
              <TargetIndicator>
                <Image
                  source={require('../../../assets/images/dashboard.png')}
                  style={{ width: 22, height: 22, tintColor: focused ? theme.colors.primaryPalette['500'] : '#CCCCCC' }}
                />
                <Text
                  style={{
                    color: focused ? theme.colors.primaryPalette['500'] : '#CCCCCC',
                    fontSize: 14,
                    textAlign: 'center',
                    marginTop: 5,
                  }}
                >
                  {translate('commons.buttons.dashboard', { defaultValue: 'Dashboard' })}
                </Text>
              </TargetIndicator>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SmokeRecord"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                flex: 1,
                justifyContent: Platform.OS === 'ios' ? 'center' : 'center',
                alignItems: 'center',
                margin: 10,
                marginTop: Platform.OS === 'ios' ? 20 : undefined,
                marginHorizontal: 5,
              }}
            >
              <TargetIndicator round show={showJournalCTAHelper && screenFocused === 'Home'}>
                <Image
                  source={require('../../../assets/images/intake.png')}
                  style={{ width: 22, height: 22, tintColor: focused ? theme.colors.primaryPalette['500'] : '#CCCCCC' }}
                />
                <Text
                  style={{
                    color: focused ? theme.colors.primaryPalette['500'] : '#CCCCCC',
                    fontSize: 14,
                    textAlign: 'center',
                    marginTop: 5,
                  }}
                >
                  {translate('commons.buttons.intake', { defaultValue: 'Intake' })}
                </Text>
              </TargetIndicator>
            </View>
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
          unmountOnBlur: true,
          lazy: true,
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                flex: 1,
                justifyContent: Platform.OS === 'ios' ? 'center' : 'center',
                alignItems: 'center',
                margin: 10,
                marginTop: Platform.OS === 'ios' ? 20 : undefined,
                marginHorizontal: 5,
              }}
            >
              <TargetIndicator round show={showChatCTAHelper && screenFocused === 'Home'}>
                <Image
                  source={require('../../../assets/images/coach.png')}
                  style={{ width: 22, height: 22, tintColor: focused ? theme.colors.primaryPalette['500'] : '#CCCCCC' }}
                />
                <Text
                  style={{
                    color: focused ? theme.colors.primaryPalette['500'] : '#CCCCCC',
                    fontSize: 14,
                    textAlign: 'center',
                    marginTop: 5,
                  }}
                >
                  {translate('commons.buttons.coach', { defaultValue: 'Coach' })}
                </Text>
              </TargetIndicator>
            </View>
          ),
          tabBarBadge: has_coach_messages ? '!' : undefined,
          tabBarBadgeStyle: { backgroundColor: theme.colors.danger.dark },
        }}
      />
      <Tab.Screen
        name="Lifesaver"
        component={LifesaverScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                flex: 1,
                justifyContent: Platform.OS === 'ios' ? 'center' : 'center',
                alignItems: 'center',
                margin: 10,
                marginTop: Platform.OS === 'ios' ? 20 : undefined,
                marginHorizontal: 5,
              }}
            >
              <TargetIndicator round show={showLifeSaverCTAHelper && screenFocused === 'Home'}>
                <Image
                  source={require('../../../assets/images/SOS.png')}
                  style={{ width: 22, height: 22, tintColor: focused ? theme.colors.primaryPalette['500'] : '#CCCCCC' }}
                />
                <Text
                  style={{
                    color: focused ? theme.colors.primaryPalette['500'] : '#CCCCCC',
                    fontSize: 14,
                    textAlign: 'center',
                    marginTop: 5,
                  }}
                >
                  {translate('commons.buttons.sos', { defaultValue: 'SOS' })}
                </Text>
              </TargetIndicator>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabs
