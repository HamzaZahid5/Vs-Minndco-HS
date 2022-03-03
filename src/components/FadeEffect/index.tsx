/**
 * FADES IN OR OUT ITS CHILDREN.
 * USED INTO LIFESAVER CHAT BOT, BASIC TUTORIAL AND LOGIN.
 */
import React, { useState, useEffect, useRef, ReactElement } from 'react'
import { Animated, LayoutAnimation, RegisteredStyle, ViewStyle } from 'react-native'
export type fadeEffectType = {
  show: boolean
  duration: number
  style: RegisteredStyle<ViewStyle>
}
const FadeEffect = ({ show, children, duration = 400, style }: fadeEffectType & { children: ReactElement }) => {
  const [animation, _] = useState(new Animated.Value(0))
  const [appear, setAppear] = useState(false)
  const appearTimeIDRef = useRef<ReturnType<typeof setTimeout> | number | undefined>()
  useEffect(() => {
    if (show) {
      LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.easeInEaseOut, duration: duration / 2 }, () => {
        fadeIn()
      })
      setAppear(true)
    } else {
      fadeOut()
      appearTimeIDRef.current = setTimeout(() => {
        setAppear(false)
      }, duration)
    }
    return () => clearTimeout(appearTimeIDRef.current as number)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])
  const fadeIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start()
  }
  const fadeOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View style={[style, { opacity: animation, display: !appear ? 'none' : 'flex' }]}>
      {children}
    </Animated.View>
  )
}

export default FadeEffect
