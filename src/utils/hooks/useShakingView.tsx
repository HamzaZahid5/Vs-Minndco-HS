import React, { useEffect, useRef } from 'react'
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native'

const useShakingView = () => {
  const shakeAnim = useRef(new Animated.Value(0)).current
  const shakeInterpolation = shakeAnim.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -15, 0, 15, 0, -15, 0],
  })
  const animation = useRef(
    Animated.timing(shakeAnim, {
      duration: 400,
      toValue: 3,
      easing: Easing.bounce,
      useNativeDriver: true,
    }),
  ).current
  const AnimatedViewElement = useRef(
    ({ style, children }: { style?: StyleProp<ViewStyle>; children?: React.ReactNode }) => (
      <Animated.View style={[style, { transform: [{ translateX: shakeInterpolation }] }]}>{children}</Animated.View>
    ),
  ).current

  const shake = () => {
    shakeAnim.setValue(0)
    animation.start()
  }

  return { AnimatedViewElement, shake }
}

export default useShakingView
