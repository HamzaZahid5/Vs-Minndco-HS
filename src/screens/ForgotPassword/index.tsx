import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import {
  BasicScreen as Screen,
  Row,
  Input,
  Headline,
  Paragraph,
  Button,
  Link,
  Text,
  PopupWrapper,
  Subheading,
  useRobTheme,
  Icon,
} from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { DefaultScreenPropType, RootStackParamList } from '../../../types'
import Blob from '../../../assets/SVG/Blob'
import { translate } from '../../utils/localization'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../services/Auth'
import functions from '../../services/Functions'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingBackground from '../../components/LoadingBackground'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Logo from '../../../assets/SVG/Logo'

// const emailValidationRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const emailValidationRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

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

const PasswordResetPopupContent = ({ close }: { close: () => void }) => {
  const theme = useRobTheme()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  return (
    <>
      <Row gutter={20}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="Check" color={theme.colors.primaryPalette[500]} size={90} />
        </View>
      </Row>
      <Row gutter={10}>
        <Subheading>{translate('screens.ForgotPassword.success-title')}</Subheading>
      </Row>
      <Row grow justifyContentOnGrow="flex-start" gutter={10}>
        <Paragraph size="xsmall" weight="normal" textAlign="center">
          {translate('screens.ForgotPassword.success-description')}
        </Paragraph>
      </Row>
      <Row gutter={10}>
        <Button
          outline
          onPress={async () => {
            await close()
            navigation.goBack()
          }}
        >
          {translate('commons.messages.close')}
        </Button>
      </Row>
    </>
  )
}

const ForgotPasswordScreen = ({ navigation }: DefaultScreenPropType<'ForgotPassword'>) => {
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [showMagicLink, setShowMagicLink] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [email, setEmail] = useState('')
  const isOpenForiOS = showMagicLink || showResetPassword
  const theme = useRobTheme()
  const [isLoading, setisLoading] = useState(false)
  useEffect(() => {
    setIsValidEmail(emailValidationRegexp.test(email))
  }, [email])

  const onForgotPassword = useCallback(async () => {
    setisLoading(true)
    try {
      // Try to login to local server
      await auth().sendPasswordResetEmail(email)
      setisLoading(false)
    } catch (localError) {
      try {
        const error = localError as { code: string }

        // only on user-not-found we handle the error, otherwise we throw it
        if (error.code !== 'auth/user-not-found') {
          throw error
        }
        // handling error, attempt remote (against Mindco Health server)
        const { data: result } = await functions().httpsCallable('remoteResetPassword')({
          email: email,
        })

        if (!result.success) {
          throw { code: result.error, remote: true }
        }
        setisLoading(false)
        navigation.navigate('BasicModal', { content: PasswordResetPopupContent })
      } catch (jwtError) {
        const error = jwtError as { code: string; remote?: boolean }
        //setErrorLoginText(translate(`firebase.errormessages.${error.code}`))
        //setErrorPopup(true)
        setisLoading(false)
        navigation.navigate('BasicModal', { content: ErrorPopopContent(error.code) })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  const onMagicLink = useCallback(async () => {
    setisLoading(true)
    try {
      const { data: result } = await functions().httpsCallable('sendLoginCode')({
        email,
      })
      console.log('sendLoginCode', { result })
      if (!result.success) {
        throw new Error(result.error)
      }
      navigation.navigate('LoginCode', { email })
      setisLoading(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error: ', error)
      setisLoading(false)
      const e = error as { message: string }
      if (e.message === 'auth/user-not-found') {
        e.message = 'auth/invalid-email'
      }
      navigation.navigate('BasicModal', {
        content: ErrorPopopContent(translate('firebase.errormessages.' + e.message)),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  return (
    <View style={{ flexGrow: 1, overflow: 'hidden' }}>
      <LoadingBackground isLoading={isLoading} />
      <SafeAreaView style={{ flex: 1 }}>
        <Screen bounces={isOpenForiOS}>
          <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={400}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <Row>
              <Logo />
            </Row>
            <Blob style={{ position: 'absolute', top: '16%', right: 0, opacity: 0.7 }} />
            <Row gutter={15}>
              <Headline size="huge" weight="bold">
                {translate('screens.ForgotPassword.heading')}
              </Headline>
              <Paragraph size="small" weight="normal">
                {translate('screens.ForgotPassword.subheading')}
              </Paragraph>
            </Row>
            <Row gutter={5}>
              <Input
                value={email}
                onChangeText={setEmail}
                theme={theme}
                label={translate('screens.ForgotPassword.email-input-label')}
              />
            </Row>
            <View style={{ height: 30 }} />
            <Row gutter={22} grow justifyContentOnGrow="flex-end">
              <Button
                role="primary"
                outline
                onPress={() => {
                  onForgotPassword()
                }}
                disabled={!isValidEmail}
              >
                {translate('screens.ForgotPassword.reset-pass-btn-label')}
              </Button>
              <View>
                <Button
                  role="primary"
                  outline
                  onPress={() => {
                    onMagicLink()
                  }}
                  disabled={!isValidEmail}
                >
                  {translate('screens.ForgotPassword.login-code-btn-label')}
                </Button>
                <View style={{ marginTop: 20, marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
                  <Paragraph size="small">
                    <Link
                      onPress={() => {
                        setShowMagicLink(true)
                      }}
                      href=""
                    >
                      {translate('screens.ForgotPassword.login-code-help')}
                    </Link>
                  </Paragraph>
                </View>
              </View>
            </Row>
            <Row gutter={10} justifyContentOnGrow="flex-end">
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Button role="secondary" onPress={() => navigation.goBack()}>
                    {translate('commons.messages.back')}
                  </Button>
                </View>
              </View>
            </Row>
          </KeyboardAwareScrollView>
        </Screen>
      </SafeAreaView>
      <PopupWrapper show={showResetPassword} onClose={() => setShowResetPassword(false)}>
        <Row gutter={10}>
          <Subheading>{translate('screens.ForgotPassword.success-title')}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="xsmall" weight="normal" textAlign="center">
            {translate('screens.ForgotPassword.success-description')}
          </Paragraph>
        </Row>
        <Row gutter={10}>
          <Button
            outline
            onPress={() => {
              setShowResetPassword(false)
            }}
          >
            {translate('commons.messages.close')}
          </Button>
        </Row>
      </PopupWrapper>

      <PopupWrapper show={showMagicLink} onClose={() => setShowMagicLink(false)}>
        <Row gutter={10}>
          <Subheading>{translate('screens.ForgotPassword.login-code-help-title')}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="xsmall" weight="normal" textAlign="center">
            {translate('screens.ForgotPassword.login-code-help-desc')}
          </Paragraph>
        </Row>
        <Row gutter={10}>
          <Button
            outline
            onPress={() => {
              setShowMagicLink(false)
            }}
          >
            {translate('commons.messages.close')}
          </Button>
        </Row>
      </PopupWrapper>
    </View>
  )
}

export default ForgotPasswordScreen
