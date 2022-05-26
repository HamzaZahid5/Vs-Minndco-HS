import React from 'react'
import { View, Text as NativeText } from 'react-native'
import { Paragraph, useRobTheme } from '@mindcoxr/rob'

type ScreenProps = {
  value: number
  label: string
}
const BigCounter = ({ value, label }: ScreenProps) => {
  const theme = useRobTheme()

  return (
    <View style={{ alignItems: 'center', marginTop: 5 }}>
      <View style={{ alignItems: 'center' }}>
        <NativeText
          style={{
            color: theme.colors.monochrome.offBlack,
            fontStyle: 'normal',
            ...theme.fontSizes.exeptions.bigCounter,
            fontFamily: 'Poppins_700Bold',
            fontWeight: '700',
          }}
        >
          {value}
        </NativeText>
        <View style={{ marginTop: -20 }}>
          <Paragraph size="large" weight="normal">
            <NativeText style={{ color: theme.colors.monochrome.offBlack }}>{label}</NativeText>
          </Paragraph>
        </View>
      </View>
    </View>
  )
}

export default BigCounter
