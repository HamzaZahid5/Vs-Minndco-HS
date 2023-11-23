import React, { useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { Paragraph, Row, Headline, Button, Keyboard, useRobTheme, Icon, Subheading, Snackbar } from '@mindcoxr/rob'
import { translate } from '../../utils/localization'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingBackground from '../../components/LoadingBackground'
import { DefaultScreenPropType, DefaultScreenRouteType } from '../../../types'
import functions from '../../services/Functions'
import auth from '../../services/Auth/auth'
import useShakingView from '../../utils/hooks/useShakingView'
import Logo from '../../../assets/SVG/Logo'

const CODE_LENGTH = 6

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

const VerificationCode = ({
  navigation,
  route,
}: DefaultScreenPropType<'LoginCode'> & DefaultScreenRouteType<'LoginCode'>) => {
  // UTILS
  const theme = useRobTheme()
  // LOCAL
  const [text, setText] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { AnimatedViewElement: ShakeView, shake } = useShakingView()
  const uidFromEid = useRef<string>()
  const eidSendError = useRef(false)
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

  useEffect(() => {
    if ('eid' in route.params) {
      const sendVerificationCodeFromEnrollmentId = async () => {
        if ('eid' in route.params) {
          const { data: result } = await functions().httpsCallable('sendVerificationCodeFromEnrollmentId')({
            eid: route.params.eid,
          })
          if (result.success && result.uid) {
            uidFromEid.current = result.uid as string
          } else {
            eidSendError.current = true
            navigation.navigate('BasicModal', {
              content: ErrorPopopContent(translate('firebase.errormessages.' + result.error)),
            })
          }
        }
      }
      sendVerificationCodeFromEnrollmentId()
      const unsubscribe = navigation.addListener('focus', () => {
        if (eidSendError.current) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Landing' }],
          })
        }
      })
      return unsubscribe
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitCode = async () => {
    setIsLoading(true)
    const isVerificationByEnrollmentId = 'eid' in route.params
    try {
      const functionData =
        'email' in route.params
          ? {
              email: route.params.email,
              verificationCode: text,
            }
          : {
              uid: uidFromEid.current,
              verificationCode: text,
            }
      if (isVerificationByEnrollmentId && !functionData.uid) {
        throw new Error('invalid-code')
      }
      console.log({ functionData })
      const { data: result } = await functions().httpsCallable('verifyLoginCode')(functionData)
      console.log('verifyLoginCode', { result })
      if (!result.success) {
        throw new Error(result.error)
      }
      await auth().signInWithCustomToken(result.jwt)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      const e = error as { message: string }
      setErrorMessage(translate('firebase.errormessages.' + e.message))
      setInvalid(true)
      setTimeout(() => setInvalid(false), 1.5 * 1000)
      shake()
    }
  }

  useEffect(() => {
    if (text.length === CODE_LENGTH) {
      submitCode()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Row>
        <Logo />
      </Row>
      <LoadingBackground isLoading={isLoading} />
      <Snackbar theme={theme} visible={invalid} onDismiss={() => setInvalid(false)} variant="danger">
        {errorMessage}
      </Snackbar>
      <Row gutter={27} grow justifyContentOnGrow="flex-end">
        <Paragraph size="small" weight="normal">
          {translate('screens.LoginCode.check-email', { defaultValue: 'Check your inbox for the code' })}
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
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            role="secondary"
            compact
            onPress={() => {
              navigation.goBack()
            }}
          >
            {translate('screens.LoginCode.cancel', { defaultValue: 'cancel' })}
          </Button>
        </View>
      </Row>
      <View style={{ justifyContent: 'flex-end' }}>
        <Keyboard value={text} setValue={protectedSetText} />
      </View>
    </SafeAreaView>
  )
}

export default VerificationCode
