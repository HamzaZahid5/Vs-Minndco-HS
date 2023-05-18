import { BasicScreen, Button, Paragraph, Row, Text } from '@mindcoxr/rob'
import React from 'react'
import { StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Blob from '../../../assets/SVG/Blob'
import Logo from '../../../assets/SVG/Logo'
import { translate } from '../../utils/localization'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'

type KitIdVerificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'KitIdVerification'>

type Props = {
  navigation: KitIdVerificationScreenNavigationProp
}

export const KitIdVerification = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BasicScreen>
        <StatusBar animated={true} />
        <Blob style={{ position: 'absolute', top: '16%', right: 0 }} />
        <Row>
          <Logo />
        </Row>
        <Row grow justifyContentOnGrow="center">
          <View>
            <Paragraph textAlign="center" size="large" weight="bold">
              {translate('screens.KitIdVerification.kitid_question')}
            </Paragraph>
          </View>
        </Row>
        <Row gutter={10} justifyContentOnGrow="flex-end">
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Button role="secondary" onPress={() => navigation.navigate('Login')}>
                {translate('screens.KitIdVerification.yes')}
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button role="primary" onPress={() => navigation.navigate('LoginPhone')}>
                {translate('screens.KitIdVerification.no')}
              </Button>
            </View>
          </View>
        </Row>
      </BasicScreen>
    </SafeAreaView>
  )
}
