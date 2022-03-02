import React from 'react'
import { Avatar } from 'react-native-paper'
import { useRobTheme } from '@mindcoxr/rob'
const UserAvatar = ({ name }: { name: string }) => {
  const theme = useRobTheme()
  return <Avatar.Text size={40} style={{ backgroundColor: theme.colors.primaryPalette[500] }} label={name[0]} />
}

export default UserAvatar
