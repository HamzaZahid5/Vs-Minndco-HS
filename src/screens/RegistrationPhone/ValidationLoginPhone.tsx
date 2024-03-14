import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
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

import BasicModalScreen from '../BasicModalScreen'

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

  //OTP TIME RESTRICTION
  const [attemptCount, setAttemptCount] = useState(0)
  const [blockEndTime, setBlockEndTime] = useState<Date | null>(null)

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
    // Verifica si actualmente hay un bloqueo activo y si aún no ha terminado
    if (blockEndTime && new Date() < blockEndTime) {
      navigation.navigate('BasicModal', {
        content: `You are blocked. Please wait until ${blockEndTime.toLocaleTimeString()}.`,
      })
      return
    }

    setIsLoading(true)

    try {
      // Intenta verificar el código OTP aquí
      const { data: result } = await functions().httpsCallable('loginWithPhoneNumber')({
        phoneNumber,
        verificationCode: text,
      })

      if (result.verified) {
        await auth().signInWithCustomToken(result.customToken)
        await AsyncStorage.setItem('userToken', JSON.stringify(result.customToken))
      } else {
        setAttemptCount(prevCount => prevCount + 1)

        if (attemptCount >= 2) {
          setBlockEndTime(new Date(new Date().getTime() + 60 * 1000)) // Bloquea por 60 segundos
          navigation.navigate('BasicModal', {
            content: 'You have exceeded the maximum number of attempts. Please wait 60 seconds.',
          })
        } else if (attemptCount >= 4) {
          // En el quinto intento fallido
          setBlockEndTime(new Date(new Date().getTime() + 5 * 60 * 1000)) // Bloquea por 5 minutos
          navigation.navigate('BasicModal', {
            content: 'You have exceeded the maximum number of attempts. Please wait 5 minutes.',
          })
        }

        throw new Error('Verification failed')
      }
    } catch (error) {
      // Manejo de errores
      setIsLoading(false)
      navigation.navigate('BasicModal', {
        content: MakePopupContent(navigation),
      })
    } finally {
      setIsLoading(false)
    }

    // Restablece el contador si el usuario está bloqueado y el tiempo de bloqueo ha terminado
    if (blockEndTime && new Date() >= blockEndTime) {
      setAttemptCount(0)
      setBlockEndTime(null)
    }
  }

  useEffect(() => {
    let intervalId

    if (blockEndTime) {
      intervalId = setInterval(() => {
        if (new Date() >= blockEndTime) {
          setAttemptCount(0)
          setBlockEndTime(null)
        }
      }, 1000) // Revisa cada segundo
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [blockEndTime])

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
