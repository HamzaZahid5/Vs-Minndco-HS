import React, { useState } from 'react'
import { BasicScreen, Selectable, Row, Headline, Paragraph, Button, useRobTheme } from '@mindcoxr/rob'
import { View, Text } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { TouchableRipple } from 'react-native-paper'
import 'intl'
import 'intl/locale-data/jsonp/en'
import 'intl/locale-data/jsonp/es'
import { DefaultScreenPropType } from '.'
import { translate } from '../../utils/localization'

const Onboarding4 = ({ navigation, onNext, defaultValue }: DefaultScreenPropType<'Screen1'>) => {
  const theme = useRobTheme()
  const [selected, setSelected] = useState(defaultValue ?? -1)
  const [buttonHeigth, setButtonHeigth] = useState(0)
  const setSelectedWrap = (i: number) => (e: boolean) => {
    if (e) {
      setSelected(i)
    } else if (selected === i) {
      setSelected(-1)
    }
  }
  return (
    <>
      <BasicScreen>
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#fcfcfc' }} />
        <Row gutter={5}>
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
        </Row>
        <Row gutter={1}>
          <Headline size="huge" weight="bold">
            {translate('screens.onboardingWhatSentence.title')}
          </Headline>
        </Row>
        <Row gutter={22}>
          <Selectable selected={selected === 0} setSelected={setSelectedWrap(0)}>
            {translate('screens.onboardingWhatSentence.option:0')}{' '}
            <Paragraph size="large" weight="bold" textAlign="left">
              {translate('screens.onboardingWhatSentence.option:0-bold')}
            </Paragraph>
          </Selectable>
          <Selectable selected={selected === 1} setSelected={setSelectedWrap(1)}>
            {translate('screens.onboardingWhatSentence.option:1')}{' '}
            <Paragraph size="large" weight="bold" textAlign="left">
              {translate('screens.onboardingWhatSentence.option:1-bold')}
            </Paragraph>
          </Selectable>
          <Selectable selected={selected === 2} setSelected={setSelectedWrap(2)}>
            {translate('screens.onboardingWhatSentence.option:2')}{' '}
            <Paragraph size="large" weight="bold" textAlign="left">
              {translate('screens.onboardingWhatSentence.option:2-bold')}
            </Paragraph>
          </Selectable>
        </Row>
        <Row gutter={20}>
          <View style={{ height: buttonHeigth }} />
        </Row>
      </BasicScreen>
      <View
        onLayout={e => !buttonHeigth && setButtonHeigth(e.nativeEvent.layout.height)}
        style={{ position: 'absolute', bottom: 20, left: 25, right: 25 }}
      >
        <Button
          role="primary"
          onPress={() => {
            onNext(navigation, selected)
          }}
        >
          {translate('screens.onboardingWhatSentence.button')}
        </Button>
      </View>
    </>
  )
}

export default Onboarding4
