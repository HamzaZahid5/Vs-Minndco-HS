import React from 'react'
import { View } from 'react-native'
import Blob from '../../../assets/SVG/Blob'
import Logo from '../../../assets/SVG/Logo'
import { Button, Paragraph, Row } from '@mindcoxr/rob'

interface ErrorComponentProps {
  onBackPress: () => void
  translate: (key: string, options?: { defaultValue: string }) => string
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ onBackPress, translate }) => {
  return (
    <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Blob style={{ position: 'absolute', top: '16%', right: 0 }} />
      <Row>
        <Logo />
      </Row>
      <Row>
        <View style={{ marginBottom: 20 }}>
          <Paragraph size="medium">
            {translate('commons.messages.error_message', {
              defaultValue: 'An unexpected error occurred, please contact support so that we can best assist you.',
            })}
          </Paragraph>
        </View>
      </Row>
      <Button role="primary" onPress={onBackPress}>
        {translate('commons.messages.button_back', { defaultValue: 'Back' })}
      </Button>
    </View>
  )
}

export default ErrorComponent
