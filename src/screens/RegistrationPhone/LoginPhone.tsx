import { StackNavigationProp } from '@react-navigation/stack'
import React, { useRef, useState } from 'react'
import { RootStackParamList } from '../../../types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BasicScreen, Button, Headline, Icon, Paragraph, Row, Subheading, useRobTheme } from '@mindcoxr/rob'
import functions from '../../services/Functions/functions'
import { StatusBar, View } from 'react-native'
import Blob from '../../../assets/SVG/Blob'
import Logo from '../../../assets/SVG/Logo'
import { translate } from '../../utils/localization'
import PhoneInput from 'react-native-phone-number-input'
import LoadingBackground from '../../components/LoadingBackground'
import { RecaptchaVerifier, signInWithPhoneNumber } from '@firebase/auth'
import { authMindcoHealth } from '../../utils/config'

type LoginPhoneScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginPhone'>

type Props = {
  navigation: LoginPhoneScreenNavigationProp
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
  const theme = useRobTheme()

  const handleChangePhone = (text: string) => {
    setValue(text)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    let phoneNumber: string = formattedValue
    console.log({ phoneNumber })
    try {
      //   setFormattedValue('')
      //   setValue('')

      const { data: result } = await functions().httpsCallable('remoteLoginPhone')({
        phoneNumber: phoneNumber,
      })

      console.log({ result })

      setIsLoading(false)
      //   if (result.success) {
      //     navigation.navigate('ValidationLoginPhone', {
      //       phoneNumber,
      //     })
      //   }
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
