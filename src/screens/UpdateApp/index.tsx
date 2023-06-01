import { BackgroundArt, BasicScreen, Button, Paragraph, Row, Subheading } from '@mindcoxr/rob'
import React from 'react'
import { Linking, Platform, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { translate } from '../../utils/localization'
import { homeBGColors } from '../../utils/config'
import Logo from '../../../assets/SVG/Logo'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
const imageBackground = require('../../../assets/images/bg_act_05.jpeg')

const openStore = () => {
  if (Platform.OS === 'ios') {
    const link = 'itms-apps://apps.apple.com/us/app/mindcotine/id1506021271'
    Linking.canOpenURL(link)
      .then(supported => {
        supported && Linking.openURL(link)
      })
      .catch(err => {
        console.log(err)
      })
  } else {
    const linkPlayStore = 'https://play.google.com/store/apps/details?id=com.habitfly.mindcotine&hl=es_419'
    Linking.canOpenURL(linkPlayStore)
      .then(supported => {
        supported && Linking.openURL(linkPlayStore)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

type LoginPhoneScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateApp'>

type Props = {
  navigation: LoginPhoneScreenNavigationProp
}

const UpdateApp = ({ navigation }: Props) => {
  return (
    <>
      <BackgroundArt paddingTop={0} paddingBottom={0} colors={homeBGColors} source={imageBackground} />
      <SafeAreaView style={{ flex: 1 }}>
        <BasicScreen bounces={false} ignoreTopSafeArea={true}>
          <Row>
            <Logo />
          </Row>
          <Row grow justifyContentOnGrow="flex-end">
            <Subheading textAlign="center" light>
              {translate('screens.UpdateScreen.title')}
            </Subheading>
          </Row>
          <Row grow justifyContentOnGrow="center">
            <Paragraph size="large" weight="bold" textAlign="center" light>
              {translate('screens.UpdateScreen.description')}{' '}
            </Paragraph>
          </Row>
          <Row justifyContentOnGrow="flex-end">
            <Button
              role="secondary"
              outline
              onPress={async () => {
                openStore()
              }}
            >
              {translate('screens.UpdateScreen.confirm')}
            </Button>
          </Row>
        </BasicScreen>
      </SafeAreaView>
    </>
  )
}

export default UpdateApp
