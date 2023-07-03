import { useRobTheme } from '@mindcoxr/rob'
import React, { useEffect, useRef } from 'react'
import { View, ViewProps, Animated, Easing } from 'react-native'

const TargetIndicator = (props: ViewProps & { show?: boolean; round?: boolean }) => {
  const theme = useRobTheme()
  const fadeAnim = useRef(new Animated.Value(1)).current
  const fadeOut = () => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
        easing: Easing.ease,
      }),
      { resetBeforeIteration: true, iterations: Number.MAX_SAFE_INTEGER },
    ).start()
  }

  useEffect(() => {
    if (props.show) {
      fadeOut()
    } else {
      fadeAnim.stopAnimation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show, fadeAnim])
  
  return (
    <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      {props.children}
      {props.show && (
        <>
          <Animated.View
            style={[
              props.round && {
                width: 50,
                height: 50,
              },
              !props.round && {
                width: '110%',
                height: '125%',
              },
              {
                borderWidth: 3,
                zIndex: -1,
                // borderColor: theme.colors.warning.dark,
                borderColor: theme.colors.primaryPalette[500],
                borderRadius: props.round ? 50 : 20,
                position: 'absolute',
                opacity: fadeAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.5, 0, 0.5],
                }),
              },
            ]}
          />
          
        </>
      )}
    </View>
  )
}

export default TargetIndicator
