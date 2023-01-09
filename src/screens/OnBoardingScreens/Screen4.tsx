import React, { useState } from 'react'
import { BasicScreen, Selectable, Row, Headline, Paragraph, Button } from '@mindcoxr/rob'
import { View } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { TouchableRipple } from 'react-native-paper'
import 'intl'
import 'intl/locale-data/jsonp/en'
import 'intl/locale-data/jsonp/es'
import { DefaultScreenPropType } from '.'
import { translate } from '../../utils/localization'
import { SafeAreaView } from 'react-native-safe-area-context'

const Onboarding4 = ({ navigation, onNext, defaultValue }: DefaultScreenPropType<'Screen4'>) => {
  const [selected, setSelected] = useState(defaultValue ?? -1)
  const handleSelection = (id: number) => () => {
    /**
     * DISCLAIMER: Something is wrong here. Testing the app on iOS device the animation of the circle into the
     * Selectable component do not triggers until next screen refresh. So, after 2 hours of digging into the screens and Rob's components
     * I decided to offset 1 cycle the render by putting the state update into a timeout.
     * I give this bug 3 shitties: 💩💩💩
     */
    setTimeout(() => {
      setSelected(id)
    }, 0)
    // end of shitty code
  }

  const [buttonHeigth, setButtonHeigth] = useState(0)

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <BasicScreen>
          <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#fcfcfc' }} />
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
              {translate('screens.onboardingWhatSentence.title')}
            </Headline>
          </Row>
          <Row gutter={22}>
            <Selectable selected={selected === 0} onClick={handleSelection(0)}>
              {translate('screens.onboardingWhatSentence.option:0')}{' '}
              <Paragraph size="large" weight="bold" textAlign="left">
                {translate('screens.onboardingWhatSentence.option:0-bold')}
              </Paragraph>
            </Selectable>
            <Selectable selected={selected === 1} onClick={handleSelection(1)}>
              {translate('screens.onboardingWhatSentence.option:1')}{' '}
              <Paragraph size="large" weight="bold" textAlign="left">
                {translate('screens.onboardingWhatSentence.option:1-bold')}
              </Paragraph>
            </Selectable>
            <Selectable selected={selected === 2} onClick={handleSelection(2)}>
              {translate('screens.onboardingWhatSentence.option:2')}{' '}
              <Paragraph size="large" weight="bold" textAlign="left">
                {translate('screens.onboardingWhatSentence.option:2-bold')}
              </Paragraph>
            </Selectable>
            <Selectable selected={selected === 3} onClick={handleSelection(3)}>
              {translate('screens.onboardingWhatSentence.option:3')}{' '}
              <Paragraph size="large" weight="bold" textAlign="left">
                {translate('screens.onboardingWhatSentence.option:3-bold')}
              </Paragraph>
            </Selectable>
          </Row>
          <Row gutter={20}>
            <View style={{ height: buttonHeigth }} />
          </Row>
        </BasicScreen>
      </SafeAreaView>
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
