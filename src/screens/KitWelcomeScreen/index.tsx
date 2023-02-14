import React, { useState } from 'react'
import { Text, View } from 'react-native'
import {
  ArrowBox,
  BasicScreen,
  Billboard,
  Button,
  ButtonSubVariant,
  Headline,
  ListSelect,
  Paragraph,
  Row,
  Selectable,
  Subheading,
  useRobTheme,
} from '@mindcoxr/rob'
import { DefaultScreenPropType, RootStackParamList } from '../../../types'
import { TouchableRipple } from 'react-native-paper'
import { translate } from '../../utils/localization'
import { StackNavigationProp } from '@react-navigation/stack'

const MakePopupContent = (navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>) => {
  const PopupContent = () => {
    return (
      <>
        <Row gutter={10}>
          <Subheading> {translate('screens.KitWelcome.popupTitle')}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="xsmall" weight="normal" textAlign="left">
            {translate('screens.KitWelcome.popupSubTitle')}
          </Paragraph>
        </Row>
        <Row gutter={10} grow justifyContentOnGrow="flex-end">
          <Button
            role="primary"
            onPress={() => {
              navigation.goBack()
            }}
          >
            {translate('screens.KitWelcome.popupGoBack')}
          </Button>
          <Button
            role="secondary"
            onPress={() => {
              navigation.popToTop()
            }}
          >
            {translate('screens.KitWelcome.popupSkip')}
          </Button>
        </Row>
      </>
    )
  }
  return PopupContent
}

const KitWelcomeScreen = ({ navigation }: DefaultScreenPropType<'KitWelcome'>) => {
  const theme = useRobTheme()
  const [steep, setSteep] = useState<number[]>([])
  return (
    <>
      <View style={{ height: 100, width: '100%' }} />
      <BasicScreen bounces={false}>
        <Row gutter={15}>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableRipple
              borderless
              style={{ borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 }}
              onPress={() => {
                navigation.popToTop()
                return
              }}
            >
              <Paragraph size="small" weight="bold" textAlign="right">
                <Text style={{ color: theme.colors.monochrome.line }}>
                  {translate('screens.KitWelcome.skip', { default: 'Skip' })}
                </Text>
              </Paragraph>
            </TouchableRipple>
          </View>
        </Row>
        <Row gutter={26}>
          <Headline size="huge" weight="bold" textAlign="center">
            {translate('screens.KitWelcome.title')}
          </Headline>
          <View style={{ marginHorizontal: 25 }}>
            <Paragraph size="small" weight="normal" textAlign="center">
              {translate('screens.KitWelcome.subTitle')}
            </Paragraph>
          </View>
        </Row>
        <Row gutter={20}>
          <View style={{ marginHorizontal: 15 }}>
            <Paragraph size="small" weight="normal" textAlign="left">
              {translate('screens.KitWelcome.paragraph')}
            </Paragraph>
          </View>
          <ArrowBox
            bold={!steep.includes(0)}
            onClick={() => {
              if (!steep.includes(0)) {
                setTimeout(() => setSteep([...steep, 0]), 500)
              }
              navigation.navigate('KitPresentation', { demoVr: false })
            }}
          >
            {translate('screens.KitWelcome.label1')}
          </ArrowBox>
          <ArrowBox
            bold={!steep.includes(1)}
            onClick={() => {
              if (!steep.includes(1)) {
                setTimeout(() => setSteep([...steep, 1]), 500)
              }
              navigation.navigate('KitPresentation', { demoVr: true })
            }}
          >
            {translate('screens.KitWelcome.label2')}
          </ArrowBox>
        </Row>
        <Row grow>
          <Button
            subVariant={steep.length < 2 ? ButtonSubVariant.colorless : undefined}
            onPress={() => {
              if (steep.length < 2) {
                navigation.navigate('BasicModal', { content: MakePopupContent(navigation) })
              } else {
                navigation.popToTop()
              }
            }}
          >
            {translate('screens.KitWelcome.ready')}
          </Button>
        </Row>
      </BasicScreen>
    </>
  )
}

export default KitWelcomeScreen
