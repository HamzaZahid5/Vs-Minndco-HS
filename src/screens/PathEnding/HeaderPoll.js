import React, { useState } from 'react';
import {View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export default ({ onVote = Function }) => {
  const [vote, setVote] = useState();
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.pollContainer}>
      <Text>Now tell me, how do you feel?</Text>
      <View style={styles.options}>
        <Pressable
          style={{
            backgroundColor: vote === '1' ? 'gray' : 'transparent'
          }}
          onPress={() => setVote('1')}
        >
          <Text style={{}}>😩</Text>
          <Text style={{}}>
            Stressed
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: vote === '2' ? 'gray' : 'transparent'
          }}
          onPress={() => setVote('2')}
        >
          <Text style={{}}>😕</Text>
          <Text style={{}}>
            Bored
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: vote === '3' ? 'gray' : 'transparent'
          }}
          onPress={() => setVote('3')}
        >
          <Text style={{}}>😡</Text>
          <Text style={{}}>
            Angry
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: vote === '4' ? 'gray' : 'transparent'
          }}
          onPress={() => setVote('4')}
        >
          <Text style={{}}>😄</Text>
          <Text style={{}}>
            Happy
          </Text>
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
});
