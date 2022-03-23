import React from 'react'
import { Platform, View } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'

const HeaderPadding = () => {
  const headerHeight = useHeaderHeight()
  const height = Platform.OS === 'ios' ? 0 : headerHeight / 2
  return <View style={{ height }} />
}

export default HeaderPadding
