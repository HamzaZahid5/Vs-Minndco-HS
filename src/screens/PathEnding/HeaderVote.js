import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import useValuationActions from '../../appActionHooks/useValuationActions';

export default ({ asset = '' }) => {
  const [vote, setVote] = useState(-1);
  const { voteYesNo } = useValuationActions();

  useEffect(() => {
    if (vote > 0) { onVote(vote); }
  }, [vote]);

  const onVote = rate => {
    voteYesNo(asset, rate);
  }

  const theme = useTheme();
  const styles = getStyles(theme);
  const charVoteYes = Platform.OS === 'ios' ? '✓' : '👍';
  const charVoteNo = Platform.OS === 'ios' ? '✖' : '👎';
  return (
    <View style={styles.pollContainer}>
      <Text>It was a useful activity for you?</Text>
      <View style={styles.options}>
        <Pressable
          style={{}}
          onPress={() => setVote(0)}
        >
          <Text style={[styles.icon, styles.flipH, vote === 0 ? styles.selected : styles.unselected]}>{charVoteNo}</Text>
        </Pressable>
        <Pressable
          style={{}}
          onPress={() => setVote(1)}
        >
          <Text style={[styles.icon, vote === 1 ? styles.selected : styles.unselected]}>{charVoteYes}</Text>
        </Pressable>
      </View>
    </View>
  )
}

const getStyles = theme => StyleSheet.create({
  pollContainer: {
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 30,
    margin: 5,
  },
  flipH: {
    transform: 'scaleX(-1)',
  },
  selected: {
    fontSize: 35,
    color: 'gold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
  },
  unselected: {
    fontSize: 35,
    color: Platform.OS === 'ios' ? 'black' : 'transparent',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
  }
});
