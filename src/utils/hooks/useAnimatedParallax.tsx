import React, { useRef } from 'react'
import { Animated, StyleProp, ViewStyle } from 'react-native'

type params = { styles?: StyleProp<ViewStyle>[]; marginOffsett?: number; interpolationRange?: number }

const useAnimatedParallax = ({ styles = [], marginOffsett = -20, interpolationRange = 155 }: params) => {
  const scrollViewAnimatedOffset = useRef(new Animated.Value(0))
  const fadeAnimInterpolation = scrollViewAnimatedOffset.current.interpolate({
    inputRange: [0, interpolationRange],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })
  const marginAnimInterpolation = scrollViewAnimatedOffset.current.interpolate({
    inputRange: [0, interpolationRange],
    outputRange: [0, marginOffsett],
    extrapolate: 'clamp',
  })

  const AnimatedViewElement = useRef(({ children }: { children?: React.ReactNode }) => (
    <Animated.View
      style={[...styles, { opacity: fadeAnimInterpolation, transform: [{ translateY: marginAnimInterpolation }] }]}
    >
      {children}
    </Animated.View>
  )).current
  const animatedEvent = () =>
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollViewAnimatedOffset.current } } }], {
      useNativeDriver: false,
    })

  return { AnimatedViewElement, animatedEvent, animationControl: scrollViewAnimatedOffset }
}

export default useAnimatedParallax
