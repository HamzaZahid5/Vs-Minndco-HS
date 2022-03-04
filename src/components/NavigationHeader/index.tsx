import { Headline, Icon } from '@mindcoxr/rob'
import { useNavigation } from '@react-navigation/native'
import { StackHeaderProps } from '@react-navigation/stack'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Animated, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export type HeaderExtraProps = {
  color?: string
  onRigthPressed?: () => void
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
  onRigthPressed,
  routeName,
  backgroundColor,
  height,
  contentAtBottom,
  animatedControl,
  showGradient = 'animated',
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
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      )}
      <TouchableRipple
        borderless
        onPress={() => navigation.goBack()}
        style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingLeft: 5, borderRadius: 16 }}
      >
        <Icon name="LeftArrow" color={color ?? '#FCFCFC'} />
      </TouchableRipple>
      {routeName !== undefined && (
        <Headline size="small" textAlign="center" weight="bold">
          {routeName}
        </Headline>
      )}
      <TouchableRipple
        borderless
        onPress={onRigthPressed}
        style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 16, padding: 5 }}
      >
        <Icon name="QuestionMark" color={color ?? '#fcfcfc'} />
      </TouchableRipple>
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
