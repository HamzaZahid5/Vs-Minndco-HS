import React, { useState } from 'react';
import {View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export default ({ onVote }) => {
  const [vote, setVote] = useState(0);
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.pollContainer}>
      <Text>how useful you've found the activity?</Text>
      <View style={styles.options}>
        <Pressable
          style={{}}
          onPress={() => setVote(1)}
        >
          <Text style={[styles.star, vote < 1 ? styles.unselected : styles.selected]}>⭐️</Text>
        </Pressable>
        <Pressable
          style={{}}
          onPress={() => setVote(2)}
        >
          <Text style={[styles.star, vote < 2 ? styles.unselected : styles.selected]}>⭐️</Text>
        </Pressable>
        <Pressable
          style={{}}
          onPress={() => setVote(3)}
        >
          <Text style={[styles.star, vote < 3 ? styles.unselected : styles.selected]}>⭐️</Text>
        </Pressable>
        <Pressable
          style={{}}
          onPress={() => setVote(4)}
        >
          <Text style={[styles.star, vote < 4 ? styles.unselected : styles.selected]}>⭐️</Text>
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
  },
  star: {
    fontSize: 30,
    margin: 5,
  },
  selected: {
    color: 'yellow',
    // textShadow: '0 0 0 gray',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
  },
  unselected: {
    color: 'transparent',
    // textShadow: '0 0 0 gray',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
  }
});
