/**
 * Created by andrewhurst on 10/5/15.
 */
import React, { useRef, useEffect, useState } from 'react';
import { Keyboard, LayoutAnimation, View, useWindowDimensions, Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});

// From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
const defaultAnimation = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200,
  },
};
const KeyboardSpacer = ({ topSpacing = 0, onToggle = () => null, style }) => {
  const [keyboardSpace, setKeyboardSpace] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const listeners = useRef([]);
  const { height } = useWindowDimensions();
  useEffect(() => {
    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    listeners.current.push(
      ...[
        Keyboard.addListener(updateListener, updateKeyboardSpace),
        Keyboard.addListener(resetListener, resetKeyboardSpace),
      ],
    );

    return () => listeners.current.forEach(listener => listener.remove());
  }, []);

  function updateKeyboardSpace(event) {
    if (!event.endCoordinates) {
      return;
    }

    let animationConfig = defaultAnimation;
    if (Platform.OS === 'ios') {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity,
      );
    }
    LayoutAnimation.configureNext(animationConfig);

    // get updated on rotation
    const screenHeight = height;
    // when external physical keyboard is connected
    // event.endCoordinates.height still equals virtual keyboard height
    // however only the keyboard toolbar is showing if there should be one
    const _keyboardSpace = screenHeight - event.endCoordinates.screenY + topSpacing;
    setKeyboardSpace(_keyboardSpace);
    setIsKeyboardOpen(true);
    onToggle(true, keyboardSpace);
  }

  function resetKeyboardSpace(event) {
    let animationConfig = defaultAnimation;
    if (Platform.OS === 'ios') {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity,
      );
    }
    LayoutAnimation.configureNext(animationConfig);

    setKeyboardSpace(0);
    setIsKeyboardOpen(false);
    onToggle(false, 0);
  }

  return <View style={[styles.container, { height: keyboardSpace }, style]} />;
};

export default KeyboardSpacer;
