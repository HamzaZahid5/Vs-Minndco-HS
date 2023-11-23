import React, { useReducer, useEffect } from 'react'
import { FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { USER_SUPPORT_PROFILE } from '../../store/selectors'
import { initialState, reducer, messageType } from './storage'
import { CompositeNavigationProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import ChatItem, { chatOptionType } from './ChatItem'
import useLifesaverActions from './useLifesaverActions'
import { ActivityIndicator } from 'react-native-paper'
import { DrawerParamList } from '../DrawerNavigator'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabsParamList } from '../TabsNavigator'
import useDoNotBackHere from '../../utils/hooks/useDoNotBackHere'

type InternalNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'DrawerHome'>,
  BottomTabNavigationProp<TabsParamList, 'Lifesaver'>
>
type LifesaverScreenNavigationProp = CompositeNavigationProp<
  InternalNavigationProp,
  StackNavigationProp<RootStackParamList, 'Home'>
>

const Lifesaver = ({ navigation }: { navigation: LifesaverScreenNavigationProp }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { display_name } = useSelector(USER_SUPPORT_PROFILE)
  const actions = useLifesaverActions(dispatch)
  const noWayBackNavigate = useDoNotBackHere('Home')
  const reduxDispatch = useDispatch()
  // BOOT UP CHAT
  useEffect(() => {
    const unsubsFocus = navigation.addListener('focus', () => {
      // @todo trigger this conditionally only if it's needed
      reduxDispatch({ type: 'flags/showLifeSaverHelper', payload: false })

      actions.sayWelcome()
    })
    const unsubsBlur = navigation.addListener('blur', () => {
      dispatch({ type: 'RESET_STATE', payload: null })
    })

    return () => {
      unsubsFocus()
      unsubsBlur()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch({ type: 'SET_USER_NAME', payload: display_name })
  }, [display_name])

  return (
    <FlatList
      data={state.chatHistory}
      renderItem={({ item }: { item: messageType }) => {
        const onSelectOption = item.options
          ? (option: chatOptionType) => {
              if (option.action.indexOf('GO_TO_ACTIVITY') === 0) {
                noWayBackNavigate('Playground', {
                  only: state.userPlace,
                  company: state.userCompany || 'alone',
                  place: state.userPlace || 'other_place',
                  urge: state.userUrge || 'manageable',
                })
              } else {
                actions.handleUserAnswer(option.action, option.label, option.id)
              }
            }
          : undefined
        return <ChatItem user={item.user} text={item.text} options={item.options} onSelectOption={onSelectOption} />
      }}
      keyExtractor={item => item.id}
      inverted
      ListHeaderComponent={() => (state.isThinking ? <ActivityIndicator animating size={30} color="gray" /> : null)}
    />
  )
}

export default Lifesaver
