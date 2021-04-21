/**
 * AUDIO PLAYER USED INTO PROGRAM ACTIVITY SCREEN. ONE OF MANY OPTIONS LIKE VR, 2D VIDEO AND QUESTIONS
 */
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { Audio } from 'expo-av'
import Slider from '@react-native-community/slider';
import Color from 'color';

let tId;
const ActivityPlayerVideo = ({ src = '', onEnd = null }) => {
  const statusTId = useRef();
  const isSliding = useRef();
  const isPlaying = useRef();
  const shouldPlay = useRef();
  const [sound, setSound] = useState();
  const [duration, setDuration] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const theme = useTheme();
  const styles = getStyles(theme);

  async function loadSound(uri) {
    const { sound } = await Audio.Sound.createAsync({uri});
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    setSound(sound);
  }
  async function playSound() {
    await sound?.playAsync();
    isPlaying.current = true;
  }
  async function pauseSound() {
    await sound?.pauseAsync();
    isPlaying.current = false;
  }
  async function stopSound() {
    await sound?.stopAsync();
    isPlaying.current = false;
    setCurrentTime(0);
  }
  
  const getStatus = () => {
    //durationMillis
    sound?.getStatusAsync().then(status => {
      if (currentTime !== status.positionMillis) {
        setCurrentTime(status.positionMillis);
      }
      if (duration !== status.durationMillis) {
        setDuration(status.durationMillis);
      }
      
      statusTId.current = setTimeout(getStatus, 100);
    });
  }
  useEffect(() => {
    getStatus();
    if(shouldPlay.current) {
      playSound();
    }
    return () => {
      sound?.stopAsync();
      sound?.unloadAsync();
    }
  }, [sound]);

  useEffect(() => {
    if (src) {
      loadSound(src);
    }
  }, [src]);

  // useKeepAwake();
  useEffect(() => {
    shouldPlay.current = true;
    return () => {
      clearTimeout(tId);
      clearTimeout(statusTId.current);
    };
  }, []);
  const seekTo = val => {
    setCurrentTime(val);
    sound.setPositionAsync(val);
  };
  const slidingStart = () => {

    isSliding.current = true;
  };
  const slidingComplete = val => {
    setCurrentTime(val);
    seekTo(val);
    if (shouldPlay.current && !isPlaying.current) {
      playSound();
    }
    isSliding.current = false;
  };
  
  if (duration === currentTime && isPlaying.current) {
    // reach the end
    shouldPlay.current = false;
    stopSound();
  }
  return (
    <View style={styles.playerContainer}>
      <View style={styles.controls}>
        <IconButton
          icon={isPlaying.current ? 'pause' : 'play'}
          size={30}
          color="white"
          style={styles.playIcon}
          onPress={() => {
            shouldPlay.current = !shouldPlay.current;
            if (shouldPlay.current && !isPlaying.current) {
              playSound();
            }
            if (!shouldPlay.current && isPlaying.current) {
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
        maximumTrackTintColor={
          Platform.OS === 'ios'
            ? Color('white')
                .fade(0.5)
                .toString()
            : 'white'
        }
        onSlidingStart={slidingStart}
        onSlidingComplete={slidingComplete}
        value={!isSliding.current ? currentTime : 0}
        thumbTintColor="white"
      />
    </View>
  );
};
export default ActivityPlayerVideo;

const getStyles = theme => StyleSheet.create({
  playerContainer: {
    width: '100%',
    flex: 1,
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
  }
});
