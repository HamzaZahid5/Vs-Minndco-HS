import { StackNavigationProp } from '@react-navigation/stack'
import React, { useRef, useState } from 'react'
import { RootStackParamList } from '../../../types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BasicScreen, Button, Headline, Icon, Paragraph, Row, Subheading, useRobTheme } from '@mindcoxr/rob'
import functions from '../../services/Functions/functions'
import { StatusBar, View, Platform } from 'react-native'
import Blob from '../../../assets/SVG/Blob'
import Logo from '../../../assets/SVG/Logo'
import i18n from 'i18n-js'
import { translate } from '../../utils/localization'
import PhoneInput from 'react-native-phone-number-input'
import LoadingBackground from '../../components/LoadingBackground'

type LoginPhoneScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginPhone'>

type Props = {
  navigation: LoginPhoneScreenNavigationProp
}

const MakePopupContent = (navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>) => {
  const PopupContent = ({ close }: { close: () => Promise<void> }) => {
    return (
      <>
        <Row gutter={10}>
          <Subheading>{translate('screens.LoginPhone.titlePopup')}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="medium" weight="normal" textAlign="left">
            {translate('screens.LoginPhone.messagePopup')}
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
            {translate('screens.LoginPhone.support', {
              defaultValue: 'Contact with Support',
            })}
          </Button>
          <Button
            role="secondary"
            outline
            compact
            onPress={async () => {
              await close()
              navigation.navigate('LoginEmail')
            }}
          >
            {translate('screens.LoginPhone.email', {
              defaultValue: 'Enter with email',
            })}
          </Button>
          <Button
            role="secondary"
            compact
            onPress={async () => {
              await close()
            }}
          >
            {translate('screens.LoginPhone.retry', {
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

export const LoginPhone = ({ navigation }: Props) => {
  const [value, setValue] = useState('')
  const [formattedValue, setFormattedValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const phoneInput = useRef<PhoneInput>(null)
  const locale = i18n.locale.toLowerCase()
  const theme = useRobTheme()

  const handleChangePhone = (text: string) => {
    setValue(text)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    let phoneNumber: string = formattedValue
    try {
      const { data: result } = await functions().httpsCallable('sendSmsCode')({
        phoneNumber: phoneNumber,
        language: locale,
      })

      setIsLoading(false)
      if (result.valid) {
        navigation.navigate('ValidationLoginPhone', {
          phoneNumber,
        })
      } else {
        // No existe, navega al modal que te lleva al registro
        navigation.navigate('BasicModal', {
          content: MakePopupContent(navigation),
        })
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      navigation.navigate('BasicModal', {
        content: ErrorPopopContent(translate('firebase.errormessages.auth/network-request-failed')),
      })
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingBackground isLoading={isLoading} />
      <BasicScreen>
        <StatusBar animated={true} />
        <Blob style={{ position: 'absolute', top: '16%', right: 0 }} />
        <Row>
          <Logo />
        </Row>
        <Row justifyContentOnGrow="center" gutter={23}>
          <Headline size="medium" weight="bold" textAlign="left">
            {translate('screens.LoginPhone.title')}
          </Headline>
        </Row>
        <Row gutter={23}>
          <Paragraph size="medium" weight="bold" textAlign="left">
            {translate('screens.LoginPhone.description')}
          </Paragraph>
        </Row>
        <Row gutter={23}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="US"
            layout="first"
            onChangeText={handleChangePhone}
            onChangeFormattedText={text => {
              setFormattedValue(text)
            }}
            // withDarkTheme
            withShadow
            autoFocus
          />
        </Row>

        <Row grow gutter={10} justifyContentOnGrow="flex-end">
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Button role="secondary" onPress={() => navigation.goBack()}>
                {translate('screens.LoginPhone.goBack', {
                  defaultValue: 'Go back',
                })}
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button role="primary" onPress={handleSubmit} disabled={!phoneInput.current?.isValidNumber(value)}>
                {translate('screens.LoginPhone.next')}
              </Button>
            </View>
          </View>
        </Row>
      </BasicScreen>
    </SafeAreaView>
  )
}
