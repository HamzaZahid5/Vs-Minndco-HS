/**
 * Helper to redirect when user gets back into a screen.
 * This hook flags the screen on focus and return a helper to call instead of navigation.navigate().
 * On the helper, you can indicate what screen should redirect on next focus and it's parameters.
 * That way we can show Lifesaver, navigate to Playground and then, when user goes back we can redirect to Home instead of display Lifesaver again.
 *
 * Example:
 * const NoWayBackNavigate = useDoNotBackHere('Home')
 * ..
 * // replace navigation.navigate by NoWayBackNavigate
 * NoWayBackNavigate('Playground', { trigger: state.userTrigger, urge: state.userUrge })
 */
import { useEffect, useRef } from 'react'
import { RootStackParamList } from '../../../types'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

const useDoNotBackHere = (
  whereThen: keyof RootStackParamList,
  whereProps?: RootStackParamList[keyof RootStackParamList],
) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const active = useRef(false)
  useEffect(() => {
    const unsubsFocus = navigation.addListener('focus', () => {
      if (active.current === true) {
        navigation.navigate(whereThen, whereProps)
        active.current = false
      }
    })
    return () => {
      unsubsFocus()
    }
  }, [whereThen, whereProps, navigation])
  return (route: keyof RootStackParamList, props: RootStackParamList[keyof RootStackParamList]) => {
    active.current = true
    navigation.navigate(route, props)
  }
}

export default useDoNotBackHere
