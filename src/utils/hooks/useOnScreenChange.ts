import { NavigationContainerRef } from '@react-navigation/native';
import { RefObject, useEffect, useRef, useState } from 'react';
import Smartlook from 'smartlook-react-native-wrapper';
import { RootStackParamList } from '../../../types';

const useOnScreenChange = (
  navigatorRef: RefObject<NavigationContainerRef>,
  onScreenChange: (change: { oldScreen: keyof RootStackParamList | null; newScreen: keyof RootStackParamList }) => void,
) => {
  const lastScreen = useRef<keyof RootStackParamList>();
  const [firstScreenSet, setFirstScreenSet] = useState(false);
  useEffect(() => {
    if (navigatorRef.current && firstScreenSet === false) {
      setFirstScreenSet(true);
      lastScreen.current = navigatorRef.current.getCurrentRoute()?.name as keyof RootStackParamList;
      onScreenChange({
        oldScreen: null,
        newScreen: lastScreen.current,
      });
      navigatorRef.current.addListener('state', target => {
        if (target.data.state) {
          const actualScreen = target.data.state.routes[target.data.state.index || 0].name;
          if (lastScreen.current && actualScreen !== lastScreen.current) {
            onScreenChange({
              oldScreen: lastScreen.current,
              newScreen: actualScreen as keyof RootStackParamList,
            });
            lastScreen.current = actualScreen as keyof RootStackParamList;
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigatorRef.current]);
};

export default useOnScreenChange;
