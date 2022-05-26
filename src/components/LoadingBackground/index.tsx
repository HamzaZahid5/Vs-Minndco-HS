import { useRobTheme } from '@mindcoxr/rob'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const LoadingBackground = ({ isLoading }: { isLoading: boolean }) => {
  const theme = useRobTheme()
  return isLoading ? (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.5,
          backgroundColor: theme.colors.monochrome.label,
        }}
      />
      <ActivityIndicator size={70} color={theme.colors.monochrome.offWhite} />
    </View>
  ) : null
}

export default LoadingBackground
