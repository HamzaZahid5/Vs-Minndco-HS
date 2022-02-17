import React, { useState, useEffect } from 'react'
import { View, Text as RNText } from 'react-native'
import { useRobTheme, Paragraph } from '@mindcoxr/rob'
import { TouchableRipple } from 'react-native-paper'
import moment from 'moment'

type dayType = {
  name: string
  day: string
  sameMont: boolean
}

const WeekDaysBar = ({ selected, onPress }: { selected: number; onPress: (e: number) => void }) => {
  const theme = useRobTheme()
  const [days, setDays] = useState<dayType[]>([])
  useEffect(() => {
    const daysArray: dayType[] = []
    for (let i = -5; i < 2; i++) {
      const pastMoment = moment().add(i, 'days')
      daysArray.push({
        name: pastMoment.format('dd'),
        day: pastMoment.format('D'),
        sameMont: moment().isSame(pastMoment, 'month'),
      })
    }
    setDays(daysArray)
  }, [])

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      {days.map((e, i) => {
        i = i - 5 //Normalize, 0 is today
        return (
          <View key={e.day + e.name}>
            <Paragraph size="xsmall" weight="bold" textAlign="center">
              <RNText
                style={{
                  color: theme.colors.monochrome.placeholder,
                }}
              >
                {e.name}
              </RNText>
            </Paragraph>
            <TouchableRipple
              borderless
              rippleColor="#ffffff00"
              style={{
                borderRadius: 12,
                backgroundColor: selected === i ? theme.colors.monochrome.input : 'transparent',
                width: 24,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => i <= 0 && onPress(i)}
            >
              <Paragraph size="xsmall" weight="bold" textAlign="center">
                <RNText
                  style={{
                    color: i <= 0 ? theme.colors.monochrome.offBlack : theme.colors.monochrome.placeholder,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}
                >
                  {e.day}
                </RNText>
              </Paragraph>
            </TouchableRipple>
          </View>
        )
      })}
    </View>
  )
}

export default WeekDaysBar
