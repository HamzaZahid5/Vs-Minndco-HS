import React from 'react'
import { Icon, useRobTheme } from '@mindcoxr/rob'
import { StyleSheet, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

const RoundPlayButton = ({ onPress, isPlaying }: { onPress: () => void; isPlaying: boolean }) => {
  const theme = useRobTheme()
  return (
    <TouchableRipple borderless onPress={onPress} style={styles.playButton}>
      <View style={styles.playContainer}>
        <Icon name={isPlaying ? 'Pause' : 'Play'} color={theme.colors.monochrome.input} />
      </View>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  playContainer: {
    backgroundColor: '#14142B',
    height: 64,
    width: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default RoundPlayButton
