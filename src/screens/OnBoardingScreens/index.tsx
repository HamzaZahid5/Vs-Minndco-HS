import React, { useState, useRef, RefObject, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import Screen1 from './Screen1'
import Screen2 from './Screen2'
import Screen3 from './Screen3'
import Screen4 from './Screen4'
import { useDispatch, useSelector } from 'react-redux'
import { IS_PREMIUM, ONBOARDING_COMPLETE, ONBOARDING_CURRENT_INPUT } from '../../store/selectors'
import { DefaultScreenPropType as RootScreenPropTyle } from '../../../types'

export type OnboardingScreensType = {
  Screen1: undefined
  Screen2: undefined
  Screen3: undefined
  Screen4: undefined
}

export interface DefaultScreenPropType<Type extends keyof OnboardingScreensType> {
  navigation: StackNavigationProp<OnboardingScreensType, Type>
  onNext: (navigation: StackNavigationProp<OnboardingScreensType, Type>, n?: number) => void
  defaultValue?: number
}

const Stack = createStackNavigator<OnboardingScreensType>()

export default function OnboardingContainer({ navigation: rootNavigation }: RootScreenPropTyle<'Onboarding'>) {
  const dispatch = useDispatch()
  const currentInput = useSelector(ONBOARDING_CURRENT_INPUT)
  const onboardingComplete = useSelector(ONBOARDING_COMPLETE)
  // const isPremium = useSelector(IS_PREMIUM)

  useEffect(() => {
    if (onboardingComplete === true) {
      rootNavigation.reset({
        index: 0,
        // routes: isPremium ? [{ name: 'Main' }] : [{ name: 'Main' }, { name: 'KitActivationLanding' }],
        routes: [{ name: 'Main' }],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onboardingComplete])
  return (
    <Stack.Navigator initialRouteName="Screen1">
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Screen1" options={{ headerShown: false }}>
          {props => <Screen1 {...props} onNext={navigation => navigation.navigate('Screen2')} />}
        </Stack.Screen>
        <Stack.Screen name="Screen2" options={{ headerShown: false }}>
          {props => (
            <Screen2
              {...props}
              defaultValue={currentInput.how_much_smoke}
              onNext={(navigation, n) => {
                if (n === undefined) return
                if (n !== undefined && n <= 0) return
                dispatch({ type: 'currentOnboarding/setHowMuchSmoke', payload: n })
                navigation.navigate('Screen3')
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Screen3" options={{ headerShown: false }}>
          {props => (
            <Screen3
              {...props}
              defaultValue={currentInput.how_much_pay}
              onNext={(navigation, n) => {
                if (n === undefined) return
                if (n !== undefined && n <= 0) return
                dispatch({ type: 'currentOnboarding/setHowMuchPay', payload: n })
                navigation.navigate('Screen4')
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Screen4" options={{ headerShown: false }}>
          {props => (
            <Screen4
              {...props}
              defaultValue={currentInput.what_sentence}
              onNext={(navigation, n) => {
                if (n === undefined) return
                if (n && n < 0) return
                dispatch({ type: 'user/onBoardingComplete' })
                dispatch({ type: 'currentOnboarding/setWhatSentence', payload: n })
                dispatch({ type: 'currentOnboarding/finishOnboarding' })
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  )
}
