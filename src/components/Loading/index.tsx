/* eslint-disable no-shadow */
/**
 * AUDIO PLAYER USED INTO PROGRAM ACTIVITY SCREEN. ONE OF MANY OPTIONS LIKE VR, 2D VIDEO AND QUESTIONS
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes, { string } from 'prop-types';
import { View, StyleSheet, Platform, Animated } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

const Loading = ({
  style,
  iconStyle,
  iconSize = 30,
  ...props
}: Record<string, unknown> & {
  style?: Record<string, unknown>;
  iconStyle?: Record<string, unknown>;
  iconSize: number;
}) => {
  const rotateValueHolder = useRef(new Animated.Value(0)).current;
  const isUnmounted = useRef(false);

  const startAnimation = () => {
    rotateValueHolder.setValue(0);
    if (isUnmounted.current) {
      return;
    }
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: sigmoidalEasingGenerator(0.5, 0.5),
    }).start(startAnimation);
  };

  const animatedStyle = {
    transform: [
      {
        rotate: rotateValueHolder.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  useEffect(() => {
    startAnimation();
    return () => {
      isUnmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!style) {
    style = {};
  }

  return (
    <Animated.View style={{ ...style, ...animatedStyle }}>
      <IconButton
        icon={'loading'}
        size={iconSize}
        color="white"
        style={iconStyle}
        onPress={() => {
          return;
        }}
      />
    </Animated.View>
  );
};

export default Loading;

const sigmoidalEasingGenerator = (p: number, s: number) => {
  const c = 2 / (1 - s) - 1;
  const f = (t: number, n: number) => Math.pow(t, c) / Math.pow(n, c - 1);

  return (t: number) => {
    if (t < p) return f(t, p);
    else return 1 - f(1 - t, 1 - p);
  };
};
