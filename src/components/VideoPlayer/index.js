import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Button, Platform, Pressable } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

const VideoPlayer = ({ videoURI, didJustFinish }) => {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  useLayoutEffect(() => {
    if (status.didJustFinish) {
      didJustFinish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  return (
    <View style={styles.videoContainer}>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
          },
          StyleSheet.absoluteFillObject,
        ]}
        // style={StyleSheet.absoluteFillObject}
        onPress={() => {
          // console.log('playing?', status.isPlaying);
          // status.isPlaying ? video.current.pauseAsync() : video.current.playAsync();
        }}
      >
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: videoURI,
          }}
          useNativeControls
          resizeMode="contain"
          shouldPlay={true}
          // isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </Pressable>
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() => (status.isPlaying ? video.current.pauseAsync() : video.current.playAsync())}
        />
      </View>
    </View>
  );
};

VideoPlayer.propTypes = {
  videoURI: PropTypes.string,
  didJustFinish: PropTypes.func,
};

export default VideoPlayer;

const styles = StyleSheet.create({
  videoContainer: {
    height: 232,
    minWidth: '100%',
    borderWidth: 0,
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
