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
} from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import Blob from '../../../assets/SVG/Blob'
import { translate } from '../../utils/localization'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../services/Auth'
import functions from '../../services/Functions'

const emailValidationRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const ForgotPasswordScreen = () => {
  const navigation = useNavigation()
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [showMagicLink, setShowMagicLink] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [email, setEmail] = useState('')
  const isOpenForiOS = showMagicLink || showResetPassword
  const theme = useRobTheme()
  useEffect(() => {
    setIsValidEmail(emailValidationRegexp.test(email))
  }, [email])

  const onForgotPassword = useCallback(async () => {
    try {
      // Try to login to local server
      await auth().sendPasswordResetEmail(email)
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

        // on success we authenticate user we given JWT
        if (!result.success) {
          throw { code: result.error, remote: true }
        }
      } catch (jwtError) {
        const error = jwtError as { code: string; remote?: boolean }
        //setErrorLoginText(translate(`firebase.errormessages.${error.code}`))
        //setErrorPopup(true)
        //setLoading(false)
      }
    }
  }, [email])

  const onMagicLink = useCallback(async () => {
    try {
      const { data: result } = await functions().httpsCallable('sendMagicLink')({
        email: email,
      })
      if (!result.success) {
        throw { code: result.error, remote: result.remoteError }
      }
    } catch (localError) {
      const error = localError as { code: string; remote?: boolean }
    }
  }, [email])

  return (
    <View style={{ flexGrow: 1, overflow: 'hidden' }}>
      <Screen bounces={isOpenForiOS}>
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
              {translate('screens.ForgotPassword.magic-link-btn-label')}
            </Button>
            <View style={{ marginTop: 9, marginLeft: 5, justifyContent: 'center', alignItems: 'flex-start' }}>
              <Paragraph size="small">
                <Link
                  onPress={() => {
                    setShowMagicLink(true)
                  }}
                  href=""
                >
                  {translate('screens.ForgotPassword.magic-link-help')}
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
      </Screen>
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
          <Subheading>{translate('screens.ForgotPassword.magic-link-help-title')}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="xsmall" weight="normal" textAlign="center">
            {translate('screens.ForgotPassword.magic-link-help-desc')}
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
