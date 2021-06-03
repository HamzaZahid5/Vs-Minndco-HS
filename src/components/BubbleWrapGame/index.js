import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableWithoutFeedback, View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Title, useTheme } from 'react-native-paper';
// import Sound from 'react-native-sound';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import RoundedBackButton from './../../components/RoundedBackButton';
// import { translate } from './../../utils/localization';
// import theme from './../../styles/BasicNewTheme';
// const popSound = new Sound(
//   require('./../../styles/sounds/BubbleWrapPop.mp3'),
//   error => {
//     if (error) {
//       console.error(error);
//     }
//   },
// );
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
const { width, height } = Dimensions.get('window');
// BUBBLE ASSET REAL SIZE: 105x105
const BUBBLE_COUNT_BY_ROW = 8;
const bubble_size = width / BUBBLE_COUNT_BY_ROW;
const topBarHeight = 100;
const rows = Math.round((height - topBarHeight) / bubble_size);
const columns = Math.round(width / bubble_size);
const evenRows = Math.round(rows / 2);
const totalBubbles = rows * columns - 1 * evenRows;
const playWinSound = () => {
  // winSound.play();
};
const playLostSound = () => {
  // lostSound.play();
};
const playPopSound = () => {
  // popSound.play();
};
const Bubble = ({ onSmash = _ => _ }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [smashed, smash] = useState(false);
  useEffect(() => {
    // return () => popSound.release();
  }, []);
  return (
    <TouchableWithoutFeedback
      style={
        {
          // width: 100,
          // height: 100,
        }
      }
      onPress={() => {
        // console.log('SMASH')
        if (!smashed) {
          smash(true);
          playPopSound();
          onSmash(true);
        }
      }}
    >
      {!smashed ? (
        <Image style={styles.bubble} source={require('../../../assets/images/bubble.png')} />
      ) : (
        <Image style={styles.bubble} source={require('../../../assets/images/bubble_smashed.png')} />
      )}
    </TouchableWithoutFeedback>
  );
};

Bubble.propTypes = {
  onSmash: PropTypes.func,
};

const BubbleWrapGame = ({ onClose = _ => _ }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [smashed, countSmash] = useState(totalBubbles);
  useEffect(() => {
    if (smashed === 0) {
      playWinSound();
    }
  }, [smashed]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <RoundedBackButton
          style={styles.backButtonStyle}
          onPress={() => {
            const completed = smashed === 0;
            if (!completed) {
              playLostSound();
            }
            onClose(completed);
          }}
        /> */}
        <View style={styles.topBarTitle}>
          {smashed === 0 && <Title style={[styles.title, { color: theme.colors.border }]}>{'DONE!'}</Title>}
        </View>
        <View style={styles.scoreContainer}>
          <Title style={[styles.title, { color: theme.colors.border }]}>{smashed}</Title>
          <Icon name="blur-radial" size={40} color={theme.colors.border} />
        </View>
      </View>
      <View style={styles.board}>
        {Array(rows)
          .fill(0)
          .map((_, i) => {
            const isEven = i % 2 === 0;
            return (
              <View key={`row_${i}`} style={[styles.row, isEven ? styles.rowEven : null]}>
                {Array(columns - (isEven ? 1 : 0))
                  .fill(0)
                  .map((_, j) => (
                    <Bubble key={`bubble_${i}_${j}`} onSmash={isSmashed => countSmash(smashed - (isSmashed ? 1 : 0))} />
                  ))}
              </View>
            );
          })}
      </View>
      <View style={styles.floatingCover}>
        <LinearGradient
          colors={[theme.colors.backdrop, '#37b15c99', '#37b15c99', theme.colors.backdrop]}
          locations={[0.1, 0.2, 0.9, 1]}
          style={{
            flex: 1,
          }}
        />
      </View>
      <ImageBackground
        resizeMode="cover"
        source={require('../../../assets/images/kit_cover_plastic_en.jpg')}
        style={styles.floatingImageContent}
      />
    </View>
  );
};

BubbleWrapGame.propTypes = {
  onClose: PropTypes.func,
};

export default BubbleWrapGame;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
      flex: 1,
      height: '110%',
      marginBottom: -30,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
      backgroundColor: theme.colors.backdrop,
    },
    board: {
      flex: 0,
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    row: {
      width: '100%',
      flexDirection: 'row',
    },
    rowEven: {
      paddingLeft: bubble_size / 2,
    },
    bubble: {
      width: bubble_size,
      height: bubble_size,
    },
    scoreContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    topBarTitle: {
      flex: 1,
      margin: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
    },
    floatingCover: {
      position: 'absolute',
      zIndex: -1,
      width: '100%',
      height: '115%',
      top: -50,
      backgroundColor: 'transparent',
    },
    floatingImageContent: {
      position: 'absolute',
      left: '-30%',
      top: '-30%',
      width: '130%',
      height: '130%',
      transform: [{ rotate: '20deg' }],
      zIndex: -2,
    },
  });
