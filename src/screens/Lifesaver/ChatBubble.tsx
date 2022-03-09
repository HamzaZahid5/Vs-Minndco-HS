import { useRobTheme } from '@mindcoxr/rob'
import { RobTheme } from '@mindcoxr/rob/dist/typescript/theme'
import React, { ReactElement } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export type chatBubbleType = {
  away?: boolean
  options?: boolean
  text?: string
}
const ChatBubble = ({ away, options, text, children }: chatBubbleType & { children?: ReactElement[] }) => {
  const theme = useRobTheme()
  const styles = getStyles(theme)
  return (
    <View
      style={[
        styles.chatBubbleContainer,
        away ? styles.chatBubbleContainerAway : styles.chatBubbleContainerHome,
        options ? styles.chatBubbleContainerAnonymous : {},
      ]}
    >
      {text && <Text style={[away ? styles.chatBubbleTextAway : styles.chatBubbleTextHome]}>{text}</Text>}
      {children && <View style={styles.chatBubbleContent}>{children}</View>}
    </View>
  )
}

const getStyles = (theme: RobTheme) =>
  StyleSheet.create({
    chatBubbleContainer: {
      borderRadius: 20,
      padding: 10,
      paddingHorizontal: 20,
      backgroundColor: 'white',
      alignItems: 'stretch',
      marginTop: 5,
      marginHorizontal: 10,
      // flex: 1,
    },
    chatBubbleContainerHome: {
      borderTopRightRadius: 0,
      backgroundColor: theme.colors.primaryPalette[500],
    },
    chatBubbleContainerAway: {
      borderTopLeftRadius: 0,
      backgroundColor: theme.colors.success.light,
    },
    chatBubbleContainerAnonymous: {
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      // borderWidth: 1,
      // borderColor: 'violet',
    },
    chatBubbleTextHome: {
      alignSelf: 'flex-end',
    },
    chatBubbleTextAway: {
      alignSelf: 'flex-start',
    },
    chatBubbleContent: {
      flexDirection: 'column',
      justifyContent: 'center',
      // borderWidth: 1,
      // borderColor: 'red',
    },
  })
export default ChatBubble
