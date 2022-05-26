/**
 * BREATH SYNC ANIMATION WITH CIRCLES
 */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Pressable, Animated, LayoutAnimation, StyleSheet } from 'react-native'
import { Title, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Color from 'color'
import { useKeepAwake } from 'expo-keep-awake'
import { translate } from './../../utils/localization'
import FadeEffect from '../FadeEffect'
import { useRobTheme } from '@mindcoxr/rob'
import { RobTheme } from '@mindcoxr/rob/dist/typescript/theme'
import { useNavigation } from '@react-navigation/native'
let tId: NodeJS.Timeout

const holdBreath = (callback: () => void) => (tId = setTimeout(callback, 1500))

const BreathSync = ({ onClose = Function, testID = '' }) => {
  const theme = useRobTheme()
  const styles = getStyles(theme)
  const [play, setPlay] = useState(false)
  const [counter, setCounter] = useState(-1)
  const [animation] = useState(new Animated.Value(0))
  const [step, setStep] = useState('INIT')
  useKeepAwake()
  useEffect(() => {
    if (play) {
      setCounter(10)
      breathIn()
    }
    // fade in whole screen
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 2000,
    })
    return () => {
      clearTimeout(tId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play])
  useEffect(() => {
    if (counter === 0) {
      setPlay(false)
    }
  }, [counter])
  const breathIn = () => {
    setStep('IN')
    Animated.timing(animation, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setStep('HOLD')
        holdBreath(breathOut)
      }
    })
  }
  const breathOut = () => {
    setStep('OUT')
    Animated.timing(animation, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setCounter(counter => counter - 1)
        setStep('HOLD')
        holdBreath(breathIn)
      }
    })
  }
  const size = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  })
  const animatedStyle = {
    transform: [{ scaleX: size, scaleY: size }],
  }
  const icon = step === 'INIT' ? 'minus' : step === 'IN' ? 'chevron-up' : step === 'OUT' ? 'chevron-down' : 'minus'
  const navigation = useNavigation()
  useEffect(() => {
    const uns = navigation.addListener('beforeRemove', () => {
      uns()
      animation.stopAnimation()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.headerContainer}>
        <Title style={styles.title}>
          {counter !== 0
            ? translate('contents.DEEP_BREATH_SYNC.title_progress')
            : translate('contents.DEEP_BREATH_SYNC.title_done')}
        </Title>
      </View>
      {play && counter !== -1 && <Title style={styles.counter}>{counter}</Title>}
      <View style={styles.bodyContainer}>
        <Title style={styles.instructions}>
          {counter === -1 ? translate('contents.DEEP_BREATH_SYNC.instructions') : ' '}
        </Title>
        <View style={[styles.circleContainer]}>
          {counter === -1 && (
            <Pressable onPress={() => setPlay(true)} style={() => styles.startButton}>
              <Text
                style={{
                  ...theme.fontSizes.exeptions.deepBreathSync0,
                  color: theme.colors.primary,
                  textAlign: 'center',
                }}
              >
                {translate('contents.DEEP_BREATH_SYNC.CTA_start')}
              </Text>
            </Pressable>
          )}
          {counter !== -1 && (
            <Animated.View style={[styles.circle, animatedStyle]}>
              <Icon size={20} name={icon} color="#fff" />
            </Animated.View>
          )}
        </View>
        <View style={styles.legend}>
          {step === 'IN' && (
            <FadeEffect show>
              <Text style={styles.legendFont}>{translate('contents.DEEP_BREATH_SYNC.breath_in')}</Text>
            </FadeEffect>
          )}
          {step === 'HOLD' && (
            <FadeEffect show>
              <Text style={styles.legendFont}>{translate('contents.DEEP_BREATH_SYNC.hold')}</Text>
            </FadeEffect>
          )}
          {step === 'OUT' && (
            <FadeEffect show={step === 'OUT'}>
              <Text style={styles.legendFont}>{translate('contents.DEEP_BREATH_SYNC.breath_out')}</Text>
            </FadeEffect>
          )}
        </View>
      </View>
    </View>
  )
}

BreathSync.propTypes = {
  onClose: PropTypes.func,
  testID: PropTypes.string,
}

export default BreathSync

const getStyles = (theme: RobTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    circleContainer: {
      width: 280,
      height: 280,
      justifyContent: 'center',
      position: 'relative',
      alignItems: 'center',
      backgroundColor: theme.colors.primaryPalette['500'] + '88',
      borderRadius: 140,
    },
    circle: {
      backgroundColor: theme.colors.primaryPalette['600'],
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    legend: {
      width: '100%',
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginVertical: 20,
      paddingHorizontal: 24,
      textAlign: 'center',
      textTransform: 'uppercase',
      color: theme.colors.backdrop,
      flex: 1,
    },
    instructions: {
      marginVertical: 20,
      paddingHorizontal: 24,
      textAlign: 'center',
      ...theme.fontSizes.exeptions.deepBreathSync1,
      color: theme.colors.backdrop,
    },
    legendFont: {
      ...theme.fontSizes.exeptions.deepBreathSync2,
      color: theme.colors.monochrome.label,
    },
    bodyContainer: {
      alignItems: 'center',
      height: '100%',
      marginTop: '25%',
    },
    headerContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    backButtonStyle: {
      backgroundColor: theme.colors.primary,
    },
    startButton: {
      zIndex: 10,
      position: 'absolute',
      top: 115,
    },
    counter: {
      position: 'absolute',
      right: 0,
      ...theme.fontSizes.exeptions.deepBreathSync3,
      lineHeight: 120,
      margin: 20,
      marginTop: 40,
      color: theme.colors.backdrop,
    },
  })
