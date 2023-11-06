import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Button, Paragraph } from '@mindcoxr/rob'

interface LoadingComponentProps {
  showButtonBack: boolean
  onBackPress: () => void
  translate: (key: string, options?: { defaultValue: string }) => string
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ showButtonBack, onBackPress, translate }) => {
  return (
    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
      {showButtonBack && (
        <View style={{ margin: 20 }}>
          <Paragraph size="medium">
            {translate('commons.messages.error_message', {
              defaultValue: 'An unexpected error occurred, please contact support so that we can best assist you.',
            })}
          </Paragraph>
          <View style={{ marginTop: 30 }}>
            <Button onPress={onBackPress}>{translate('commons.messages.button_back', { defaultValue: 'Back' })}</Button>
          </View>
        </View>
      )}
    </View>
  )
}

export default LoadingComponent
