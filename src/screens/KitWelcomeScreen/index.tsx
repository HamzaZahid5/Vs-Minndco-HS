import React from 'react'
import { View } from 'react-native'
import { Billboard } from '@mindcoxr/rob'
import { DefaultScreenPropType } from '../../../types'

const KitWelcomeScreen = ({ navigation }: DefaultScreenPropType<'KitWelcome'>) => {
  return (
    <View style={{ justifyContent: 'center', flex: 1 }}>
      <Billboard>Not implemented</Billboard>
    </View>
  )
}

export default KitWelcomeScreen
