import React, { useEffect, useState } from 'react'
import { BasicScreen, Row, Headline, Paragraph, Button, useRobTheme, Keyboard } from '@mindcoxr/rob'
import { View, Text, ScrollView } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { TouchableRipple } from 'react-native-paper'
import 'intl'
import 'intl/locale-data/jsonp/en'
import 'intl/locale-data/jsonp/es'
import { DefaultScreenPropType } from './index'
import { translate } from '../../utils/localization'
import { SafeAreaView } from 'react-native-safe-area-context'

type parserOptions = { decimalSeparator: '.' | ','; maxDecimals: number; maxFractional: number }

const textParser = (options: parserOptions) => (entry: string, oldText: string) => {
  const formater = new Intl.NumberFormat()
  if (entry && oldText === '0') {
    const newText = entry.substring(1)
    if (newText[0] === options.decimalSeparator) {
      return '0' + newText
    } else {
      return newText
    }
  } else {
    let toCheck = entry
    if (options.decimalSeparator === ',') {
      toCheck = toCheck.replace(/,/g, '.')
    }
    const checkNan = formater.format(Number(toCheck)).replace(/,/g, '')
    if (!isNaN(Number(checkNan))) {
      const splitted = entry.split(options.decimalSeparator)
      if (splitted[0].length > options.maxDecimals) return oldText
      if (splitted[1]?.length > options.maxFractional) return oldText
      return entry
    }
  }
  return oldText
}

const textParserWrapper =
  (setText: (e: (o: string) => string) => void, toWrap: (n: string, o: string) => string) => (newText: string) => {
    setText(oldText => toWrap(newText, oldText))
  }

const Onboarding3 = ({ navigation, onNext, defaultValue }: DefaultScreenPropType<'Screen3'>) => {
  const theme = useRobTheme()
  const [text, setText] = useState(defaultValue?.toString() ?? '0')

  const protectedSetText = textParserWrapper(
    setText,
    textParser({ decimalSeparator: ',', maxDecimals: 5, maxFractional: 3 }),
  )
  useEffect(() => {
    if (defaultValue) {
      protectedSetText(defaultValue.toString())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
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
              {translate('screens.onboardingHowMuchPay.title')}
            </Headline>
            {/* <Paragraph size="small" weight="normal" textAlign="center">
            {translate('screens.onboardingHowMuchPay.description')}
          </Paragraph> */}
          </Row>
          <Row gutter={27}/*  grow  */justifyContentOnGrow="flex-end">
            <Headline size="huge" weight="bold">
              ${text}
            </Headline>
            <Button
              role="primary"
              onPress={() => {
                onNext(navigation, Number(text.replace(',', '.')))
              }}
            >
              {translate('screens.onboardingHowMuchPay.button')}
            </Button>
          </Row>
          <View style={{ justifyContent: 'flex-end' }}>
            <Keyboard decimalSeparator="," value={text} setValue={protectedSetText} />
          </View>
        </BasicScreen>
      </SafeAreaView>
    </ScrollView>
  )
}

export default Onboarding3
