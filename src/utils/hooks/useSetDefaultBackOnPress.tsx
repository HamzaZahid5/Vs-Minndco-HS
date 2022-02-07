import { HeaderBackButton, StackHeaderLeftButtonProps, StackNavigationProp } from '@react-navigation/stack'
import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { RootStackParamList } from '../../../types'

export const BackButton = ({ testID, onPress, ...props }: { testID?: string } & StackHeaderLeftButtonProps) => (
  <View testID={testID ?? 'header-back-button'}>
    <HeaderBackButton {...props} onPress={onPress} />
  </View>
)

const useSetDefaultBackOnPress = (
  navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>,
  onPress: (defaultOnPress?: () => void) => () => void,
  testID?: string,
) => {
  useLayoutEffect(() => {
    const headerLeft = ({ onPress: defaultOnPress, ...props }: StackHeaderLeftButtonProps) => (
      <BackButton onPress={onPress(defaultOnPress)} testID={testID} {...props} />
    )
    navigation.setOptions({
      headerLeft,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation])
}

export default useSetDefaultBackOnPress
