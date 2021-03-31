import React from "react";
import { View } from "react-native";
import { useTheme } from 'react-native-paper';

export default () => {
  const theme = useTheme();
  return (
    <View
      style={{
        zIndex: -1,
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.primary,
      }}
    />
  )
}