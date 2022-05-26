import { Headline, Icon } from '@mindcoxr/rob'
import { useNavigation } from '@react-navigation/native'
import { StackHeaderProps } from '@react-navigation/stack'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Animated, Platform, View, StatusBar } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { IconNamesTypes } from '@mindcoxr/rob/dist/typescript/components/Icon'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export type HeaderExtraProps = {
  color?: string
  rightActions?: { icon: IconNamesTypes; action: () => void }[]
  routeName?: string
  backgroundColor?: string
  height?: string | number
  gradientHeight?: number
  contentAtBottom?: boolean
  showGradient?: 'animated' | 'always'
  opacity?: number
  animatedControl?: { animatedValue: React.MutableRefObject<Animated.Value>; interpolationInput: [number, number] }
}

const NavigationHeader = ({
  navigation,
  color,
  routeName,
  backgroundColor,
  height,
  contentAtBottom,
  gradientHeight = 80,
  animatedControl,
  showGradient = 'animated',
  rightActions = [],
  opacity = 1,
}: StackHeaderProps & HeaderExtraProps) => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => setShow(false))
    const unsubscribeFocus = navigation.addListener('focus', () => setShow(true))

    return () => {
      unsubscribeBlur()
      unsubscribeFocus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isGradientVisible = animatedControl !== undefined || showGradient === 'always'
  useEffect(() => {
    if (Platform.OS === 'ios' && isGradientVisible) {
      if (show) {
        StatusBar.setBarStyle('light-content')
      } else {
        StatusBar.setBarStyle('dark-content')
      }
    }
  }, [isGradientVisible, show])
  const insets = useSafeAreaInsets()

  if (!show) return null
  let animationInterpolation
  if (animatedControl) {
    animationInterpolation = animatedControl.animatedValue.current.interpolate({
      inputRange: animatedControl.interpolationInput,
      outputRange: [0, 1],
    })
  }

  return (
    <View
      style={[
        {
          paddingHorizontal: 25,
          paddingTop: contentAtBottom ? 51 : Math.max(insets.top, 35),
          paddingBottom: contentAtBottom ? 17 : undefined,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          opacity,
        },
        Platform.OS === 'ios' && { paddingBottom: 0 },
        height !== undefined && { height },
        backgroundColor !== undefined && { backgroundColor },
        isGradientVisible && { height: gradientHeight },
      ]}
    >
      {animatedControl !== undefined && showGradient === 'animated' && (
        <AnimatedLinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={{
            height: gradientHeight,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: animationInterpolation,
          }}
        />
      )}
      {showGradient === 'always' && (
        <AnimatedLinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={{
            height: gradientHeight,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      )}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingTop: 3 }}>
        <TouchableRipple
          onPress={() => navigation.goBack()}
          style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}
        >
          <Icon name="LeftArrow" color={color ?? '#FCFCFC'} />
        </TouchableRipple>
      </View>
      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        {routeName !== undefined && (
          <Headline size="small" textAlign="center" weight="bold">
            {routeName}
          </Headline>
        )}
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexDirection: 'row',
          flex: 1,
        }}
      >
        {rightActions.map((e, i) => (
          <TouchableRipple
            key={e.icon + i.toString()}
            onPress={e.action}
            style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, marginLeft: 10 }}
          >
            <Icon name={e.icon} color={color ?? '#fcfcfc'} />
          </TouchableRipple>
        ))}
      </View>
    </View>
  )
}

export const useSetHeaderProps = (extraProps: HeaderExtraProps | undefined, dependecies: any[]) => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    if (extraProps) {
      navigation.setOptions({
        header: (props: StackHeaderProps) => <NavigationHeader {...extraProps} {...props} />,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependecies])
}

export default NavigationHeader
