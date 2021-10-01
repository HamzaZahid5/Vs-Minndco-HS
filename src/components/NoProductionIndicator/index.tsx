import React, { useEffect, useRef, useState, RefObject } from 'react';
import { View } from 'react-native';
import { NavigationContainerRef } from '@react-navigation/native';
import useOnScreenChange from '../../utils/hooks/useOnScreenChange';

const NoProductionIndicator = ({ nav }: { nav: RefObject<NavigationContainerRef> }) => {
  // ===========================================
  // checks nav.current despite component reload
  // ===========================================
  // flags to force component to reload
  const [navReady, setNavReady] = useState(false);
  // timer to keep checking
  const tID: { current: NodeJS.Timer | null } = useRef(null);
  // clear timer on component unload
  useEffect(() => {
    return () => clearTimeout(tID.current as NodeJS.Timer);
  }, []);
  // check, if present set flag, otherwise re-schedule check
  const awaitNav = () =>
    setTimeout(() => {
      if (nav.current) {
        setNavReady(true);
      } else {
        tID.current = awaitNav();
      }
    }, 500);
  // on render, if no nav, check
  if (!nav.current) {
    tID.current = awaitNav();
  }
  // ===========================================

  const [screen, setScreen] = useState('');

  if (screen === '' && navReady) {
    const { name = '' } = nav.current?.getCurrentRoute() as any;
    setScreen(name);
  }
  useOnScreenChange(nav, ({ newScreen }) => {
    setScreen(newScreen);
  });

  return (
    <View
      style={{ position: 'absolute', top: 0, right: 0, zIndex: 100, width: '100%', height: 2, backgroundColor: 'red' }}
      testID={screen}
    />
  );
};

export default NoProductionIndicator;
