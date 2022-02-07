import React from 'react';
import { View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

export default () => {
  const height = useHeaderHeight();
  return <View style={{ height }} />
};
