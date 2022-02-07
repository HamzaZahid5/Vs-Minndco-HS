import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Button, Platform, Pressable, useWindowDimensions } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { Video, AVPlaybackStatus } from 'expo-av';
import Loading from '../Loading';

const VideoPlayer = ({ videoURI, didJustFinish }) => {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const dimensions = useWindowDimensions();
  const styles = getStyle(dimensions);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  useKeepAwake();
  const onPlaybackStatusUpdate = status => {
    setStatus(() => status);
    setIsBuffering(isBuffering => (isBuffering !== status.isBuffering ? status.isBuffering : isBuffering));

    setIsLoaded(isLoaded => (isLoaded !== status.isLoaded ? status.isLoaded : isLoaded));
  };
  useLayoutEffect(() => {
    if (status.didJustFinish) {
      didJustFinish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  return (
    <View style={styles.videoContainer}>
      <Pressable
        style={StyleSheet.absoluteFillObject}
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
          useNativeControls={isLoaded === true && isBuffering === false}
          resizeMode="contain"
          shouldPlay={true}
          // isLooping
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
      </Pressable>
      {(isBuffering === true || isLoaded === false) && (
        <View pointerEvents="none" style={styles.loading}>
          <Loading iconSize={45} iconStyle={{ backgroundColor: '#00000070' }} />
        </View>
      )}

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

const getStyle = dimensions =>
  StyleSheet.create({
    videoContainer: {
      height: 232,
      minWidth: '100%',
      width: dimensions.width,
    },
    video: {
      height: 232,
      flex: 1,
      width: '100%',
    },
    buttons: {
      display: Platform.OS === 'web' ? 'flex' : 'none',
      position: 'relative',
      bottom: -10,
      zIndex: 999,
    },
    loading: {
      display: 'flex',
      position: 'relative',
      zIndex: 999,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
  });
