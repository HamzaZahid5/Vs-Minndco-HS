/* eslint-disable no-shadow */
/**
 * AUDIO PLAYER USED INTO PROGRAM ACTIVITY SCREEN. ONE OF MANY OPTIONS LIKE VR, 2D VIDEO AND QUESTIONS
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Platform, Animated } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import Color from 'color';
import Loading from '../Loading';
import { useKeepAwake } from 'expo-keep-awake';
let tId;
const AudioPlayer = ({ audioURI = '', didJustFinish = null, testID = 'audio-player' }) => {
  const statusTId = useRef();
  const isSliding = useRef();
  const shouldPlay = useRef();
  const loadSoundPromise = useRef();
  const [isPlaying, setIsPlaying] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [sound, setSound] = useState();
  const [duration, setDuration] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentBuffering, setBuffering] = useState(false);
  const theme = useTheme();
  useKeepAwake();
  const styles = getStyles(theme);

  const rotateValueHolder = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(startAnimation);
  };

  const animatedStyle = {
    transform: [
      {
        rotate: rotateValueHolder.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  const onPlaybackStatusUpdate = status => {
    // didJustFinish: false
    // durationMillis: NaN
    // isBuffering: false
    // isLoaded: true
    // isLooping: false
    // isMuted: false
    // isPlaying: false
    // positionMillis: 0
    // progressUpdateIntervalMillis: 100
    // rate: 1
    // shouldCorrectPitch: false
    // shouldPlay: false
    // uri: "https://firebasestorage.googleapis.com/v0/b/mindcotine-v4-production.appspot.com/o/lifesaver%2FAudio_VAS_1_EN.mp3?alt=media&token=59841ed4-446e-4b0f-b168-e0a1f3f1f938"
    // volume: 1

    if (duration !== status.durationMillis && !isNaN(status.durationMillis)) {
      setDuration(status.durationMillis);
    }
    setCurrentTime(currentTime => (currentTime !== status.positionMillis ? status.positionMillis : currentTime));

    setBuffering(currentBuffering => (currentBuffering !== status.isBuffering ? status.isBuffering : currentBuffering));

    setIsPlaying(isPlaying => (isPlaying !== status.isPlaying ? status.isPlaying : isPlaying));

    setIsLoaded(isLoaded => (isLoaded !== status.isLoaded ? status.isLoaded : isLoaded));
  };
  async function loadSound(uri) {
    const downloadFirst = true;
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true },
      onPlaybackStatusUpdate,
      downloadFirst,
    );
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    setSound(sound);
    return sound;
  }
  async function playSound() {
    await sound?.playAsync();
  }
  async function pauseSound() {
    await sound?.pauseAsync();
  }
  async function stopSound() {
    await sound?.stopAsync();
    setCurrentTime(0);
  }

  useEffect(() => {
    if (shouldPlay.current) {
      playSound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sound]);

  useEffect(() => {
    if (audioURI) {
      loadSoundPromise.current = loadSound(audioURI);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioURI]);
  useEffect(
    () => () => {
      if (loadSoundPromise.current)
        loadSoundPromise.current.then(sound => {
          sound?.stopAsync();
          sound?.unloadAsync();
        });
    },
    [],
  );
  // useKeepAwake();
  useEffect(() => {
    shouldPlay.current = true;
    return () => {
      clearTimeout(tId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clearTimeout(statusTId.current);
    };
  }, []);

  useEffect(() => {
    if (isLoaded === true && currentBuffering === false && shouldPlay.current === true && isPlaying === false)
      playSound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBuffering, isLoaded]);

  useEffect(() => {
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seekTo = val => {
    if (!sound) return;
    setCurrentTime(val);
    sound.setPositionAsync(val);
  };
  const slidingStart = () => {
    if (isPlaying) {
      pauseSound();
    }
    isSliding.current = true;
  };
  const slidingComplete = val => {
    if (!sound) return;
    if (val === duration) {
      shouldPlay.current = false;
      stopSound();
      didJustFinish();
      return;
    }
    seekTo(val);
    if (shouldPlay.current && !isPlaying) {
      playSound();
    }
    isSliding.current = false;
  };

  if (duration === currentTime && isPlaying) {
    // reach the end
    shouldPlay.current = false;
    stopSound();
    didJustFinish();
  }
  const status = isLoaded === true && currentBuffering === false ? (isPlaying ? 'playing' : 'pause') : 'loading';
  return (
    <View style={styles.playerContainer} testID={`${testID}-${status}`}>
      {isLoaded === true && currentBuffering === false ? (
        <View style={styles.controls}>
          <IconButton
            icon={isPlaying ? 'pause' : 'play'}
            size={30}
            color="white"
            style={{ ...styles.playIcon }}
            onPress={() => {
              if (isLoaded === false || currentBuffering === true) return;
              shouldPlay.current = !shouldPlay.current;
              if (shouldPlay.current && !isPlaying) {
                playSound();
              }
              if (!shouldPlay.current && isPlaying) {
                pauseSound();
              }
            }}
          />
        </View>
      ) : (
        <Loading style={styles.controls} iconStyle={styles.playIcon} />
      )}
      <Slider
        style={styles.progressSlider}
        minimumValue={0}
        maximumValue={duration || 0}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor={Platform.OS === 'ios' ? Color('white').fade(0.5).toString() : 'white'}
        onSlidingStart={slidingStart}
        onSlidingComplete={slidingComplete}
        value={!isSliding.current ? currentTime : currentTime}
        thumbTintColor="white"
      />
    </View>
  );
};

AudioPlayer.propTypes = {
  audioURI: PropTypes.string,
  didJustFinish: PropTypes.func,
  testID: PropTypes.string,
};

export default AudioPlayer;

const getStyles = theme =>
  StyleSheet.create({
    playerContainer: {
      width: 400,
      flex: 1,
      justifyContent: 'center',
      padding: 30,
    },
    controls: {
      flexDirection: 'row',
      marginBottom: 25,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80,
    },
    progressIconsContainer: {
      flexDirection: 'row',
    },
    playIcon: {
      backgroundColor: theme.colors.accent,
    },
    progressSlider: {
      // backgroundColor: 'lime',
    },
  });
const sigmoidalEasingGenerator = (p, s) => {
  const c = 2 / (1 - s) - 1;
  const f = (t, n) => Math.pow(t, c) / Math.pow(n, c - 1);

  return t => {
    if (t < p) return f(t, p);
    else return 1 - f(1 - t, 1 - p);
  };
};
