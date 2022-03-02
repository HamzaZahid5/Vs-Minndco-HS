import React, { useReducer, useEffect } from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { USER_SUPPORT_PROFILE } from '../../store/selectors'
import { initialState, reducer, messageType } from './storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import ChatItem, { chatOptionType } from './ChatItem'
import useLifesaverActions from './useLifesaverActions'
import { ActivityIndicator } from 'react-native-paper'

const Lifesaver = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { display_name } = useSelector(USER_SUPPORT_PROFILE)
  const actions = useLifesaverActions(dispatch)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  // BOOT UP CHAT
  useEffect(() => {
    const unsubsFocus = navigation.addListener('focus', () => {
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
                const actType = option.action.replace('GO_TO_ACTIVITY_', '')
                // console.log(state, actType)

                // save user selection
                // navigateToLifesaverCardActivity(componentId, {
                //   activityType: actType,
                //   state,
                // })
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
