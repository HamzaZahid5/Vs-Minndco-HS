import React from 'react'
import { Avatar } from 'react-native-paper'
import { useRobTheme } from '@mindcoxr/rob'
const VirtualCoachAvatar = () => {
  const theme = useRobTheme()
  return <Avatar.Text size={40} style={{ backgroundColor: theme.colors.success.light }} label="VC" />
}

export default VirtualCoachAvatar
