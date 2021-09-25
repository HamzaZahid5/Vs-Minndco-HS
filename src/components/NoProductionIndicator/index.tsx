import React, { useState, RefObject } from 'react';
import { View } from 'react-native';
import { NavigationContainerRef } from '@react-navigation/native';
import useOnScreenChange from '../../utils/hooks/useOnScreenChange';
import config from '../../../env';

const NoProductionIndicator = ({ nav }: { nav: RefObject<NavigationContainerRef> }) => {
  const [screen, setScreen] = useState('');
  useOnScreenChange(nav, ({ newScreen }) => {
    setScreen(newScreen);
  });
  if (config.name === 'production') return null;
  return (
    <View
      style={{ position: 'absolute', top: 0, right: 0, zIndex: 100, width: '100%', height: 2, backgroundColor: 'red' }}
      testID={screen}
    />
  );
};

export default NoProductionIndicator;
