import {
  Button,
  Icon,
  Paragraph,
  Row,
  Subheading,
  useRobTheme,
  BasicScreen as Screen,
  Link,
  Headline,
  Input,
} from '@mindcoxr/rob'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import functions from '../../services/Functions/functions'
import i18n from 'i18n-js'
import { translate } from '../../utils/localization'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { DefaultScreenPropType, RootStackParamList } from '../../../types'
import LoadingBackground from '../../components/LoadingBackground'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Logo from '../../../assets/SVG/Logo'
import Blob from '../../../assets/SVG/Blob'

const emailValidationRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const MakePopupContent = (navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>) => {
  const PopupContent = ({ close }: { close: () => Promise<void> }) => {
    return (
      <>
        <Row gutter={10}>
          <Subheading>{translate('screens.LoginEmail.titlePopup')}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="medium" weight="normal" textAlign="left">
            {translate('screens.LoginEmail.messagePopup')}
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
            {translate('screens.LoginEmail.support', {
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
            {translate('screens.LoginEmail.retry', {
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

export const LoginEmail = ({ navigation }: DefaultScreenPropType<'LoginEmail'>) => {
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [email, setEmail] = useState('')
  const theme = useRobTheme()
  const locale = i18n.locale.toLowerCase()
  const [isLoading, setisLoading] = useState(false)

  const handleSubmit = async () => {
    setisLoading(true)
    try {
      const { data: result } = await functions().httpsCallable('sendEmailCode')({
        email: email.toLowerCase(),
        language: locale,
      })

      setisLoading(false)
      if (result.valid) {
        navigation.navigate('ValidationLoginEmail', {
          email: email.toLowerCase(),
        })
      } else {
        // No existe, navega al modal que te lleva al registro
        navigation.navigate('BasicModal', {
          content: MakePopupContent(navigation),
        })
      }
    } catch (error: any) {
      console.log(error)
      setisLoading(false)
      navigation.navigate('BasicModal', { content: ErrorPopopContent(error) })
    }
  }

  useEffect(() => {
    setIsValidEmail(emailValidationRegexp.test(email))
  }, [email])

  return (
    <View style={{ flexGrow: 1, overflow: 'hidden' }}>
      <LoadingBackground isLoading={isLoading} />
      <SafeAreaView style={{ flex: 1 }}>
        <Screen>
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
                {translate('screens.LoginEmail.heading')}
              </Headline>
              <Paragraph size="small" weight="normal">
                {translate('screens.LoginEmail.subheading')}
              </Paragraph>
            </Row>
            <Row gutter={5}>
              <Input
                value={email}
                onChangeText={setEmail}
                theme={theme}
                label={translate('screens.LoginEmail.email-input-label')}
              />
            </Row>
            <View style={{ height: 30 }} />
            <Row gutter={22} grow justifyContentOnGrow="flex-end">
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Button
                    role="secondary"
                    onPress={() => {
                      navigation.goBack()
                    }}
                  >
                    {translate('screens.LoginEmail.back')}
                  </Button>
                </View>
                <View style={{ flex: 1 }}>
                  <Button role="primary" onPress={handleSubmit} disabled={!isValidEmail}>
                    {translate('screens.LoginEmail.confirm')}
                  </Button>
                </View>
              </View>
            </Row>
          </KeyboardAwareScrollView>
        </Screen>
      </SafeAreaView>
    </View>
  )
}
