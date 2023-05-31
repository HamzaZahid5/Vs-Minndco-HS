import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import { BasicScreen as Screen, Button, Row, Headline, Paragraph, useRobTheme, Icon, Subheading } from '@mindcoxr/rob'
import PhoneInput from 'react-native-phone-number-input'
import { translate } from '../../utils/localization'
import { RootStackParamList } from '../../../types'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { updatePhoneNumber } from '../../services/Firestore'
import functions from '../../services/Functions/functions'
import Logo from '../../../assets/SVG/Logo'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingBackground from '../../components/LoadingBackground'
import i18n from 'i18n-js'

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

interface ValidationPhonePros {}

export const ValidationPhone = ({}: ValidationPhonePros) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [value, setValue] = useState('')
  const [formattedValue, setFormattedValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const phoneInput = useRef<PhoneInput>(null)
  const theme = useRobTheme()
  const locale = i18n.locale.toUpperCase()

  const handleChangePhone = (text: string) => {
    setValue(text)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    let phoneNumber: string = formattedValue
    console.log({ phoneNumber })
    try {
      updatePhoneNumber({ phone: phoneNumber, isValidPhone: false })
      setFormattedValue('')
      setValue('')

      const { data: result } = await functions().httpsCallable('sendSmsCode')({
        phoneNumber: phoneNumber,
        language: locale,
      })

      console.log({ result })

      setIsLoading(false)
      navigation.navigate('ValidationPhoneCodeScreen', {
        phoneNumber,
      })
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
      <Screen>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Row grow gutter={23}>
            <Logo />
          </Row>
          <Row gutter={23}>
            <Headline size="medium" weight="bold" textAlign="left">
              {translate('screens.Profile.insertPhoneNumber_title')}
            </Headline>
          </Row>
          <Row gutter={23}>
            <Paragraph size="medium" weight="bold" textAlign="left">
              {translate('screens.Profile.insertPhoneNumber_description')}
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
        </View>
      </Screen>
      <View style={{ position: 'absolute', bottom: 30, left: 25, right: 25 }}>
        <Button role="primary" onPress={handleSubmit} disabled={!phoneInput.current?.isValidNumber(value)}>
          {translate('screens.Profile.validationButton')}
        </Button>
      </View>
    </SafeAreaView>
  )
}
