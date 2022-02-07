import { Animated, EasingFunction, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import env from '../../../env';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoadingScreen = () => {
  const rotateValueHolder = useRef(new Animated.Value(0)).current;
  const isUnmounted = useRef(false);
  const startAnimation = () => {
    if (isUnmounted.current) {
      return; // Stop animation if component is not mounted
    }
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 1000,
      easing: sigmoidalEasingGenerator(0.5, 0.5),
      useNativeDriver: true,
    }).start(startAnimation);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    isUnmounted.current = false;
    startAnimation();
    return () => {
      isUnmounted.current = true;
    };
  }, []); //Only run in component boot

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

  return (
    <View style={styles.view}>
      <Animated.View style={animatedStyle}>
        <MaterialCommunityIcons name="loading" size={70} color="white" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

const sigmoidalEasingGenerator = (p: number, s: number): EasingFunction => {
  const c = 2 / (1 - s) - 1;
  const f = (t: number, n: number): number => Math.pow(t, c) / Math.pow(n, c - 1);

  return (t: number): number => {
    if (t < p) return f(t, p);
    else return 1 - f(1 - t, 1 - p);
  };
};

export default LoadingScreen;
