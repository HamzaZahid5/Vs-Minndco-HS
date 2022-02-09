import React, { useEffect, useRef, useState } from 'react'
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

const ForgotPasswordScreen = () => {
  const navigation = useNavigation()
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [showMagicLink, setShowMagicLink] = useState(false)
  const isOpenForiOS = showMagicLink || showResetPassword
  const theme = useRobTheme()
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
          <Input theme={theme} label={translate('screens.ForgotPassword.email-input-label')} />
        </Row>
        <View style={{ height: 30 }} />
        <Row gutter={22} grow justifyContentOnGrow="flex-end">
          <Button
            role="primary"
            outline
            onPress={() => {
              setShowResetPassword(true)
            }}
          >
            {translate('screens.ForgotPassword.reset-pass-btn-label')}
          </Button>
          <View>
            <Button
              role="primary"
              outline
              onPress={() => {
                setShowResetPassword(true)
              }}
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
