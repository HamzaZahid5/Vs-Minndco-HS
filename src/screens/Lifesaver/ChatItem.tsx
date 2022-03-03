import React, { useState } from 'react'
import UserAvatar from './UserAvatar'
import VirtualCoachAvatar from './VirtualCoachAvatar'
import EnterEffect from '../../../_src/components/FadeEffect'
import ChatRow from './ChatRow'
import ChatBubble from './ChatBubble'
import ChipButton from '../../components/ChipButton'
import { StyleSheet } from 'react-native'
import { useRobTheme } from '@mindcoxr/rob'
import { companyType, placeType, urgeType } from './storage'

export type chatOptionType = {
  action: string
  id: urgeType | placeType | companyType
  label: string
}
export type chatItemType = {
  user: string
  text: string
  options: chatOptionType[] | undefined
  onSelectOption?: (option: chatOptionType) => void
}
const ChatItem = ({ user = '', text, options, onSelectOption }: chatItemType) => {
  const theme = useRobTheme()
  const userAvatar = <UserAvatar name={user} />
  const coachAvatar = <VirtualCoachAvatar />
  const avatar = user === 'coach' ? coachAvatar : userAvatar
  const [selectedOption, setSelectedOption] = useState<chatOptionType>()
  return (
    <EnterEffect show>
      <ChatRow avatar={avatar} away={user === 'coach'}>
        <ChatBubble text={text} />
        <>
          {options && (
            <ChatBubble options={true}>
              {Object.values(options).map(o => {
                return (
                  <ChipButton
                    key={o.id}
                    style={[
                      styles.optionButton,
                      selectedOption?.id === o.id
                        ? {
                            backgroundColor: theme.colors.primaryPalette[600],
                          }
                        : {},
                    ]}
                    labelStyle={{
                      color: selectedOption?.id === o.id ? 'white' : 'black',
                    }}
                    onPress={() => {
                      if (!selectedOption?.id) {
                        setSelectedOption(o)
                        if (onSelectOption) {
                          onSelectOption(o)
                        }
                      }
                    }}
                  >
                    {o.label}
                  </ChipButton>
                )
              })}
            </ChatBubble>
          )}
        </>
      </ChatRow>
    </EnterEffect>
  )
}

const styles = StyleSheet.create({
  optionButton: {
    marginVertical: 5,
  },
})

export default ChatItem
