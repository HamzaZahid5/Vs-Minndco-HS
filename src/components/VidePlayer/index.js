import React, { useState } from 'react';
import { View, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

export default () => {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  return (
    <View style={styles.videoContainer}>
      <TouchableWithoutFeedback
        style={StyleSheet.absoluteFillObject}
        onPress={() => {
          console.log('playing?', status.isPlaying);
          status.isPlaying ? video.current.pauseAsync() : video.current.playAsync();
        }}
      >
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </TouchableWithoutFeedback>
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
    // flex: 1,
  },
  video: {
    height: 232,
  },
  buttons: {
    position: 'relative',
    bottom: -10,
    zIndex: 999,
  },
});
