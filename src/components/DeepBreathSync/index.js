/**
 * BREATH SYNC ANIMATION WITH CIRCLES
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Animated, LayoutAnimation, StyleSheet } from 'react-native';
import { Title, Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from 'color';
// import Sound from 'react-native-sound';
// import { useKeepAwake } from '@sayem314/react-native-keep-awake';
// import { translate } from './../../utils/localization';
import FadeEffect from '../FadeEffect';
// import theme from '../../styles/BasicNewTheme';
// import RoundedBackButton from '../RoundedBackButton';
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

const holdBreath = callback => (tId = setTimeout(callback, 1500));

const BreathSync = ({ onClose = Function }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [play, setPlay] = useState(false);
  const [counter, setCounter] = useState(-1);
  const [animation] = useState(new Animated.Value(0));
  const [step, setStep] = useState('INIT');
  // useKeepAwake();
  useEffect(() => {
    if (play) {
      setCounter(10);
      breathIn();
    }
    // fade in whole screen
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 2000,
    });
    return () => {
      clearTimeout(tId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);
  useEffect(() => {
    if (counter === 0) {
      setPlay(false);
      playWinSound();
    }
  }, [counter]);
  const breathIn = () => {
    setStep('IN');
    Animated.timing(animation, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setStep('HOLD');
        holdBreath(breathOut);
      }
    });
  };
  const breathOut = () => {
    setStep('OUT');
    Animated.timing(animation, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setCounter(counter => counter - 1);
        setStep('HOLD');
        holdBreath(breathIn);
      }
    });
  };
  const size = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });
  const animatedStyle = {
    // width: size,
    // height: size,
    transform: [{ scaleX: size, scaleY: size }],
    // backgroundColor: color,
  };
  const icon = step === 'INIT' ? 'minus' : step === 'IN' ? 'chevron-up' : step === 'OUT' ? 'chevron-down' : 'minus';
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <RoundedBackButton
          style={styles.backButtonStyle}
          onPress={() => {
            const completed = counter === 0;
            if (!completed) {
              playLostSound();
            }
            onClose(completed);
          }}
        /> */}
        <Title style={styles.title}>{counter !== 0 ? 'Take 10 deep breaths' : 'Well done!'}</Title>
      </View>
      {play && counter !== -1 && <Title style={styles.counter}>{counter}</Title>}
      <View style={styles.bodyContainer}>
        <Title style={styles.instructions}>{counter === -1 ? 'Sync your breathing with the sphere' : ' '}</Title>
        <View style={[styles.circleContainer]}>
          {counter === -1 && (
            <Button
              onPress={() => setPlay(true)}
              style={styles.startButton}
              labelStyle={{
                // fontWeight: '400',
                fontSize: 30,
                color: theme.colors.primary,
              }}
            >
              {'Tap to start'}
            </Button>
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
              <Text style={styles.legendFont}>{'BREATHE IN'}</Text>
            </FadeEffect>
          )}
          {step === 'HOLD' && (
            <FadeEffect show>
              <Text style={styles.legendFont}>{'HOLD'}</Text>
            </FadeEffect>
          )}
          {step === 'OUT' && (
            <FadeEffect show={step === 'OUT'}>
              <Text style={styles.legendFont}>{'BREATHE OUT'}</Text>
            </FadeEffect>
          )}
        </View>
      </View>
      {/* <Button onPress={breathIn} title="in" />
      <Button onPress={breathOut} title="out" /> */}
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
    circleContainer: {
      width: 280,
      height: 280,
      justifyContent: 'center',
      position: 'relative',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 140,
    },
    circle: {
      backgroundColor: Color(theme.colors.accent).alpha(0.5).toString(),
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    legend: {
      width: '100%',
      // flex: 1,
      height: 80,
      // backgroundColor: '#f00a',
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
      color: theme.colors.MediumConcrete,
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
      fontSize: 150,
      lineHeight: 150,
      margin: 20,
      marginTop: 40,
      color: theme.colors.backdrop,
    },
  });
