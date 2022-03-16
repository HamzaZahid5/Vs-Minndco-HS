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
          <Subheading>Are you sure?</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="xsmall" weight="normal" textAlign="left">
            We highly recommend you take a moment to review these quick guides to be able to play the VR contents
          </Paragraph>
        </Row>
        <Row gutter={10} grow justifyContentOnGrow="flex-end">
          <Button
            role="primary"
            onPress={() => {
              navigation.goBack()
            }}
          >
            Go back
          </Button>
          <Button
            role="secondary"
            onPress={() => {
              navigation.popToTop()
            }}
          >
            {'Skip & watch later'}
          </Button>
        </Row>
      </>
    )
  }
  return PopupContent
}

const KitWelcomeScreen = ({ navigation }: DefaultScreenPropType<'KitWelcome'>) => {
  const theme = useRobTheme()
  const [steep, setSteep] = useState(0)
  return (
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
              <Text style={{ color: theme.colors.monochrome.line }}>Skip</Text>
            </Paragraph>
          </TouchableRipple>
        </View>
      </Row>
      <Row gutter={26}>
        <Headline size="huge" weight="bold" textAlign="center">
          Yay!
        </Headline>
        <View style={{ marginHorizontal: 25 }}>
          <Paragraph size="small" weight="normal" textAlign="center">
            Your kit has been successfuly activated
          </Paragraph>
        </View>
      </Row>
      <Row gutter={20}>
        <View style={{ marginHorizontal: 15 }}>
          <Paragraph size="small" weight="normal" textAlign="left">
            Next learn the basics
          </Paragraph>
        </View>
        <ArrowBox
          bold={steep > 0}
          onClick={() => {
            if (steep < 1) {
              setSteep(1)
              navigation.navigate('KitPresentation', { demoVr: false })
            }
          }}
        >
          Assemble headset
        </ArrowBox>
        <ArrowBox
          bold={steep > 1}
          onClick={() => {
            if (steep < 2) {
              setTimeout(() => setSteep(2), 500)
              navigation.navigate('KitPresentation', { demoVr: true })
            }
          }}
        >
          Test a VR content
        </ArrowBox>
      </Row>
      <Row grow>
        <Button
          subVariant={steep < 2 ? ButtonSubVariant.colorless : undefined}
          onPress={() => {
            if (steep < 2) {
              navigation.navigate('BasicModal', { content: MakePopupContent(navigation) })
            } else {
              navigation.popToTop()
            }
          }}
        >
          I’m ready to start
        </Button>
      </Row>
    </BasicScreen>
  )
}

export default KitWelcomeScreen
