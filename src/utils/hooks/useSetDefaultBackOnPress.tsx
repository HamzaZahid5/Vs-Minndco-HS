import { HeaderBackButton, StackHeaderLeftButtonProps, StackNavigationProp } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { RootStackParamList } from '../../../types';

const useSetDefaultBackOnPress = (
  navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>,
  onPress: (defaultOnPress?: () => void) => () => void,
) => {
  useLayoutEffect(() => {
    const headerLeft = ({ onPress: defaultOnPress, ...props }: StackHeaderLeftButtonProps) => (
      <HeaderBackButton {...props} onPress={onPress(defaultOnPress)} />
    );
    navigation.setOptions({
      headerLeft,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
};

export default useSetDefaultBackOnPress;
