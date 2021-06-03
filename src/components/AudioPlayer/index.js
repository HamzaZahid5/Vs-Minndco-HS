/**
 * AUDIO PLAYER USED INTO PROGRAM ACTIVITY SCREEN. ONE OF MANY OPTIONS LIKE VR, 2D VIDEO AND QUESTIONS
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Platform } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import Color from 'color';

let tId;
const ActivityPlayerVideo = ({ audioURI = '', didJustFinish = null }) => {
  const statusTId = useRef();
  const isSliding = useRef();
  // const isPlaying = useRef();
  const shouldPlay = useRef();
  const [isPlaying, setIsPlaying] = useState();
  // const [shouldPlay, setShouldPlay] = useState();
  const [sound, setSound] = useState();
  const [duration, setDuration] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentBuffering, setBuffering] = useState(false);
  const theme = useTheme();
  const styles = getStyles(theme);

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
    if (currentTime !== status.positionMillis) {
      setCurrentTime(status.positionMillis);
    }
    if (duration !== status.durationMillis && !isNaN(status.durationMillis)) {
      setDuration(status.durationMillis);
    }
    if (currentBuffering !== status.isBuffering) {
      setBuffering(status.isBuffering);
    }
    if (isPlaying !== status.isPlaying) {
      setIsPlaying(status.isPlaying);
    }
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
    return () => {
      sound?.stopAsync();
      sound?.unloadAsync();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sound]);

  useEffect(() => {
    if (audioURI) {
      loadSound(audioURI);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioURI]);

  // useKeepAwake();
  useEffect(() => {
    shouldPlay.current = true;
    return () => {
      clearTimeout(tId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clearTimeout(statusTId.current);
    };
  }, []);
  const seekTo = val => {
    setCurrentTime(val);
    sound.setPositionAsync(val);
  };
  const slidingStart = () => {
    if (isPlaying) {
      stopSound();
    }
    isSliding.current = true;
  };
  const slidingComplete = val => {
    setCurrentTime(val);
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
  return (
    <View style={styles.playerContainer}>
      <View style={styles.controls}>
        <IconButton
          icon={isPlaying ? 'pause' : 'play'}
          size={30}
          color="white"
          style={styles.playIcon}
          onPress={() => {
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

ActivityPlayerVideo.propTypes = {
  audioURI: PropTypes.string,
  didJustFinish: PropTypes.func,
};

export default ActivityPlayerVideo;

const getStyles = theme =>
  StyleSheet.create({
    playerContainer: {
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      padding: 30,
    },
    controls: {
      flexDirection: 'row',
      marginBottom: 25,
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
