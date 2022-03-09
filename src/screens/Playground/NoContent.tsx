import { Icon, Paragraph, useRobTheme } from '@mindcoxr/rob'
import React from 'react'
import { View } from 'react-native'

const NoContent = () => {
  const theme = useRobTheme()
  return (
    <View
      style={{
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        backgroundColor: theme.colors.monochrome.offWhite,
        marginHorizontal: 24,
        padding: 50,
      }}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: theme.colors.monochrome.line,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon color={theme.colors.monochrome.offWhite} size={24} name="Close" />
      </View>
      <Paragraph size="medium" weight="normal" textAlign="center">
        No content available for the selected filter
      </Paragraph>
    </View>
  )
}

export default NoContent
