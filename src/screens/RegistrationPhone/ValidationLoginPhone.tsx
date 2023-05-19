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

const CODE_LENGTH = 6

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
      //   Deberíamos hacer algo similar al Login en ésta pantalla
      //   // handling error, attempt remote login (against Mindco Health server)
      //   const { data: result } = await functions().httpsCallable('remoteLogin')({
      //     email: form.email,
      //     password: form.password,
      //   })

      //   on success we authenticate user we given JWT
      //   if (result.success) {
      //     await auth().signInWithCustomToken(result.jwt)
      //     await AsyncStorage.setItem('userToken', JSON.stringify(result.jwt))
      //   } else {
      //     throw { code: result.error }
      //   }
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
          <Button role="primary" onPress={handleSubmit}>
            {translate('screens.ValidationLoginPhone.confirm', {
              defaultValue: 'Confirm',
            })}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}
