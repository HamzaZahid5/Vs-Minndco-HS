/* eslint-disable no-console */
import React from 'react'
import { View, Text } from 'react-native'
import { useRobTheme } from '@mindcoxr/rob'
import { DateData } from 'react-native-calendars'
import { DayProps } from 'react-native-calendars/src/calendar/day'
import { TouchableRipple } from 'react-native-paper'

const DayComponent = ({
  date,
  state,
  marking,
  ...rest
}: DayProps & {
  date?: DateData | undefined
}) => {
  const themme = useRobTheme()
  const isDisabled = state === 'disabled' || state === 'inactive'
  const isSelected = state === 'selected' || marking?.selected
  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <View
          style={{
            width: 45,
            height: 45,
            backgroundColor: isSelected ? themme.colors.monochrome.input : 'transparent',
            borderRadius: 23,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
      <Text
        style={[
          {
            color: isDisabled ? themme.colors.monochrome.placeholder : themme.colors.monochrome.offBlack,
            ...themme.fontSizes.body.xsmall,
            fontFamily: 'Poppins_600SemiBold',
          },
        ]}
      >
        {date?.day}
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        {isSelected !== true && isDisabled !== true ? (
          <TouchableRipple
            style={{
              width: 45,
              height: 45,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            borderless
            onPressIn={() => rest.onPress && rest.onPress(date)}
            onPress={() => rest.onPress && rest.onPress(date)}
          >
            <></>
          </TouchableRipple>
        ) : null}
      </View>
    </View>
  )
}

export default DayComponent
