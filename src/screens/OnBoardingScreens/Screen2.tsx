import React, { useState } from 'react'
import { BasicScreen, Row, Headline, Paragraph, Button, useRobTheme, Keyboard } from '@mindcoxr/rob'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { TouchableRipple } from 'react-native-paper'
import { DefaultScreenPropType } from './index'
import { translate } from '../../utils/localization'
import { SafeAreaView } from 'react-native-safe-area-context'

const OnboardingWelcomeScreen = ({ navigation, onNext, defaultValue }: DefaultScreenPropType<'Screen2'>) => {
  const theme = useRobTheme()
  const [text, setText] = useState(defaultValue?.toString() ?? '0')
  const { height, width } = Dimensions.get("screen");
  const protectedSetText = (e: string) => {
    if (e && text === '0') {
      setText(e.substring(1))
    } else {
      setText(e)
    }
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, width, height }}>
        <BasicScreen>
          {/* <Row gutter={5}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <TouchableRipple
                borderless
                onPress={navigation.goBack}
                style={{ borderRadius: 18, padding: 5, alignItems: 'center', justifyContent: 'center' }}
              >
                <SimpleLineIcons name="arrow-left" size={18} color="black" />
              </TouchableRipple>
            </View>
          </Row> */}
          <Row gutter={1}>
            <Headline size="huge" weight="bold">
              {translate('screens.onboardingHowMuchSmoke.title')}
            </Headline>
            <Paragraph size="small" weight="normal" textAlign="center">
              {translate('screens.onboardingHowMuchSmoke.description')}
            </Paragraph>
          </Row>
          <Row gutter={27}/*  grow  */justifyContentOnGrow="flex-end">
            <Headline size="huge" weight="bold">
              {text}
            </Headline>
            <Button
              role="primary"
              onPress={() => {
                onNext(navigation, Number(text))
              }}
            >
              {translate('screens.onboardingHowMuchSmoke.button')}
            </Button>
          </Row>
          <View style={{ justifyContent: 'flex-end' }}>
            <Keyboard value={text} setValue={protectedSetText} />
          </View>
        </BasicScreen>
      </SafeAreaView>
    </ScrollView>
  )
}

export default OnboardingWelcomeScreen
