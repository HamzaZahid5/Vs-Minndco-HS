import {
  BasicScreen as Screen,
  Button,
  Row,
  Headline,
  Keyboard,
  useRobTheme,
  Paragraph,
  Subheading,
  Icon,
} from '@mindcoxr/rob'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Logo from '../../../assets/SVG/Logo'
import { translate } from '../../utils/localization'
import LoadingBackground from '../../components/LoadingBackground'
import { DefaultScreenRouteType, RootStackParamList } from '../../../types'
import useShakingView from '../../utils/hooks/useShakingView'
import functions from '../../services/Functions/functions'
import { updatePhoneNumber } from '../../services/Firestore'

const CODE_LENGTH = 6

const MakePopupContent = (navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>) => {
  const PopupContent = ({ close }: { close: () => Promise<void> }) => {
    return (
      <>
        <Row gutter={10}>
          <Subheading>{translate('screens.Profile.titlePopup')}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="medium" weight="normal" textAlign="left">
            {translate('screens.Profile.messagePopup')}
          </Paragraph>
        </Row>
        <Row gutter={10} grow justifyContentOnGrow="flex-end">
          <Button
            role="primary"
            compact
            onPress={async () => {
              await close()
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Main',
                  },
                ],
              })
            }}
          >
            {translate('screens.Profile.confirmButtonLabelPopup')}
          </Button>
        </Row>
      </>
    )
  }
  return PopupContent
}

const ErrorPopopContent =
  (errorText: string) =>
  // eslint-disable-next-line react/display-name
  ({ close }: { close: () => void }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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

export const ValidationPhoneCode = ({ route }: DefaultScreenRouteType<'ValidationPhoneCodeScreen'>) => {
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
      const { data: result } = await functions().httpsCallable('verifySmsCode')({
        phoneNumber,
        verificationCode: text,
      })

      if (!result.verified) {
        throw new Error(result.error)
      } else {
        updatePhoneNumber({ phone: phoneNumber, isValidPhone: true })
        dispatch({ type: 'user/setIsValidPhone', payload: true })
        setIsLoading(false)
        navigation.navigate('BasicModal', {
          content: MakePopupContent(navigation),
        })
      }
    } catch (error) {
      setIsLoading(false)
      const e = error as { message: string }
      setErrorMessage(translate('firebase.errormessages.' + e.message))
      setInvalid(true)
      setTimeout(() => setInvalid(false), 1.5 * 1000)
      shake()
    }

    setIsLoading(false)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Screen>
        <Row>
          <Logo />
        </Row>
        <LoadingBackground isLoading={isLoading} />
        <Row gutter={50} justifyContentOnGrow="center">
          <Paragraph size="small" weight="normal">
            {translate('screens.Profile.textToVerifyCode', { defaultValue: 'Check your inbox for the code' })}
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
      </Screen>
      <View style={{ position: 'absolute', bottom: 30, left: 25, right: 25 }}>
        <Button role="primary" onPress={handleSubmit}>
          {translate('screens.Profile.buttonValidationConfirm')}
        </Button>
      </View>
    </SafeAreaView>
  )
}
