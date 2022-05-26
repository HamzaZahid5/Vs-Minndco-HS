/* eslint-disable react/prop-types */
/**
 * SMALL VERSION OF GENERIC BUTTON TO USE INLINE LOKE INTO PROFILE SCREEN
 */
import React, { ReactChildren, ReactElement } from 'react'
import { useRobTheme, Theme, RobThemeType } from '@mindcoxr/rob'
import { View, StyleSheet, TouchableOpacity, RegisteredStyle, ViewStyle, TextStyle } from 'react-native'
import { Button } from 'react-native-paper'

export type ChipButtonType = {
  disabled?: boolean
  labelStyle: RegisteredStyle<TextStyle> | TextStyle | undefined
  contentStyle?: RegisteredStyle<ViewStyle> | undefined
  style: RegisteredStyle<ViewStyle> | ViewStyle[]
  onPress: () => void
}
const ChipButton = ({
  labelStyle,
  contentStyle,
  style,
  disabled = false,
  onPress,
  children,
}: ChipButtonType & { children: ReactElement | string }) => {
  const theme = useRobTheme()
  const styles = getStyles(theme)
  const Wrapper = disabled
    ? ({ children }: { children: ReactElement }) => <View>{children}</View>
    : ({ children }: { children: ReactElement }) => <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  return (
    <Wrapper>
      <Button
        mode="outlined"
        compact
        uppercase={false}
        theme={{ ...theme, roundness: 50, colors: { primary: '#ffffff' } }}
        style={[styles.chipButton, style]}
        contentStyle={[styles.chipButtonContent, contentStyle]}
        labelStyle={[styles.chipButtonLabel, { color: theme.colors.dark }, labelStyle]}
        disabled={disabled}
      >
        {children}
      </Button>
    </Wrapper>
  )
}

export default ChipButton

const getStyles = (theme: RobThemeType) =>
  StyleSheet.create({
    chipButton: {
      height: 28,
      marginHorizontal: 10,
      paddingHorizontal: 5,
      backgroundColor: 'white',
    },
    chipButtonContent: { marginTop: 0 },

    chipButtonLabel: {
      ...theme.fontSizes.exeptions.chipButtonLabel,
      height: 27,
      marginTop: 2,
      fontWeight: 'normal',
      ...Theme.fonts.light,
    },
  })
