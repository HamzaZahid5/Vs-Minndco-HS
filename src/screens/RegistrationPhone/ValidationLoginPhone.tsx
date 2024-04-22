import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { DefaultScreenRouteType, RootStackParamList } from '../../../types'
import { Button, Icon, Paragraph, Row, Subheading, useRobTheme, BasicScreen, Headline, Keyboard } from '@mindcoxr/rob'
import { translate } from '../../utils/localization'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import useShakingView from '../../utils/hooks/useShakingView'
import functions from '../../services/Functions/functions'
import Logo from '../../../assets/SVG/Logo'
import LoadingBackground from '../../components/LoadingBackground'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../../services/Auth'

import { getLocale } from '../../utils/localization'

const CODE_LENGTH = 6

const MakePopupContent = (navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>) => {
  const PopupContent = ({ close }: { close: () => Promise<void> }) => {
    return (
      <>
        <Row gutter={10}>
          <Subheading>{translate('screens.ValidationLoginPhone.titlePopup')}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="medium" weight="normal" textAlign="left">
            {translate('screens.ValidationLoginPhone.messagePopup')}
          </Paragraph>
        </Row>
        <Row gutter={10} grow justifyContentOnGrow="flex-end">
          <Button
            role="primary"
            compact
            onPress={async () => {
              await close()
              navigation.navigate('SupportRegister')
            }}
          >
            {translate('screens.ValidationLoginPhone.support', {
              defaultValue: 'Contact with Support',
            })}
          </Button>
          <Button
            role="secondary"
            compact
            outline
            onPress={async () => {
              await close()
            }}
          >
            {translate('screens.ValidationLoginPhone.retry', {
              defaultValue: 'Retry',
            })}
          </Button>
        </Row>
      </>
    )
  }
  return PopupContent
}

const ErrorPopopContent =
  (errorText: string) =>
  ({ close }: { close: () => void }) => {
    const theme = useRobTheme()
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
      </SafeAreaView>
    )
  }

export const ValidationLoginPhone = ({ route }: DefaultScreenRouteType<'ValidationPhoneCodeScreen'>) => {
  // UTILS
  const theme = useRobTheme()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const phoneNumber = route.params.phoneNumber
  const dispatch = useDispatch()
  // LOCAL
  const [text, setText] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const MAX_ATTEMPTS = 3
  const BLOCK_DURATION = 0.5 * 60 * 1000

  const { AnimatedViewElement: ShakeView, shake } = useShakingView()

  // HELPERS
  const formatValue = (text: string) => {
    let newText = text
    for (let i = 0; i < CODE_LENGTH - text.length; i++) {
      newText += '-'
    }
    return `${newText.substring(0, 3)} ${newText.substring(3)}`
  }

  const protectedSetText = (e: string) => {
    if (e.length <= CODE_LENGTH) {
      setText(e)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const locale = getLocale()
      const now = new Date().getTime()
      let blockInfo = await AsyncStorage.getItem('blockInfo')
      let blockData = blockInfo ? JSON.parse(blockInfo) : null
      const attempts = blockData ? blockData.attempts + 1 : 1
      let BLOCK_DURATION

      if (attempts >= 3) {
        BLOCK_DURATION = 300000
      } else {
        BLOCK_DURATION = 10000
      }

      if (blockData && now - blockData.timestamp < BLOCK_DURATION) {
        const timeLeftSec = Math.round((BLOCK_DURATION - (now - blockData.timestamp)) / 1000)
        const timeLeftMin = Math.round(timeLeftSec / 60)
        let errorMessage

        if (timeLeftSec < 60) {
          errorMessage =
            locale === 'es'
              ? `Por favor, espera ${timeLeftSec} segundos antes de intentarlo de nuevo.`
              : `Please wait ${timeLeftSec} more seconds before trying again.`
        } else {
          errorMessage =
            locale === 'es'
              ? `Por favor, espera ${timeLeftMin} minutos antes de intentarlo de nuevo.`
              : `Please wait ${timeLeftMin} minutes before trying again.`
        }

        throw new Error(errorMessage)
      }

      const { data: result } = await functions().httpsCallable('loginWithPhoneNumber')({
        phoneNumber,
        verificationCode: text,
      })

      if (result.verified) {
        await auth().signInWithCustomToken(result.customToken)
        await AsyncStorage.setItem('userToken', JSON.stringify(result.customToken))
        await AsyncStorage.removeItem('blockInfo')
      } else {
        await AsyncStorage.setItem('blockInfo', JSON.stringify({ timestamp: now, attempts }))
        throw new Error(
          locale === 'es'
            ? 'La verificación ha fallado. Por favor, intenta de nuevo.'
            : 'Verification failed. Please try again.',
        )
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingBackground isLoading={isLoading} />
      <BasicScreen>
        <Row>
          <Logo />
        </Row>
        <Row gutter={50} justifyContentOnGrow="center">
          <Paragraph size="small" weight="normal">
            {translate('screens.ValidationLoginPhone.textToVerifyCode', {
              defaultValue: 'Check your inbox for the code',
            })}
          </Paragraph>
          <ShakeView>
            <Headline size="huge" weight="bold">
              {formatValue(text)
                .split('')
                .map((letter, idx) => (
                  <Text
                    key={`letter_${idx}`}
                    style={[
                      { letterSpacing: 15, color: theme.colors.monochrome.ash },
                      letter === '-' && { color: theme.colors.monochrome.placeholder, textAlignVertical: 'center' },
                    ]}
                  >
                    {letter}
                  </Text>
                ))}
            </Headline>
          </ShakeView>
        </Row>
        <View style={{ justifyContent: 'flex-end' }}>
          <Keyboard value={text} setValue={protectedSetText} />
        </View>
      </BasicScreen>
      <View style={{ position: 'absolute', bottom: 30, left: 25, right: 25, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Button role="secondary" onPress={() => navigation.goBack()}>
            {translate('screens.ValidationLoginPhone.goBack', {
              defaultValue: 'Go back',
            })}
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button role="primary" onPress={handleSubmit} disabled={text.length !== 6}>
            {translate('screens.ValidationLoginPhone.confirm', {
              defaultValue: 'Confirm',
            })}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}
