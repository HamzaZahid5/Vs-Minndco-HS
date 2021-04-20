/**
 * AUDIO PLAYER USED INTO PROGRAM ACTIVITY SCREEN. ONE OF MANY OPTIONS LIKE VR, 2D VIDEO AND QUESTIONS
 */
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Audio } from 'expo-av'
import Slider from '@react-native-community/slider';
import Color from 'color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useKeepAwake } from '@sayem314/react-native-keep-awake';

let tId;
const ActivityPlayerVideo = ({ src = '', onEnd = null }) => {
  const statusTId = useRef();
  const isSliding = useRef();
  const isPlaying = useRef();
  const shouldPlay = useRef();
  const [playing, setPlaying] = useState(false);
  const [thumbIcon, setIcon] = useState();
  const [sound, setSound] = useState();
  const [duration, setDuration] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);

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
    // sound?.getStatusAsync().then(console.log)
    //durationMillis
    sound?.getStatusAsync().then(status => {
      if (currentTime !== status.positionMillis) {
        setCurrentTime(status.positionMillis);
      }
      if (duration !== status.durationMillis) {
        setDuration(status.durationMillis);
      }
      // if (playing !== status.isPlaying) {
      //   setPlaying(status.isPlaying);
      // }
      // console.log(status.positionMillis * 100 / status.durationMillis);
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
    // if (Platform.OS !== "web") {
    //   Icon.getImageSource('circle', 15, 'white').then(icon => setIcon(icon));
    // }
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
    console.log('slide complete')
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
    <View style={[styles.playerContainer, { backgroundColor: 'black' }]}>
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
            // setPlaying(!playing)
          }}
        />
        {/* <View style={styles.progressIconsContainer}>
          <IconButton
            icon="rewind-10"
            size={20}
            color="white"
            onPress={rewindTen}
          />
          <IconButton
            icon="fast-forward-10"
            size={20}
            color="white"
            onPress={forwardTen}
          />
        </View> */}
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
        // onValueChange={console.log('value change')}
        onSlidingStart={slidingStart}
        onSlidingComplete={slidingComplete}
        value={!isSliding.current ? currentTime : 0}
        thumbTintColor="white"
        // thumbImage={thumbIcon}
      />
      {/* {src && (
        <Video
          source={{ uri: src, type: 'mp3' }} // Can be a URL or a local file.
          ref={ref => {
            player = ref;
          }} // Store reference
          ignoreSilentSwitch="ignore"
          onLoad={({ duration }) => {
            setDuration(duration);
            setCurrentTime(0);
            setPlaying(true);
          }}
          onEnd={() => {
            seekTo(0);
            // setCurrentTime(0);
            setPlaying(false);
            onEnd();
          }}
          onProgress={({ currentTime, playableDuration, seekableDuration }) => {
            setCurrentTime(currentTime);
          }}
          paused={!playing}
          controls={false}
          playInBackground={true}
          fullscreen={false}
          style={styles.hiddenAudioPlayer}
          resizeMode="contain"
          audioOnly
        />
      )} */}
    </View>
  );
};
export default ActivityPlayerVideo;

const styles = StyleSheet.create({
  hiddenAudioPlayer: {
    height: 0,
  },
  playerContainer: {
    width: '100%',
    paddingHorizontal: 25,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    height: 200,
  },
  progressIconsContainer: {
    flexDirection: 'row',
  },
  playIcon: {
    backgroundColor: 'red',
    // height: 'auto',
  },
});
