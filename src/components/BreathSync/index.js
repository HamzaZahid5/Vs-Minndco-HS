/**
 * BREATH SYNC ANIMATION WITH CIRCLES
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Animated, LayoutAnimation, StyleSheet } from 'react-native';
import { Title, Button, useTheme } from 'react-native-paper';
// import Sound from 'react-native-sound';
// import { useKeepAwake } from '@sayem314/react-native-keep-awake';
// import { translate } from './../../utils/localization';
// import theme from './../../styles/BasicNewTheme';
// import RoundedBackButton from '../../components/RoundedBackButton';
let tId;
// const winSound = new Sound(
//   require('./../../styles/sounds/MicroGameWin.mp3'),
//   error => {
//     if (error) {
//       console.error(error);
//     }
//   },
// );
// const lostSound = new Sound(
//   require('./../../styles/sounds/MicroGameLost.mp3'),
//   error => {
//     if (error) {
//       console.error(error);
//     }
//   },
// );
const playWinSound = () => {
  // winSound.play();
};
const playLostSound = () => {
  // lostSound.play();
};

// const holdBreath = callback => {
//   clearTimeout(tId);
//   tId = setTimeout(callback, 1500);
// };

const BreathSync = ({ onClose = Function }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [play, setPlay] = useState(false);
  const [counter, setCounter] = useState(-1);
  const [next, setNext] = useState();
  const position = useRef(new Animated.ValueXY({ x: -100, y: -150 })).current;
  const size = useRef(new Animated.Value(0)).current;
  // const [animation, _] = useState(new Animated.ValueXY({ x: -10, y: -10 }));
  const [step, setStep] = useState('INIT');

  // useKeepAwake();
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
    return () => {
      clearTimeout(tId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  useEffect(() => {
    if (counter === 0) {
      setPlay(false);
      setStep('INIT');
      playWinSound();
    }
  }, [counter]);

  useEffect(() => {
    if (play) {
      next === 'breath-out' ? breathOut() : breathIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next, play]);

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
            setNext('breath-out');
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
        setCounter(counter => counter - 1);
        setStep('HOLD-OUT');
        Animated.timing(position, {
          toValue: { x: -100, y: -150 },
          duration: 1500,
          useNativeDriver: true,
        }).start(({ finished: finishHold }) => {
          if (finishHold) {
            setNext('breath-in');
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Title style={styles.title}>{counter !== 0 ? 'Take 20 calm breaths' : 'Well done!'}</Title>
      </View>
      {play && counter !== -1 && <Title style={styles.counter}>{counter}</Title>}
      <View style={styles.bodyContainer}>
        <Title style={styles.instructions}>{counter === -1 ? 'Sync your breathing with the square' : ' '}</Title>
        <View style={styles.squareContainer}>
          {counter <= 0 && (
            <Button
              onPress={() => {
                if (counter === 0) {
                  onClose();
                } else {
                  setPlay(true);
                }
              }}
              style={styles.startButton}
              labelStyle={{
                // fontWeight: '400',
                fontSize: 21,
                color: theme.colors.primary,
              }}
            >
              {counter === 0 ? 'Tap to finish' : 'Tap to start'}
            </Button>
          )}
          <View style={styles.legend}>
            {step !== 'INIT' && (
              <Text style={styles.legendFont}>
                {step === 'IN' ? 'BREATHE IN' : step === 'OUT' ? 'BREATHE OUT' : 'HOLD'}
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
      // flex: 1,
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
      marginRight: 40,
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
      // height: '25%',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 5,
      // marginBottom: '25%',
      // backgroundColor: '#f00a',
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
      backgroundColor: theme.colors.card + 'AA',
      width: 20,
      height: 20,
      borderRadius: 5,
      // justifyContent: 'center',
      // alignItems: 'center',
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
