import React, { useReducer, useEffect, useRef } from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { USER_SUPPORT_PROFILE } from '../../store/selectors'
import { initialState, reducer, messageType } from './storage'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import ChatItem, { chatOptionType } from './ChatItem'
import useLifesaverActions from './useLifesaverActions'
import { ActivityIndicator } from 'react-native-paper'
import { LIFESAVER_ACTIVITIES, LIFESAVER_AUDIOS, LIFESAVER_READS } from '../../utils/lifesaverActivities'
import { getLocale } from '../../utils/localization'
import { LifesaverAudioType, LifesaverReadType, LifesaverDoType } from '../../utils/lifesaverActivities'
import { DrawerParamList } from '../DrawerNavigator'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabsParamList } from '../TabsNavigator'

type InternalNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'DrawerHome'>,
  BottomTabNavigationProp<TabsParamList, 'LifesaverChat'>
>
type LifesaverScreenNavigationProp = CompositeNavigationProp<
  InternalNavigationProp,
  StackNavigationProp<RootStackParamList, 'Home'>
>
const Lifesaver = ({ navigation }: { navigation: LifesaverScreenNavigationProp }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { display_name } = useSelector(USER_SUPPORT_PROFILE)
  const actions = useLifesaverActions(dispatch)
  const used = useRef(false)

  // BOOT UP CHAT
  useEffect(() => {
    const unsubsFocus = navigation.addListener('focus', () => {
      if (used.current) {
        used.current = false
        navigation.navigate('Home')
      } else {
        actions.sayWelcome()
      }
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
                if (state.userCompany && state.userPlace && state.userUrge) {
                  used.current = true
                  navigation.navigate('Playground', {
                    only: state.userPlace,
                    company: state.userCompany,
                    place: state.userPlace,
                    urge: state.userUrge,
                  })
                }
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

const getContentByType = (type: string, place: string) => {
  switch (type) {
    case 'READ':
      return LIFESAVER_READS()
    default:
    case 'LISTEN':
      return LIFESAVER_AUDIOS(getLocale()).filter(
        c => !c.only || c.only.includes(place), // contents by place
      )
    case 'DO':
      return LIFESAVER_ACTIVITIES
  }
}
export default Lifesaver
