import React, { useRef, useState } from 'react'
import {
  useRobTheme,
  Headline,
  Paragraph,
  Button,
  Row,
  Subheading,
  BasicScreen as Screen,
  Keyboard,
  Icon,
} from '@mindcoxr/rob'
import { View, Text, Image, ScrollView } from 'react-native'
import { DefaultScreenPropType } from '../../../types'
import { burnCode, getKitById } from '../../services/Firestore'
import { translate } from '../../utils/localization'
import { ActivityIndicator, TouchableRipple } from 'react-native-paper'
import { useSetHeaderProps } from '../../components/NavigationHeader'

const PopupContent = ({ close }: { close: () => void }) => {
  const theme = useRobTheme()
  const mailGif = require('../../../assets/images/mail.gif')

  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '40%',
        }}
      >
        <Image source={mailGif} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      </View>
      <Row gutter={15}>
        <Subheading>{translate('screens.kitActivation.where-is-the-code-title')}</Subheading>
        <Paragraph size="small" weight="normal" textAlign="center">
          {translate('screens.kitActivation.where-is-the-code-info')}
        </Paragraph>
      </Row>
      <Row gutter={30}>
        <Paragraph size="medium" weight="bold" textAlign="center">
          <Text onPress={() => close()} style={{ color: theme.colors.primaryPalette[500] }}>
            {translate('screens.kitActivation.close')}
          </Text>
        </Paragraph>
      </Row>
    </>
  )
}

const ErrorPopopContent =
  (errorText: string) =>
  // eslint-disable-next-line react/display-name
  ({ close }: { close: () => void }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useRobTheme()
    return (
      <>
        <Row gutter={20}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="Warning" color={theme.colors.errors.darkmode} size={90} />
          </View>
        </Row>
        <Row gutter={10}>
          <Subheading>{translate('commons.messages.genericInternalError')}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="xsmall" weight="normal" textAlign="center">
            {errorText || '\n\n\n'}
          </Paragraph>
        </Row>
        <Row gutter={10}>
          <Button outline onPress={close}>
            {translate('commons.messages.close')}
          </Button>
        </Row>
      </>
    )
  }

const kitCodeLength = 6

const validate = async (code: string) => {
  const kitDoc = await getKitById(code)
  if (!kitDoc.exists) {
    return [false, translate('screens.kitActivation.invalid-activation-code')]
  }
  // eslint-disable-next-line no-alert, curly
  if (kitDoc.data()?.used_by) {
    return [false, translate('screens.kitActivation.code-already-in-use')]
  }

  return [true]
}

const OnboardingWelcomeScreen = ({ navigation }: DefaultScreenPropType<'KitActivation'>) => {
  const theme = useRobTheme()
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)

  useSetHeaderProps(
    {
      backgroundColor: isLoading ? theme.colors.monochrome.label : '#F7F7FC',
      opacity: isLoading ? 0.5 : 1,
      contentAtBottom: true,
      color: '#14142b',
      height: 100,
    },
    [isLoading],
  )

  const completeSpace = (e: string) => {
    let newText = ''
    for (let i = 0; i < kitCodeLength - e.length; i++) {
      newText += '-'
    }
    return newText
  }
  const protectedSetText = (e: string) => {
    if (e.length <= kitCodeLength) {
      setText(e)
    }
  }

  const submitCode = async () => {
    setIsLoading(true)
    try {
      const [isValid, error] = await validate(text)
      if (isValid === false) {
        throw { message: error }
      }
      await burnCode(text)
      navigation.replace('KitWelcome')
    } catch (e) {
      const error = e as { message: string }
      setIsLoading(false)
      navigation.navigate('BasicModal', { content: ErrorPopopContent(error.message) })
    }
  }
  return (
    <>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.5,
              backgroundColor: theme.colors.monochrome.label,
            }}
          />
          <ActivityIndicator size={70} color={theme.colors.monochrome.offWhite} />
        </View>
      )}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ minHeight: '100%' }} ref={scrollViewRef} bounces={false}>
        <Screen ignoreTopSafeArea bounces={false}>
          <Row gutter={50} />
          <Row gutter={18}>
            <Headline size="huge" weight="bold">
              {translate('screens.kitActivation.activate-your-kit')}
            </Headline>
            <Paragraph size="small" weight="normal" textAlign="center">
              {translate('screens.kitActivation.insert-the-activation-code-printed-in-your-box-')}
            </Paragraph>
            <Paragraph size="medium" weight="bold" textAlign="center">
              <Text
                onPress={() => navigation.navigate('BasicModal', { content: PopupContent })}
                style={{ color: theme.colors.primaryPalette[500] }}
              >
                {translate('screens.kitActivation.where-is-the-code')}
              </Text>
            </Paragraph>
          </Row>
          <Row gutter={27} grow justifyContentOnGrow="flex-end">
            <TouchableRipple
              borderless
              style={{ borderRadius: 20 }}
              onPress={() => {
                if (scrollViewRef.current) {
                  scrollViewRef.current.scrollToEnd()
                }
              }}
            >
              <Headline size="huge" weight="bold">
                <Text style={{ letterSpacing: 15 }}>
                  {text}
                  <Text style={{ color: theme.colors.monochrome.placeholder, textAlignVertical: 'center' }}>
                    {completeSpace(text)}
                  </Text>
                </Text>
              </Headline>
            </TouchableRipple>
            <Button role="primary" onPress={submitCode} disabled={text.length !== kitCodeLength}>
              {translate('screens.kitActivation.use-this-code')}
            </Button>
          </Row>
        </Screen>
        <View style={{ justifyContent: 'flex-end' }}>
          <Keyboard value={text} setValue={protectedSetText} />
        </View>
      </ScrollView>
    </>
  )
}

export default OnboardingWelcomeScreen
