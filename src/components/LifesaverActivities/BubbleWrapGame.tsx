/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Image, TouchableWithoutFeedback, View, StyleSheet, useWindowDimensions, ImageBackground } from 'react-native'
import { Title, useTheme } from 'react-native-paper'
import { Audio } from 'expo-av'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import crashlytics from '../../services/Crashlytics'

const popSoundAsset = require('../../../assets/sounds/BubbleWrapPop.mp3')
const winSoundAsset = require('../../../assets/sounds/MicroGameWin.mp3')
const lostSoundAsset = require('../../../assets/sounds/MicroGameLost.mp3')
import { translate } from '../../utils/localization'
import { useRobTheme } from '@mindcoxr/rob'
import { RobTheme } from '@mindcoxr/rob/dist/typescript/theme'

const Bubble = ({ onSmash = _ => _ }: { onSmash: (e: boolean) => void }) => {
  const { width, height } = useWindowDimensions()

  // BUBBLE ASSET REAL SIZE: 105x105
  const BUBBLE_COUNT_BY_ROW = 8
  const bubble_size = width / BUBBLE_COUNT_BY_ROW
  const topBarHeight = 150
  const rows = Math.round((height - topBarHeight) / bubble_size)
  const columns = Math.round(width / bubble_size)
  const evenRows = Math.round(rows / 2)
  const totalBubbles = rows * columns - 1 * evenRows

  const theme = useRobTheme()
  const styles = getStyles(theme, bubble_size)
  const [smashed, smash] = useState(false)

  return (
    <TouchableWithoutFeedback
      style={
        {
          // width: 100,
          // height: 100,
        }
      }
      onPress={() => {
        if (!smashed) {
          smash(true)
          onSmash(true)
        }
      }}
    >
      {!smashed ? (
        <Image style={styles.bubble} source={require('../../../assets/images/bubble.png')} />
      ) : (
        <Image style={styles.bubble} source={require('../../../assets/images/bubble_smashed.png')} />
      )}
    </TouchableWithoutFeedback>
  )
}

const BubbleWrapGame = ({ testID = '' }) => {
  const { width, height } = useWindowDimensions()
  const [popSound, setPopSound] = useState<Audio.Sound>()
  const [winSound, setWinSound] = useState<Audio.Sound>()
  const [lostSound, setLostSound] = useState<Audio.Sound>()

  useEffect(() => {
    const loadSounds = async () => {
      const { sound: popSound } = await Audio.Sound.createAsync(popSoundAsset)
      popSound.playAsync()
      setPopSound(popSound)
      const { sound: winSound } = await Audio.Sound.createAsync(winSoundAsset)
      setWinSound(winSound)
      const { sound: lostSound } = await Audio.Sound.createAsync(lostSoundAsset)
      setLostSound(lostSound)
    }
    loadSounds()
  }, [])
  useEffect(() => {
    return () => {
      try {
        popSound?.unloadAsync()
      } catch (e) {
        crashlytics().recordError(e)
      }
    }
  }, [popSound])
  // BUBBLE ASSET REAL SIZE: 105x105
  const BUBBLE_COUNT_BY_ROW = 8
  const bubble_size = width / BUBBLE_COUNT_BY_ROW
  const topBarHeight = 100
  const rows = Math.round((height - topBarHeight) / bubble_size)
  const columns = Math.round(width / bubble_size)
  const evenRows = Math.round(rows / 2)
  const totalBubbles = rows * columns - 1 * evenRows

  const theme = useRobTheme()
  const styles = getStyles(theme, bubble_size)
  const [notSmashed, countSmash] = useState(totalBubbles)
  useEffect(() => {
    if (notSmashed === 0 && winSound) {
      winSound.playAsync()
    }
  }, [notSmashed, winSound])
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.headerContainer}>
        <View style={styles.topBarTitle}>
          {notSmashed === 0 && (
            <Title style={[{ color: theme.colors.monochrome.offWhite }]}>{translate('commons.general.done')}</Title>
          )}
        </View>
        <View style={styles.scoreContainer}>
          <Title style={[{ color: theme.colors.monochrome.offWhite }]}>{notSmashed}</Title>
          <Icon name="blur-radial" size={40} color={theme.colors.monochrome.offWhite} />
        </View>
      </View>
      <View style={styles.board}>
        {Array(rows)
          .fill(0)
          .map((_, i) => {
            const isEven = i % 2 === 0
            return (
              <View key={`row_${i}`} style={[styles.row, isEven ? styles.rowEven : null]}>
                {Array(columns - (isEven ? 1 : 0))
                  .fill(0)
                  .map((__, j) => (
                    <Bubble
                      key={`bubble_${i}_${j}`}
                      onSmash={isSmashed => {
                        popSound?.replayAsync({ volume: 1 })
                        countSmash(notSmashed - (isSmashed ? 1 : 0))
                      }}
                    />
                  ))}
              </View>
            )
          })}
      </View>
      <View style={styles.floatingCover}>
        <LinearGradient
          colors={[theme.colors.backdrop, '#3D9AD599', '#3D9AD599', theme.colors.backdrop]}
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
  )
}

BubbleWrapGame.propTypes = {
  onClose: PropTypes.func,
  testID: PropTypes.string,
}

export default BubbleWrapGame

const getStyles = (theme: RobTheme, bubble_size: number) =>
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
  })
