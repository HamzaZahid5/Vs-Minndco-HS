import { Headline, Icon } from '@mindcoxr/rob'
import { useNavigation } from '@react-navigation/native'
import { StackHeaderProps } from '@react-navigation/stack'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Animated, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { IconNamesTypes } from '@mindcoxr/rob/dist/typescript/components/Icon'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export type HeaderExtraProps = {
  color?: string
  rightActions?: { icon: IconNamesTypes; action: () => void }[]
  routeName?: string
  backgroundColor?: string
  height?: string
  contentAtBottom?: boolean
  showGradient?: 'animated' | 'always'
  animatedControl?: { animatedValue: React.MutableRefObject<Animated.Value>; interpolationInput: [number, number] }
}

const NavigationHeader = ({
  navigation,
  color,
  routeName,
  backgroundColor,
  height,
  contentAtBottom,
  animatedControl,
  showGradient = 'animated',
  rightActions = [],
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
          paddingTop: contentAtBottom ? 51 : 30,
          paddingBottom: contentAtBottom ? 17 : 30,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        },
        height !== undefined && { height: 0 },
        backgroundColor !== undefined && { backgroundColor },
      ]}
    >
      {animatedControl !== undefined && showGradient === 'animated' && (
        <AnimatedLinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={{
            height: 80,
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
            height: 60,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      )}
      <TouchableRipple
        onPress={() => navigation.goBack()}
        style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}
      >
        <Icon name="LeftArrow" color={color ?? '#FCFCFC'} />
      </TouchableRipple>
      {routeName !== undefined && (
        <Headline size="small" textAlign="center" weight="bold">
          {routeName}
        </Headline>
      )}
      <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
        {rightActions.map((e, i) => (
          <TouchableRipple
            key={e.icon + i.toString()}
            onPress={e.action}
            style={{ justifyContent: 'center', alignItems: 'center', padding: 15, marginLeft: 10 }}
          >
            <Icon name={e.icon} color={color ?? '#fcfcfc'} />
          </TouchableRipple>
        ))}
      </View>
    </View>
  )
}

export const useSetHeaderProps = (extraProps: HeaderExtraProps, dependecies: any[]) => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props: StackHeaderProps) => <NavigationHeader {...extraProps} {...props} />,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependecies])
}

export default NavigationHeader
