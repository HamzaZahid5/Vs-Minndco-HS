/**
 * BREATH SYNC ANIMATION WITH CIRCLES
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable, Animated, LayoutAnimation, StyleSheet } from 'react-native';
import { Title, useTheme } from 'react-native-paper';
import Color from 'color';
import { useKeepAwake } from 'expo-keep-awake';
import { translate } from './../../utils/localization';

const BreathSync = ({ onClose = Function, testID }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [play, setPlay] = useState(false);
  const [counter, setCounter] = useState(-1);
  const position = useRef(new Animated.ValueXY({ x: -100, y: -150 })).current;
  const size = useRef(new Animated.Value(0)).current;
  const [step, setStep] = useState('INIT');

  useKeepAwake();
  useEffect(() => {
    if (play) {
      setCounter(20);
      breathIn();
    }
    // fade in whole screen
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 1000,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  useEffect(() => {
    if (counter === 0) {
      setPlay(false);
      setStep('INIT');
    }
  }, [counter]);

  const breathIn = () => {
    setStep('IN');
    Animated.timing(size, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    Animated.timing(position, {
      toValue: { x: -100, y: -450 },
      duration: 2000,
      useNativeDriver: true,
    }).start(({ finished: finishIn }) => {
      if (finishIn) {
        setStep('HOLD-IN');
        Animated.timing(position, {
          toValue: { x: 100, y: -450 },
          duration: 1500,
          useNativeDriver: true,
        }).start(({ finished: finishHold }) => {
          if (finishHold) {
            breathOut();
          }
        });
      }
    });
  };
  const breathOut = () => {
    setStep('OUT');
    Animated.timing(size, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    Animated.timing(position, {
      toValue: { x: 100, y: -150 },
      duration: 2000,
      useNativeDriver: true,
    }).start(({ finished: finishOut }) => {
      if (finishOut) {
        setStep('HOLD-OUT');
        Animated.timing(position, {
          toValue: { x: -100, y: -150 },
          duration: 1500,
          useNativeDriver: true,
        }).start(({ finished: finishHold }) => {
          if (finishHold) {
            setCounter(counter => {
              if (counter > 1) {
                breathIn();
              }
              return counter - 1;
            });
          }
        });
      }
    });
  };
  const scale = size.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });
  const transform = position.getTranslateTransform();
  transform[2] = { scaleX: scale };
  transform[3] = { scaleY: scale };
  const animatedStyle = {
    transform,
  };

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.headerContainer}>
        <Title style={styles.title}>
          {counter !== 0
            ? translate('contents.BREATH_SYNC.title_progress')
            : translate('contents.BREATH_SYNC.title_done')}
        </Title>
      </View>
      {play && counter !== -1 && <Title style={styles.counter}>{counter}</Title>}
      <View style={styles.bodyContainer}>
        <Title style={styles.instructions}>
          {counter === -1 ? translate('contents.BREATH_SYNC.instructions') : ' '}
        </Title>
        <View style={styles.squareContainer}>
          {counter <= 0 && (
            <Pressable
              onPress={() => {
                if (counter === 0) {
                  onClose();
                } else {
                  setPlay(true);
                }
              }}
              style={() => styles.startButton}
            >
              <Text
                style={{
                  fontSize: 21,
                  color: theme.colors.primary,
                  textAlign: 'center',
                }}
              >
                {counter === 0
                  ? translate('contents.BREATH_SYNC.CTA_finish')
                  : translate('contents.BREATH_SYNC.CTA_start')}
              </Text>
            </Pressable>
          )}
          <View style={styles.legend}>
            {step !== 'INIT' && (
              <Text style={styles.legendFont}>
                {step === 'IN'
                  ? translate('contents.BREATH_SYNC.breath_in')
                  : step === 'OUT'
                  ? translate('contents.BREATH_SYNC.breath_out')
                  : translate('contents.BREATH_SYNC.hold')}
              </Text>
            )}
          </View>
          <Animated.View style={[styles.indicator, animatedStyle]} />
        </View>
      </View>
    </View>
  );
};

BreathSync.propTypes = {
  onClose: PropTypes.func,
  testID: PropTypes.string,
};

export default BreathSync;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    squareContainer: {
      width: 200,
      height: 300,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: theme.colors.background + '88',
      borderRadius: 5,
    },
    legend: {
      width: 200, // should match with squareContainer
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginVertical: 20,
      textAlign: 'center',
      textTransform: 'uppercase',
      color: theme.colors.backdrop,
      flex: 1,
    },
    instructions: {
      marginVertical: 20,
      paddingHorizontal: 24,
      textAlign: 'center',
      fontSize: 20,
      color: theme.colors.backdrop,
    },
    legendFont: {
      ...theme.fonts.heading2,
      fontSize: 24,
      color: theme.colors.backdrop,
      width: '100%',
      textAlign: 'center',
    },
    bodyContainer: {
      alignItems: 'center',
      height: '100%',
      marginTop: '25%',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
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
      width: 250,
      textAlign: 'right',
      fontSize: 150,
      lineHeight: 150,
      margin: 20,
      marginTop: 40,
      color: theme.colors.backdrop,
    },
    indicator: {
      backgroundColor: Color(theme.colors.accent).alpha(0.5).toString(),
      width: 20,
      height: 20,
      borderRadius: 5,
      position: 'absolute',
      bottom: -160,
      left: 90,
    },
    bottomLeft: {
      bottom: -10,
      left: -10,
      width: 20,
      height: 20,
    },
    bottomRight: {
      bottom: -10,
      right: -10,
      width: 20,
      height: 20,
    },
    upperLeft: {
      top: -20,
      left: -20,
      width: 40,
      height: 40,
    },
    upperRight: {
      top: -20,
      right: -20,
      width: 40,
      height: 40,
    },
  });
