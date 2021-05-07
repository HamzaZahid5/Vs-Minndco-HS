import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Button, Platform, Pressable } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

export default ({ didJustFinish }) => {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  useLayoutEffect(() => {
    if(status.didJustFinish) {
      didJustFinish();
    }
  }, [status])
  return (
    <View style={styles.videoContainer}>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed
              ? 0.5
              : 1
          },
          StyleSheet.absoluteFillObject
        ]}
        // style={StyleSheet.absoluteFillObject}
        onPress={() => {
          console.log('playing?', status.isPlaying);
          status.isPlaying ? video.current.pauseAsync() : video.current.playAsync();
        }}
      >
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/mindcotine-v4-production.appspot.com/o/content%2Fvideo_14_EN.mp4?alt=media&token=b2412b2d-f63c-4956-8171-b93518edd654',
          }}
          useNativeControls
          resizeMode="contain"
          // isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </Pressable>
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    height: 232,
    width: '100%',
    borderWidth: 1,
    borderColor: 'red',
  },
  video: {
    height: 232,
    flex: 1,
  },
  buttons: {
    display: Platform.OS === 'web' ? 'flex' : 'none',
    position: 'relative',
    bottom: -10,
    zIndex: 999,
  },
});
