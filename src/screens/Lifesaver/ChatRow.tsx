import React, { ReactComponentElement, ReactElement } from 'react'
import { RegisteredStyle, StyleSheet, View, ViewStyle } from 'react-native'
import UserAvatar from './UserAvatar'
import VirtualCoachAvatar from './VirtualCoachAvatar'

export type chatRowType = {
  away: boolean
  avatar: ReactComponentElement<typeof UserAvatar | typeof VirtualCoachAvatar>
  style?: RegisteredStyle<ViewStyle>
}
const ChatRow = ({ away, avatar, style, children }: chatRowType & { children: ReactElement[] }) => {
  const childrenWithProps = React.Children.map(children, child => child && React.cloneElement(child, { away }))
  return (
    <View style={[styles.chatRow, away ? styles.chatRowAway : styles.chatRowHome, style]}>
      <View>{avatar}</View>
      <View style={[styles.chatRowContent, away ? styles.chatRowContentAway : styles.chatRowContentHome]}>
        {childrenWithProps}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  chatRow: {
    marginBottom: 20,
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  chatRowHome: {
    flexDirection: 'row-reverse',
  },
  chatRowAway: {
    flexDirection: 'row',
  },
  chatRowContent: {
    height: 'auto',
    alignItems: 'stretch',
  },
  chatRowContentHome: {
    marginLeft: 80,
  },
  chatRowContentAway: {
    marginRight: 80,
  },
})

export default ChatRow
